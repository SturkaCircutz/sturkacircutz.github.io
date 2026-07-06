'use client';

import { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2, Send, Terminal, X } from 'lucide-react';
import { contactInfo, personalInfo, projects, skills } from '@/data/personalData';

type TerminalMessage = {
  id: number;
  text: string;
  sender: 'bot' | 'user';
};

const formatProjects = () =>
  projects
    .map((project, index) => `> [${index + 1}] ${project.title} (${project.status})\n  ${project.githubUrl}`)
    .join('\n');

const formatSkills = () =>
  [...skills]
    .sort((a, b) => b.level - a.level)
    .slice(0, 8)
    .map(skill => `> ${skill.name.padEnd(28, ' ')} ${skill.level}%`)
    .join('\n');

const commandHelp = [
  '> whoami',
  '> projects --list',
  '> skills --top',
  '> contact --info',
  '> open github',
  '> open linkedin',
  '> cd projects',
  '> clear',
  '> exit'
].join('\n');

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<TerminalMessage[]>([
    {
      id: 1,
      text: `> SYSTEM READY\n> ${personalInfo.name}'s portable portfolio shell\n> Type 'help' for commands`,
      sender: 'bot',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    '> whoami',
    '> projects --list',
    '> skills --top',
    '> contact --info'
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const scrollToSection = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        text,
        sender: 'bot' as const,
      }
    ]);
  };

  const runCommand = (cleanMessage: string) => {
    if (cleanMessage === 'clear') {
      setMessages([
        {
          id: 1,
          text: `> TERMINAL CLEARED\n> Type 'help' for commands`,
          sender: 'bot' as const,
        }
      ]);
      return;
    }

    if (cleanMessage === 'exit') {
      setIsOpen(false);
      return;
    }

    if (cleanMessage === 'help') {
      addBotMessage(`> AVAILABLE COMMANDS\n${commandHelp}`);
      return;
    }

    if (cleanMessage === 'whoami') {
      addBotMessage(
        `> USER: ${personalInfo.name}\n> ROLE: ${personalInfo.title}\n> LOCATION: ${contactInfo.location}\n> FOCUS: ML, ASR, systems, GPU, web engineering`
      );
      return;
    }

    if (cleanMessage === 'projects --list' || cleanMessage === 'projects') {
      addBotMessage(`> PUBLIC PROJECTS\n${formatProjects()}`);
      return;
    }

    if (cleanMessage === 'skills --top' || cleanMessage === 'skills --show' || cleanMessage === 'skills') {
      addBotMessage(`> TOP SKILLS\n${formatSkills()}`);
      return;
    }

    if (cleanMessage === 'contact --info' || cleanMessage === 'contact') {
      addBotMessage(
        `> CONTACT\n> Email: ${contactInfo.email}\n> Phone: ${contactInfo.phone}\n> GitHub: github.com/SturkaCircutz\n> LinkedIn: jiawen-sun-952a02408`
      );
      return;
    }

    if (cleanMessage.startsWith('cd ')) {
      const target = cleanMessage.substring(3).trim().replace(/\/$/, '');
      if (['home', 'about', 'projects', 'skills', 'contact'].includes(target)) {
        scrollToSection(`#${target}`);
        addBotMessage(`> NAVIGATED TO #${target}`);
        return;
      }
      addBotMessage(`> ERROR: section '${target}' not found`);
      return;
    }

    if (cleanMessage === 'open github') {
      window.open(contactInfo.social.github, '_blank', 'noopener,noreferrer');
      addBotMessage('> OPENING GITHUB PROFILE');
      return;
    }

    if (cleanMessage === 'open linkedin') {
      window.open(contactInfo.social.linkedin, '_blank', 'noopener,noreferrer');
      addBotMessage('> OPENING LINKEDIN PROFILE');
      return;
    }

    if (cleanMessage === 'open mail' || cleanMessage === 'open email') {
      window.location.href = `mailto:${contactInfo.email}`;
      addBotMessage('> OPENING MAIL CLIENT');
      return;
    }

    addBotMessage(`> ERROR: Command '${cleanMessage}' not found\n> Type 'help' for commands`);
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    const cleanMessage = message.replace(/^>\s*/, '').trim().toLowerCase();
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user' as const,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      runCommand(cleanMessage);
      setIsTyping(false);
    }, 240);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open portfolio terminal"
        className="animate-float fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--accent))] text-slate-950 shadow-xl transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
      >
        {isOpen ? <X size={24} /> : <Terminal size={24} />}
      </button>

      {isOpen && (
        <div
          className={`terminal-window fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden rounded-lg transition-all ${
            isExpanded
              ? 'h-[min(42rem,calc(100vh-8rem))] w-[min(42rem,calc(100vw-3rem))]'
              : 'h-[500px] w-[min(25rem,calc(100vw-3rem))]'
          }`}
        >
          <div className="flex items-center justify-between border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-soft))]/80 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[rgb(var(--accent))]/15 text-[rgb(var(--accent))]">
                <Terminal size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[rgb(var(--text))]">JIAWEN_TERMINAL</h3>
                <p className="text-xs text-[rgb(var(--muted))]">PORTFOLIO SHELL</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(prev => !prev)}
              aria-label={isExpanded ? 'Collapse terminal' : 'Expand terminal'}
              className="rounded-md p-2 text-[rgb(var(--muted))] transition hover:bg-[rgb(var(--accent))]/10 hover:text-[rgb(var(--accent))]"
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>

          <div ref={scrollRef} className="terminal-scan flex-1 space-y-2 overflow-y-auto bg-[rgb(var(--background))]/90 p-4 font-mono text-sm text-[rgb(var(--muted))]">
            {messages.map(message => (
              <div key={message.id} className="whitespace-pre-wrap">
                {message.sender === 'user' ? (
                  <div>
                    <span className="text-[rgb(var(--accent))]">guest@portfolio:~$</span> {message.text}
                  </div>
                ) : (
                  <div>{message.text}</div>
                )}
              </div>
            ))}

            {isTyping && <div className="text-[rgb(var(--accent))]">Processing...</div>}
          </div>

          <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--surface-soft))]/70 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickReplies.map(reply => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => handleSendMessage(reply)}
                  className="rounded-md border border-[rgb(var(--border))] px-2 py-1 text-xs text-[rgb(var(--text))] transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
                >
                  {reply}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden font-mono text-sm text-[rgb(var(--accent))] sm:inline">guest@portfolio:~$</span>
              <span className="font-mono text-sm text-[rgb(var(--accent))] sm:hidden">$</span>
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') handleSendMessage(inputValue);
                }}
                placeholder="Enter command..."
                className="min-w-0 flex-1 bg-transparent font-mono text-sm text-[rgb(var(--text))] outline-none placeholder:text-[rgb(var(--muted))]/60"
                autoFocus
              />
              <button
                type="button"
                onClick={() => handleSendMessage(inputValue)}
                aria-label="Send terminal command"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[rgb(var(--accent))] text-slate-950 transition hover:brightness-110"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
