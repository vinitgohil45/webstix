import nodemailer from "nodemailer";

export interface ContactEnquiry {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  company?: string; // backwards compatibility
  service: string;
  projectType?: string; // backwards compatibility
  budget?: string;
  budgetRange?: string; // backwards compatibility
  details: string;
  description?: string; // backwards compatibility
  preferredContactMethod: string;
  country?: string;
  timeline?: string;
  referenceId: string;
  submittedAt: string;
}

/**
 * Escapes characters for safe inclusion in HTML bodies to prevent XSS / HTML injection.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Strips carriage returns and newlines to prevent email header injection.
 */
export function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n\t]/g, " ").trim();
}

/**
 * Validates whether required SMTP environment variables are present and not placeholders.
 */
export function isSmtpConfigured(): boolean {
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "").trim();
  if (!pass || pass === "YOUR_GOOGLE_APP_PASSWORD" || pass === "your_app_password_here") {
    return false;
  }
  return true;
}

/**
 * Creates and returns a Nodemailer transporter configured for Gmail SMTP.
 */
export function getMailTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE !== "false";
  const user = process.env.SMTP_USER || "hello.webstix@gmail.com";
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "").trim();

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    // Reasonable timeouts to prevent hanging server requests
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Sends the Webstix client enquiry via Gmail SMTP.
 */
