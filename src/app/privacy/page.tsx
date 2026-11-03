import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Webstix Privacy Policy and data handling standards.",
};

export default function PrivacyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
            Privacy Policy
          </h1>

          <p className="text-sm text-[#A7B0C4] mb-8">
            Last Updated: October 31, 2026
          </p>

          <div className="space-y-6 text-sm text-[#A7B0C4] leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-white mb-2">1. Introduction</h2>
              <p>
                Webstix (&quot;we&quot;, &quot;our&quot;, or &quot;the studio&quot;) is an independent digital studio founded by Vinit Gohil and Riddhi Patthar. We are committed to protecting your privacy and treating all personal details with integrity and care.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">2. Information We Collect</h2>
              <p>
                We only collect information that you knowingly and voluntarily provide through our project inquiry form:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                <li>Your name and contact email address</li>
                <li>Your company or brand name (optional)</li>
                <li>Your country / geographical region</li>
                <li>Project scope, budget range, target timeline, and requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">3. How We Use Your Information</h2>
              <p>
                Any information submitted to Webstix is used strictly for evaluating project scope, scheduling discussions, communicating milestone updates, and delivering software services. We do not sell, rent, or trade client information to advertisers or brokers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">4. Public GitHub Repositories</h2>
              <p>
                Our portfolio displays public data retrieved from the official GitHub REST API for public profiles. We never display or access private client code, private repositories, or non-public developer credentials.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">5. Data Security</h2>
              <p>
                We implement industry-standard encryption (HTTPS / TLS) for all traffic. Server-side secrets and tokens are securely managed via environment variables and are never transmitted to client browsers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">6. Contacting Us</h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to have your submitted inquiry data purged from our logs, please contact us directly via our{" "}
                <Link href="/contact" className="text-blue-400 underline hover:text-blue-300">
                  inquiry channel
                </Link>{" "}
                or reach out to our leadership on GitHub.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
