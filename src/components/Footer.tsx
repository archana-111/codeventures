'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cv-page border-t border-cv-border-subtle text-cv-fg-muted">
      <div className="site-wrap py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-cv-border-subtle">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-mono font-bold text-sm">
                &lt;/&gt;
              </div>
              <div className="flex items-center tracking-tight text-cv-fg font-medium text-lg">
                <span>c</span>
                <span className="text-emerald-500 font-bold">&lt;&gt;</span>
                <span>de</span>
                <span className="text-emerald-500 font-mono font-light ml-0.5">{'{'}</span>
                <span className="text-cv-fg font-semibold">ventures</span>
                <span className="text-emerald-500 font-mono font-light">{'}'}</span>
              </div>
            </Link>

            <p className="text-cv-fg-subtle text-base leading-relaxed max-w-sm">
              CodeVentures is the premier startup studio of Armia Systems, Inc.
              We operate as your dedicated technical co-founder, building scalable software
              and investing capital to turn bold ideas into generational companies.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-medium text-cv-fg mb-5">Explore studio</h4>
            <ul className="space-y-3 text-base">
              {[
                { label: 'Why CodeVentures', href: '#services' },
                { label: 'The Studio Advantage', href: '#advantage' },
                { label: 'Featured Portfolio', href: '#portfolio' },
                { label: 'Partnership Models & Pricing', href: '#models' },
                { label: 'Founder & Track Record', href: '#founder' },
                { label: '$100K+ Partner Perks', href: '#perks' },
                { label: 'Frequently Asked Questions', href: '#faq' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-cv-fg transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-sm font-medium text-cv-fg mb-5">Headquarters & contact</h4>
            <div className="space-y-3.5 text-base text-cv-fg-subtle">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00BFA5] shrink-0 mt-1" />
                <span>1020 Milwaukee Ave, #245<br />Deerfield, IL – 60015, United States</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00BFA5] shrink-0" />
                <a href="tel:3124236728" className="hover:text-cv-fg transition-colors">
                  (312) 423-6728
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00BFA5] shrink-0" />
                <a href="mailto:hello@codeventures.com" className="hover:text-cv-fg transition-colors">
                  hello@codeventures.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cv-fg-muted">
          <div>© 2026 CodeVentures Studio. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="https://www.armiasystems.com" target="_blank" rel="noopener noreferrer" className="hover:text-cv-fg-subtle transition-colors">
              Armia Systems, Inc.
            </a>
            <a href="#faq" className="hover:text-cv-fg-subtle transition-colors">
              Privacy & Legal
            </a>
            <a href="#apply" className="hover:text-[#00BFA5] transition-colors">
              Apply to Studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
