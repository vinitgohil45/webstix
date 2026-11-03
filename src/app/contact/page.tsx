import React from "react";
import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Globe2,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { Github, WhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact & Project Inquiries",
  description:
    "Start a project inquiry with Webstix digital studio. Direct communication with CEOs Vinit Gohil and Riddhi Patthar for websites, e-commerce, and web applications.",
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct CEO Access</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Start a Project
          </h1>

          <p className="text-lg text-[#A7B0C4] leading-relaxed">
            Tell us about what you are planning. We review your scope, schedule a technical alignment discussion, and outline deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-8">
            <InquiryForm />
          </div>

          {/* Right Column: Studio Information & Direct Channels */}
          <div className="lg:col-span-4 space-y-6">
            {/* WhatsApp Fast Contact Card */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-950/40 via-[#111832] to-[#111832] border border-emerald-500/30 p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                  <WhatsApp className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Instant Messaging
                  </span>
                  <p className="text-sm font-semibold text-white mb-1.5 leading-snug">
                    Have a quick question? Text us on WhatsApp.
                  </p>
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    Direct line with our engineering team for instant project queries or rapid estimates.
                  </p>
                  <a
                    href="https://wa.me/919136730898"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-semibold shadow-lg shadow-emerald-900/30 hover:shadow-emerald-700/40 transition-all duration-200"
                  >
                    <WhatsApp className="w-4 h-4 text-white" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="rounded-2xl bg-[#111832] border border-[#29324B] p-6 shadow-xl space-y-4">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                What to Expect
              </h3>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-white">Prompt Review</div>
                  <p className="text-xs text-[#A7B0C4] mt-0.5 leading-relaxed">
                    We evaluate your inquiry and respond within 24 to 48 business hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-white">Zero Account Managers</div>
                  <p className="text-xs text-[#A7B0C4] mt-0.5 leading-relaxed">
                    You communicate directly with the developers writing your code.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-white">Domestic & Global Scope</div>
                  <p className="text-xs text-[#A7B0C4] mt-0.5 leading-relaxed">
                    Serving Indian startups and international businesses across various timezones.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="rounded-2xl bg-[#111832] border border-[#29324B] p-6 shadow-xl space-y-4">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Direct Channels
              </h3>

              <div className="space-y-3">
                <a
                  href="https://wa.me/919136730898"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#171E33] border border-emerald-500/30 hover:border-emerald-500 text-xs font-medium text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <WhatsApp className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp: +91 9136730898</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                </a>

                <a
                  href="mailto:hello.webstix@gmail.com"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#171E33] border border-[#29324B] hover:border-blue-500/50 text-xs font-medium text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>hello.webstix@gmail.com</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href="https://github.com/vinitgohil45"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#171E33] border border-[#29324B] hover:border-blue-500/50 text-xs font-medium text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-blue-400" />
                    <span>GitHub: vinitgohil45</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href="https://github.com/riddhipatthar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#171E33] border border-[#29324B] hover:border-purple-500/50 text-xs font-medium text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-purple-400" />
                    <span>GitHub: riddhipatthar</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Privacy notice */}
            <div className="p-4 rounded-xl bg-[#171E33]/60 border border-[#29324B] text-xs text-[#A7B0C4] leading-relaxed">
              <strong className="text-white font-medium">Privacy Commitment: </strong>
              The supplied details will be used solely to respond to your project enquiry. We respect your confidentiality and never share contact details.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
