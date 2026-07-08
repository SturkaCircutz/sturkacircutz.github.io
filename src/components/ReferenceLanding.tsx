'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Menu, Pause, Play, X } from 'lucide-react';
import { contactInfo, personalInfo, projects, skills } from '@/data/personalData';

const navItems = [
  { label: 'work', href: '#work' },
  { label: 'capabilities', href: '#capabilities' },
  { label: 'about', href: '#about' },
  { label: 'contact', href: '#contact' }
];

const serviceGroups = [
  {
    code: '01',
    title: 'Machine intelligence',
    body: 'ASR pipelines, pronunciation feedback, model training, neural-network experiments, and reinforcement-learning prototypes.',
    tags: ['ASR', 'RL', 'Python']
  },
  {
    code: '02',
    title: 'Systems craft',
    body: 'Low-level C/C++, CUDA practice, GPU programming notes, Linux tooling, and performance-minded implementation.',
    tags: ['C++', 'CUDA', 'Linux']
  },
  {
    code: '03',
    title: 'Web surfaces',
    body: 'TypeScript interfaces, Next.js apps, authenticated APIs, MongoDB-backed products, and focused launch pages.',
    tags: ['Next.js', 'React', 'MongoDB']
  }
];

const projectYears = ['2026', '2025', '2024'];
const heroStats = [
  ['Focus', 'ML / ASR'],
  ['Base', contactInfo.location],
  ['Track', personalInfo.stats.experience]
];

function scrollToTarget(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export default function ReferenceLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);

  const skillStrip = useMemo(
    () =>
      skills
        .slice()
        .sort((a, b) => b.level - a.level)
        .slice(0, 12)
        .map(skill => skill.name),
    []
  );

  const imageSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${personalInfo.image ?? '/IMG_2391.jpeg'}`;

  return (
    <main className={`reference-site ${motionPaused ? 'is-paused' : ''}`}>
      <header className="ref-nav" aria-label="Main navigation">
        <a
          href="#home"
          className="ref-logo"
          onClick={event => {
            event.preventDefault();
            scrollToTarget('#home');
          }}
        >
          JIAWEN SUN
        </a>

        <nav className="ref-links" aria-label="Sections">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={event => {
                event.preventDefault();
                scrollToTarget(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ref-actions">
          <button
            type="button"
            className="ref-icon-button"
            onClick={() => setMotionPaused(value => !value)}
            aria-label={motionPaused ? 'Play motion' : 'Pause motion'}
            title={motionPaused ? 'Play motion' : 'Pause motion'}
          >
            {motionPaused ? <Play size={18} /> : <Pause size={18} />}
          </button>
          <button
            type="button"
            className="ref-menu-button"
            onClick={() => setMenuOpen(value => !value)}
            aria-label="Toggle menu"
          >
            <span>MENU</span>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen && (
          <div className="ref-mobile-menu">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={event => {
                  event.preventDefault();
                  scrollToTarget(item.href);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <section id="home" className="hero-stage" aria-labelledby="hero-title">
        <div className="scene-grid" aria-hidden="true" />
        <aside className="side-badge side-badge-left">portfolio / local build</aside>
        <aside className="side-badge side-badge-right">machine learning</aside>

        <div className="hero-content">
          <div className="hero-kicker">
            <span>YEG / CA</span>
            <span>{personalInfo.subtitle}</span>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Portfolio / Jiawen Sun</p>
              <h1 id="hero-title">Machine learning, systems, and web engineering.</h1>
              <p className="hero-lede">
                {personalInfo.description}
              </p>
              <div className="hero-buttons">
                <button type="button" onClick={() => scrollToTarget('#work')}>
                  <span>View Work</span>
                  <ArrowUpRight size={18} />
                </button>
                <a href={`mailto:${contactInfo.email}`}>
                  <span>Contact</span>
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <div className="hero-visual" aria-label="Portfolio portrait and signal study">
              <div className="visual-frame">
                <Image src={imageSrc} alt={personalInfo.name} width={720} height={900} priority />
              </div>
              <div className="signal-field" aria-hidden="true" />
              <button type="button" onClick={() => scrollToTarget('#work')} className="ascii-play">
                <Play size={16} />
              </button>
            </div>
          </div>

          <div className="hero-bottom">
            {heroStats.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="work-index" aria-labelledby="work-title">
        <div className="section-rule">
          <span>WORK</span>
          <span>SELECTED REPOSITORIES</span>
        </div>
        <h2 id="work-title" className="identity-word">selected work</h2>

        <div className="work-list">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="work-row"
            >
              <span>{String(index + 1).padStart(3, '0')}</span>
              <span>{project.title}</span>
              <span>{project.status ?? 'Project'}</span>
              <span>{projectYears[index] ?? '2026'}</span>
            </a>
          ))}
        </div>

        <div className="feature-work">
          {projects.map((project, index) => (
            <article key={project.id}>
              <div className="feature-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{project.status ?? 'Project'}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-line">
                {project.technologies.slice(0, 5).map(tech => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link">
                <Github size={16} />
                <span>Repository</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="capabilities" className="services-section" aria-labelledby="services-title">
        <div className="section-rule dark">
          <span>CAPABILITIES</span>
          <span>CAPABILITY MAP</span>
        </div>
        <div className="services-layout">
          <div>
            <p className="eyebrow">practice areas</p>
            <h2 id="services-title">Signal, systems, and product surfaces.</h2>
          </div>
          <div className="service-stack">
            {serviceGroups.map(group => (
              <article key={group.code} className="service-row">
                <span>{group.code}</span>
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.body}</p>
                </div>
                <div className="tag-line">
                  {group.tags.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-section" aria-labelledby="about-title">
        <div className="about-media">
          <Image src={imageSrc} alt={personalInfo.name} width={720} height={900} priority />
          <div className="portrait-overlay">
            <span>PROFILE</span>
            <span>YEG / CA</span>
          </div>
        </div>
        <div className="about-copy">
          <div className="section-rule">
            <span>ABOUT</span>
            <span>PERSONAL SYSTEM</span>
          </div>
          <h2 id="about-title">{personalInfo.about}</h2>
          <div className="skill-marquee" aria-label="Technical skills">
            <div>
              {[...skillStrip, ...skillStrip].map((skill, index) => (
                <span key={`${skill}-${index}`}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="contact-top">
          <p className="eyebrow">research / product / build</p>
          <h2 id="contact-title">Build the next useful thing.</h2>
        </div>
        <div className="contact-grid">
          <a href={`mailto:${contactInfo.email}`} className="contact-link">
            <span>Email</span>
            <strong>{contactInfo.email}</strong>
          </a>
          <a href={contactInfo.social.github} target="_blank" rel="noreferrer" className="contact-link">
            <Github size={22} />
            <strong>github.com/SturkaCircutz</strong>
          </a>
          <a href={contactInfo.social.linkedin} target="_blank" rel="noreferrer" className="contact-link">
            <Linkedin size={22} />
            <strong>LinkedIn</strong>
          </a>
        </div>
      </section>
    </main>
  );
}
