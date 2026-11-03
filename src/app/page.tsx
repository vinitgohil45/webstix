import React from "react";
import Link from "next/link";
import { getMergedPortfolio } from "@/lib/github";
import { STUDIO_CONFIG } from "@/lib/studio-config";
import { InteractiveShowcase } from "@/components/InteractiveShowcase";
import { ProjectCard } from "@/components/ProjectCard";
import { ProcessSection } from "@/components/ProcessSection";
import { FounderCard } from "@/components/FounderCard";
import {
  ArrowRight,
  Sparkles,
  Globe2,
  ShieldCheck,
  Check
} from "lucide-react";

export default async function HomePage() {
  const portfolioData = await getMergedPortfolio();
  
  // Pick strongest featured projects from both founders
  const featuredProjects = portfolioData.projects
    .filter((p) => p.featured)
    .slice(0, 6);

  // If less than 6 featured, backfill with top updated
  const displayProjects =
    featuredProjects.length >= 4
      ? featuredProjects
      : portfolioData.projects.slice(0, 6);

  return (
    <div className="relative overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Subtle background ambient lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/15 via-purple-600/10 to-indigo-600/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111832] border border-[#29324B] shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
              {STUDIO_CONFIG.brand.eyebrow}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#F8FAFC] tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
            Websites Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#7C3AED]">
              What&apos;s Next.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-[#A7B0C4] max-w-2xl mx-auto leading-relaxed mb-10">
            {STUDIO_CONFIG.brand.heroSupporting}
          </p>

          {/* Call-to-actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-900/40 hover:shadow-blue-700/50 transition-all duration-200 group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-[#F8FAFC] bg-[#111832] hover:bg-[#171E33] border border-[#29324B] hover:border-blue-500/40 transition-colors"
            >
              <span>Explore Our Work</span>
            </Link>
          </div>

          {/* Geographic focus note */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#A7B0C4]">
            <Globe2 className="w-4 h-4 text-blue-400" />
            <span>Welcoming clients from India and internationally</span>
          </div>

          {/* Hero Interactive Project Showcase */}
          <InteractiveShowcase />
        </div>
      </section>

      {/* 2. TRUST & CAPABILITIES STRIP */}
      <section className="relative py-12 bg-[#0B1020] border-y border-[#29324B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Verified Technical Core & Architecture
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { label: "Full-Stack Web Apps", tech: "React & Next.js" },
              { label: "E-Commerce Stores", tech: "TypeScript & APIs" },
              { label: "Real-Time Sockets", tech: "Socket.IO & Node" },
              { label: "Responsive Design", tech: "Tailwind CSS & UX" },
              { label: "Backend Systems", tech: "Node.js & MongoDB" },
              { label: "Database Architectures", tech: "Java & SQL" },
            ].map((cap, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#111832] border border-[#29324B] flex flex-col items-center justify-center"
              >
                <div className="text-xs font-semibold text-white mb-0.5">{cap.label}</div>
                <div className="text-[11px] text-blue-400 font-mono">{cap.tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED WORK */}
      <section className="relative py-24 bg-[#0B1020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Featured Repositories
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Authentic Work. Public Repositories.
              </h2>
              <p className="mt-2 text-[#A7B0C4] text-base max-w-xl">
                Every project shown is backed by public source code on GitHub created by Vinit Gohil or Riddhi Patthar.
              </p>
            </div>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
            >
              <span>View All {portfolioData.totalCount} Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#171E33] hover:bg-blue-600/20 border border-[#29324B] hover:border-blue-500/50 text-white text-sm font-semibold transition-all"
            >
              <span>Explore the Complete Project Explorer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SERVICES PREVIEW */}
      <section className="relative py-24 bg-[#111832] border-t border-[#29324B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Studio Offerings
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Services Tailored to Your Growth
            </h2>
            <p className="mt-3 text-[#A7B0C4] text-base">
              From high-conversion landing pages to custom full-stack web applications, we build solutions engineered to last.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STUDIO_CONFIG.services.map((svc) => (
              <div
                key={svc.id}
                className="rounded-2xl bg-[#171E33] border border-[#29324B] hover:border-blue-500/40 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/40 hover:-translate-y-1"
              >
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-[#111832] border border-[#29324B] text-xs font-semibold text-blue-400 mb-4">
                    {svc.badge}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{svc.title}</h3>
                  <p className="text-sm text-[#A7B0C4] leading-relaxed mb-6">
                    {svc.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Key Deliverables:
                    </div>
                    {svc.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#A7B0C4]">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#29324B]/70 flex items-center justify-between">
                  <Link
                    href={`/services#${svc.id}`}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/contact?service=${encodeURIComponent(svc.title)}`}
                    className="text-xs font-medium text-slate-300 hover:text-white bg-[#111832] px-3 py-1.5 rounded-lg border border-[#29324B] hover:border-blue-500/40 transition-colors"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Explore all service specifications and workflows</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY WEBSTIX — 2-FOUNDER STUDIO ADVANTAGE */}
      <section className="relative py-24 bg-[#0B1020] border-t border-[#29324B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
                The Webstix Advantage
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Why Work With an Independent Studio?
              </h2>
              <p className="text-base text-[#A7B0C4] leading-relaxed mb-6">
                When you hire Webstix, you collaborate directly with the two builders executing your project. No layers of non-technical middlemen, no lost context, and total transparency from the first commit to launch.
              </p>
              <div className="p-4 rounded-xl bg-[#111832] border border-[#29324B]">
                <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Real Technical Attribution</span>
                </div>
                <p className="text-xs text-[#A7B0C4] leading-relaxed">
                  We showcase our genuine technical capabilities through open-source repositories and live deployments. What we offer is what we can reliably deliver.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {STUDIO_CONFIG.principles.map((pr, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#111832] border border-[#29324B] p-6 hover:border-blue-500/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-xs font-bold mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{pr.title}</h3>
                  <p className="text-xs text-[#A7B0C4] leading-relaxed">
                    {pr.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROCESS SECTION */}
      <ProcessSection />

      {/* 7. FOUNDER PREVIEW */}
      <section className="relative py-24 bg-[#111832] border-t border-[#29324B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
              The Builders
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Meet the CEOs Behind Webstix
            </h2>
            <p className="mt-3 text-[#A7B0C4] text-base">
              Two passionate developers uniting frontend excellence, real-time architectures, and robust full-stack engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {STUDIO_CONFIG.founders.map((f) => (
              <FounderCard key={f.id} founder={f} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Learn more about our background and developer philosophies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="relative py-24 bg-[#0B1020] border-t border-[#29324B] overflow-hidden text-center">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-purple-600/10 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for What&apos;s Next?</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Have an idea? Let&apos;s build what&apos;s next.
          </h2>

          <p className="text-base sm:text-lg text-[#A7B0C4] max-w-xl mx-auto mb-10 leading-relaxed">
            Tell us what you are planning, and let&apos;s explore how Webstix can help turn your product concept into a high-performing digital reality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-900/40 transition-all duration-200"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-[#111832] hover:bg-[#171E33] border border-[#29324B] hover:border-blue-500/40 transition-colors"
            >
              <span>Explore Our Work</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
