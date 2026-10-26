'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Counter hook that replicates the exact HyKr intersection counter animation
function NumberCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1800,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const startTime = performance.now();
            const frame = (now: number) => {
              const p = Math.min(1, (now - startTime) / duration);
              const ease = 1 - Math.pow(1 - p, 3);
              setCount(Math.round(value * ease));
              if (p < 1) requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// 6 Ascending Milestone Nodes along the mountain ridge (exact coordinates from HyKr)
const CHIP_WIDTH = 290;
const X_OFFSET = 110;

const NODES = [
  {
    x: 143,
    top: 1199,
    h: 176,
    dotY: 1113,
    plain: 'Milestone-backed capital',
    label: (
      <>
        Milestone-backed
        <br />
        capital
      </>
    ),
  },
  {
    x: 433,
    top: 1012,
    h: 187,
    dotY: 942,
    plain: 'Build like co-founder',
    label: (
      <>
        Build like
        <br />
        co-founder
      </>
    ),
  },
  {
    x: 723,
    top: 846,
    h: 166,
    dotY: 747,
    plain: 'GTM that actually ships',
    label: (
      <>
        GTM that
        <br />
        actually ships
      </>
    ),
  },
  {
    x: 1013,
    top: 679,
    h: 167,
    dotY: 560,
    plain: 'Product & Engineering muscle',
    label: (
      <>
        Product &amp;
        <br />
        Engineering
        <br />
        muscle
      </>
    ),
  },
  {
    x: 1303,
    top: 519,
    h: 160,
    dotY: 356,
    plain: 'We help you land A-Players',
    label: (
      <>
        We help you
        <br />
        land A-Players
      </>
    ),
  },
  {
    x: 1593,
    top: 340,
    h: 179,
    dotY: 198,
    plain: 'A Network that opens doors',
    label: (
      <>
        A Network that
        <br />
        opens doors
      </>
    ),
  },
];

const cu = (val: number) => `calc(${val} * var(--u))`;
const cuy = (val: number) => `calc(${val} * var(--uy))`;

export default function ImpactMetrics() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLElement>(null);
  const stemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileRowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isMobile = window.matchMedia('(max-width: 760px)').matches;

    if (prefersReducedMotion || isMobile) {
      [...stemRefs.current, ...dotRefs.current, ...chipRefs.current].forEach(
        (el) => {
          if (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        }
      );
      return;
    }

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(stemRefs.current, { opacity: 0 });
      gsap.set(dotRefs.current, {
        opacity: 0,
        scale: 0.4,
        transformOrigin: 'center center',
      });
      gsap.set(chipRefs.current, { opacity: 0, y: 26 });

      // Pin timeline with scrub
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: '+=140%',
          pin: canvas,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      NODES.forEach((_, idx) => {
        const delay = 0.05 + idx * 0.13;
        tl.to(
          dotRefs.current[idx],
          { opacity: 1, scale: 1, duration: 0.2 },
          delay
        );
        tl.to(
          stemRefs.current[idx],
          { opacity: 1, duration: 0.25 },
          delay + 0.02
        );
        tl.to(
          chipRefs.current[idx],
          { opacity: 1, y: 0, duration: 0.3 },
          delay + 0.05
        );
      });

      tl.to({}, { duration: 0.25 });
    }, wrap);

    let resizeTimer: number;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    ro.observe(canvas);

    return () => {
      ro.disconnect();
      window.clearTimeout(resizeTimer);
      ctx.revert();
    };
  }, []);

  return (
    <div id="credibility" className="relative w-full">
      {/* 1. HyKr-Style 4-Stat Strip */}
      <section className="hero-stats">
        <div className="site-wrap w-full">
          <div className="hstats-grid">
            {/* Stat 1 */}
            <div className="hstat">
              <div className="hstat-num">
                <NumberCounter value={1} prefix="$" suffix="B+" />
              </div>
              <div className="hstat-label">
                Portfolio
                <br />
                Valuation
              </div>
            </div>

            {/* Stat 2 */}
            <div className="hstat">
              <div className="hstat-num">
                <NumberCounter value={20} suffix="+" />
              </div>
              <div className="hstat-label">
                Years Operator
                <br />
                Experience
              </div>
            </div>

            {/* Stat 3 */}
            <div className="hstat">
              <div className="hstat-num">
                <NumberCounter value={50} suffix="+" />
              </div>
              <div className="hstat-label">
                Startups
                <br />
                Co-Built
              </div>
            </div>

            {/* Stat 4 */}
            <div className="hstat">
              <div className="hstat-num">
                <NumberCounter value={2} />
              </div>
              <div className="hstat-label">
                Cohorts
                <br />
                per Year
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HyKr Exact Pinned Studio Canvas (Desktop & Tablet) */}
      <div ref={wrapRef} className="sst-wrap" data-no-motion="true">
        <section id="studio" ref={canvasRef} className="studio sst-canvas">
          {/* Studio Feature Background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/studio-forms.jpg"
            alt="CodeVentures geometric studio forms"
            className="sst-bg"
            loading="lazy"
          />
          <div className="sst-bg-overlay" aria-hidden="true" />

          {/* 6 Ascending Stems & Concentric Marker Dots */}
          {NODES.map((node, idx) => (
            <span key={`node-${node.x}`}>
              <span
                ref={(el) => {
                  stemRefs.current[idx] = el;
                }}
                className="sst-stem"
                style={{
                  left: `calc(${node.x + X_OFFSET - 1} * var(--u))`,
                  top: cuy(node.dotY),
                  height: `calc(${1614 - node.dotY} * var(--uy))`,
                }}
              />
              <span
                ref={(el) => {
                  dotRefs.current[idx] = el;
                }}
                className="sst-dot"
                style={{
                  left: `calc(${node.x + X_OFFSET} * var(--u) - 29 * var(--u))`,
                  top: `calc(${node.dotY} * var(--uy) - 29 * var(--u))`,
                }}
              />
            </span>
          ))}

          {/* 6 Milestone Floating Frosted Chips */}
          {NODES.map((node, idx) => (
            <div
              key={`chip-${node.x}`}
              ref={(el) => {
                chipRefs.current[idx] = el;
              }}
              className="sst-chip"
              style={{
                left: cu(node.x + X_OFFSET),
                top: cuy(node.top),
                width: cu(CHIP_WIDTH),
                height: cuy(node.h),
              }}
            >
              <span>{node.label}</span>
            </div>
          ))}

          {/* Studio Copy — hero typography */}
          <div className="sst-copy">
            <h2 className="sst-h2 text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-bold text-white tracking-[-0.035em] leading-[1.04]">
              A studio of operators,
              <br />
              not just investors.
            </h2>
            <p className="sst-sub text-base sm:text-lg lg:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl">
              The Cheque is where most investors stop. It&apos;s where we start.
              We build alongside you on product, go-to-market,
              and growth — from idea to revenue to real scale.
            </p>
          </div>
        </section>
      </div>

      {/* 3. Mobile Fallback (Hidden on >=761px, Visible on Mobile) */}
      <section className="studio sst-mobile" data-no-motion="true">
        <h2 className="sst-m-h2 text-4xl font-bold text-white tracking-[-0.035em] leading-[1.04]">
          A studio of operators,
          <br />
          not just investors.
        </h2>
        <p className="sst-m-sub text-base text-neutral-300 font-normal leading-relaxed">
          The Cheque is where most investors stop. It&apos;s where we start. We
          build alongside you on product, go-to-market, and growth — from
          idea to revenue to real scale.
        </p>

        <div className="sst-m-list">
          {NODES.map((node, idx) => (
            <div
              key={`m-row-${node.x}`}
              ref={(el) => {
                mobileRowRefs.current[idx] = el;
              }}
              className="sst-m-row"
            >
              <span className="sst-m-dot" />
              <div className="sst-m-chip">{node.plain}</div>
            </div>
          ))}
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/studio-forms.jpg"
          alt="CodeVentures geometric studio forms"
          className="sst-m-art"
          loading="lazy"
        />
        <div className="sst-m-overlay" aria-hidden="true" />
      </section>
    </div>
  );
}
