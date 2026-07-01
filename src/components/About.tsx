'use client';

import { personalInfo } from '@/data/personalData';

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="terminal-text mb-3 text-sm font-semibold text-[rgb(var(--accent))]">&gt; ABOUT</p>
          <h2 className="text-4xl font-bold text-[rgb(var(--text))]">About Me</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[rgb(var(--accent))]"></div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div className="space-y-6">
            <h3 className="text-balance text-3xl font-bold text-[rgb(var(--text))]">
              Building practical ML, ASR, systems, and web projects from first principles.
            </h3>
            <p className="text-lg leading-8 text-[rgb(var(--muted))]">{personalInfo.about}</p>
            <p className="text-lg leading-8 text-[rgb(var(--muted))]">
              My resume highlights automatic speech recognition, model application and training,
              neural networks, reinforcement learning, low-level programming, Git/GitHub workflow,
              and full-stack development with React, Next.js, Express, MongoDB, and JWT authentication.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ['Education', 'Honors CS, University of Alberta'],
                ['Internship', 'AI Intern at AISpeech'],
                ['Location', 'Edmonton, Alberta']
              ].map(([label, value]) => (
                <div key={label} className="glass rounded-lg p-4">
                  <div className="text-sm font-semibold text-[rgb(var(--accent))]">{label}</div>
                  <div className="mt-2 text-sm leading-6 text-[rgb(var(--muted))]">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass accent-glow overflow-hidden rounded-lg">
            <div className="relative aspect-square">
              <img
                src={personalInfo.image}
                alt={personalInfo.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[rgb(var(--background))]/90 via-transparent to-transparent p-6">
                <div>
                  <h4 className="text-2xl font-bold text-[rgb(var(--text))]">{personalInfo.name}</h4>
                  <p className="mt-2 text-[rgb(var(--accent))]">{personalInfo.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
