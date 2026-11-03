import React from "react";
import { STUDIO_CONFIG } from "@/lib/studio-config";
import { Compass, PenTool, Terminal, ShieldCheck, Rocket } from "lucide-react";

export function ProcessSection() {
  const stepIcons = [
    <Compass key="1" className="w-5 h-5 text-blue-400" />,
    <PenTool key="2" className="w-5 h-5 text-indigo-400" />,
    <Terminal key="3" className="w-5 h-5 text-purple-400" />,
    <ShieldCheck key="4" className="w-5 h-5 text-cyan-400" />,
    <Rocket key="5" className="w-5 h-5 text-pink-400" />,
  ];

  return (
    <section className="relative py-20 bg-[#0B1020]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            How We Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            From Concept to Production in 5 Clear Steps
          </h2>
          <p className="mt-3 text-[#A7B0C4] text-base">
            A straightforward, milestone-driven development process with zero black boxes and direct developer access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {STUDIO_CONFIG.process.map((step, idx) => (
            <div
              key={step.step}
              className="group relative rounded-2xl bg-[#111832] border border-[#29324B] hover:border-blue-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/40 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-500">
                    {step.step}
                  </span>
                  <div className="p-2 rounded-xl bg-[#171E33] border border-[#29324B]">
                    {stepIcons[idx]}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {step.name}
                </h3>

                <p className="text-xs text-[#A7B0C4] leading-relaxed">
                  {step.summary}
                </p>
              </div>

              {idx < STUDIO_CONFIG.process.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#29324B]">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
