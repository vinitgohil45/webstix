"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
  Building,
  Mail,
  User,
  Phone,
} from "lucide-react";
import { WhatsApp } from "./Icons";
import { validatePhoneNumber } from "@/lib/contact-validator";

type PreferredContactMethod = "WhatsApp" | "Email" | "Phone Call";

interface FormState {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  details: string;
  preferredContactMethod: PreferredContactMethod;
  consent: boolean;
  honeypot: string; // Anti-bot field hidden from legitimate users
}

const INITIAL_FORM: FormState = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  service: "Website Design & Development",
  budget: "₹30,000 - ₹75,000 ($400 - $900)",
  details: "",
  preferredContactMethod: "WhatsApp",
  consent: false,
  honeypot: "",
};

export function InquiryForm() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<{
    inquiryId: string;
    message: string;
  } | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Client-side validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // 1. Full Name (required, min 2 chars)
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your full name (at least 2 characters).";
    }

    // 2. Email Address (required, valid email pattern)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    // 3. Phone / WhatsApp Number (required, international & Indian formats allowed)
    const phoneCheck = validatePhoneNumber(formData.phone);
    if (!phoneCheck.isValid) {
      errors.phone = phoneCheck.error || "Please enter a valid phone or WhatsApp number.";
    }

    // 4. Service Interested In (required)
    if (!formData.service.trim()) {
      errors.service = "Please select the service you are interested in.";
    }

    // 5. Project Details (required, min 10 chars)
    if (!formData.details.trim() || formData.details.trim().length < 10) {
      errors.details = "Please share project details (minimum 10 characters).";
    }

    // 6. Preferred Contact Method (required)
    if (!formData.preferredContactMethod) {
      errors.preferredContactMethod = "Please select your preferred contact method.";
    }

    // 7. Privacy Consent (required)
    if (!formData.consent) {
      errors.consent = "Please confirm consent to be contacted regarding this enquiry.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      interface ContactApiResponse {
        success?: boolean;
        message?: string;
        referenceId?: string;
        error?: string;
        fields?: Record<string, string>;
      }

      let data: ContactApiResponse | null = null;
      try {
        data = (await res.json()) as ContactApiResponse;
      } catch (jsonErr) {
        console.error("Non-JSON response received:", jsonErr);
      }

      if (!res.ok) {
        if (data?.fields) {
          setFieldErrors(data.fields);
        } else if (data?.error) {
          setGeneralError(data.error);
        } else {
          setGeneralError(
            `Server returned an error (${res.status}). Please try again or email hello.webstix@gmail.com directly.`
          );
        }
        setIsSubmitting(false);
        return;
      }

      if (!data || !data.success) {
        setGeneralError(
          data?.error ||
            "We could not deliver your message. Please try again or email hello.webstix@gmail.com."
        );
        setIsSubmitting(false);
        return;
      }

      // Success confirmed by backend
      setSubmittedResponse({
        inquiryId: data.referenceId || "WSX-ENQUIRY",
        message: data.message || "Thank you for contacting Webstix! Your enquiry has been delivered to our team.",
      });
      setFormData(INITIAL_FORM);
      setFieldErrors({});
    } catch (err: unknown) {
      console.error("Contact submission error:", err);
      const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
      if (isOffline) {
        setGeneralError("You appear to be offline. Please verify your internet connection.");
      } else {
        setGeneralError(
          "Could not connect to the server. Please ensure your connection is active, or reach out directly to hello.webstix@gmail.com."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedResponse) {
    return (
      <div
        className="rounded-2xl bg-[#111832] border border-emerald-500/40 p-8 sm:p-10 shadow-2xl relative overflow-hidden"
        role="alert"
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-6 text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enquiry Delivered</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          {submittedResponse.message}
        </h3>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Both CEOs (Vinit Gohil &amp; Riddhi Patthar) have received your enquiry notification at{" "}
          <strong className="text-white">hello.webstix@gmail.com</strong> and will follow up with you promptly.
        </p>

        <div className="p-4 rounded-xl bg-[#171E33] border border-[#29324B] mb-6">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">
            Inquiry Tracking Reference
          </div>
          <div className="text-lg font-mono font-bold text-blue-400">
            {submittedResponse.inquiryId}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Keep this reference ID for any future correspondence with the Webstix team.
          </div>
        </div>

        {/* WhatsApp Follow-Up Option */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-[#171E33] to-[#171E33] border border-emerald-500/30 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white">
                Prefer WhatsApp? Chat with Webstix.
              </div>
              <p className="text-xs text-slate-300 mt-1">
                You can optionally start a direct WhatsApp chat with our engineering desk right now.
              </p>
            </div>
            <a
              href="https://wa.me/919136730898"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950 transition-all shrink-0"
            >
              <WhatsApp className="w-4 h-4 text-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSubmittedResponse(null)}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl bg-[#111832] border border-[#29324B] p-6 sm:p-10 shadow-2xl space-y-6"
    >
      {/* Honeypot field (hidden from screen, trapped for bots) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {generalError && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Row 1: Full Name & Business Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
            Full Name <span className="text-blue-400">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Morgan"
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#171E33] border text-sm text-[#F8FAFC] placeholder-slate-400 focus:outline-none transition-colors ${
                fieldErrors.name ? "border-red-500 focus:border-red-400" : "border-[#29324B] focus:border-blue-500"
              }`}
            />
          </div>
          {fieldErrors.name && <p id="name-error" role="alert" className="text-xs text-red-400 mt-1.5">{fieldErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="businessName" className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
            Business Name <span className="text-slate-400 text-[10px]">(Optional)</span>
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="businessName"
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="e.g. Acme Innovations or Startup"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#171E33] border border-[#29324B] text-sm text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Email Address & Phone / WhatsApp Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
            Email Address <span className="text-blue-400">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@company.com"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#171E33] border text-sm text-[#F8FAFC] placeholder-slate-400 focus:outline-none transition-colors ${
                fieldErrors.email ? "border-red-500 focus:border-red-400" : "border-[#29324B] focus:border-blue-500"
              }`}
            />
          </div>
          {fieldErrors.email && <p id="email-error" role="alert" className="text-xs text-red-400 mt-1.5">{fieldErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
            Phone / WhatsApp Number <span className="text-blue-400">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 91367 30898 or +1 (555) 234-5678"
              aria-invalid={!!fieldErrors.phone}
              aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#171E33] border text-sm text-[#F8FAFC] placeholder-slate-400 focus:outline-none transition-colors ${
                fieldErrors.phone ? "border-red-500 focus:border-red-400" : "border-[#29324B] focus:border-blue-500"
              }`}
            />
          </div>
          {fieldErrors.phone ? (
            <p id="phone-error" role="alert" className="text-xs text-red-400 mt-1.5">{fieldErrors.phone}</p>
          ) : (
            <p className="text-[11px] text-slate-400 mt-1">Accepts Indian (+91) &amp; international numbers with country calling code.</p>
          )}
        </div>
      </div>

      {/* Row 3: Service Interested In & Estimated Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="service" className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
            Service Interested In <span className="text-blue-400">*</span>
          </label>
          <div className="relative">
            <select
              id="service"
              required
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              aria-invalid={!!fieldErrors.service}
              aria-describedby={fieldErrors.service ? "service-error" : undefined}
              className="w-full px-4 py-2.5 rounded-xl bg-[#171E33] border border-[#29324B] text-sm text-[#F8FAFC] focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="Website Design & Development">Website Design & Development</option>
              <option value="Business Websites & Landing Pages">Business Websites & Landing Pages</option>
              <option value="E-Commerce Storefront">E-Commerce Storefront</option>
              <option value="Full-Stack Web Application">Full-Stack Web Application</option>
              <option value="Website Maintenance & Performance">Website Maintenance & Performance</option>
              <option value="API & System Integration">API & System Integration</option>
              <option value="Other Custom Digital Solution">Other Custom Digital Solution</option>
            </select>
          </div>
          {fieldErrors.service && <p id="service-error" role="alert" className="text-xs text-red-400 mt-1.5">{fieldErrors.service}</p>}
        </div>

        <div>
          <label htmlFor="budget" className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
            Estimated Budget <span className="text-slate-400 text-[10px]">(Optional)</span>
          </label>
          <select
            id="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-[#171E33] border border-[#29324B] text-sm text-[#F8FAFC] focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">Select budget (optional)</option>
            <option value="Under ₹30,000 (< $400)">Under ₹30,000 (&lt; $400) — Landing / Starter</option>
            <option value="₹30,000 - ₹75,000 ($400 - $900)">₹30,000 - ₹75,000 ($400 - $900) — Standard Web</option>
            <option value="₹75,000 - ₹1,75,000 ($900 - $2,100)">₹75,000 - ₹1,75,000 ($900 - $2,100) — E-Commerce / Custom</option>
            <option value="₹1,75,000+ ($2,100+)">₹1,75,000+ ($2,100+) — Full-Stack Platform</option>
            <option value="Flexible / Request Quote">Flexible / Request Scoping Discussion</option>
          </select>
        </div>
      </div>

      {/* Row 4: Preferred Contact Method */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
          Preferred Contact Method <span className="text-blue-400">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(["WhatsApp", "Email", "Phone Call"] as PreferredContactMethod[]).map((method) => {
            const isSelected = formData.preferredContactMethod === method;
            return (
              <button
                key={method}
                type="button"
                onClick={() => setFormData({ ...formData, preferredContactMethod: method })}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? method === "WhatsApp"
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/40"
                      : "bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-950/40"
                    : "bg-[#171E33] border-[#29324B] text-slate-300 hover:text-white hover:border-slate-500"
                }`}
              >
                {method === "WhatsApp" && <WhatsApp className="w-4 h-4 text-emerald-400 shrink-0" />}
                {method === "Email" && <Mail className="w-4 h-4 text-blue-400 shrink-0" />}
                {method === "Phone Call" && <Phone className="w-4 h-4 text-purple-400 shrink-0" />}
                <span>{method}</span>
              </button>
            );
          })}
        </div>
        {fieldErrors.preferredContactMethod && (
          <p role="alert" className="text-xs text-red-400 mt-1.5">{fieldErrors.preferredContactMethod}</p>
        )}
      </div>

      {/* Row 5: Project Details */}
      <div>
        <label htmlFor="details" className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
          Project Details <span className="text-blue-400">*</span>
        </label>
        <div className="relative">
          <textarea
            id="details"
            rows={4}
            required
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            placeholder="Tell us what you are planning to build, target audience, key features, reference websites, or deadlines..."
            aria-invalid={!!fieldErrors.details}
            aria-describedby={fieldErrors.details ? "details-error" : undefined}
            className={`w-full p-4 rounded-xl bg-[#171E33] border text-sm text-[#F8FAFC] placeholder-slate-400 focus:outline-none transition-colors ${
              fieldErrors.details ? "border-red-500 focus:border-red-400" : "border-[#29324B] focus:border-blue-500"
            }`}
          />
        </div>
        {fieldErrors.details && <p id="details-error" role="alert" className="text-xs text-red-400 mt-1.5">{fieldErrors.details}</p>}
      </div>

      {/* Privacy Notice Card */}
      <div className="p-3.5 rounded-xl bg-[#171E33]/70 border border-[#29324B] text-xs text-slate-300 leading-relaxed">
        <span className="font-semibold text-slate-100">Privacy Notice: </span>
        The supplied details will be used solely by Webstix to respond to your project enquiry. We strictly respect your privacy and never share, sell, or disclose your contact details to third parties.
      </div>

      {/* Consent Checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            aria-invalid={!!fieldErrors.consent}
            aria-describedby={fieldErrors.consent ? "consent-error" : undefined}
            className="mt-1 w-4 h-4 rounded border-[#29324B] bg-[#171E33] text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
          />
          <span className="text-xs text-[#A7B0C4] group-hover:text-slate-300 transition-colors leading-relaxed">
            I consent to Webstix contacting me regarding this project enquiry via my preferred contact method.
          </span>
        </label>
        {fieldErrors.consent && <p id="consent-error" role="alert" className="text-xs text-red-400 mt-1.5">{fieldErrors.consent}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/30 hover:shadow-blue-700/40 transition-all duration-200"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending Enquiry to Webstix...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Submit Client Enquiry</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Direct CEO review • Prompt follow-up within 24-48 business hours</span>
      </div>
    </form>
  );
}
