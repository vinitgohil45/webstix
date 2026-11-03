"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WebstixLogo } from "./WebstixLogo";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { WhatsApp } from "./Icons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes (React 19 recommended pattern without effect setState)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1020]/90 backdrop-blur-md border-b border-[#29324B]/80 py-3.5 shadow-xl shadow-black/20"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <WebstixLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#111832]/60 border border-[#29324B]/60 rounded-full px-5 py-1.5 backdrop-blur-sm shadow-inner">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-[#F8FAFC] bg-[#2563EB]/20 border border-[#2563EB]/40 shadow-xs"
                      : "text-[#A7B0C4] hover:text-[#F8FAFC] hover:bg-[#171E33]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop WhatsApp Contact Header Option */}
            <div className="hidden xl:flex items-center gap-2">
              <span className="text-xs text-slate-300">Have a quick question? Text us on WhatsApp.</span>
              <a
                href="https://wa.me/919136730898"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-200"
                aria-label="Chat on WhatsApp"
              >
                <WhatsApp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Medium screens WhatsApp Contact Button */}
            <div className="hidden md:flex xl:hidden items-center">
              <a
                href="https://wa.me/919136730898"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-all duration-200"
                title="Have a quick question? Text us on WhatsApp."
                aria-label="Chat on WhatsApp"
              >
                <WhatsApp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Start a Project Primary CTA */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-500 hover:to-purple-500 px-4 py-2 rounded-xl shadow-md shadow-blue-900/30 hover:shadow-blue-700/40 transition-all duration-200 group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Mobile WhatsApp Quick Tap Button */}
            <a
              href="https://wa.me/919136730898"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 active:scale-95 transition-all"
              aria-label="Chat on WhatsApp"
              title="Have a quick question? Text us on WhatsApp."
            >
              <WhatsApp className="w-5 h-5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#A7B0C4] hover:text-white bg-[#111832] border border-[#29324B] focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-[#0B1020]/95 backdrop-blur-xl border-b border-[#29324B] px-4 pt-4 pb-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium px-4 py-3 rounded-xl transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-white bg-[#171E33] border border-[#29324B]"
                      : "text-[#A7B0C4] hover:text-white hover:bg-[#111832]"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-blue-400" />}
                </Link>
              );
            })}

            {/* Mobile WhatsApp Contact Box */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-blue-950/40 border border-emerald-500/30 text-center space-y-2 mt-2">
              <p className="text-xs text-slate-200 font-medium">Have a quick question? Text us on WhatsApp.</p>
              <a
                href="https://wa.me/919136730898"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] py-2.5 px-4 rounded-xl shadow-md transition-all"
              >
                <WhatsApp className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="pt-2 mt-1 border-t border-[#29324B]">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 text-base font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#7C3AED] px-5 py-3 rounded-xl shadow-lg shadow-blue-900/40"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
