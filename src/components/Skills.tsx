'use client';

import { skills } from '@/data/personalData';
import { Skill } from '@/types';

const categories: Array<{ id: Skill['category']; title: string; summary: string }> = [
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    summary: 'ASR, model training, neural networks, and reinforcement learning.'
  },
  {
    id: 'languages',
    title: 'Languages',
    summary: 'C/C++, CUDA, Triton, Python, TypeScript, RISC-V, and Emacs Lisp.'
  },
  {
    id: 'web-backend',
    title: 'Web & Backend',
    summary: 'React, Next.js, Express, MongoDB, and JWT-authenticated applications.'
  },
  {
    id: 'systems',
    title: 'Systems',
    summary: 'Low-level programming, Git/GitHub workflows, GPU programming, and Linux tooling.'
  }
];

const Skills = () => {
  return (
    <section id="skills" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="terminal-text mb-3 text-sm font-semibold text-[rgb(var(--accent))]">&gt; RESUME_SKILLS</p>
          <h2 className="text-4xl font-bold text-[rgb(var(--text))]">Technical Skills</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[rgb(var(--accent))]"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map(category => {
            const categorySkills = skills.filter(skill => skill.category === category.id);

            return (
              <article key={category.id} className="glass accent-glow rounded-lg p-5">
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-[rgb(var(--text))]">{category.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted))]">{category.summary}</p>
                </div>

                <div className="space-y-4">
                  {categorySkills.map(skill => (
                    <div key={skill.name}>
                      <div className="mb-1 flex items-center justify-between gap-3">
                        <span className="truncate text-sm font-semibold text-[rgb(var(--text))]">{skill.name}</span>
                        <span className="terminal-text text-xs text-[rgb(var(--accent))]">{skill.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[rgb(var(--surface-soft))]">
                        <div
                          className="h-full rounded-full bg-[rgb(var(--accent))]"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
