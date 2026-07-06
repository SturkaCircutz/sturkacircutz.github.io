'use client';

import { useEffect, useState } from 'react';
import { Contrast, Moon, Palette } from 'lucide-react';

const themes = [
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'minimal', label: 'Minimal', icon: Palette },
  { id: 'high-contrast', label: 'High Contrast', icon: Contrast }
] as const;

type ThemeId = (typeof themes)[number]['id'];

const storageKey = 'jiawen-site-theme';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<ThemeId>('dark');

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as ThemeId | null;
    const nextTheme = themes.some(item => item.id === stored) ? stored : 'dark';
    if (nextTheme) {
      setTheme(nextTheme);
      document.body.dataset.theme = nextTheme;
    }
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<ThemeId>).detail;
      if (themes.some(item => item.id === nextTheme)) {
        setTheme(nextTheme);
      }
    };

    window.addEventListener('portfolio-theme-change', handleThemeChange);
    return () => window.removeEventListener('portfolio-theme-change', handleThemeChange);
  }, []);

  const currentIndex = themes.findIndex(item => item.id === theme);
  const currentTheme = themes[currentIndex] ?? themes[0];
  const Icon = currentTheme.icon;

  const cycleTheme = () => {
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme.id);
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      title={`Switch theme. Current: ${currentTheme.label}`}
      aria-label={`Switch theme. Current theme is ${currentTheme.label}`}
      className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/70 px-3 text-sm font-semibold text-[rgb(var(--text))] shadow-lg shadow-black/10 backdrop-blur transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] sm:min-w-32"
    >
      <Icon size={16} aria-hidden="true" />
      <span className="hidden sm:inline">{currentTheme.label}</span>
    </button>
  );
};

export default ThemeSwitcher;
