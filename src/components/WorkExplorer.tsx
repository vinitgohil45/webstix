"use client";

import React, { useState, useMemo } from "react";
import { GitHubProject } from "@/lib/github";
import { ProjectCard } from "./ProjectCard";
import {
  Search,
  ArrowUpDown,
  RotateCcw,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

interface WorkExplorerProps {
  initialProjects: GitHubProject[];
  isFallback?: boolean;
  rateLimitNotice?: string;
}

export function WorkExplorer({
  initialProjects,
  isFallback = false,
  rateLimitNotice,
}: WorkExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFounder, setSelectedFounder] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"updated" | "stars" | "name">("updated");

  // Extract unique languages
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.language) langs.add(p.language);
    });
    return Array.from(langs).sort();
  }, [initialProjects]);

  // Extract unique categories
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats).sort();
  }, [initialProjects]);

  // Filtered & sorted collection
  const filteredProjects = useMemo(() => {
    return initialProjects
      .filter((project) => {
        // Search filter (name + description + topics)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const nameMatch = project.name.toLowerCase().includes(query);
          const descMatch = (project.description || "").toLowerCase().includes(query);
          const topicMatch = project.topics.some((t) => t.toLowerCase().includes(query));
          if (!nameMatch && !descMatch && !topicMatch) return false;
        }

        // Founder filter
        if (selectedFounder !== "all") {
          if (project.owner.login.toLowerCase() !== selectedFounder.toLowerCase()) {
            return false;
          }
        }

        // Language filter
        if (selectedLanguage !== "all") {
          if (project.language?.toLowerCase() !== selectedLanguage.toLowerCase()) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== "all") {
          if (project.category !== selectedCategory) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "stars") {
          return b.stargazers_count - a.stargazers_count;
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        // Default: updated
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
  }, [initialProjects, searchQuery, selectedFounder, selectedLanguage, selectedCategory, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedFounder !== "all" ||
    selectedLanguage !== "all" ||
    selectedCategory !== "all" ||
    sortBy !== "updated";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedFounder("all");
    setSelectedLanguage("all");
    setSelectedCategory("all");
    setSortBy("updated");
  };

  return (
    <div className="w-full">
      {/* Notice if using fallback snapshot or rate limited */}
      {(isFallback || rateLimitNotice) && (
        <div className="mb-8 p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3 text-sm text-[#A7B0C4]">
          <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold text-white">Live GitHub Cache Notice: </span>
            {rateLimitNotice || (
              <>
                Currently displaying verified repository snapshot. Public GitHub API rate limits are respected. You can also view live profiles directly at{" "}
                <a
                  href="https://github.com/vinitgohil45"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline font-medium hover:text-blue-300"
                >
                  github.com/vinitgohil45
                </a>{" "}
                and{" "}
                <a
                  href="https://github.com/riddhipatthar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 underline font-medium hover:text-purple-300"
                >
                  github.com/riddhipatthar
                </a>
                .
              </>
            )}
          </div>
        </div>
      )}

      {/* Control Bar: Search & Primary Filters */}
      <div className="rounded-2xl bg-[#111832] border border-[#29324B] p-5 mb-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name or keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#171E33] border border-[#29324B] text-sm text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              aria-label="Search repositories"
            />
          </div>

          {/* Founder Filter */}
          <div>
            <select
              value={selectedFounder}
              onChange={(e) => setSelectedFounder(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#171E33] border border-[#29324B] text-sm text-[#F8FAFC] focus:outline-none focus:border-blue-500 transition-colors"
              aria-label="Filter by Creator"
            >
              <option value="all">All Leadership (Combined Studio)</option>
              <option value="vinitgohil45">Vinit&apos;s Repositories</option>
              <option value="riddhipatthar">Riddhi&apos;s Repositories</option>
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#171E33] border border-[#29324B] text-sm text-[#F8FAFC] focus:outline-none focus:border-blue-500 transition-colors"
              aria-label="Filter by Language"
            >
              <option value="all">All Programming Languages</option>
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#171E33] border border-[#29324B] text-sm text-[#F8FAFC] focus:outline-none focus:border-blue-500 transition-colors"
              aria-label="Filter by Category"
            >
              <option value="all">All Project Categories</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lower Row: Sort & Clear Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#29324B]/60 text-xs">
          {/* Active project counter */}
          <div className="flex items-center gap-2 text-[#A7B0C4]">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>
              Showing <strong className="text-white font-semibold">{filteredProjects.length}</strong> of{" "}
              {initialProjects.length} verified public repositories
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-[#A7B0C4]">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "updated" | "stars" | "name")}
                className="bg-[#171E33] border border-[#29324B] text-xs text-[#F8FAFC] rounded-lg px-2.5 py-1 focus:outline-none focus:border-blue-500"
                aria-label="Sort repositories"
              >
                <option value="updated">Recently Updated</option>
                <option value="stars">Most Stars</option>
                <option value="name">Project Name (A-Z)</option>
              </select>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium px-2 py-1 rounded-lg hover:bg-[#171E33] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Project Cards */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        /* Empty Search State */
        <div className="text-center py-16 px-4 rounded-2xl bg-[#111832] border border-[#29324B]">
          <div className="w-12 h-12 rounded-2xl bg-[#171E33] border border-[#29324B] flex items-center justify-center mx-auto mb-4 text-[#A7B0C4]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No matching projects found</h3>
          <p className="text-sm text-[#A7B0C4] max-w-md mx-auto mb-6">
            Try adjusting your search keywords, clearing your language filters, or selecting &quot;All Leadership&quot;.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
