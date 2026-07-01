'use client';

import { contactInfo, personalInfo } from '@/data/personalData';

const Footer = () => {
  return (
    <footer className="border-t border-[rgb(var(--border))] px-4 py-10 text-[rgb(var(--text))] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div>
          <h3 className="text-2xl font-bold">{personalInfo.name}</h3>
          <p className="mt-2 text-[rgb(var(--muted))]">{personalInfo.subtitle}</p>
        </div>

        <div className="space-y-2 text-sm text-[rgb(var(--muted))]">
          <div>{contactInfo.email}</div>
          <div>© 2026 {personalInfo.name}. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
