import { NextResponse } from "next/server";
import { sendEnquiryEmail, isSmtpConfigured, ContactEnquiry } from "@/lib/email";
import {
  validateContactInput,
  checkRateLimit,
  MAX_PAYLOAD_BYTES,
} from "@/lib/contact-validator";

export async function POST(req: Request) {
  try {
    // 1. Enforce payload size check
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { success: false, error: "Payload exceeds 50 KB limit." },
        { status: 413 }
      );
    }

    // 2. Client IP extraction & rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many project enquiries submitted from your network. Please wait a few minutes before trying again.",
          retryAfter: rateCheck.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSeconds || 60),
          },
        }
      );
    }

    // 3. Parse JSON body safely
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON format." },
        { status: 400 }
      );
    }

    // 4. Server-side Input Validation & Sanitization
    const validation = validateContactInput(body);

    if (validation.isSpamBot) {
      // Fake rejection for automated spam bots
      return NextResponse.json(
        { success: false, error: "Submission rejected." },
        { status: 400 }
      );
    }

    if (!validation.isValid || !validation.sanitized) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please correct the highlighted errors.",
          fields: validation.errors,
        },
        { status: 422 }
      );
    }

    const {
      name,
      email,
      phone,
      businessName,
      company,
      service,
      projectType,
      budget,
      budgetRange,
      details,
      description,
      preferredContactMethod,
      country,
      timeline,
    } = validation.sanitized;

    // 5. Check if Gmail SMTP is configured before attempting delivery
    if (!isSmtpConfigured()) {
      console.warn("[Webstix Contact API] SMTP credentials not configured in environment variables (SMTP_PASS missing).");
      return NextResponse.json(
        {
          success: false,
          error: "Email delivery backend is awaiting configuration. Please ensure SMTP_PASS is configured with a Google App Password in .env.local as documented in EMAIL_SETUP.md.",
          code: "SMTP_NOT_CONFIGURED",
        },
        { status: 503 }
      );
    }

    // 6. Generate clean reference ID and timestamp
    const referenceId =
      "WSX-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random().toString(36).substring(2, 6).toUpperCase();

    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "long",
    });

    const enquiryPayload: ContactEnquiry = {
      name,
      email,
      phone,
      businessName: businessName || company,
      company: businessName || company,
      service: service || projectType,
      projectType: service || projectType,
      budget: budget || budgetRange,
      budgetRange: budget || budgetRange,
      details: details || description,
      description: details || description,
      preferredContactMethod,
      country,
      timeline,
      referenceId,
      submittedAt: `${submittedAt} (IST)`,
    };

    // 7. Deliver email via Gmail SMTP
    try {
      const sendResult = await sendEnquiryEmail(enquiryPayload);
      console.log(
        `[Webstix Contact API] Enquiry sent successfully! Reference: ${referenceId}, MessageId: ${sendResult.messageId}, Recipient: hello.webstix@gmail.com`
      );

      return NextResponse.json(
        {
          success: true,
          message: "Thank you for contacting Webstix! Your enquiry has been delivered to our team.",
          referenceId,
        },
        { status: 200 }
      );
    } catch (mailErr: unknown) {
      // Log internal error for developers, but sanitize client response
      const errorMessage = mailErr instanceof Error ? mailErr.message : String(mailErr);
      console.error("[Webstix Contact API] Nodemailer send error:", errorMessage);

      return NextResponse.json(
        {
          success: false,
          error: "We could not deliver your message due to an email server error. Please try again or email hello.webstix@gmail.com directly.",
          code: "EMAIL_DELIVERY_FAILED",
        },
        { status: 500 }
      );
    }
  } catch (err: unknown) {
    console.error("[Webstix Contact API] Unexpected error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
