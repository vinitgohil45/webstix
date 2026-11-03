import React from "react";
import Link from "next/link";
import { GitHubProject } from "@/lib/github";
import {
  ExternalLink,
  Star,
  Calendar,
  Layers,
  ArrowRight,
  Code2,
  ShoppingBag,
  Tv,
  Globe,
  Wrench
} from "lucide-react";
import { Github } from "@/components/Icons";

interface ProjectCardProps {
  project: GitHubProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Category icon mapping
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "E-commerce":
        return <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />;
      case "Real-time & Media":
        return <Tv className="w-3.5 h-3.5 text-purple-400" />;
      case "Full-Stack App":
        return <Layers className="w-3.5 h-3.5 text-indigo-400" />;
      case "Business & Landing":
        return <Globe className="w-3.5 h-3.5 text-cyan-400" />;
      case "Utility & Tool":
        return <Wrench className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Code2 className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  // Language color dot mapping
  const getLanguageColor = (lang: string | null) => {
    switch (lang?.toLowerCase()) {
      case "typescript":
        return "bg-blue-400";
      case "javascript":
        return "bg-yellow-400";
      case "python":
        return "bg-emerald-400";
      case "java":
        return "bg-orange-500";
      case "html":
        return "bg-red-400";
      case "css":
        return "bg-indigo-400";
      default:
        return "bg-slate-400";
    }
  };

  const formattedDate = new Date(project.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#171E33] border border-[#29324B] hover:border-blue-500/40 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/40 hover:-translate-y-1">
      {/* Subtle top glow highlight */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Header: Category Badge & Owner Attribution */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#111832] border border-[#29324B] text-xs font-medium text-[#F8FAFC]">
            {getCategoryIcon(project.category)}
            <span>{project.category}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#A7B0C4] bg-[#0B1020]/60 px-2 py-0.5 rounded-full border border-[#29324B]/50">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>{project.owner.founderName}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#F8FAFC] tracking-tight group-hover:text-blue-400 transition-colors mb-2.5">
          <Link href={`/work/${project.owner.login}/${project.name}`} className="hover:underline focus:outline-none">
            {project.name}
          </Link>
        </h3>

        {/* Verified Description */}
        <p className="text-sm text-[#A7B0C4] line-clamp-3 leading-relaxed mb-5 min-h-[4rem]">
          {project.description || "Public repository developed and verified on GitHub by " + project.owner.founderName + "."}
        </p>

        {/* Visual Identity Graphic (Tasteful geometric vector art indicating project type, not fake UI) */}
        <div className="relative w-full h-32 rounded-xl mb-5 overflow-hidden bg-gradient-to-br from-[#111832] to-[#0B1020] border border-[#29324B]/70 flex items-center justify-center p-4">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(#29324B 1px, transparent 1px), linear-gradient(to right, #29324B 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Central graphic element */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 border border-blue-500/30 flex items-center justify-center mb-2 shadow-inner">
              {getCategoryIcon(project.category)}
            </div>
            <span className="text-xs font-mono font-medium text-slate-300 tracking-wider uppercase">
              {project.language || "Code Repository"}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              github.com/{project.owner.login}
            </span>
          </div>

          {/* Verified live demo badge if applicable */}
          {project.verifiedDemo && (
            <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Demo
            </div>
          )}
        </div>

        {/* Metadata Strip: Language, Stars, Updated */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#A7B0C4] pb-4 border-b border-[#29324B]/60">
          {project.language && (
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${getLanguageColor(project.language)}`} />
              <span className="font-medium text-slate-200">{project.language}</span>
            </div>
          )}

          {project.stargazers_count > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{project.stargazers_count}</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-[11px] text-slate-400 ml-auto">
            <Calendar className="w-3 h-3" />
            <span>Updated {formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Actions footer */}
      <div className="pt-4 flex items-center justify-between gap-2">
        <Link
          href={`/work/${project.owner.login}/${project.name}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F8FAFC] hover:text-blue-400 transition-colors group/link"
        >
          <span>View Project</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>

        <div className="flex items-center gap-2">
          {project.homepage && project.verifiedDemo && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#111832] hover:bg-blue-600/20 border border-[#29324B] hover:border-blue-500/50 text-[#A7B0C4] hover:text-blue-300 transition-colors"
              title="Open Verified Live Demo"
              aria-label={`Open Live Demo for ${project.name}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#111832] hover:bg-purple-600/20 border border-[#29324B] hover:border-purple-500/50 text-[#A7B0C4] hover:text-purple-300 transition-colors"
            title="Open GitHub Repository"
            aria-label={`Open GitHub Repository for ${project.name}`}
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
