'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, Github, Mail } from 'lucide-react';
import { contactInfo, personalInfo, projects } from '@/data/personalData';
import BashTerminal from './BashTerminal';

const Hero = () => {
  const [displayedName, setDisplayedName] = useState('');
  const [displayedDescription, setDisplayedDescription] = useState('');
  const [isTypingName, setIsTypingName] = useState(false);
  const [isTypingDescription, setIsTypingDescription] = useState(false);

  useEffect(() => {
    let nameIndex = 0;
    let descriptionIndex = 0;
    let descriptionTimer: ReturnType<typeof setInterval>;

    setIsTypingName(true);
    const nameTimer = setInterval(() => {
      if (nameIndex < personalInfo.name.length) {
        setDisplayedName(personalInfo.name.slice(0, nameIndex + 1));
        nameIndex++;
        return;
      }

      setIsTypingName(false);
      clearInterval(nameTimer);

      setTimeout(() => {
        setIsTypingDescription(true);
        descriptionTimer = setInterval(() => {
          if (descriptionIndex < personalInfo.description.length) {
            setDisplayedDescription(personalInfo.description.slice(0, descriptionIndex + 1));
            descriptionIndex++;
            return;
          }

          setIsTypingDescription(false);
          clearInterval(descriptionTimer);
        }, 18);
      }, 350);
    }, 90);

    return () => {
      clearInterval(nameTimer);
      clearInterval(descriptionTimer);
    };
  }, []);

  const scrollToSection = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-28 h-24 w-24 rounded-full bg-[rgb(var(--accent))]/15 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-[rgb(var(--accent-strong))]/15 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl">
        <BashTerminal />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-7">
            <p className="terminal-text text-sm font-semibold uppercase tracking-normal text-[rgb(var(--accent))]">
              {personalInfo.subtitle}
            </p>
            <h1 className="terminal-text text-balance text-5xl font-bold leading-tight text-[rgb(var(--text))] sm:text-6xl lg:text-7xl">
              {displayedName}
              {isTypingName && <span className="animate-pulse text-[rgb(var(--accent))]">_</span>}
            </h1>
            <p className="text-2xl font-semibold text-[rgb(var(--accent))] sm:text-3xl">
              {personalInfo.title}
            </p>
            <p className="max-w-3xl text-lg leading-8 text-[rgb(var(--muted))]">
              {displayedDescription}
              {isTypingDescription && <span className="animate-pulse text-[rgb(var(--accent))]">_</span>}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection('#projects')}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[rgb(var(--accent))] px-6 py-3 font-semibold text-slate-950 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
              >
                <ArrowDown size={18} aria-hidden="true" />
                View Projects
              </button>
              <a
                href={contactInfo.social.github}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[rgb(var(--border))] px-6 py-3 font-semibold text-[rgb(var(--text))] transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
              >
                <Github size={18} aria-hidden="true" />
                GitHub
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[rgb(var(--border))] px-6 py-3 font-semibold text-[rgb(var(--text))] transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
              >
                <Mail size={18} aria-hidden="true" />
                Contact
              </a>
            </div>
          </div>

          <div className="perspective-1000 mx-auto w-full max-w-md">
            <div className="transform-style-preserve-3d hover:rotate-y-180 relative h-[28rem] w-full transition duration-700">
              <div className="backface-hidden glass accent-glow absolute inset-0 overflow-hidden rounded-lg p-6">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-5 h-28 w-28 overflow-hidden rounded-full border-2 border-[rgb(var(--accent))]">
                      <img
                        src={personalInfo.image}
                        alt={personalInfo.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h2 className="gradient-text text-3xl font-bold">{personalInfo.name}</h2>
                    <p className="mt-2 text-lg font-semibold text-[rgb(var(--text))]">{personalInfo.title}</p>
                    <p className="mt-4 text-sm leading-6 text-[rgb(var(--muted))]">{personalInfo.about}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-md bg-[rgb(var(--surface-soft))]/70 p-3">
                      <div className="text-2xl font-bold text-[rgb(var(--accent))]">{personalInfo.stats.projects}</div>
                      <div className="text-xs text-[rgb(var(--muted))]">repos</div>
                    </div>
                    <div className="rounded-md bg-[rgb(var(--surface-soft))]/70 p-3">
                      <div className="text-2xl font-bold text-[rgb(var(--accent))]">CS</div>
                      <div className="text-xs text-[rgb(var(--muted))]">honors</div>
                    </div>
                    <div className="rounded-md bg-[rgb(var(--surface-soft))]/70 p-3">
                      <div className="text-2xl font-bold text-[rgb(var(--accent))]">ML</div>
                      <div className="text-xs text-[rgb(var(--muted))]">focus</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rotate-y-180 backface-hidden glass accent-glow absolute inset-0 overflow-hidden rounded-lg p-6">
                <div className="flex h-full flex-col">
                  <p className="terminal-text mb-4 text-sm font-bold text-[rgb(var(--accent))]">&gt; PUBLIC_REPOS</p>
                  <div className="space-y-3 overflow-hidden">
                    {projects.slice(0, 6).map(project => (
                      <a
                        key={project.id}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-md border border-[rgb(var(--border))]/70 bg-[rgb(var(--surface-soft))]/50 p-3 transition hover:border-[rgb(var(--accent))]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-semibold text-[rgb(var(--text))]">{project.title}</span>
                          <span className="shrink-0 text-xs text-[rgb(var(--accent))]">{project.status}</span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[rgb(var(--muted))]">
                          {project.description}
                        </p>
                      </a>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToSection('#projects')}
                    className="mt-auto rounded-md bg-[rgb(var(--accent))] px-4 py-3 font-semibold text-slate-950 transition hover:brightness-110"
                  >
                    Open full project list
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
