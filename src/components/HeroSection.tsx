'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
} from 'lucide-react';
import gsap from 'gsap';
import { useTheme } from '@/components/ThemeProvider';

interface HeroSectionProps {
  onOpenApply?: () => void;
}

export default function HeroSection({ onOpenApply }: HeroSectionProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Subtle zoom and fade in for background image
      if (bgImageRef.current) {
        tl.fromTo(
          bgImageRef.current,
          { scale: 1.06, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' }
        );
      }

      // Masked headline lines reveal
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.hero-line-inner');
        tl.fromTo(
          lines,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.9, stagger: 0.12 },
          '-=0.8'
        );
      }

      // Supporting copy
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        );
      }

      // Modern CTA buttons
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          '-=0.4'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-section relative min-h-[100svh] w-full flex flex-col justify-end overflow-hidden bg-cv-page"
    >
      {/* 3D Geometric Background Image with High-Res Presentation */}
      <div
        ref={bgImageRef}
        className={`absolute inset-0 z-0 pointer-events-none select-none overflow-hidden ${
          isLight ? 'hero-bg-light' : ''
        }`}
      >
        <Image
          src={isLight ? '/assets/hero-bg-light.jpg' : '/assets/hero-bg-teal.jpg'}
          alt="CodeVentures Geometric 3D Studio Environment"
          fill
          priority
          quality={95}
          className={`hero-bg-image object-cover transform-gpu ${
            isLight ? '' : 'object-center sm:object-right-top'
          }`}
        />

        {isLight ? (
          <>
            <div className="hero-scrim-side absolute inset-0" aria-hidden />
            <div className="hero-scrim-bottom absolute inset-x-0 bottom-0 h-[min(52%,420px)]" aria-hidden />
          </>
        ) : (
          <div className="absolute inset-0 bg-black/60 pointer-events-none" aria-hidden />
        )}
      </div>

      {/* Main Hero Container: Clean Content Aligned to Left Bottom Corner */}
      <div
        ref={contentRef}
        className="relative z-10 site-wrap w-full pb-[max(4rem,env(safe-area-inset-bottom))] sm:pb-20 lg:pb-[7.5rem] pt-28 sm:pt-36 lg:pt-40"
      >
        <div className="hero-copy max-w-[40rem] flex flex-col items-start text-left">
          <p
            className={`cv-kicker mb-5 sm:mb-6 ${
              isLight ? 'text-emerald-600' : 'text-emerald-400'
            }`}
          >
            Startup studio · Technical co-founder
          </p>

          {/* Main Headline: Bold text without gradient */}
          <h1
            ref={headlineRef}
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-[72px] xl:text-[80px] font-bold tracking-[-0.04em] leading-[1.02] mb-5 sm:mb-7 ${
              isLight ? 'text-cv-fg' : 'text-white'
            }`}
          >
            <div className="overflow-hidden">
              <span className="hero-line-inner block">
                Great startups
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-line-inner block">
                aren’t built alone.
              </span>
            </div>
          </h1>

          {/* Short Supporting Description */}
          <p
            ref={descRef}
            className={`text-base sm:text-lg lg:text-[1.125rem] font-normal leading-[1.65] max-w-[34rem] mb-9 sm:mb-10 text-left ${
              isLight ? 'text-cv-fg-muted' : 'text-neutral-300'
            }`}
          >
            From your first idea to a scalable product, CodeVentures brings
            the technical expertise, dedicated product squad, and strategic
            guidance to help you build what’s next.
          </p>

          {/* Modern CTA Button Aligned on the Left Bottom Corner */}
          <div
            ref={ctaRef}
            className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
          >
            {/* Primary Modern CTA */}
            <button
              onClick={() => {
                if (onOpenApply) onOpenApply();
                else {
                  const el = document.getElementById('apply');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="cv-btn-primary group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-cv-on-accent font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Build With Us</span>
              <div className="w-5 h-5 rounded-full bg-cv-on-accent/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-cv-on-accent" />
              </div>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
