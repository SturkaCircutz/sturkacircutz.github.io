'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Copy, ExternalLink, Terminal } from 'lucide-react';
import { contactInfo, personalInfo, projects, skills } from '@/data/personalData';

type TerminalLine = {
  id: number;
  tone?: 'prompt' | 'accent' | 'error' | 'muted';
  text: string;
};

const prompt = 'jiawen@portfolio:~$';
const sections = ['home', 'about', 'projects', 'skills', 'contact'];
const validThemes = ['normal', 'dark', 'high-contrast'];

const createLine = (text: string, tone?: TerminalLine['tone']): TerminalLine => ({
  id: Date.now() + Math.random(),
  text,
  tone,
});

const BashTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    createLine(`${prompt} boot --portfolio`, 'prompt'),
    createLine('Portfolio shell ready. Type help or press Tab for commands.', 'accent'),
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = useMemo(
    () => [
      'help',
      'whoami',
      'status',
      'ls',
      'projects',
      'skills',
      'contact',
      'open github',
      'open linkedin',
      'open mail',
      'cd about',
      'cd projects',
      'cd skills',
      'cd contact',
      'theme normal',
      'theme dark',
      'theme high-contrast',
      'clear',
    ],
    []
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const pushLines = (...lines: Array<string | TerminalLine>) => {
    setHistory(prev => [
      ...prev,
      ...lines.map(line => (typeof line === 'string' ? createLine(line) : line)),
    ]);
  };

  const scrollToSection = (selector: string) => {
    setTimeout(() => document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' }), 160);
  };

  const openUrl = (url?: string) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim();
    if (!command) return;

    const normalized = command.toLowerCase();
    pushLines(createLine(`${prompt} ${command}`, 'prompt'));
    setCommandHistory(prev => [command, ...prev.filter(item => item !== command)].slice(0, 20));
    setHistoryIndex(null);
    setInput('');

    if (normalized === 'clear') {
      setHistory([]);
      return;
    }

    if (normalized === 'help') {
      pushLines(
        createLine('Core commands', 'accent'),
        '  whoami        show profile summary',
        '  status        show current focus and project count',
        '  projects      list featured repositories',
        '  skills        show strongest skill clusters',
        '  contact       show email, GitHub, and LinkedIn',
        createLine('Navigation', 'accent'),
        '  cd <section>  jump to home, about, projects, skills, contact',
        '  open github   open GitHub profile',
        '  open linkedin open LinkedIn profile',
        '  open mail     start an email',
        '  theme <name>  normal, dark, high-contrast'
      );
      return;
    }

    if (normalized === 'whoami') {
      pushLines(
        createLine(personalInfo.name, 'accent'),
        personalInfo.title,
        personalInfo.description,
        `Location: ${contactInfo.location}`
      );
      return;
    }

    if (normalized === 'status') {
      pushLines(
        `${personalInfo.stats.projects} featured repositories`,
        `${skills.length} skills indexed`,
        `Focus: ${personalInfo.subtitle}`,
        `Availability: open to project and research conversations`
      );
      return;
    }

    if (normalized === 'ls' || normalized === 'ls -la') {
      pushLines(
        'about/       projects/       skills/       contact/',
        'profile.card terminal.sh     public-repos.json'
      );
      return;
    }

    if (normalized === 'projects' || normalized === './projects') {
      pushLines(
        createLine('Featured repositories', 'accent'),
        ...projects.map((project, index) => `${index + 1}. ${project.title} [${project.status}] - ${project.githubUrl}`)
      );
      return;
    }

    if (normalized === 'skills' || normalized === './skills') {
      const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 10);
      pushLines(
        createLine('Top skills', 'accent'),
        ...topSkills.map(skill => `${skill.name.padEnd(30, ' ')} ${skill.level}%  ${skill.category}`)
      );
      return;
    }

    if (normalized === 'contact' || normalized === './contact') {
      pushLines(
        createLine('Contact endpoints', 'accent'),
        `Email: ${contactInfo.email}`,
        `Phone: ${contactInfo.phone}`,
        `GitHub: ${contactInfo.social.github}`,
        `LinkedIn: ${contactInfo.social.linkedin}`
      );
      return;
    }

    if (normalized.startsWith('cd ')) {
      const target = normalized.substring(3).trim().replace(/\/$/, '');
      if (sections.includes(target)) {
        pushLines(createLine(`Jumping to #${target}`, 'accent'));
        scrollToSection(`#${target}`);
        return;
      }
      pushLines(createLine(`cd: ${target}: no section by that name`, 'error'));
      return;
    }

    if (normalized.startsWith('open ')) {
      const target = normalized.substring(5).trim();
      if (target === 'github') {
        pushLines(createLine('Opening GitHub profile...', 'accent'));
        openUrl(contactInfo.social.github);
        return;
      }
      if (target === 'linkedin') {
        pushLines(createLine('Opening LinkedIn profile...', 'accent'));
        openUrl(contactInfo.social.linkedin);
        return;
      }
      if (target === 'mail' || target === 'email') {
        pushLines(createLine('Opening mail client...', 'accent'));
        window.location.href = `mailto:${contactInfo.email}`;
        return;
      }
      pushLines(createLine(`open: unknown target '${target}'`, 'error'));
      return;
    }

    if (normalized.startsWith('theme ')) {
      const target = normalized.substring(6).trim();
      if (validThemes.includes(target)) {
        document.body.dataset.theme = target;
        window.localStorage.setItem('jiawen-site-theme', target);
        window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: target }));
        pushLines(createLine(`Theme switched to ${target}`, 'accent'));
        return;
      }
      pushLines(createLine(`theme: choose ${validThemes.join(', ')}`, 'error'));
      return;
    }

    pushLines(createLine(`bash: ${command}: command not found`, 'error'));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    runCommand(input);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = historyIndex === null ? 0 : Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] ?? '');
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex >= 0 ? nextIndex : null);
      setInput(nextIndex >= 0 ? commandHistory[nextIndex] : '');
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const match = commands.find(command => command.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  const copyLastCommand = async () => {
    const lastCommand = commandHistory[0] ?? 'help';
    try {
      await navigator.clipboard.writeText(lastCommand);
      pushLines(createLine(`Copied command: ${lastCommand}`, 'accent'));
    } catch {
      pushLines(createLine('Clipboard access is unavailable in this browser context.', 'error'));
    }
  };

  const lineClass = (tone?: TerminalLine['tone']) => {
    if (tone === 'prompt') return 'text-[rgb(var(--accent))]';
    if (tone === 'accent') return 'text-[rgb(var(--accent-strong))]';
    if (tone === 'error') return 'text-red-400';
    if (tone === 'muted') return 'text-[rgb(var(--muted))]/70';
    return 'text-[rgb(var(--muted))]';
  };

  return (
    <div className="mx-auto mb-10 w-full max-w-6xl">
      <div className="terminal-window overflow-hidden rounded-lg font-mono">
        <div className="flex flex-col gap-3 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-soft))]/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-[rgb(var(--accent-strong))]"></div>
            </div>
            <span className="text-sm font-bold text-[rgb(var(--text))]">portfolio shell</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[rgb(var(--muted))]">
            <Terminal size={14} aria-hidden="true" />
            <span>Tab completes commands</span>
            <button
              type="button"
              onClick={copyLastCommand}
              title="Copy last command"
              aria-label="Copy last terminal command"
              className="ml-1 rounded-md border border-[rgb(var(--border))] p-1 transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
            >
              <Copy size={13} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={terminalRef}
          onClick={() => inputRef.current?.focus()}
          className="terminal-scan h-72 cursor-text overflow-y-auto bg-[rgb(var(--background))]/80 p-4 text-sm sm:h-80"
        >
          <div className="space-y-1">
            {history.map(line => (
              <div key={line.id} className={`whitespace-pre-wrap ${lineClass(line.tone)}`}>
                {line.text}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center border-t border-[rgb(var(--border))] bg-[rgb(var(--surface-soft))]/70 p-4">
          <span className="mr-2 hidden text-sm font-bold text-[rgb(var(--accent))] sm:inline">{prompt}</span>
          <span className="mr-2 text-sm font-bold text-[rgb(var(--accent))] sm:hidden">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            className="min-w-0 flex-1 bg-transparent text-sm text-[rgb(var(--text))] outline-none"
            autoComplete="off"
            aria-label="Portfolio terminal command"
          />
          <button
            type="button"
            onClick={() => runCommand('open github')}
            className="ml-3 hidden items-center gap-1 rounded-md border border-[rgb(var(--border))] px-2 py-1 text-xs text-[rgb(var(--muted))] transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] sm:inline-flex"
          >
            <ExternalLink size={12} aria-hidden="true" />
            GitHub
          </button>
          <span className="ml-2 animate-pulse text-lg text-[rgb(var(--accent))]">_</span>
        </form>
      </div>
    </div>
  );
};

export default BashTerminal;
