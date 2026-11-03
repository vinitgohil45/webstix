import React from "react";
import Link from "next/link";
import Image from "next/image";
import { WebstixLogo } from "./WebstixLogo";
import { STUDIO_CONFIG } from "@/lib/studio-config";
import { Globe, ArrowUpRight } from "lucide-react";
import { Github } from "@/components/Icons";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="relative bg-[#0B1020] border-t border-[#29324B] overflow-hidden text-[#A7B0C4]">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-t from-blue-600/10 via-purple-600/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <WebstixLogo size="lg" />
            <p className="text-[#F8FAFC] font-medium text-lg tracking-tight">
              {STUDIO_CONFIG.brand.tagline}
            </p>
            <p className="text-sm text-[#A7B0C4] max-w-sm leading-relaxed">
              An independent digital studio by Vinit Gohil and Riddhi Patthar. We craft responsive web applications, e-commerce stores, and high-impact digital experiences for businesses in India and across the globe.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Q4 Client Projects
              </span>
            </div>
          </div>

          {/* Studio Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#F8FAFC] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#F8FAFC] transition-colors">
                  Our Work & Projects
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#F8FAFC] transition-colors">
                  Services & Solutions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F8FAFC] transition-colors">
                  About Webstix
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-[#F8FAFC] transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F8FAFC] transition-colors">
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wider uppercase mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services#website-design-development" className="hover:text-[#F8FAFC] transition-colors">
                  Web Design & Development
                </Link>
              </li>
              <li>
                <Link href="/services#ecommerce-solutions" className="hover:text-[#F8FAFC] transition-colors">
                  E-Commerce Storefronts
                </Link>
              </li>
              <li>
                <Link href="/services#fullstack-web-apps" className="hover:text-[#F8FAFC] transition-colors">
                  Full-Stack Web Applications
                </Link>
              </li>
              <li>
                <Link href="/services#business-websites-landing-pages" className="hover:text-[#F8FAFC] transition-colors">
                  High-Impact Landing Pages
                </Link>
              </li>
              <li>
                <Link href="/services#website-maintenance-improvements" className="hover:text-[#F8FAFC] transition-colors">
                  Maintenance & Performance
                </Link>
              </li>
            </ul>
          </div>

          {/* Leadership & Verified GitHub */}
          <div>
            <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wider uppercase mb-4">
              Leadership & Profiles
            </h3>
            <div className="space-y-4 text-sm">
              <div className="p-3 rounded-xl bg-[#111832] border border-[#29324B]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-blue-500/40 shrink-0">
                    <Image
                      src="/images/vinit.jpg"
                      alt="Vinit Gohil"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs">Vinit Gohil</div>
                    <div className="text-[11px] text-blue-400 font-bold uppercase">CEO</div>
                  </div>
                </div>
                <a
                  href="https://github.com/vinitgohil45"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#A7B0C4] hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>github.com/vinitgohil45</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="p-3 rounded-xl bg-[#111832] border border-[#29324B]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-purple-500/40 shrink-0">
                    <Image
                      src="/images/riddhi.jpg"
                      alt="Riddhi Patthar"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs">Riddhi Patthar</div>
                    <div className="text-[11px] text-purple-400 font-bold uppercase">CEO</div>
                  </div>
                </div>
                <a
                  href="https://github.com/riddhipatthar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#A7B0C4] hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>github.com/riddhipatthar</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with legal & international scope */}
        <div className="pt-8 border-t border-[#29324B] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A7B0C4]">
          <div className="flex items-center gap-2">
            <span>© {currentYear} Webstix Studio. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              Serving clients in India & Globally
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Project Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
