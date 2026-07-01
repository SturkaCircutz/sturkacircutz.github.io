'use client';

import { useState } from 'react';
import { X, User, Mail, Shield } from 'lucide-react';
import { contactInfo, personalInfo } from '@/data/personalData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, name: string) => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [email, setEmail] = useState(contactInfo.email);
  const [name, setName] = useState(personalInfo.name);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      if (response.ok) {
        onLogin(email, name);
        onClose();
        setEmail('');
        setName('');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(var(--background))]/80 p-4 backdrop-blur-sm">
      <div className="glass accent-glow relative w-full max-w-md rounded-lg p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--text))]"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(var(--accent))]">
            <Shield className="text-slate-950" size={32} />
          </div>
          <h2 className="terminal-text mb-2 text-2xl font-bold text-[rgb(var(--text))]">
            SECURE_ACCESS
          </h2>
          <p className="terminal-text text-sm text-[rgb(var(--accent))]">
            &gt; ENTER_CREDENTIALS_TO_CONTINUE
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="terminal-text mb-2 block text-sm font-medium text-[rgb(var(--accent))]">
              EMAIL_ADDRESS
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--accent))]" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="terminal-text w-full rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface-soft))]/70 py-3 pl-10 pr-4 text-[rgb(var(--text))] transition-colors focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/30"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="terminal-text mb-2 block text-sm font-medium text-[rgb(var(--accent))]">
              FULL_NAME
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--accent))]" size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="terminal-text w-full rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface-soft))]/70 py-3 pl-10 pr-4 text-[rgb(var(--text))] transition-colors focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/30"
                placeholder="Your full name"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !name}
            className="terminal-text w-full rounded-md bg-[rgb(var(--accent))] px-6 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>PROCESSING...</span>
              </div>
            ) : (
              '&gt; ACCESS_GRANTED'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="terminal-text text-xs text-[rgb(var(--muted))]">
            &gt; DATA_WILL_BE_STORED_SECURELY<br />
            &gt; NO_PASSWORDS_REQUIRED
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
