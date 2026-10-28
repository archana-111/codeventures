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
      className={`hero-section relative flex w-full flex-col overflow-hidden bg-cv-page ${
        isLight
          ? 'hero-section--light min-h-[100svh]'
          : 'min-h-[100svh] justify-end lg:min-h-screen'
      }`}
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
              ? 'object-[58%_40%] sm:object-[68%_36%] lg:object-[92%_44%]'
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
        className={`relative z-10 site-wrap w-full ${
          isLight
            ? 'py-28 sm:py-32 lg:py-24'
            : 'pb-14 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40'
        }`}
      >
        <div className={isLight ? 'hero-light-grid' : 'max-w-3xl'}>
          <div
            className={
              isLight
                ? 'hero-light-copy-block flex flex-col items-start text-left'
                : 'flex max-w-3xl flex-col items-start text-left'
            }
          >
            <p
              ref={kickerRef}
              className={`mb-4 sm:mb-5 ${isLight ? 'cv-kicker hero-kicker' : 'text-sm font-medium text-emerald-400'}`}
            >
              Startup studio & technical co-founder
            </p>

            <h1
              ref={headlineRef}
              className={`text-balance mb-5 sm:mb-6 ${
                isLight
                  ? 'text-4xl sm:text-5xl lg:text-[4.25rem] xl:text-[4.75rem]'
                  : 'text-4xl font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] mb-5 sm:mb-7 text-white'
              }`}
            >
              <div className="overflow-hidden">
                <span
                  className={`hero-line-inner block ${
                    isLight ? 'hero-headline-primary text-cv-fg' : ''
                  }`}
                >
                  Great startups
                </span>
              </div>
              <div className="overflow-hidden">
                <span
                  className={`hero-line-inner block ${
                    isLight ? 'hero-headline-secondary' : ''
                  }`}
                >
                  aren&apos;t built alone.
                </span>
              </div>
            </h1>

            <p
              ref={descRef}
              className={`mb-8 max-w-md text-base font-normal leading-[1.65] sm:mb-9 sm:text-[1.0625rem] lg:max-w-lg ${
                isLight ? 'text-cv-fg-muted' : 'max-w-xl sm:text-lg lg:text-xl text-neutral-300 mb-8 sm:mb-10'
              }`}
            >
              From your first idea to a scalable product, CodeVentures brings the
              technical expertise, dedicated product squad, and strategic guidance
              to help you build what&apos;s next.
            </p>

            <div
              ref={ctaRef}
              className="flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center sm:gap-3"
            >
              <button
                type="button"
                onClick={openApply}
                className={`cv-btn-primary group relative inline-flex items-center justify-center gap-2.5 bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-cv-on-accent transition-all duration-300 hover:bg-emerald-400 active:translate-y-0 ${
                  isLight ? 'rounded-[10px] hover:-translate-y-px' : 'rounded-full px-8 py-4 tracking-wide hover:-translate-y-0.5'
                }`}
              >
                <span>Build With Us</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href="#services"
                className={
                  isLight
                    ? 'cv-btn-secondary inline-flex items-center justify-center rounded-[10px] px-6 py-3.5 text-sm font-semibold transition-colors duration-300'
                    : 'inline-flex items-center justify-center rounded-full border border-white/18 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white/90 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.08]'
                }
              >
                Why CodeVentures
              </a>
            </div>
          </div>

          {isLight && <div className="hero-light-visual-spacer" aria-hidden />}
        </div>
      </div>
    </section>
  );
}
