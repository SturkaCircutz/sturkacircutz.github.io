'use client';

import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '@/types';

interface CardProps {
  project: Project;
  index: number;
}

const Interactive3DCard = ({ project, index }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 28 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 28 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="perspective-1000 h-full"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
    >
      <div className="soft-panel relative flex h-full min-h-[25rem] flex-col overflow-hidden rounded-lg p-6 transition hover:-translate-y-1 hover:border-[rgb(var(--accent))]/70">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-strong))] to-transparent" />
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="terminal-text text-xs font-bold uppercase text-[rgb(var(--accent))]">
              {project.status ?? 'Public Repo'}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[rgb(var(--text))]">{project.title}</h3>
          </div>
          <div className="h-12 w-12 shrink-0 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--background))]/35 text-center text-xl font-black leading-[3rem] text-[rgb(var(--accent))] shadow-inner">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        <p className="flex-1 text-sm leading-7 text-[rgb(var(--muted))]">{project.description}</p>

        <div className="mt-5">
          <p className="terminal-text mb-2 text-xs font-bold text-[rgb(var(--accent))]">&gt; STACK</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(item => (
              <span
                key={item}
                className="rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--background))]/35 px-2 py-1 text-xs font-medium text-[rgb(var(--text))]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[rgb(var(--accent))] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              <Github size={16} aria-hidden="true" />
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[rgb(var(--border))] px-4 py-2 text-sm font-semibold text-[rgb(var(--text))] transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
            >
              <ExternalLink size={16} aria-hidden="true" />
              Live
            </a>
          )}
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 rounded-lg bg-[rgb(var(--accent))]/10"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.article>
  );
};

export default Interactive3DCard;
