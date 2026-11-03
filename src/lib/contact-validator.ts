/**
 * Webstix Contact Form & API Validation Engine
 * Implements strict input normalization, RFC email validation, international phone validation,
 * rate limiting, length caps, anti-spam honeypot, and frontend response handlers.
 */

export type PreferredContactMethod = "WhatsApp" | "Email" | "Phone Call";

export const ALLOWED_CONTACT_METHODS: readonly PreferredContactMethod[] = [
  "WhatsApp",
  "Email",
  "Phone Call",
] as const;

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  company?: string; // backwards compatibility alias
  service?: string;
  projectType?: string; // backwards compatibility alias
  budget?: string;
  budgetRange?: string; // backwards compatibility alias
  details?: string;
  description?: string; // backwards compatibility alias
  preferredContactMethod?: PreferredContactMethod | string;
  country?: string;
  timeline?: string;
  consent: boolean;
  honeypot?: string;
}

export interface SanitizedContactData {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  company?: string;
  service: string;
  projectType: string;
  budget?: string;
  budgetRange?: string;
  details: string;
  description: string;
  preferredContactMethod: PreferredContactMethod;
  country?: string;
  timeline?: string;
  consent: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  isSpamBot?: boolean;
  errors: Record<string, string>;
  sanitized?: SanitizedContactData;
}

export const MAX_PAYLOAD_BYTES = 50 * 1024; // 50 KB

export const ALLOWED_SERVICES = [
  "Website Design & Development",
  "Business Websites & Landing Pages",
  "E-Commerce Storefront",
  "Full-Stack Web Application",
  "Website Maintenance & Performance",
  "API & System Integration",
  "Other Custom Digital Solution",
] as const;

export const ALLOWED_PROJECT_TYPES = ALLOWED_SERVICES;

export const EMAIL_RFC_REGEX =
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

/**
 * Validates international and Indian phone numbers sensibly.
 * Allows country calling codes (+), digits, spaces, hyphens, parentheses, and dots.
 * Validates raw digit count (7 to 15 digits according to ITU-T E.164).
 * Does NOT mutate, discard, or silently change the user's entered number.
 */
export function validatePhoneNumber(phoneRaw: unknown): { isValid: boolean; error?: string } {
  if (typeof phoneRaw !== "string") {
    return { isValid: false, error: "Phone / WhatsApp number is required." };
  }

  const phone = phoneRaw.trim();
  if (!phone) {
    return { isValid: false, error: "Phone / WhatsApp number is required." };
  }

  // Must only contain allowed telephone characters
  if (!/^[+\d\s\-().]{7,30}$/.test(phone)) {
    return {
      isValid: false,
      error: "Please enter a valid phone number with optional country code (e.g. +91 91367 30898 or +1 (555) 234-5678).",
    };
  }

  // Raw digits check (E.164 standard: 7 to 15 digits)
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length < 7) {
    return {
      isValid: false,
      error: "Phone number is too short (minimum 7 digits required).",
    };
  }

  if (digitsOnly.length > 15) {
    return {
      isValid: false,
      error: "Phone number cannot exceed 15 digits.",
    };
  }

  // Guard against dummy repetitive numbers like 0000000000 or 1111111111
  if (new Set(digitsOnly).size === 1) {
    return {
      isValid: false,
      error: "Please enter a valid, active phone number.",
    };
  }

  return { isValid: true };
}

/**
 * Validates and normalizes contact form input.
 * Rejects missing required fields, malformed emails, invalid phones, and oversized values.
 */
