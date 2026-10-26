'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ITEMS = [
  {
    title: 'Your first investor, before you start.',
    body: 'We join from day zero with aligned equity and absorb up to 50% of initial product development cost.',
  },
  {
    title: 'Zero hardware & software overhead.',
    body: 'Enterprise infrastructure, tooling, and $100K+ in partner credits so you skip the early spend.',
  },
  {
    title: 'Your own technical team.',
    body: 'A senior squad of architects, designers, and QA — ready immediately, without a 4–6 month hire.',
  },
];

export default function ProgramBenefits() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

    gsap.registerPlugin(ScrollTrigger);

    const setOverlay = () => {
      const core = coreRef.current;
      if (!core) return;
      const sectionBox = section.getBoundingClientRect();
      const coreBox = core.getBoundingClientRect();
      const centerX = coreBox.left - sectionBox.left + coreBox.width / 2;
      section.style.setProperty('--adv-overlay-w', `${centerX}px`);
    };

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(setOverlay);
    };

    setOverlay();
    window.addEventListener('resize', onResize);
    ScrollTrigger.addEventListener('refresh', onResize);

    const clearOverlay = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      ScrollTrigger.removeEventListener('refresh', onResize);
      section.style.removeProperty('--adv-overlay-w');
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 960px)').matches;

    if (prefersReducedMotion || isMobile) {
      ringRefs.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'translate(-50%, -50%)';
      });
      [...itemRefs.current, coreRef.current].forEach((el) => {
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = el === coreRef.current ? 'translate(-50%, -50%)' : 'none';
      });
      return clearOverlay;
    }

    const ctx = gsap.context(() => {
      const rings = ringRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
      const items = itemRefs.current.filter((el): el is HTMLElement => Boolean(el));
      const core = coreRef.current;

      gsap.set(rings, { opacity: 0 });
      gsap.set(core, {
        opacity: 1,
        scale: 0,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: 'center center',
      });
      gsap.set(items, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          onRefresh: setOverlay,
        },
      });

      tl.to(core, { scale: 1, duration: 0.18, ease: 'back.out(1.6)' }, 0);
      tl.to(rings[0], { opacity: 1, duration: 0.3, ease: 'power3.out', force3D: true }, 0.2);
      tl.to(items[0], { opacity: 1, y: 0, duration: 0.24, ease: 'power2.out' }, 0.24);
      tl.to(rings[1], { opacity: 1, duration: 0.3, ease: 'power3.out', force3D: true }, 0.5);
      tl.to(items[1], { opacity: 1, y: 0, duration: 0.24, ease: 'power2.out' }, 0.54);
      tl.to(rings[2], { opacity: 1, duration: 0.3, ease: 'power3.out', force3D: true }, 0.78);
      tl.to(items[2], { opacity: 1, y: 0, duration: 0.24, ease: 'power2.out' }, 0.82);
      tl.to({}, { duration: 0.1 });
    }, wrap);

    return () => {
      ctx.revert();
      clearOverlay();
    };
  }, []);

  return (
    <div className="adv-why-wrap" ref={wrapRef}>
      <section id="advantage" ref={sectionRef} className="adv-why">
        <div className="adv-why-overlay backdrop-blur-3xl backdrop-saturate-150" aria-hidden="true" />

        <div className="adv-why-inner">
          <div className="adv-why-grid">
            <div className="adv-why-left">
              <h2 className="adv-why-title">
                CodeVentures <span>advantage</span>
              </h2>
              <p className="adv-why-sub">Everything you need to move forward.</p>
            </div>

            <div className="adv-why-right">
              <div className="adv-why-center" aria-hidden="true">
                <div className="adv-ripple">
                  <div
                    className="adv-ring"
                    ref={(el) => {
                      ringRefs.current[2] = el;
                    }}
                  />
                  <div
                    className="adv-ring adv-ring-2"
                    ref={(el) => {
                      ringRefs.current[1] = el;
                    }}
                  />
                  <div
                    className="adv-ring adv-ring-3"
                    ref={(el) => {
                      ringRefs.current[0] = el;
                    }}
                  />
                </div>
              </div>

              <div className="adv-core" ref={coreRef} aria-hidden="true">
                <Image src="/assets/advantage-sphere.png" alt="" width={210} height={210} />
              </div>

              <div className="adv-why-items">
                {ITEMS.map((item, index) => (
                  <article
                    key={item.title}
                    className="adv-why-item"
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                  >
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
