'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useTheme } from '@/components/ThemeProvider';

interface HeroSectionProps {
  onOpenApply?: () => void;
}

export default function HeroSection({ onOpenApply }: HeroSectionProps) {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === 'light';

  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (bgImageRef.current) {
        tl.fromTo(
          bgImageRef.current,
          { scale: 1.06, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' }
        );
      }

      if (kickerRef.current) {
        tl.fromTo(
          kickerRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=1'
        );
      }

      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.hero-line-inner');
        tl.fromTo(
          lines,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.9, stagger: 0.12 },
          '-=0.75'
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        );
      }

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

  const openApply = () => {
    if (onOpenApply) onOpenApply();
    else document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="hero-section relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-cv-page lg:min-h-screen"
    >
      <div
        ref={bgImageRef}
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      >
        <Image
          src={isLight ? '/assets/hero-bg-light.jpg' : '/assets/hero-bg-teal.jpg'}
          alt="CodeVentures Geometric 3D Studio Environment"
          fill
          priority
          quality={95}
          className={`transform-gpu object-cover ${
            isLight
              ? 'object-[62%_42%] sm:object-[72%_38%] lg:object-right lg:object-[88%_42%]'
              : 'object-center sm:object-right-top'
          }`}
        />

        {isLight ? (
          <>
            <div className="hero-light-scrim-side absolute inset-0" aria-hidden />
            <div className="hero-light-scrim-base absolute inset-0" aria-hidden />
          </>
        ) : (
          <div className="absolute inset-0 bg-black/60" aria-hidden />
        )}
      </div>

      <div
        ref={contentRef}
        className="relative z-10 site-wrap w-full pb-14 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40"
      >
        <div
          className={`hero-light-copy flex max-w-3xl flex-col items-start text-left ${
            isLight ? '' : 'max-w-3xl'
          }`}
        >
          <p
            ref={kickerRef}
            className={`hero-kicker mb-5 text-sm font-medium tracking-[0.02em] ${
              isLight ? 'text-[#00BFA5]' : 'text-emerald-400'
            }`}
          >
            Startup studio & technical co-founder
          </p>

          <h1
            ref={headlineRef}
            className={`text-balance text-4xl font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] mb-5 sm:mb-7 ${
              isLight ? 'text-cv-fg' : 'text-white'
            }`}
          >
            <div className="overflow-hidden">
              <span className="hero-line-inner block">Great startups</span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-line-inner block">aren&apos;t built alone.</span>
            </div>
          </h1>

          <p
            ref={descRef}
            className={`mb-8 max-w-xl text-base font-normal leading-relaxed sm:mb-10 sm:text-lg lg:text-xl ${
              isLight ? 'text-cv-fg-muted' : 'text-neutral-300'
            }`}
          >
            From your first idea to a scalable product, CodeVentures brings the
            technical expertise, dedicated product squad, and strategic guidance
            to help you build what&apos;s next.
          </p>

          <div
            ref={ctaRef}
            className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-3.5"
          >
            <button
              type="button"
              onClick={openApply}
              className="cv-btn-primary group relative inline-flex items-center justify-center gap-3 rounded-full bg-emerald-500 px-8 py-4 text-sm font-semibold tracking-wide text-cv-on-accent transition-all duration-300 hover:bg-emerald-400 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Build With Us</span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cv-on-accent/15 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-3.5 w-3.5 text-cv-on-accent" />
              </div>
            </button>

            <a
              href="#services"
              className={
                isLight
                  ? 'cv-btn-secondary inline-flex items-center justify-center rounded-full border border-cv-border bg-cv-card/80 px-7 py-4 text-sm font-semibold text-cv-fg transition-colors duration-300 hover:bg-cv-elevated'
                  : 'inline-flex items-center justify-center rounded-full border border-white/18 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white/90 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.08]'
              }
            >
              Why CodeVentures
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
