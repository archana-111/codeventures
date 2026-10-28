'use client';

import React, { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Loader2,
} from 'lucide-react';

interface FinalCTAProps {
  preselectedModel?: string;
}

export default function FinalCTA({ preselectedModel }: FinalCTAProps) {
  const [formData, setFormData] = useState({
    founderName: '',
    email: '',
    phone: '',
    startupName: '',
    stage: 'Idea Stage',
    model: preselectedModel || 'Turnkey Startup ($10k-$20k)',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section id="apply" className="relative py-28 sm:py-36 lg:py-48 bg-cv-page-alt border-t border-cv-border-subtle overflow-hidden">
      <div className="site-wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-6">
            <p className="text-sm font-medium text-[#00BFA5] mb-5">2026 cohort applications open</p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-cv-fg tracking-[-0.035em] leading-[1.04] mb-8">
              Your next big idea deserves
              <br />
              the right team.
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-cv-fg-subtle font-normal leading-relaxed mb-12 max-w-lg">
              Let’s turn your vision into a product, and your product into a business.
              We evaluate applications on a rolling basis and respond within 1 business day.
            </p>

            <div className="space-y-5 text-base text-cv-fg-subtle">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#00BFA5] shrink-0" />
                <a href="mailto:hello@codeventures.com" className="hover:text-cv-fg transition-colors">
                  hello@codeventures.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#00BFA5] shrink-0" />
                <a href="tel:3124236728" className="hover:text-cv-fg transition-colors">
                  (312) 423-6728
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#00BFA5] shrink-0" />
                <span>1020 Milwaukee Ave, #245, Deerfield, IL – 60015</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="cv-light-panel rounded-[18px] bg-cv-elevated/90 backdrop-blur-xl border border-cv-border p-8 sm:p-10">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-[#00BFA5] mx-auto mb-2" />
                  <h3 className="text-2xl sm:text-3xl font-bold text-cv-fg tracking-[-0.035em]">
                    Application received
                  </h3>
                  <p className="text-base text-cv-fg-subtle max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.founderName || 'Founder'}. Our venture team and Aji Abraham
                    will review your submission and reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-2">
                    <h3 className="text-2xl font-bold text-cv-fg tracking-[-0.035em] leading-[1.12]">
                      Start building with CodeVentures
                    </h3>
                    <p className="text-base text-cv-fg-subtle mt-2 leading-relaxed">
                      Tell us about your venture concept to schedule your Discovery Consultation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-cv-fg-muted mb-1.5">Your name *</label>
                      <input
                        required
                        type="text"
                        value={formData.founderName}
                        onChange={(e) =>
                          setFormData({ ...formData, founderName: e.target.value })
                        }
                        placeholder="e.g. Alex Miller"
                        className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-cv-fg-muted mb-1.5">Work email *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="alex@domain.com"
                        className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-4 py-3"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-cv-fg-muted mb-1.5">Startup name / concept</label>
                      <input
                        type="text"
                        value={formData.startupName}
                        onChange={(e) =>
                          setFormData({ ...formData, startupName: e.target.value })
                        }
                        placeholder="e.g. NovaHealth"
                        className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-cv-fg-muted mb-1.5">Phone number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="(312) 000-0000"
                        className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-4 py-3"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-cv-fg-muted mb-1.5">Current stage</label>
                      <select
                        value={formData.stage}
                        onChange={(e) =>
                          setFormData({ ...formData, stage: e.target.value })
                        }
                        className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-4 py-3"
                      >
                        <option value="Idea Stage">Idea Stage (Pre-code)</option>
                        <option value="Prototype">Wireframe / Prototype</option>
                        <option value="Validated MVP">Validated MVP / Early Users</option>
                        <option value="Growth">Scaling / Seeking Tech Team</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-cv-fg-muted mb-1.5">Collaboration model</label>
                      <select
                        value={formData.model}
                        onChange={(e) =>
                          setFormData({ ...formData, model: e.target.value })
                        }
                        className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-4 py-3"
                      >
                        <option value="Early MVP ($4,000)">Early MVP ($4,000)</option>
                        <option value="Turnkey Startup ($10k-$20k)">Turnkey Startup ($10k–$20k)</option>
                        <option value="Dedicated Team ($3.8k/mo+)">Dedicated Team ($3.8k/mo+)</option>
                        <option value="Discovery Workshop Only">Discovery Workshop Only</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-cv-fg-muted mb-1.5">
                      Tell us briefly about what you are building *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="What user problem does your venture solve? Who is the customer?"
                      className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-4 py-3 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="cv-btn-primary w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-cv-on-accent font-semibold text-sm tracking-wide transition-all duration-300 dark:shadow-xl dark:shadow-emerald-500/25 dark:hover:shadow-emerald-500/40 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Submit venture application</span>
                        <span className="w-5 h-5 rounded-full bg-cv-on-accent/15 flex items-center justify-center">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </>
                    )}
                  </button>

                  <p className="text-sm text-center text-cv-fg-muted">
                    Strict NDA protected · Review by senior partners only
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
