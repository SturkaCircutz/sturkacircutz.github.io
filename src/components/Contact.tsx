'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { contactInfo } from '@/data/personalData';

type ContactRow = [LucideIcon, string, string, string];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface-soft))]/70 px-4 py-3 text-[rgb(var(--text))] outline-none transition placeholder:text-[rgb(var(--muted))]/70 focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/30';

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="terminal-text mb-3 text-sm font-semibold text-[rgb(var(--accent))]">&gt; CONTACT</p>
          <h2 className="text-4xl font-bold text-[rgb(var(--text))]">Contact Me</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[rgb(var(--accent))]"></div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-[rgb(var(--text))]">Open to project and research conversations.</h3>
            <p className="leading-7 text-[rgb(var(--muted))]">
              Reach out about machine learning, ASR, systems, GPU programming, or full-stack software work.
            </p>

            {([
              [Mail, 'Email', contactInfo.email, `mailto:${contactInfo.email}`],
              [Phone, 'Phone', contactInfo.phone, `tel:${contactInfo.phone.replace(/\D/g, '')}`],
              [MapPin, 'Location', contactInfo.location, ''],
              [Github, 'GitHub', 'github.com/SturkaCircutz', contactInfo.social.github ?? ''],
              [Linkedin, 'LinkedIn', 'jiawen-sun-952a02408', contactInfo.social.linkedin ?? '']
            ] satisfies ContactRow[]).map(([Icon, label, value, href]) => {
              const content = (
                <div className="glass flex items-center gap-4 rounded-lg p-4 transition hover:border-[rgb(var(--accent))]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[rgb(var(--accent))]/15 text-[rgb(var(--accent))]">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[rgb(var(--accent))]">{label}</div>
                    <div className="truncate text-[rgb(var(--text))]">{value}</div>
                  </div>
                </div>
              );

              return href ? (
                <a key={String(label)} href={String(href)} target={String(href).startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div key={String(label)}>{content}</div>
              );
            })}
          </div>

          <div className="glass accent-glow rounded-lg p-6 sm:p-8">
            <h3 className="terminal-text mb-6 text-xl font-bold text-[rgb(var(--text))]">&gt; SEND_MESSAGE</h3>

            {submitStatus === 'success' && (
              <div className="mb-6 flex items-center gap-2 rounded-md border border-[rgb(var(--accent-strong))] bg-[rgb(var(--accent-strong))]/10 p-4 text-[rgb(var(--accent-strong))]">
                <CheckCircle size={20} aria-hidden="true" />
                <span>Message sent successfully.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 flex items-center gap-2 rounded-md border border-red-400 bg-red-500/10 p-4 text-red-400">
                <AlertCircle size={20} aria-hidden="true" />
                <span>Message could not be sent.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[rgb(var(--accent))]">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[rgb(var(--accent))]">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="your.email@example.com"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[rgb(var(--accent))]">Subject</span>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Project collaboration / research / question"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[rgb(var(--accent))]">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell me what you want to build or discuss."
                  required
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[rgb(var(--accent))] px-6 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                    Sending
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
