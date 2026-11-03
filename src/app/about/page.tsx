import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ProcessSection } from "@/components/ProcessSection";
import {
  Sparkles,
  ArrowRight,
  Compass,
  Cpu,
} from "lucide-react";
import { Github } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About Webstix",
  description:
    "Learn about Webstix, an independent digital studio founded by Vinit Gohil and Riddhi Patthar. Small team. Thoughtful work. Big ideas.",
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Story</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Small team. Thoughtful work. Big ideas.
          </h1>

          <p className="text-lg text-[#A7B0C4] leading-relaxed">
            Webstix was founded by two builders, Vinit Gohil and Riddhi Patthar, who believe that digital products should be engineered with intention, transparency, and pride in craft.
          </p>
        </div>

        {/* Narrative / Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="rounded-2xl bg-[#111832] border border-[#29324B] p-8 sm:p-10 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-6">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-sm text-[#A7B0C4] leading-relaxed mb-4">
              To help startups, small and medium businesses, and founders build digital products that are not just visually engaging, but fundamentally sound under the hood.
            </p>
            <p className="text-sm text-[#A7B0C4] leading-relaxed">
              We eliminate the traditional bloat of agencies: clients talk directly with the developers who architect the codebase, write the components, and deploy the application.
            </p>
          </div>

          <div className="rounded-2xl bg-[#111832] border border-[#29324B] p-8 sm:p-10 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-6">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Philosophy</h2>
            <p className="text-sm text-[#A7B0C4] leading-relaxed mb-4">
              Great software isn&apos;t built on hollow marketing promises; it is proven through working code. That is why our website links directly to our public GitHub profiles and live deployed projects.
            </p>
            <p className="text-sm text-[#A7B0C4] leading-relaxed">
              Whether building an e-commerce storefront like Aavira Clothing, a full-stack platform like CraveGo, or a real-time collaborative streaming tool, we focus on performance, accessibility, and clean architecture.
            </p>
          </div>
        </div>

        {/* Studio Values */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Values We Code By
            </h2>
            <p className="mt-2 text-sm text-[#A7B0C4]">
              How we approach every project, client relationship, and technical decision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Code Integrity",
                desc: "We write clean, strictly-typed TypeScript and maintainable structures that clients can understand and evolve.",
              },
              {
                title: "Honest Scoping",
                desc: "No exaggerated timelines or artificial guarantees. We outline realistic milestones and deliver on what we promise.",
              },
              {
                title: "Performance by Default",
                desc: "Fast load times, responsive breakpoints from 320px up, and optimal search engine crawlability are foundational.",
              },
              {
                title: "Collaborative Mindset",
                desc: "We treat your project as a genuine partnership, offering thoughtful architectural advice at every step.",
              },
            ].map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#111832] border border-[#29324B] hover:border-blue-500/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-xs font-bold mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{val.title}</h3>
                <p className="text-xs text-[#A7B0C4] leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Two Builders */}
        <div className="rounded-2xl bg-[#111832] border border-[#29324B] p-8 sm:p-12 mb-20 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              The Two Collaborators
            </h2>
            <p className="text-sm text-[#A7B0C4]">
              Webstix is built on the shared skills and vision of Vinit Gohil and Riddhi Patthar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-[#171E33] border border-[#29324B]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-blue-500/40 shrink-0">
                    <Image
                      src="/images/vinit.jpg"
                      alt="Vinit Gohil"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Vinit Gohil</h3>
                    <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">CEO</p>
                  </div>
                </div>
                <a
                  href="https://github.com/vinitgohil45"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#111832] hover:bg-blue-600/20 text-[#A7B0C4] hover:text-white transition-colors"
                  aria-label="Vinit Gohil GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-[#A7B0C4] leading-relaxed mb-4">
                Pursuing Bachelor of Science in Information Technology with deep experience in full-stack web applications, e-commerce architectures, and backend API engineering.
              </p>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-[#111832] text-slate-300 border border-[#29324B]">TypeScript</span>
                <span className="px-2 py-0.5 rounded bg-[#111832] text-slate-300 border border-[#29324B]">Next.js</span>
                <span className="px-2 py-0.5 rounded bg-[#111832] text-slate-300 border border-[#29324B]">E-Commerce</span>
                <span className="px-2 py-0.5 rounded bg-[#111832] text-slate-300 border border-[#29324B]">Java</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#171E33] border border-[#29324B]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-purple-500/40 shrink-0">
                    <Image
                      src="/images/riddhi.jpg"
                      alt="Riddhi Patthar"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Riddhi Patthar</h3>
                    <p className="text-xs text-purple-400 font-bold uppercase tracking-wider">CEO</p>
                  </div>
                </div>
                <a
                  href="https://github.com/riddhipatthar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#111832] hover:bg-purple-600/20 text-[#A7B0C4] hover:text-white transition-colors"
                  aria-label="Riddhi Patthar GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-[#A7B0C4] leading-relaxed mb-4">
                Developer with focus on real-time web applications, interactive frontend architectures (Socket.IO, React, TypeScript), and accessible digital experiences.
              </p>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-[#111832] text-slate-300 border border-[#29324B]">React</span>
                <span className="px-2 py-0.5 rounded bg-[#111832] text-slate-300 border border-[#29324B]">TypeScript</span>
                <span className="px-2 py-0.5 rounded bg-[#111832] text-slate-300 border border-[#29324B]">Socket.IO</span>
                <span className="px-2 py-0.5 rounded bg-[#111832] text-slate-300 border border-[#29324B]">MongoDB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Process */}
        <ProcessSection />

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Want to collaborate on your next digital product?
          </h2>
          <p className="text-sm text-[#A7B0C4] max-w-xl mx-auto mb-8">
            Tell us about your project vision, target timeline, and goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-base shadow-xl shadow-blue-900/30 transition-all"
          >
            <span>Start a Project Discussion</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
