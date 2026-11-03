import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Founder } from "@/lib/studio-config";
import { ArrowUpRight, CheckCircle, Terminal, Sparkles } from "lucide-react";
import { Github } from "@/components/Icons";

interface FounderCardProps {
  founder: Founder;
}

export function FounderCard({ founder }: FounderCardProps) {
  return (
    <div className="rounded-2xl bg-[#111832] border border-[#29324B] hover:border-blue-500/40 p-8 shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Header with Avatar / Initials */}
        <div className="flex items-center gap-5 mb-6">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] p-0.5 shadow-lg shadow-blue-950/50 shrink-0">
            <div className="w-full h-full rounded-2xl bg-[#0B1020] flex items-center justify-center overflow-hidden">
              {founder.avatarUrl ? (
                <Image
                  src={founder.avatarUrl}
                  alt={founder.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <span className="font-heading font-black text-xl text-white">
                  {founder.initials}
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/40 text-blue-300 text-xs font-bold mb-1.5 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>{founder.role}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{founder.name}</h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#A7B0C4]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Verified GitHub Contributor</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-[#A7B0C4] leading-relaxed mb-6">
          {founder.detailedBio || founder.shortBio}
        </p>

        {/* Technical Focus Badges */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Technical Focus</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {founder.technicalFocus.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-[#171E33] border border-[#29324B] text-xs font-medium text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Highlights */}
        {founder.keyHighlights && founder.keyHighlights.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
              <span>Verified Project Work</span>
            </h4>
            <ul className="space-y-2">
              {founder.keyHighlights.map((hl, idx) => (
                <li key={idx} className="text-xs text-[#A7B0C4] flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* GitHub Action */}
      <div className="pt-6 border-t border-[#29324B] flex items-center justify-between">
        <a
          href={founder.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#171E33] hover:bg-blue-600/20 border border-[#29324B] hover:border-blue-500/50 px-4 py-2.5 rounded-xl transition-colors"
        >
          <Github className="w-4 h-4 text-blue-400" />
          <span>github.com/{founder.githubUsername}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
        </a>

        <Link
          href={`/work?founder=${founder.githubUsername}`}
          className="text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline"
        >
          View Repositories →
        </Link>
      </div>
    </div>
  );
}
