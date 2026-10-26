'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

type ThemeToggleProps = {
  className?: string;
  showLabel?: boolean;
};

export default function ThemeToggle({
  className = '',
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full border border-cv-border-subtle bg-cv-elevated/40 p-2.5 text-cv-fg-muted transition-colors hover:bg-cv-elevated/70 hover:text-cv-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${className}`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <Sun
          className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
            mounted && !isDark
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-75 opacity-0'
          }`}
          aria-hidden
        />
        <Moon
          className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
            mounted && isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-75 opacity-0'
          }`}
          aria-hidden
        />
      </span>
      {showLabel && (
        <span className="text-sm font-medium pr-0.5">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
}
