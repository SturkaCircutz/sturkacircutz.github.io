'use client';

import { useEffect, useRef, useState } from 'react';
import { contactInfo, personalInfo, projects, skills } from '@/data/personalData';

const BashTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const pushLines = (...lines: string[]) => {
    setHistory(prev => [...prev, ...lines]);
  };

  const scrollToSection = (selector: string) => {
    setTimeout(() => document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' }), 300);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;

    pushLines(`<span class="text-[rgb(var(--accent))]">jiawen@portfolio:~$</span> ${command}`);
    setInput('');

    if (command === 'whoami') {
      pushLines(personalInfo.name, personalInfo.title);
      return;
    }

    if (command === 'ls' || command === 'ls -la') {
      pushLines(
        'drwxr-xr-x  projects/',
        'drwxr-xr-x  skills/',
        'drwxr-xr-x  about/',
        'drwxr-xr-x  contact/',
        '-rw-r--r--  resume-summary.txt'
      );
      return;
    }

    if (command === './about') {
      pushLines('', personalInfo.about, '', `GitHub: ${contactInfo.social.github}`);
      return;
    }

    if (command === './projects') {
      pushLines(
        '',
        ...projects.slice(0, 6).map((project, index) => `[${index + 1}] ${project.title} - ${project.githubUrl}`)
      );
      return;
    }

    if (command === './skills') {
      pushLines('', ...skills.slice(0, 12).map(skill => `${skill.name} (${skill.category})`));
      return;
    }

    if (command.startsWith('cd ')) {
      const target = command.substring(3).trim().replace(/\/$/, '');
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      if (sections.includes(target)) {
        pushLines('', `Changing directory to ${target} section...`);
        scrollToSection(`#${target}`);
        return;
      }
      pushLines(`cd: ${target}: No such section`);
      return;
    }

    if (command === 'help') {
      pushLines(
        'Available commands: whoami, ls, ls -la, ./about, ./projects, ./skills, cd <section>, help, clear',
        'Sections: home, about, projects, skills, contact'
      );
      return;
    }

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    pushLines(`bash: ${command}: command not found`);
  };

  return (
    <div className="mx-auto mb-10 w-full max-w-6xl">
      <div className="glass overflow-hidden rounded-lg font-mono shadow-2xl">
        <div className="flex items-center justify-between border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-soft))]/70 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-[rgb(var(--accent-strong))]"></div>
            </div>
            <span className="text-sm font-bold text-[rgb(var(--text))]">jiawen@portfolio: ~</span>
          </div>
          <span className="text-xs text-[rgb(var(--muted))]">Terminal</span>
        </div>

        <div ref={terminalRef} className="h-72 overflow-y-auto bg-[rgb(var(--background))]/80 p-4 text-sm text-[rgb(var(--muted))] sm:h-80">
          <div className="space-y-1">
            <div>
              <span className="text-[rgb(var(--accent))]">jiawen@portfolio:~$</span> pwd
            </div>
            <div>/home/jiawen/portfolio</div>
            <div className="pb-3 text-[rgb(var(--accent))]">Type help for available commands.</div>
            {history.map((line, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center border-t border-[rgb(var(--border))] bg-[rgb(var(--surface-soft))]/70 p-4">
          <span className="mr-2 text-sm font-bold text-[rgb(var(--accent))]">jiawen@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="flex-1 bg-transparent text-sm text-[rgb(var(--text))] outline-none"
            autoComplete="off"
          />
          <span className="animate-pulse text-lg text-[rgb(var(--accent))]">_</span>
        </form>
      </div>
    </div>
  );
};

export default BashTerminal;
