"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  ShoppingBag,
  Tv,
  Layers,
  Sparkles,
  Lock,
  RefreshCw,
  Play,
  Pause,
  MessageSquare,
  Users,
  ShieldCheck,
} from "lucide-react";
import { Github } from "./Icons";

interface ShowcaseProject {
  id: string;
  name: string;
  category: string;
  author: string;
  authorRole: string;
  url: string;
  liveUrl: string | null;
  githubUrl: string;
  repoDetailUrl: string;
  headline: string;
  description: string;
  tags: string[];
  type: "ecommerce" | "video" | "food" | "pharma";
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "aavira",
    name: "Aavira Clothing",
    category: "E-Commerce Storefront",
    author: "Vinit Gohil",
    authorRole: "CEO & Full-Stack Developer",
    url: "aavira-clothing.vercel.app",
    liveUrl: "https://aavira-clothing.vercel.app",
    githubUrl: "https://github.com/vinitgohil45/aavira-clothing",
    repoDetailUrl: "/work/vinitgohil45/aavira-clothing",
    headline: "Modern Minimalist Fashion E-Commerce",
    description: "Production web storefront featuring dynamic product collections, responsive shopping bag drawer, and seamless purchase flows.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "REST APIs"],
    type: "ecommerce",
  },
  {
    id: "sync-video",
    name: "Synchronized Video",
    category: "Real-Time Streaming & Chat",
    author: "Riddhi Patthar",
    authorRole: "CEO & Developer",
    url: "synchronized-video-streaming-web-ap.vercel.app",
    liveUrl: "https://synchronized-video-streaming-web-ap.vercel.app",
    githubUrl: "https://github.com/riddhipatthar/Synchronized-video-streaming-web-application",
    repoDetailUrl: "/work/riddhipatthar/Synchronized-video-streaming-web-application",
    headline: "Collaborative Real-Time Watch Rooms",
    description: "Multi-user synchronized media player with millisecond room synchronization, live message streams, and viewer presence powered by Socket.IO.",
    tags: ["TypeScript", "React", "Socket.IO", "Node.js", "MongoDB"],
    type: "video",
  },
  {
    id: "cravego",
    name: "CraveGo Food Platform",
    category: "Full-Stack Web Application",
    author: "Vinit Gohil",
    authorRole: "CEO & Full-Stack Developer",
    url: "github.com/vinitgohil45/Food-Delivery-app",
    liveUrl: null,
    githubUrl: "https://github.com/vinitgohil45/Food-Delivery-app",
    repoDetailUrl: "/work/vinitgohil45/Food-Delivery-app",
    headline: "End-to-End Restaurant Ordering System",
    description: "Full-stack food ordering platform with restaurant discovery, cart management, user authentication, and multi-stage delivery tracking.",
    tags: ["JavaScript", "React", "Node.js", "Express", "Authentication"],
    type: "food",
  },
];

