import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Webstix studio terms of service and client project agreements.",
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#A7B0C4] hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <div className="rounded-2xl bg-[#111832] border border-[#29324B] p-8 sm:p-12 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Client Agreements</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
            Terms of Service
          </h1>

          <p className="text-sm text-[#A7B0C4] mb-8">
            Last Updated: October 31, 2026
          </p>

          <div className="space-y-6 text-sm text-[#A7B0C4] leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-white mb-2">1. Scope of Services</h2>
              <p>
                Webstix provides bespoke digital services including website design, web development, e-commerce implementation, full-stack applications, and technical maintenance. Specific deliverables, milestones, and timelines are formally defined in a project brief or proposal before commencement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">2. Client Cooperation & Materials</h2>
              <p>
                Successful software delivery relies on prompt communication. Clients agree to provide required assets (branding, copy, media, API access credentials) within mutually agreed schedules.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">3. Intellectual Property</h2>
              <p>
                Upon final invoice clearance, full ownership and rights to bespoke code, design assets, and custom deliverables created for the client are transferred to the client, excluding open-source libraries or studio reusable component utilities.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">4. Warranties & Code Quality</h2>
              <p>
                We build software adhering to modern standards, responsive design practices, and accessibility guidelines. All delivered work undergoes quality assurance prior to production launch. We do not provide open-ended warranties against third-party hosting outages, browser deprecations, or external API breaking changes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">5. Inquiries & Quotes</h2>
              <p>
                Submitting an inquiry through our contact form does not create a binding development contract. Legally binding agreements are executed upon mutual signature of a detailed project proposal.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">6. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
