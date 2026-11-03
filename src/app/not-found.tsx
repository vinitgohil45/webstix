import React from "react";
import Link from "next/link";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Subtle glowing radial */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/40 flex items-center justify-center mx-auto mb-6 text-blue-400">
          <Compass className="w-8 h-8" />
        </div>

        <div className="font-mono text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-[#A7B0C4] leading-relaxed mb-8">
          The route you are looking for doesn&apos;t exist, has been relocated, or is currently in development. Let&apos;s guide you back to active ground.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-blue-900/30 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#171E33] hover:bg-[#1E2742] border border-[#29324B] hover:border-blue-500/40 text-white font-semibold text-sm transition-colors"
          >
            <span>Explore Our Work</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
