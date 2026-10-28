'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

interface HeaderProps {
  onOpenApply?: () => void;
}

export default function Header({ onOpenApply }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Why Us', href: '#services' },
    { label: 'Advantage', href: '#advantage' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Models', href: '#models' },
    { label: 'Founder', href: '#founder' },
    { label: 'Perks', href: '#perks' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cv-page/85 backdrop-blur-xl border-b border-cv-border-subtle py-3.5 shadow-[var(--cv-header-shadow)] dark:shadow-2xl dark:shadow-black/40'
          : 'bg-transparent py-5 border-b border-cv-border-subtle/60'
      }`}
    >
      <div className="site-wrap flex items-center justify-between gap-3">
        <Link
          href="/"
          className="flex items-center shrink-0 group"
          aria-label="CodeVentures Home"
        >
          <Image
            src="/assets/logos/codeventures-wordmark.png"
            alt="CodeVentures — Proven Technical CoFounder"
            width={660}
            height={142}
            priority
            className="header-brand-logo h-8 sm:h-9 lg:h-10 w-auto transition-[filter] duration-300"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 bg-cv-nav border border-cv-border-subtle rounded-full px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-cv-fg-muted hover:text-cv-fg px-3 py-1.5 rounded-full hover:bg-cv-border-subtle transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />

          <div className="hidden sm:flex items-center">
            <button
              onClick={() => {
                if (onOpenApply) onOpenApply();
                else {
                  const el = document.getElementById('apply');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="cv-btn-primary group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-cv-on-accent font-semibold text-sm tracking-wide transition-all duration-300 dark:hover:shadow-lg dark:hover:shadow-emerald-500/25 active:scale-[0.98]"
            >
              <span>Build With Us</span>
              <span className="w-5 h-5 rounded-full bg-cv-on-accent/15 flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-cv-fg-muted hover:text-cv-fg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-cv-page/98 border-b border-cv-border-subtle backdrop-blur-2xl p-6 transition-all duration-300 shadow-2xl">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-cv-border-subtle sm:hidden">
              <span className="text-sm font-medium text-cv-fg-muted">Theme</span>
              <ThemeToggle showLabel />
            </div>

            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-cv-fg-muted hover:text-emerald-500 py-2 border-b border-cv-border-subtle transition-colors"
              >
                {item.label}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenApply) onOpenApply();
                else {
                  const el = document.getElementById('apply');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-4 flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-emerald-500 text-cv-on-accent font-semibold text-sm tracking-wide transition-all"
            >
              <span>Build With Us</span>
              <span className="w-5 h-5 rounded-full bg-cv-on-accent/15 flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
