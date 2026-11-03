import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { STUDIO_CONFIG } from "@/lib/studio-config";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Code,
  Check
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Digital Solutions",
  description:
    "Explore Webstix engineering services: custom web design, full-stack web applications, e-commerce storefronts, and performance optimization for businesses in India and internationally.",
};

export default function ServicesPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Studio Capabilities</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Services & Solutions
          </h1>

          <p className="text-lg text-[#A7B0C4] leading-relaxed">
            We provide targeted web design and development services built on modern, maintainable technology. Direct collaboration with the developers who write the code.
          </p>
        </div>

        {/* Detailed Service Cards */}
        <div className="space-y-16">
          {STUDIO_CONFIG.services.map((svc, index) => (
            <div
              key={svc.id}
              id={svc.id}
              className="scroll-mt-28 rounded-2xl bg-[#111832] border border-[#29324B] p-8 sm:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Overview, Problem & Solution */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-[#171E33] border border-[#29324B] text-xs font-semibold text-blue-400">
                      {svc.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">0{index + 1}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {svc.title}
                  </h2>

                  <p className="text-base text-[#A7B0C4] leading-relaxed">
                    {svc.shortDescription}
                  </p>

                  {/* Problem & Solution block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-[#171E33] border border-[#29324B]/80">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>The Challenge</span>
                      </div>
                      <p className="text-xs text-[#A7B0C4] leading-relaxed">
                        {svc.clientProblem}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#171E33] border border-[#29324B]/80">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Our Solution</span>
                      </div>
                      <p className="text-xs text-[#A7B0C4] leading-relaxed">
                        {svc.proposedSolution}
                      </p>
                    </div>
                  </div>

                  {/* Featured Project Demonstration */}
                  {svc.featuredProject && (
                    <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-start gap-3">
                      <Code className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white mb-0.5">
                          Verified Studio Reference:{" "}
                          <Link
                            href={`/work/${svc.featuredProject.owner}/${svc.featuredProject.repo}`}
                            className="text-blue-400 underline hover:text-blue-300"
                          >
                            {svc.featuredProject.name}
                          </Link>
                        </div>
                        <p className="text-xs text-[#A7B0C4] leading-relaxed">
                          {svc.featuredProject.note}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Deliverables, Workflow, CTA */}
                <div className="lg:col-span-5 space-y-6 lg:pl-6 lg:border-l lg:border-[#29324B]">
                  {/* Deliverables */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
                      What We Deliver
                    </h3>
                    <ul className="space-y-2">
                      {svc.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-[#A7B0C4]">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Workflow */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
                      Typical Project Workflow
                    </h3>
                    <div className="space-y-2">
                      {svc.workflow.map((wf, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#A7B0C4]">
                          <span className="w-5 h-5 rounded-full bg-[#171E33] border border-[#29324B] flex items-center justify-center font-mono text-[10px] text-blue-400 shrink-0">
                            {idx + 1}
                          </span>
                          <span>{wf}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack pills */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                      Core Technologies
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {svc.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md bg-[#171E33] border border-[#29324B] text-[11px] font-medium text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-4 border-t border-[#29324B]">
                    <Link
                      href={`/contact?service=${encodeURIComponent(svc.title)}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-md transition-all"
                    >
                      <span>Request a Quote for {svc.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
