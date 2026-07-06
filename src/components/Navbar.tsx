'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

// No props needed for simple navigation

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '#home', label: 'home' },
    { href: '#about', label: 'about' },
    { href: '#projects', label: 'projects' },
    { href: '#skills', label: 'skills' },
    { href: '#contact', label: 'contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full px-3 pt-3">
      <div className="glass mx-auto max-w-7xl rounded-lg px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              className="terminal-text text-lg font-bold text-[rgb(var(--text))] transition-colors hover:text-[rgb(var(--accent))] sm:text-2xl"
            >
              $ jiawen@sun:~$
            </a>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="terminal-text rounded-md px-3 py-2 text-sm font-medium text-[rgb(var(--muted))] transition-colors hover:bg-[rgb(var(--accent))]/10 hover:text-[rgb(var(--accent))]"
                >
                  ./{item.label}
                </a>
              ))}
              <ThemeSwitcher />
            </div>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeSwitcher />
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              className="rounded-md p-2 text-[rgb(var(--text))] transition-colors hover:bg-[rgb(var(--accent))]/10 hover:text-[rgb(var(--accent))]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="soft-panel mt-2 space-y-1 rounded-lg px-2 pb-3 pt-2 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="terminal-text block rounded-md px-3 py-2 text-base font-medium text-[rgb(var(--muted))] transition-colors hover:bg-[rgb(var(--accent))]/10 hover:text-[rgb(var(--accent))]"
                >
                  ./{item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
