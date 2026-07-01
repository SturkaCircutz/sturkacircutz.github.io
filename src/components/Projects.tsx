'use client';

import { projects } from '@/data/personalData';
import Interactive3DCard from './Interactive3DCard';

const Projects = () => {
  return (
    <section id="projects" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="terminal-text mb-3 text-sm font-semibold text-[rgb(var(--accent))]">
            &gt; TOP_GITHUB_REPOS
          </p>
          <h2 className="text-4xl font-bold text-[rgb(var(--text))]">Projects</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[rgb(var(--muted))]">
            Top repositories from public project work, excluding coursework and school-file folders.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[rgb(var(--accent))]"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Interactive3DCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
