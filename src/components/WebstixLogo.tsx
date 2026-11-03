import React from "react";
import Link from "next/link";

interface WebstixLogoProps {
  variant?: "full" | "symbol" | "horizontal";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  asLink?: boolean;
}

export function WebstixLogo({
  variant = "horizontal",
  size = "md",
  className = "",
  asLink = true,
}: WebstixLogoProps) {
  // Proportions map
  const sizeMap = {
    sm: { symbolSize: 28, height: 32, textClass: "text-lg", iconPadding: "p-1.5" },
    md: { symbolSize: 34, height: 40, textClass: "text-xl", iconPadding: "p-2" },
    lg: { symbolSize: 44, height: 50, textClass: "text-2xl", iconPadding: "p-2.5" },
    xl: { symbolSize: 56, height: 64, textClass: "text-3xl", iconPadding: "p-3" },
  };

  const currentSize = sizeMap[size];

  const Symbol = (
    <div
      className={`relative flex items-center justify-center shrink-0 rounded-xl bg-[#111832] border border-[#29324B] shadow-lg shadow-blue-950/40 group-hover:border-blue-500/50 transition-colors duration-300 ${currentSize.iconPadding}`}
      style={{ width: currentSize.symbolSize, height: currentSize.symbolSize }}
    >
      {/* Background glow behind W symbol */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xs pointer-events-none" />

      {/* Authoritative W Mark Vector */}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
        role="img"
        aria-label="Webstix W Symbol"
      >
        <defs>
          <linearGradient id={`w-primary-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id={`w-facet-${size}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>

        {/* Left outer leg */}
        <path d="M6 10 L16 52 L26 28 L16 10 Z" fill={`url(#w-primary-${size})`} />
        {/* Left inner facet */}
        <path d="M16 52 L28 52 L32 38 L26 28 Z" fill={`url(#w-facet-${size})`} opacity="0.9" />
        {/* Center chevron bridge */}
        <path d="M28 52 L32 24 L36 52 Z" fill={`url(#w-primary-${size})`} />
        {/* Right inner facet */}
        <path d="M36 52 L48 52 L38 28 L32 38 Z" fill={`url(#w-facet-${size})`} opacity="0.9" />
        {/* Right outer leg */}
        <path d="M58 10 L48 52 L38 28 L48 10 Z" fill={`url(#w-primary-${size})`} />
      </svg>
    </div>
  );

  const Wordmark = (
    <div className="flex items-center tracking-tight font-extrabold select-none">
      <span className={`text-[#F8FAFC] font-heading ${currentSize.textClass}`}>Web</span>
      <span
        className={`bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent font-heading ${currentSize.textClass}`}
      >
        stix
      </span>
    </div>
  );

  const content = (
    <div className={`inline-flex items-center gap-2.5 group ${className}`}>
      {Symbol}
      {variant !== "symbol" && Wordmark}
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label="Webstix Homepage" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