export async function sendEnquiryEmail(enquiry: ContactEnquiry): Promise<{ messageId: string }> {
  if (!isSmtpConfigured()) {
    throw new Error(
      "SMTP_NOT_CONFIGURED: Google App Password (SMTP_PASS) is missing or set to placeholder in environment variables."
    );
  }

  const transporter = getMailTransporter();
  const user = process.env.SMTP_USER || "hello.webstix@gmail.com";
  const recipient = process.env.CONTACT_TO || "hello.webstix@gmail.com";

  const safeName = sanitizeHeader(enquiry.name);
  const safeEmail = sanitizeHeader(enquiry.email);
  const safePhone = sanitizeHeader(enquiry.phone);
  const businessVal = enquiry.businessName || enquiry.company;
  const safeBusinessName = businessVal ? sanitizeHeader(businessVal) : "Not specified / Individual";
  const serviceVal = enquiry.service || enquiry.projectType || "General Web Project";
  const safeService = sanitizeHeader(serviceVal);
  const budgetVal = enquiry.budget || enquiry.budgetRange;
  const safeBudget = budgetVal ? sanitizeHeader(budgetVal) : "Not specified / Request Quote";
  const safeContactMethod = sanitizeHeader(enquiry.preferredContactMethod || "WhatsApp");
  const detailsVal = (enquiry.details || enquiry.description || "").trim();

  // Digits only for wa.me link
  const rawDigits = safePhone.replace(/\D/g, "");
  // Formatted wa.me link: if digits start without country code (e.g. 10 digits in India), standard is country code prefix
  const waLink = rawDigits.length === 10 ? `https://wa.me/91${rawDigits}` : `https://wa.me/${rawDigits}`;
  const telLink = `tel:${safePhone.replace(/\s+/g, "")}`;

  // Subject requirement: "New Webstix Client Enquiry — [Client Name]"
  const subject = `New Webstix Client Enquiry — ${safeName}`;

  // Plain-text alternative
  const textContent = `
===================================================================
NEW WEBSTIX CLIENT ENQUIRY
Reference ID: ${enquiry.referenceId}
Date/Time: ${enquiry.submittedAt}
===================================================================

CLIENT CONTACT DETAILS:
- Full Name: ${safeName}
- Business Name: ${safeBusinessName}
- Email Address: ${safeEmail}
- Phone / WhatsApp: ${safePhone}  *** (PROMINENT - Preferred: ${safeContactMethod}) ***
- Preferred Contact Method: ${safeContactMethod}

PROJECT SPECIFICATIONS:
- Service Interested In: ${safeService}
- Estimated Budget: ${safeBudget}

PROJECT DETAILS:
-------------------------------------------------------------------
${detailsVal}
-------------------------------------------------------------------

QUICK FOLLOW-UP ACTIONS:
- WhatsApp Chat: ${waLink}
- Direct Phone Call: ${telLink}
- Reply by Email: Hit Reply (reply-to is set to ${safeEmail})

Webstix Digital Studio • hello.webstix@gmail.com • +91 9136730898
`.trim();

  // Responsive modern HTML email matching Webstix dark tech styling
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0B1020; color: #F8FAFC; margin: 0; padding: 24px; }
    .container { max-width: 620px; margin: 0 auto; background-color: #111832; border: 1px solid #29324B; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #2563EB, #7C3AED); padding: 28px 32px; color: #ffffff; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 32px; }
    .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #60A5FA; margin-bottom: 12px; }
    .phone-callout { background: linear-gradient(135deg, rgba(37,99,235,0.18), rgba(16,185,129,0.12)); border: 1px solid #3B82F6; border-radius: 12px; padding: 18px 22px; margin-bottom: 24px; }
    .phone-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #93C5FD; letter-spacing: 0.08em; margin-bottom: 6px; }
    .phone-number { font-size: 20px; font-weight: 800; color: #FFFFFF; font-family: monospace, sans-serif; }
    .phone-actions { margin-top: 10px; display: flex; gap: 12px; flex-wrap: wrap; }
    .btn-wa { display: inline-block; padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; background-color: #10B981; color: #FFFFFF; text-decoration: none; }
    .btn-call { display: inline-block; padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; background-color: #2563EB; color: #FFFFFF; text-decoration: none; }
    .pref-badge { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; background-color: rgba(147,197,253,0.15); color: #93C5FD; border: 1px solid rgba(147,197,253,0.3); }
    .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #171E33; border: 1px solid #29324B; border-radius: 10px; overflow: hidden; }
    .meta-table td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid #29324B; }
    .meta-table tr:last-child td { border-bottom: none; }
    .meta-label { color: #A7B0C4; font-weight: 600; width: 38%; }
    .meta-value { color: #F8FAFC; font-weight: 500; }
    .meta-value a { color: #60A5FA; text-decoration: none; }
    .scope-box { background-color: #171E33; border: 1px solid #29324B; border-radius: 10px; padding: 18px; margin-bottom: 24px; font-size: 14px; line-height: 1.6; color: #F8FAFC; white-space: pre-wrap; word-break: break-word; }
    .footer { padding: 20px 32px; background-color: #0B1020; border-top: 1px solid #29324B; font-size: 12px; color: #A7B0C4; text-align: center; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; background-color: rgba(37,99,235,0.2); color: #93C5FD; border: 1px solid rgba(59,130,246,0.3); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">CLIENT ENQUIRY</span>
      <h1>${escapeHtml(subject)}</h1>
      <p>Reference: <strong>${escapeHtml(enquiry.referenceId)}</strong> • Submitted on ${escapeHtml(enquiry.submittedAt)}</p>
    </div>
    <div class="content">
      <!-- Prominent Phone / WhatsApp Contact Callout -->
      <div class="phone-callout">
        <div class="phone-label">Primary Follow-up • Phone / WhatsApp Number</div>
        <div class="phone-number">
          ${escapeHtml(safePhone)}
          <span class="pref-badge">Prefers: ${escapeHtml(safeContactMethod)}</span>
        </div>
        <div class="phone-actions" style="margin-top: 12px;">
          <a href="${waLink}" class="btn-wa" target="_blank">Chat on WhatsApp &rarr;</a>
          <a href="${telLink}" class="btn-call">Call Client</a>
        </div>
      </div>

      <div class="section-title">Client Details</div>
      <table class="meta-table">
        <tr>
          <td class="meta-label">Full Name</td>
          <td class="meta-value"><strong>${escapeHtml(safeName)}</strong></td>
        </tr>
        <tr>
          <td class="meta-label">Business Name</td>
          <td class="meta-value">${escapeHtml(safeBusinessName)}</td>
        </tr>
        <tr>
          <td class="meta-label">Email Address</td>
          <td class="meta-value"><a href="mailto:${escapeHtml(safeEmail)}">${escapeHtml(safeEmail)}</a></td>
        </tr>
        <tr>
          <td class="meta-label">Phone / WhatsApp</td>
          <td class="meta-value"><strong>${escapeHtml(safePhone)}</strong></td>
        </tr>
        <tr>
          <td class="meta-label">Preferred Contact</td>
          <td class="meta-value"><span class="pref-badge">${escapeHtml(safeContactMethod)}</span></td>
        </tr>
      </table>

      <div class="section-title">Service & Budget</div>
      <table class="meta-table">
        <tr>
          <td class="meta-label">Service Interested In</td>
          <td class="meta-value"><strong style="color: #60A5FA;">${escapeHtml(safeService)}</strong></td>
        </tr>
        <tr>
          <td class="meta-label">Estimated Budget</td>
          <td class="meta-value">${escapeHtml(safeBudget)}</td>
        </tr>
      </table>

      <div class="section-title">Project Details</div>
      <div class="scope-box">${escapeHtml(detailsVal)}</div>
    </div>
    <div class="footer">
      <p style="margin: 0 0 6px 0;">Delivered securely to <strong>hello.webstix@gmail.com</strong>.</p>
      <p style="margin: 0;">Hit <strong>Reply</strong> to directly email ${escapeHtml(safeName)} (${escapeHtml(safeEmail)}).</p>
    </div>
  </div>
</body>
</html>
`.trim();

  const mailOptions = {
    from: `"Webstix Studio" <${user}>`,
    to: recipient,
    replyTo: `"${safeName}" <${safeEmail}>`,
    subject,
    text: textContent,
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);
  return { messageId: info.messageId };
}
