import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMergedPortfolio, getProjectReadme, VERIFIED_REPOSITORIES_SNAPSHOT } from "@/lib/github";
import {
  ExternalLink,
  ArrowLeft,
  Calendar,
  Layers,
  Code2,
  FileText,
  UserCheck
} from "lucide-react";
import { Github } from "@/components/Icons";

interface PageProps {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
}

export function generateStaticParams() {
  return VERIFIED_REPOSITORIES_SNAPSHOT.map((p) => ({
    owner: p.owner.login,
    repo: p.name,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { owner, repo } = await params;
  const portfolio = await getMergedPortfolio();
  const project = portfolio.projects.find(
    (p) =>
      p.owner.login.toLowerCase() === owner.toLowerCase() &&
      p.name.toLowerCase() === repo.toLowerCase()
  );

  if (!project) {
    return {
      title: `${repo} | Webstix Project`,
      description: `Project repository by ${owner}`,
    };
  }

  return {
    title: `${project.name} — By ${project.owner.founderName}`,
    description:
      project.description ||
      `Verified public repository ${project.name} by Webstix developer ${project.owner.founderName}.`,
    openGraph: {
      title: `${project.name} | Webstix Portfolio`,
      description: project.description || `Public project by ${project.owner.founderName}`,
    },
  };
}

// Simple safe markdown block renderer (does not use unsafe raw HTML execution)
function SafeMarkdownViewer({ content }: { content: string }) {
  // Strip dangerous html script tags if any
  const sanitized = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");

  const lines = sanitized.split("\n");

  return (
    <div className="space-y-3 font-sans text-sm text-[#A7B0C4] leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Empty lines
        if (!trimmed) {
          return <div key={idx} className="h-2" />;
        }

        // H1
        if (trimmed.startsWith("# ")) {
          return (
            <h1 key={idx} className="text-2xl sm:text-3xl font-extrabold text-white pt-4 pb-2 border-b border-[#29324B]">
              {trimmed.substring(2)}
            </h1>
          );
        }

        // H2
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={idx} className="text-xl font-bold text-white pt-3 pb-1 border-b border-[#29324B]/60">
              {trimmed.substring(3)}
            </h2>
          );
        }

        // H3
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={idx} className="text-lg font-semibold text-white pt-2">
              {trimmed.substring(4)}
            </h3>
          );
        }

        // Unordered list item
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-2 ml-4">
              <span className="text-blue-400 mt-1">•</span>
              <span>{trimmed.substring(2)}</span>
            </div>
          );
        }

        // Code block marker
        if (trimmed.startsWith("```")) {
          return (
            <div key={idx} className="p-1 text-[11px] font-mono text-slate-400 bg-[#0B1020] rounded border border-[#29324B]/60">
              {trimmed}
            </div>
          );
        }

        // Regular paragraph text
        return <p key={idx}>{line}</p>;
      })}
    </div>
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { owner, repo } = await params;
  const portfolio = await getMergedPortfolio();

  const project = portfolio.projects.find(
    (p) =>
      p.owner.login.toLowerCase() === owner.toLowerCase() &&
      p.name.toLowerCase() === repo.toLowerCase()
  );

  if (!project) {
    notFound();
  }

  const readme = await getProjectReadme(owner, repo);

  const formattedDate = new Date(project.updated_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-[#A7B0C4] hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Projects</span>
        </Link>

        {/* Project Header Card */}
        <div className="rounded-2xl bg-[#111832] border border-[#29324B] p-6 sm:p-10 mb-10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#171E33] border border-[#29324B] text-xs font-semibold text-blue-400">
              <Layers className="w-3.5 h-3.5" />
              <span>{project.category}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#A7B0C4]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Last Updated: {formattedDate}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {project.name}
          </h1>

          <p className="text-base sm:text-lg text-[#A7B0C4] leading-relaxed mb-8 max-w-3xl">
            {project.description ||
              `Public repository maintained on GitHub by ${project.owner.founderName}.`}
          </p>

          {/* Action CTAs: Live Demo & GitHub */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#29324B]">
            {project.homepage && project.verifiedDemo && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-blue-900/40 transition-all"
              >
                <span>Open Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#171E33] hover:bg-[#1E2742] border border-[#29324B] hover:border-blue-500/50 text-white font-semibold text-sm transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View Source on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* 2-Column Grid: Sidebar Info & README Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column: README Preview */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-[#111832] border border-[#29324B] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-[#29324B]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-white text-sm">Repository README</span>
                </div>
                {readme.isFallback && (
                  <span className="text-[11px] text-slate-400 font-mono">
                    (Verified Metadata View)
                  </span>
                )}
              </div>

              {/* Rendered README */}
              <div className="bg-[#0B1020]/60 rounded-xl p-6 border border-[#29324B]/60 overflow-x-auto">
                <SafeMarkdownViewer content={readme.content} />
              </div>
            </div>
          </div>

          {/* Sidebar Column: Metadata & Creator info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Author Attribution Card */}
            <div className="rounded-2xl bg-[#111832] border border-[#29324B] p-6 shadow-xl">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Repository Author</span>
              </h3>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#171E33] border border-[#29324B] flex items-center justify-center font-bold text-white text-lg">
                  {project.owner.founderName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-bold text-white text-base">
                    {project.owner.founderName}
                  </div>
                  <div className="text-xs text-blue-400 font-medium">Webstix Studio Developer</div>
                </div>
              </div>

              <a
                href={project.owner.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-medium text-white bg-[#171E33] hover:bg-blue-600/20 border border-[#29324B] py-2.5 rounded-xl transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Visit {project.owner.login} on GitHub</span>
              </a>
            </div>

            {/* Technical Specifications */}
            <div className="rounded-2xl bg-[#111832] border border-[#29324B] p-6 shadow-xl">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span>Technical Specifications</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-[#29324B]/60">
                  <span className="text-[#A7B0C4]">Primary Language</span>
                  <span className="font-semibold text-white">{project.language || "N/A"}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#29324B]/60">
                  <span className="text-[#A7B0C4]">Default Branch</span>
                  <span className="font-mono text-slate-300">{project.default_branch}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#29324B]/60">
                  <span className="text-[#A7B0C4]">Stars</span>
                  <span className="font-semibold text-white">{project.stargazers_count}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#29324B]/60">
                  <span className="text-[#A7B0C4]">Forks</span>
                  <span className="font-semibold text-white">{project.forks_count}</span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#A7B0C4]">License</span>
                  <span className="text-slate-300">{project.license || "Open Source"}</span>
                </div>
              </div>

              {project.topics && project.topics.length > 0 && (
                <div className="pt-4 mt-4 border-t border-[#29324B]/60">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Topic Tags
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.topics.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-[#171E33] text-[11px] text-slate-300 border border-[#29324B]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
