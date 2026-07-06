'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowDown, BadgeCheck, Cpu, Github, Mail, MapPin, Sparkles } from 'lucide-react';
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
  const imageSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${personalInfo.image}`;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <BashTerminal />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.92fr]">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/72 px-3 py-2 text-sm text-[rgb(var(--muted))] shadow-sm">
              <Sparkles size={16} className="text-[rgb(var(--accent))]" aria-hidden="true" />
              <span className="terminal-text">{personalInfo.subtitle}</span>
            </div>
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

          <div className="mx-auto w-full max-w-[29rem]">
            <div className="plastic-card relative overflow-hidden rounded-lg p-5 sm:p-6">
              <div className="subtle-stripe pointer-events-none absolute inset-x-0 top-0 h-12 opacity-30" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="terminal-text text-xs font-bold uppercase text-[rgb(var(--accent))]">verified portfolio card</p>
                  <h2 className="mt-2 text-3xl font-black text-[rgb(var(--text))]">{personalInfo.name}</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--background))]/40 text-[rgb(var(--accent))]">
                  <BadgeCheck size={26} aria-hidden="true" />
                </div>
              </div>

              <div className="relative mt-6 grid grid-cols-[7.5rem_1fr] gap-5">
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface-soft))] shadow-xl">
                    <Image
                      src={imageSrc}
                      alt={personalInfo.name}
                      width={360}
                      height={450}
                      className="aspect-[4/5] h-full w-full object-cover"
                    />
                  </div>
                  <div className="rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--background))]/35 px-3 py-2">
                    <div className="flex items-center gap-2 text-xs text-[rgb(var(--muted))]">
                      <MapPin size={13} className="text-[rgb(var(--accent))]" aria-hidden="true" />
                      Edmonton, AB
                    </div>
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="text-lg font-bold leading-6 text-[rgb(var(--text))]">{personalInfo.title}</p>
                  <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted))]">{personalInfo.about}</p>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {[
                      [personalInfo.stats.projects, 'repos'],
                      ['CS', 'honors'],
                      ['ML', 'focus']
                    ].map(([value, label]) => (
                      <div key={String(label)} className="rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--background))]/36 p-3 text-center">
                        <div className="text-xl font-black text-[rgb(var(--accent))]">{value}</div>
                        <div className="text-xs text-[rgb(var(--muted))]">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative mt-6 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--background))]/36 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="terminal-text text-xs font-bold uppercase text-[rgb(var(--accent))]">public repo strip</p>
                  <Cpu size={16} className="text-[rgb(var(--accent))]" aria-hidden="true" />
                </div>
                <div className="grid gap-2">
                  {projects.slice(0, 3).map(project => (
                    <a
                      key={project.id}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-md px-2 py-2 transition hover:bg-[rgb(var(--surface-soft))]/70"
                    >
                      <span className="truncate text-sm font-semibold text-[rgb(var(--text))]">{project.title}</span>
                      <span className="shrink-0 rounded-md bg-[rgb(var(--accent))]/14 px-2 py-1 text-xs font-semibold text-[rgb(var(--accent))]">
                        {project.status}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative mt-5 flex items-center justify-between gap-4">
                <div className="h-10 flex-1 rounded-sm bg-[repeating-linear-gradient(90deg,rgb(var(--text))_0_2px,transparent_2px_5px)] opacity-40" />
                <p className="terminal-text text-xs text-[rgb(var(--muted))]">ID: JS-ML-SYS-2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
