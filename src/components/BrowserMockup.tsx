import React from "react";
import Image from "next/image";
import { Lock, RefreshCw } from "lucide-react";

interface BrowserMockupProps {
  url?: string;
  children?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function BrowserMockup({
  url = "https://webstix.studio/showcase",
  children,
  imageSrc,
  imageAlt = "Webstix Project Showcase",
  className = "",
}: BrowserMockupProps) {
  return (
    <div
      className={`rounded-2xl bg-[#111832] border border-[#29324B] shadow-2xl shadow-blue-950/60 overflow-hidden ${className}`}
    >
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0B1020]/90 border-b border-[#29324B]/80 text-xs">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-md mx-4 px-3 py-1 rounded-lg bg-[#171E33] border border-[#29324B] flex items-center justify-center gap-2 text-[#A7B0C4] text-[11px] font-mono select-none">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="truncate">{url}</span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2 text-slate-400">
          <RefreshCw className="w-3 h-3" />
        </div>
      </div>

      {/* Browser Body */}
      <div className="relative bg-[#0B1020]">
        {imageSrc ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
