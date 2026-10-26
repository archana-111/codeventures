'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Compass,
  FileCode2,
  Boxes,
  Rocket,
  TrendingUp,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JOURNEY_STEPS } from '@/data/codeventures-data';

export default function StartupJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepIcons = [Compass, FileCode2, Boxes, Rocket, TrendingUp];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop: Pinned controlled timeline
    mm.add('(min-width: 1024px)', () => {
      const pinContainer = pinContainerRef.current;
      const stepItems = gsap.utils.toArray<HTMLElement>('.journey-step-content');
      const visualPanels = gsap.utils.toArray<HTMLElement>('.journey-visual-panel');
      const progressBar = document.querySelector('.journey-progress-fill');

      if (!pinContainer || stepItems.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer,
          pin: true,
          start: 'top top',
          end: '+=2400',
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const stepIdx = Math.min(
              4,
              Math.floor(self.progress * 5)
            );
            setActiveStepIndex(stepIdx);
          },
        },
      });

      // Animate progress bar fill
      if (progressBar) {
        tl.to(progressBar, { height: '100%', ease: 'none', duration: 1 }, 0);
      }

      // Stagger cross-fade steps
      stepItems.forEach((step, i) => {
        if (i > 0) {
          const prevStep = stepItems[i - 1];
          const prevVisual = visualPanels[i - 1];
          const currVisual = visualPanels[i];

          // Fade out previous
          tl.to(
            prevStep,
            { opacity: 0.15, y: -20, duration: 0.25 },
            i * 0.22 - 0.1
          );
          if (prevVisual) {
            tl.to(
              prevVisual,
              { opacity: 0, scale: 0.95, duration: 0.2 },
              i * 0.22 - 0.1
            );
          }

          // Fade in current
          tl.fromTo(
            step,
            { opacity: 0.15, y: 20 },
            { opacity: 1, y: 0, duration: 0.25 },
            i * 0.22
          );
          if (currVisual) {
            tl.fromTo(
              currVisual,
              { opacity: 0, scale: 1.05 },
              { opacity: 1, scale: 1, duration: 0.25 },
              i * 0.22
            );
          }
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="relative bg-[#090a0d] border-t border-white/[0.06]">
      {/* Pinned Desktop Container */}
      <div
        ref={pinContainerRef}
        className="lg:min-h-screen py-20 lg:py-0 flex flex-col justify-center"
      >
        <div className="site-wrap w-full">
          {/* Section Header */}
          <div className="mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-xs font-mono uppercase text-emerald-400 mb-4">
              <span>OUR PROVEN METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-[-0.035em] leading-[1.08] mb-4">
              From first conversation
              <br />
              to first launch.
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl">
              A structured, sprint-based co-building methodology that takes your venture from early concept to a validated, high-traction launch.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Progress Line & Step Details */}
            <div className="lg:col-span-5 relative flex gap-6 sm:gap-8">
              {/* Vertical Progress Track */}
              <div className="hidden lg:block relative w-1 bg-white/[0.08] rounded-full my-2">
                <div className="journey-progress-fill absolute top-0 left-0 w-full bg-emerald-400 rounded-full h-[20%] transition-all duration-200 shadow-sm shadow-emerald-400" />
              </div>

              {/* Step Information Cards */}
              <div className="flex-1 space-y-12 lg:space-y-0 relative min-h-[360px] flex flex-col justify-center">
                {JOURNEY_STEPS.map((step, idx) => {
                  const Icon = stepIcons[idx];
                  const isActive = activeStepIndex === idx;

                  return (
                    <div
                      key={step.step}
                      className={`journey-step-content transition-all duration-300 ${
                        // On desktop, keep active step highlighted; on mobile, render all
                        'lg:absolute lg:inset-x-0'
                      } ${
                        isActive
                          ? 'opacity-100 z-10'
                          : 'lg:opacity-15 lg:pointer-events-none'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                          PHASE {step.step}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-neutral-700" />
                        <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {step.timeframe}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-light text-white mb-3">
                        {step.title}
                      </h3>

                      <p className="text-sm font-medium text-emerald-300 mb-4">
                        {step.focus}
                      </p>

                      <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
                        {step.description}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                        <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                          Key Deliverables:
                        </div>
                        {step.outputs.map((out) => (
                          <div key={out} className="flex items-center gap-2 text-xs text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{out}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Dynamic Technical Blueprint / Visual Canvas */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl bg-[#12151b] border border-white/[0.08] p-6 sm:p-8 shadow-2xl min-h-[420px] flex items-center justify-center overflow-hidden">
                {/* Visual Canvas 01: Discover */}
                <div
                  className={`journey-visual-panel transition-all duration-500 w-full ${
                    activeStepIndex === 0
                      ? 'opacity-100 scale-100 z-10'
                      : 'lg:opacity-0 lg:scale-95 lg:absolute'
                  }`}
                >
                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-neutral-400 text-[11px]">
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" /> 01 • DISCOVERY WORKSHOP BLUEPRINT
                      </span>
                      <span>COLLABORATIVE AUDIT</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-3">
                      <div className="text-white font-medium text-sm font-sans">
                        Founder Concept De-risking
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                        <div className="p-2.5 rounded bg-white/[0.03] border border-white/[0.05]">
                          <div className="text-neutral-400 text-[10px]">User Pain Point</div>
                          <div className="text-emerald-400 font-semibold mt-1">High Severity</div>
                        </div>
                        <div className="p-2.5 rounded bg-white/[0.03] border border-white/[0.05]">
                          <div className="text-neutral-400 text-[10px]">Market Moat</div>
                          <div className="text-white font-semibold mt-1">Proprietary IP</div>
                        </div>
                        <div className="p-2.5 rounded bg-white/[0.03] border border-white/[0.05]">
                          <div className="text-neutral-400 text-[10px]">Validation Score</div>
                          <div className="text-emerald-400 font-semibold mt-1">94% Fit</div>
                        </div>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                        We define the minimum feature set necessary to prove customer demand
                        and eliminate months of wasted exploratory development.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual Canvas 02: Define */}
                <div
                  className={`journey-visual-panel transition-all duration-500 w-full ${
                    activeStepIndex === 1
                      ? 'opacity-100 scale-100 z-10'
                      : 'lg:opacity-0 lg:scale-95 lg:absolute'
                  }`}
                >
                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-neutral-400 text-[11px]">
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <FileCode2 className="w-3.5 h-3.5" /> 02 • ARCHITECTURE & SCOPE DE-RISKING
                      </span>
                      <span>SYSTEM SPEC</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-3">
                      <div className="text-white font-medium text-sm font-sans">
                        Modular Microservices Blueprint
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] space-y-1.5 text-neutral-300">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Auth & RBAC:</span>
                          <span className="text-emerald-400">OAuth2 + MFA Token Engine</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Database Layer:</span>
                          <span className="text-white">PostgreSQL with Row-Level Security</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Billing Subsystem:</span>
                          <span className="text-white">Stripe Subscriptions & Webhooks</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Cloud Infrastructure:</span>
                          <span className="text-emerald-400">AWS ECS / Docker / CloudFront</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Canvas 03: Build */}
                <div
                  className={`journey-visual-panel transition-all duration-500 w-full ${
                    activeStepIndex === 2
                      ? 'opacity-100 scale-100 z-10'
                      : 'lg:opacity-0 lg:scale-95 lg:absolute'
                  }`}
                >
                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-neutral-400 text-[11px]">
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <Boxes className="w-3.5 h-3.5" /> 03 • AGILE SPRINT & CONTINUOUS SHIP
                      </span>
                      <span>WEEKLY BUILDS</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-3">
                      <div className="text-white font-medium text-sm font-sans">
                        Continuous Integration & Delivery Pipeline
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded bg-white/[0.03] text-[11px]">
                          <span className="text-neutral-300">Test Suite Coverage</span>
                          <span className="text-emerald-400 font-bold">92.4% Passed</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-white/[0.03] text-[11px]">
                          <span className="text-neutral-300">Staging Deployment</span>
                          <span className="text-emerald-400 font-bold">Passed (Commit #9f4a1)</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-white/[0.03] text-[11px]">
                          <span className="text-neutral-300">Founder Demo Cadence</span>
                          <span className="text-white font-bold">Every Friday 10:00 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Canvas 04: Launch */}
                <div
                  className={`journey-visual-panel transition-all duration-500 w-full ${
                    activeStepIndex === 3
                      ? 'opacity-100 scale-100 z-10'
                      : 'lg:opacity-0 lg:scale-95 lg:absolute'
                  }`}
                >
                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-neutral-400 text-[11px]">
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <Rocket className="w-3.5 h-3.5" /> 04 • STORE & CLOUD GO-LIVE
                      </span>
                      <span>PRODUCTION ACTIVE</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-3">
                      <div className="text-white font-medium text-sm font-sans">
                        Market Readiness & Pilot Acquisition
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-center text-[11px]">
                        <div className="p-3 rounded bg-white/[0.03] border border-white/[0.05]">
                          <div className="text-neutral-400 text-[10px]">App Stores Approval</div>
                          <div className="text-emerald-400 font-bold mt-1">iOS + Play Published</div>
                        </div>
                        <div className="p-3 rounded bg-white/[0.03] border border-white/[0.05]">
                          <div className="text-neutral-400 text-[10px]">First 10 Pilot Users</div>
                          <div className="text-white font-bold mt-1">Onboarded & Monitored</div>
                        </div>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                        We actively monitor live session telemetry, error budgets, and user
                        drop-offs to patch initial friction points immediately.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual Canvas 05: Grow */}
                <div
                  className={`journey-visual-panel transition-all duration-500 w-full ${
                    activeStepIndex === 4
                      ? 'opacity-100 scale-100 z-10'
                      : 'lg:opacity-0 lg:scale-95 lg:absolute'
                  }`}
                >
                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-neutral-400 text-[11px]">
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" /> 05 • SCALE & CAPITAL ADVISORY
                      </span>
                      <span>SEED READY</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-3">
                      <div className="text-white font-medium text-sm font-sans">
                        Venture Scaling Data Room
                      </div>
                      <div className="space-y-2 text-[11px]">
                        <div className="flex justify-between p-2 rounded bg-white/[0.03]">
                          <span className="text-neutral-300">Cohort 30-Day Retention:</span>
                          <span className="text-emerald-400 font-bold">48.6%</span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-white/[0.03]">
                          <span className="text-neutral-300">Interim CTO Advisory:</span>
                          <span className="text-white font-bold">Investor Due Diligence Ready</span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-white/[0.03]">
                          <span className="text-neutral-300">Talent Transition:</span>
                          <span className="text-emerald-400 font-bold">Seamless In-house Handover</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
