'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ArrowUpRight, Loader2 } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel?: string;
}

export default function ApplicationModal({
  isOpen,
  onClose,
  selectedModel,
}: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    founderName: '',
    email: '',
    phone: '',
    startupName: '',
    stage: 'Idea Stage',
    model: selectedModel || 'Turnkey Startup ($10k-$20k)',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-xl rounded-[18px] bg-cv-elevated/95 backdrop-blur-xl border border-cv-border p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-cv-border text-cv-fg-muted hover:text-cv-fg hover:border-cv-border transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-10 h-10 text-[#00BFA5] mx-auto" />
            <h3 className="text-2xl sm:text-3xl font-bold text-cv-fg tracking-[-0.035em]">
              Application received
            </h3>
            <p className="text-base text-cv-fg-subtle max-w-sm mx-auto leading-relaxed">
              Thank you, {formData.founderName || 'Founder'}. Our studio partners will review your
              materials and reach out within 1 business day.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-cv-on-accent font-semibold text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-2 pr-8">
              <p className="text-sm font-medium text-[#00BFA5] mb-3">2026 cohort intake</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-cv-fg tracking-[-0.035em] leading-[1.12]">
                Build with CodeVentures
              </h3>
              <p className="text-base text-cv-fg-subtle mt-2 leading-relaxed">
                Share your venture details to schedule your Discovery Consultation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-cv-fg-muted mb-1">Founder name *</label>
                <input
                  required
                  type="text"
                  value={formData.founderName}
                  onChange={(e) =>
                    setFormData({ ...formData, founderName: e.target.value })
                  }
                  placeholder="Your Name"
                  className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-3.5 py-2.5"
                />
              </div>
              <div>
                <label className="block text-sm text-cv-fg-muted mb-1">Email address *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@company.com"
                  className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-cv-fg-muted mb-1">Startup concept / name</label>
                <input
                  type="text"
                  value={formData.startupName}
                  onChange={(e) =>
                    setFormData({ ...formData, startupName: e.target.value })
                  }
                  placeholder="Venture Name"
                  className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-3.5 py-2.5"
                />
              </div>
              <div>
                <label className="block text-sm text-cv-fg-muted mb-1">Phone number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="(312) 000-0000"
                  className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-cv-fg-muted mb-1">Stage</label>
                <select
                  value={formData.stage}
                  onChange={(e) =>
                    setFormData({ ...formData, stage: e.target.value })
                  }
                  className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-3 py-2.5"
                >
                  <option value="Idea Stage">Idea Stage (Pre-code)</option>
                  <option value="Prototype">Prototype / Wireframe</option>
                  <option value="Validated MVP">Validated MVP</option>
                  <option value="Scaling">Scaling Startup</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-cv-fg-muted mb-1">Partnership model</label>
                <select
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-3 py-2.5"
                >
                  <option value="Early MVP ($4,000)">Early MVP ($4,000)</option>
                  <option value="Turnkey Startup ($10k-$20k)">Turnkey Startup ($10k–$20k)</option>
                  <option value="Dedicated Team ($3.8k/mo+)">Dedicated Team ($3.8k/mo+)</option>
                  <option value="Discovery Workshop Only">Discovery Workshop Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-cv-fg-muted mb-1">Brief vision summary *</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="What are you building and who is your target market?"
                className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-3.5 py-2.5 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group inline-flex items-center justify-center gap-3 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-cv-on-accent font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-emerald-500/25 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Submit application</span>
                  <span className="w-5 h-5 rounded-full bg-cv-on-accent/15 flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