export function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<string>("aavira");
  const [cartCount, setCartCount] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const current = SHOWCASE_PROJECTS.find((p) => p.id === activeTab) || SHOWCASE_PROJECTS[0];

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10">
      {/* Background ambient glowing nebula */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-purple-600/20 blur-3xl rounded-full pointer-events-none" />

      {/* Tab Switcher */}
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#111832]/90 border border-[#29324B] max-w-2xl mx-auto mb-6 backdrop-blur-md shadow-xl">
        {SHOWCASE_PROJECTS.map((project) => {
          const isActive = project.id === activeTab;
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveTab(project.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-md shadow-blue-900/30"
                  : "text-[#A7B0C4] hover:text-white hover:bg-[#171E33]"
              }`}
            >
              {project.type === "ecommerce" && <ShoppingBag className="w-3.5 h-3.5" />}
              {project.type === "video" && <Tv className="w-3.5 h-3.5" />}
              {project.type === "food" && <Layers className="w-3.5 h-3.5" />}
              <span>{project.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Browser Frame */}
      <div className="relative z-10 rounded-2xl bg-[#111832] border border-[#29324B] shadow-2xl shadow-blue-950/70 overflow-hidden">
        {/* Browser Chrome Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0B1020] border-b border-[#29324B] text-xs">
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
          </div>

          {/* URL bar */}
          <div className="flex-1 max-w-md mx-4 px-3 py-1 rounded-lg bg-[#171E33] border border-[#29324B] flex items-center justify-center gap-2 text-[#A7B0C4] text-[11px] font-mono select-none truncate">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">https://{current.url}</span>
          </div>

          {/* Action icon */}
          <div className="flex items-center gap-2 text-slate-400">
            <RefreshCw className="w-3 h-3 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Browser Viewport: Authentic Interactive Demo */}
        <div className="relative bg-[#0B1020] p-6 sm:p-8 min-h-[360px] flex flex-col justify-between">
          {/* E-COMMERCE DEMO: Aavira Clothing */}
          {current.type === "ecommerce" && (
            <div className="space-y-6">
              {/* Mini navbar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#29324B]/70">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-lg tracking-wider text-white">AAVIRA</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 font-mono">COLLECTION 2026</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400 hidden sm:inline">Women</span>
                  <span className="text-slate-400 hidden sm:inline">Men</span>
                  <span className="text-white font-medium">Accessories</span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171E33] border border-[#29324B] text-slate-200">
                    <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
                    <span className="font-mono text-xs font-bold text-white">{cartCount}</span>
                  </div>
                </div>
              </div>

              {/* Product Cards Grid Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#171E33] border border-[#29324B] flex flex-col justify-between">
                  <div className="h-28 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-[#29324B]/60 flex items-center justify-center mb-3 relative overflow-hidden">
                    <span className="text-xs text-slate-400 font-medium">Oversized Heavyweight Tee</span>
                    <span className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded bg-blue-600 text-white font-mono">100% Cotton</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">Minimalist Obsidian Tee</div>
                    <div className="text-xs font-semibold text-blue-400 mb-3">₹1,499 / $18</div>
                    <button
                      type="button"
                      onClick={() => setCartCount((c) => c + 1)}
                      className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#171E33] border border-[#29324B] flex flex-col justify-between">
                  <div className="h-28 rounded-lg bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-[#29324B]/60 flex items-center justify-center mb-3 relative overflow-hidden">
                    <span className="text-xs text-slate-400 font-medium">Relaxed Structured Hoodie</span>
                    <span className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded bg-purple-600 text-white font-mono">480 GSM</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">Midnight Drop Hoodie</div>
                    <div className="text-xs font-semibold text-purple-400 mb-3">₹2,899 / $35</div>
                    <button
                      type="button"
                      onClick={() => setCartCount((c) => c + 1)}
                      className="w-full py-1.5 rounded-lg bg-[#111832] hover:bg-blue-600/20 border border-[#29324B] hover:border-blue-500 text-slate-200 text-xs font-semibold transition-colors"
                    >
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>

                <div className="hidden sm:flex p-4 rounded-xl bg-[#171E33] border border-[#29324B] flex-col justify-between">
                  <div className="h-28 rounded-lg bg-gradient-to-br from-slate-900 to-blue-950/30 border border-[#29324B]/60 flex items-center justify-center mb-3">
                    <span className="text-xs text-slate-400 font-medium">Modular Utility Tote</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">Ripstop Crossbody Bag</div>
                    <div className="text-xs font-semibold text-blue-400 mb-3">₹1,199 / $15</div>
                    <button
                      type="button"
                      onClick={() => setCartCount((c) => c + 1)}
                      className="w-full py-1.5 rounded-lg bg-[#111832] hover:bg-blue-600/20 border border-[#29324B] hover:border-blue-500 text-slate-200 text-xs font-semibold transition-colors"
                    >
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REAL-TIME VIDEO STREAMING DEMO: Synchronized Player & Chat */}
          {current.type === "video" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Left Video Player Preview */}
              <div className="md:col-span-8 rounded-xl bg-[#171E33] border border-[#29324B] p-4 flex flex-col justify-between min-h-[220px]">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#29324B]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white font-medium text-xs">Room #842 — Tech Keynote Sync</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-purple-400 font-mono">
                    <Users className="w-3.5 h-3.5" />
                    <span>3 Users In Sync</span>
                  </div>
                </div>

                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-900/40 hover:scale-105 transition-transform"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                  </button>
                  <p className="text-xs text-slate-400 mt-3 font-mono">
                    {isPlaying ? "Playback Synced Across All Clients" : "Paused on Host Command"}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2 border-t border-[#29324B]/60">
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-3/5 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>08:24</span>
                    <span>14:00</span>
                  </div>
                </div>
              </div>

              {/* Right Live Chat Sidebar */}
              <div className="md:col-span-4 rounded-xl bg-[#171E33] border border-[#29324B] p-3 flex flex-col justify-between text-xs">
                <div className="font-semibold text-white pb-2 border-b border-[#29324B]/60 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                  <span>Real-Time Room Chat</span>
                </div>

                <div className="space-y-2 py-3">
                  <div className="p-2 rounded-lg bg-[#111832] border border-[#29324B]/60">
                    <span className="font-bold text-blue-400 text-[11px]">Alex: </span>
                    <span className="text-[#A7B0C4] text-[11px]">Timestamp synced smoothly!</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#111832] border border-[#29324B]/60">
                    <span className="font-bold text-purple-400 text-[11px]">Riddhi: </span>
                    <span className="text-[#A7B0C4] text-[11px]">Socket.IO handling room latency under 40ms.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-950/30 border border-blue-500/30">
                    <span className="font-bold text-emerald-400 text-[11px]">Vinit: </span>
                    <span className="text-[#A7B0C4] text-[11px]">Playback state updated for all 3 viewers.</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 text-center pt-2 border-t border-[#29324B]/60 font-mono">
                  Live Socket Stream Active
                </div>
              </div>
            </div>
          )}

          {/* FULL-STACK ORDERING PLATFORM DEMO: CraveGo */}
          {current.type === "food" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#29324B]/70">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-lg text-white">CRAVEGO</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono">ORDER PLATFORM</span>
                </div>
                <div className="text-xs text-[#A7B0C4]">
                  Delivery to: <strong className="text-white">Central Hub</strong>
                </div>
              </div>

              {/* Order Tracking Stepper */}
              <div className="p-4 rounded-xl bg-[#171E33] border border-[#29324B]">
                <div className="flex items-center justify-between text-xs font-semibold text-white mb-3">
                  <span>Live Order #CG-4819</span>
                  <span className="text-emerald-400 font-mono">Estimated: 22 Mins</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-medium">
                    ✓ 1. Confirmed
                  </div>
                  <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 font-medium animate-pulse">
                    ● 2. Preparing Meal
                  </div>
                  <div className="p-2 rounded-lg bg-[#111832] border border-[#29324B] text-slate-400 font-medium">
                    ○ 3. Out for Delivery
                  </div>
                </div>
              </div>

              {/* Sample Restaurant Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[#171E33] border border-[#29324B] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Urban Artisan Bowls</div>
                    <div className="text-[11px] text-[#A7B0C4]">Salads, Quinoa & Healthy Bowls</div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-blue-400 bg-[#111832] px-2 py-1 rounded border border-[#29324B]">4.9 ★</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#171E33] border border-[#29324B] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Woodfire Pizzeria</div>
                    <div className="text-[11px] text-[#A7B0C4]">Neapolitan Sourdough Pizzas</div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-blue-400 bg-[#111832] px-2 py-1 rounded border border-[#29324B]">4.8 ★</span>
                </div>
              </div>
            </div>
          )}

          {/* Showcase Bottom Details Strip */}
          <div className="pt-6 mt-6 border-t border-[#29324B] flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Author Attribution */}
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>{current.headline}</span>
              </div>
              <p className="text-xs text-[#A7B0C4] mt-0.5 max-w-lg">
                {current.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[11px] text-slate-400">Architected by</span>
                <span className="text-[11px] font-semibold text-blue-400 bg-[#171E33] px-2 py-0.5 rounded border border-[#29324B]">
                  {current.author}
                </span>
                <span className="text-[11px] text-slate-400">• {current.authorRole}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              {current.liveUrl && (
                <a
                  href={current.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-500 hover:to-purple-500 shadow-md shadow-blue-900/30 transition-all"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <a
                href={current.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#F8FAFC] bg-[#171E33] hover:bg-[#1E2742] border border-[#29324B] hover:border-blue-500/40 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Source</span>
              </a>

              <Link
                href={current.repoDetailUrl}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>Documentation →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-line below showcase */}
      <div className="text-center mt-6">
        <p className="text-xs sm:text-sm font-medium text-[#A7B0C4] tracking-wide inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111832] border border-[#29324B]">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Two builders. One shared vision. Digital products made with purpose.</span>
        </p>
      </div>
    </div>
  );
}
