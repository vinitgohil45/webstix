import React from "react";
import { BrowserMockup } from "./BrowserMockup";
import { ShoppingBag, Tv, Sparkles } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 lg:mt-16">
      {/* Background radial glowing effects */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/25 via-indigo-600/20 to-purple-600/25 blur-3xl rounded-full pointer-events-none" />

      {/* Main Browser Showcase */}
      <div className="relative z-10 transition-transform duration-500 hover:scale-[1.01]">
        <BrowserMockup
          url="https://webstix.studio/production-showcase"
          imageSrc="/images/hero-showcase.jpg"
          imageAlt="Webstix Engineering & Web Showcase"
        />
      </div>

      {/* Overlapping Floating Card 1: E-Commerce Storefront (Aavira Clothing) */}
      <div className="hidden sm:flex absolute -left-6 -bottom-6 z-20 items-center gap-3.5 p-3.5 rounded-2xl bg-[#171E33]/95 border border-[#29324B] backdrop-blur-md shadow-2xl shadow-blue-950/80 animate-fade-in">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white">Aavira Clothing</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <p className="text-[11px] text-[#A7B0C4]">Modern E-Commerce Storefront</p>
        </div>
      </div>

      {/* Overlapping Floating Card 2: Real-time Synchronized Video Streaming */}
      <div className="hidden sm:flex absolute -right-6 -top-6 z-20 items-center gap-3.5 p-3.5 rounded-2xl bg-[#171E33]/95 border border-[#29324B] backdrop-blur-md shadow-2xl shadow-purple-950/80">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
          <Tv className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white">Synchronized Video</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">Socket.IO</span>
          </div>
          <p className="text-[11px] text-[#A7B0C4]">Real-time collaborative player</p>
        </div>
      </div>

      {/* Bottom Sub-tagline */}
      <div className="text-center mt-6">
        <p className="text-xs sm:text-sm font-medium text-[#A7B0C4] tracking-wide inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111832] border border-[#29324B]">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Two builders. One shared vision. Digital products made with purpose.</span>
        </p>
      </div>
    </div>
  );
}
