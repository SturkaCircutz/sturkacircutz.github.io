'use client';

import { useState } from 'react';
import { Send, Terminal, X } from 'lucide-react';
import { contactInfo, personalInfo, projects, skills } from '@/data/personalData';

type TerminalMessage = {
  id: number;
  text: string;
  sender: 'bot' | 'user';
};

const formatProjects = () =>
  projects
    .slice(0, 5)
    .map((project, index) => `> [${index + 1}] ${project.title} (${project.status})`)
    .join('\n');

const formatSkills = () =>
  skills
    .slice(0, 10)
    .map(skill => `> ${skill.name}`)
    .join('\n');

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<TerminalMessage[]>([
    {
      id: 1,
      text: `> SYSTEM INITIALIZED\n> Welcome to ${personalInfo.name}'s portfolio terminal\n> Type 'help' for available commands`,
      sender: 'bot',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    '> whoami',
    '> projects --list',
    '> skills --show',
    '> contact --info'
  ];

  const responses: Record<string, string> = {
    whoami: `> USER: ${personalInfo.name}\n> ROLE: ${personalInfo.title}\n> LOCATION: ${contactInfo.location}\n> FOCUS: ML, ASR, systems, GPU, web engineering`,
    'projects --list': `> LOADING PUBLIC PROJECTS...\n${formatProjects()}`,
    'skills --show': `> RESUME SKILLS LOADED:\n${formatSkills()}`,
    'contact --info': `> CONTACT:\n> Email: ${contactInfo.email}\n> Phone: ${contactInfo.phone}\n> GitHub: github.com/SturkaCircutz\n> LinkedIn: jiawen-sun-952a02408`,
    help: "> AVAILABLE COMMANDS:\n> whoami\n> projects --list\n> skills --show\n> contact --info\n> clear\n> exit"
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    const cleanMessage = message.replace(/^>\s*/, '').toLowerCase();
    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user' as const,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      if (cleanMessage === 'clear') {
        setMessages([
          {
            id: 1,
            text: `> TERMINAL CLEARED\n> Welcome to ${personalInfo.name}'s portfolio terminal\n> Type 'help' for available commands`,
            sender: 'bot' as const,
          }
        ]);
        setIsTyping(false);
        return;
      }

      if (cleanMessage === 'exit') {
        setIsOpen(false);
        setIsTyping(false);
        return;
      }

      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: responses[cleanMessage] ?? `> ERROR: Command '${cleanMessage}' not found\n> Type 'help' for available commands`,
          sender: 'bot' as const,
        }
      ]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open portfolio terminal"
        className="animate-float fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--accent))] text-slate-950 shadow-lg transition hover:brightness-110"
      >
        {isOpen ? <X size={24} /> : <Terminal size={24} />}
      </button>

      {isOpen && (
        <div className="glass fixed bottom-24 right-6 z-50 flex h-[500px] w-[min(24rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-lg">
          <div className="flex items-center justify-between border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-soft))]/80 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[rgb(var(--accent))]/15 text-[rgb(var(--accent))]">
                <Terminal size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[rgb(var(--text))]">JIAWEN_TERMINAL</h3>
                <p className="text-xs text-[rgb(var(--muted))]">PORTFOLIO CONNECTION</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto bg-[rgb(var(--background))]/90 p-4 font-mono text-sm text-[rgb(var(--muted))]">
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
              <span className="font-mono text-sm text-[rgb(var(--accent))]">guest@portfolio:~$</span>
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') handleSendMessage(inputValue);
                }}
                placeholder="Enter command..."
                className="min-w-0 flex-1 bg-transparent font-mono text-sm text-[rgb(var(--text))] outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => handleSendMessage(inputValue)}
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