export function validateContactInput(rawBody: unknown): ValidationResult {
  if (!rawBody || typeof rawBody !== "object") {
    return {
      isValid: false,
      errors: { _general: "Invalid request payload format." },
    };
  }
  const body = rawBody as Record<string, unknown>;

  // 1. Anti-bot honeypot check
  if (body.honeypot && typeof body.honeypot === "string" && body.honeypot.trim() !== "") {
    return {
      isValid: false,
      isSpamBot: true,
      errors: { honeypot: "Automated submission rejected." },
    };
  }

  const errors: Record<string, string> = {};

  // 2. Full Name: Required, 2 - 100 characters
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name || name.length < 2) {
    errors.name = "Full name is required (at least 2 characters).";
  } else if (name.length > 100) {
    errors.name = "Full name cannot exceed 100 characters.";
  }

  // 3. Email: Required, valid RFC format, max 120 chars, no newlines/CR
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RFC_REGEX.test(email) || email.includes("\n") || email.includes("\r")) {
    errors.email = "Please enter a valid, well-formed email address.";
  } else if (email.length > 120) {
    errors.email = "Email address cannot exceed 120 characters.";
  }

  // 4. Phone / WhatsApp Number: Required, valid format, 7-15 digits
  const rawPhone = typeof body.phone === "string" ? body.phone.trim() : "";
  const phoneValidation = validatePhoneNumber(rawPhone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error || "Valid phone or WhatsApp number is required.";
  }

  // 5. Business Name: Optional, max 120 chars (supports businessName or company)
  const businessNameInput = body.businessName ?? body.company;
  const businessName = typeof businessNameInput === "string" ? businessNameInput.trim() : "";
  if (businessName.length > 120) {
    errors.businessName = "Business name cannot exceed 120 characters.";
  }

  // 6. Service Interested In: Required, 2 - 80 chars (supports service or projectType)
  const serviceInput = body.service ?? body.projectType;
  const service = typeof serviceInput === "string" ? serviceInput.trim() : "";
  if (!service || service.length < 2) {
    errors.service = "Please select a service interested in.";
  } else if (service.length > 80) {
    errors.service = "Service selection cannot exceed 80 characters.";
  }

  // 7. Estimated Budget: Optional dropdown, max 80 chars (supports budget or budgetRange)
  const budgetInput = body.budget ?? body.budgetRange;
  const budget = typeof budgetInput === "string" ? budgetInput.trim() : "";
  if (budget.length > 80) {
    errors.budget = "Estimated budget cannot exceed 80 characters.";
  }

  // 8. Project Details: Required, 10 - 5000 chars (supports details or description)
  const detailsInput = body.details ?? body.description;
  const details = typeof detailsInput === "string" ? detailsInput.trim() : "";
  if (!details || details.length < 10) {
    errors.details = "Project details are required (minimum 10 characters).";
  } else if (details.length > 5000) {
    errors.details = "Project details cannot exceed 5000 characters.";
  }

  // 9. Preferred Contact Method: Required, must be Email, WhatsApp, or Phone Call
  const rawContactMethod = typeof body.preferredContactMethod === "string" ? body.preferredContactMethod.trim() : "";
  let preferredContactMethod: PreferredContactMethod = "WhatsApp";
  if (!rawContactMethod) {
    // If not supplied, default or report error? Prompt says: Preferred Contact Method — Email, WhatsApp, or Phone Call
    errors.preferredContactMethod = "Please select your preferred contact method (WhatsApp, Email, or Phone Call).";
  } else if (!ALLOWED_CONTACT_METHODS.includes(rawContactMethod as PreferredContactMethod)) {
    errors.preferredContactMethod = "Preferred contact method must be Email, WhatsApp, or Phone Call.";
  } else {
    preferredContactMethod = rawContactMethod as PreferredContactMethod;
  }

  // 10. Country: Optional, max 80 chars
  const country = typeof body.country === "string" ? body.country.trim() : "";
  if (country.length > 80) {
    errors.country = "Country/location cannot exceed 80 characters.";
  }

  // 11. Timeline: Optional, max 80 chars
  const timeline = typeof body.timeline === "string" ? body.timeline.trim() : "";
  if (timeline.length > 80) {
    errors.timeline = "Timeline cannot exceed 80 characters.";
  }

  // 12. Privacy Consent: Required
  if (body.consent !== true) {
    errors.consent = "You must give consent to be contacted regarding this enquiry.";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    sanitized: isValid
      ? {
          name,
          email,
          phone: rawPhone, // Preserved without silent modification
          businessName: businessName || undefined,
          company: businessName || undefined,
          service,
          projectType: service,
          budget: budget || undefined,
          budgetRange: budget || undefined,
          details,
          description: details,
          preferredContactMethod,
          country: country || undefined,
          timeline: timeline || undefined,
          consent: true,
        }
      : undefined,
  };
}

// In-Memory Sliding Window Rate Limiter
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();
const DEFAULT_RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const DEFAULT_MAX_REQUESTS = 5;

export function cleanupStaleRateLimits(now = Date.now()): void {
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}

export function resetRateLimits(): void {
  rateLimitMap.clear();
}

export function checkRateLimit(
  ip: string,
  maxRequests = DEFAULT_MAX_REQUESTS,
  windowMs = DEFAULT_RATE_WINDOW_MS
): { allowed: boolean; retryAfterSeconds?: number; currentCount: number } {
  const now = Date.now();
  cleanupStaleRateLimits(now);

  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, currentCount: 1 };
  }

  if (entry.count >= maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return { allowed: false, retryAfterSeconds, currentCount: entry.count };
  }

  entry.count += 1;
  return { allowed: true, currentCount: entry.count };
}

/**
 * Handles client-side API response transitions.
 * Preserves user input on error, resets only on backend delivery confirmation,
 * and ensures no false positive success states.
 */
export interface FrontendSubmissionResult {
  success: boolean;
  message?: string;
  referenceId?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
  formReset: boolean;
}

export function handleFrontendSubmissionResponse<T>(
  status: number,
  data: Record<string, unknown> | null | undefined,
  currentForm: T
): { result: FrontendSubmissionResult; preservedForm: T | null } {
  if (status === 200 && data?.success === true) {
    return {
      result: {
        success: true,
        message:
          typeof data.message === "string"
            ? data.message
            : "Thank you for contacting Webstix! Your enquiry has been submitted successfully.",
        referenceId: typeof data.referenceId === "string" ? data.referenceId : undefined,
        formReset: true,
      },
      preservedForm: null, // Form is cleared only on confirmed success
    };
  }

  // On any failure (4xx, 5xx, or invalid success status)
  return {
    result: {
      success: false,
      error:
        typeof data?.error === "string"
          ? data.error
          : "We could not deliver your message. Please check your details and try again.",
      fieldErrors:
        data?.fields && typeof data.fields === "object"
          ? (data.fields as Record<string, string>)
          : undefined,
      formReset: false,
    },
    preservedForm: currentForm, // Preserves visitor's input on failure
  };
}
