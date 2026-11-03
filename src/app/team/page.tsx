import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { STUDIO_CONFIG } from "@/lib/studio-config";
import { FounderCard } from "@/components/FounderCard";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Leadership & Team",
  description:
    "Meet the CEOs and developers behind Webstix: Vinit Gohil and Riddhi Patthar. Discover their technical focus, engineering interests, and verified public GitHub projects.",
};

export default function TeamPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio CEOs</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Meet the Builders
          </h1>

          <p className="text-lg text-[#A7B0C4] leading-relaxed">
            Webstix is built and run directly by two active developers. Every project is scoped, coded, and tested by us.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111832] border border-[#29324B] text-xs text-[#A7B0C4]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified public GitHub identities & authentic open-source projects</span>
          </div>
        </div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {STUDIO_CONFIG.founders.map((f) => (
            <FounderCard key={f.id} founder={f} />
          ))}
        </div>

        {/* Working Collaboration Model */}
        <div className="rounded-2xl bg-[#111832] border border-[#29324B] p-8 sm:p-12 mb-20 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              How Our CEOs Collaborate on Your Project
            </h2>
            <p className="text-sm text-[#A7B0C4] leading-relaxed">
              We divide technical responsibilities based on our verified strengths while keeping code review and architecture completely unified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#171E33] border border-[#29324B]">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                Phase 1: Architecture & UX
              </div>
              <h3 className="text-base font-bold text-white mb-2">Joint Planning</h3>
              <p className="text-xs text-[#A7B0C4] leading-relaxed">
                Both CEOs review client specifications together, determining database schemas, component structures, and state management strategies.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#171E33] border border-[#29324B]">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
                Phase 2: Full-Stack Execution
              </div>
              <h3 className="text-base font-bold text-white mb-2">Specialized Implementation</h3>
              <p className="text-xs text-[#A7B0C4] leading-relaxed">
                Vinit leads backend systems, full-stack workflows, and e-commerce architectures, while Riddhi crafts interactive interfaces, real-time features, and responsive design systems.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#171E33] border border-[#29324B]">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                Phase 3: QA & Deployment
              </div>
              <h3 className="text-base font-bold text-white mb-2">Rigorous Peer Review</h3>
              <p className="text-xs text-[#A7B0C4] leading-relaxed">
                No code reaches staging or production without mutual pull-request reviews, cross-device testing, and performance validation.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to talk to the CEOs?
          </h2>
          <p className="text-sm text-[#A7B0C4] max-w-md mx-auto mb-8">
            Start a project inquiry or reach out to explore how we can build together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-base shadow-xl shadow-blue-900/30 transition-all"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
