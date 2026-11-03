import React from "react";
import type { Metadata } from "next";
import { getMergedPortfolio } from "@/lib/github";
import { WorkExplorer } from "@/components/WorkExplorer";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Work & Projects",
  description:
    "Explore the complete portfolio of public repositories, web applications, e-commerce storefronts, and digital experiments built by Webstix founders Vinit Gohil and Riddhi Patthar.",
};

export default async function WorkPage() {
  const portfolio = await getMergedPortfolio();

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Source & Production Repositories</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Our Work
          </h1>

          <p className="text-lg text-[#A7B0C4] leading-relaxed">
            Explore the projects, experiments, and digital products we&apos;ve built.
            Every project below represents verified public work directly accessible on GitHub.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-[#A7B0C4]">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111832] border border-[#29324B]">
              <strong className="text-white font-semibold">{portfolio.founders.vinitCount}</strong> Vinit&apos;s Repos
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111832] border border-[#29324B]">
              <strong className="text-white font-semibold">{portfolio.founders.riddhiCount}</strong> Riddhi&apos;s Repos
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111832] border border-[#29324B]">
              <strong className="text-white font-semibold">{portfolio.totalCount}</strong> Total Studio Projects
            </span>
          </div>
        </div>

        {/* Interactive Explorer with Filters, Search & Sort */}
        <WorkExplorer
          initialProjects={portfolio.projects}
          isFallback={portfolio.isFallback}
        />

        {/* Bottom Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#111832] via-[#171E33] to-[#111832] border border-[#29324B] text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Looking for a custom solution?
          </h2>
          <p className="text-sm text-[#A7B0C4] max-w-xl mx-auto mb-6">
            We adapt our engineering skills to your specific business requirements, from e-commerce to custom web tools.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-blue-900/30 transition-all"
          >
            <span>Discuss Your Project With Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
