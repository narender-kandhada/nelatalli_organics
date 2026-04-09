import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { contactApi } from '../api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = `Hello I want more information.\n\nFrom: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\nMessage: ${form.message}`;
    const url = `https://wa.me/919030414251?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface"
    >
      {/* Hero Section */}
      <section
        className="relative py-32 md:py-40 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?auto=format&fit=crop&q=80&w=2000')" }}
      >
        <div className="absolute inset-0 bg-neutral-900/60 z-0"></div>
        <div className="grain-overlay absolute inset-0 z-0 opacity-40"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="inline-block px-4 py-1 bg-white text-primary text-[10px] md:text-xs font-label tracking-[0.2em] uppercase rounded-full shadow-lg mb-6">
            Get In Touch
          </span>
          <h1 className="font-headline text-5xl md:text-7xl text-white font-bold tracking-tighter drop-shadow-lg">
            Connect With <br />
            <span className="italic font-light text-secondary drop-shadow-md">The Apothecary</span>
          </h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold">We'd love to hear from you.</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Whether you have a question about our products, an order, or just want to share your wellness journey, we're here to help.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Email Us</p>
                  <p className="text-lg font-bold text-primary">hello@nelatalli.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Call Us</p>
                  <p className="text-lg font-bold text-primary">+91 90304-14241</p>
                </div>
              </div>
              <a href="https://maps.app.goo.gl/qjF96cQPEs1CoTio8?g_st=aw" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Visit Us</p>
                  <p className="text-lg font-bold text-primary group-hover:underline">Tallaguda,Telangana</p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-surface-container-low p-8 md:p-12 rounded-3xl editorial-shadow">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Full Name</label>
                  <input
                    className="w-full bg-surface border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-primary outline-none"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Email Address</label>
                  <input
                    className="w-full bg-surface border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-primary outline-none"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Subject</label>
                <input
                  className="w-full bg-surface border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-primary outline-none"
                  type="text"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Message</label>
                <textarea
                  className="w-full bg-surface border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-primary outline-none min-h-[150px]"
                  placeholder="Tell us more..."
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                ></textarea>
              </div>

              {status === 'sent' && (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm font-bold">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm font-bold">
                  Failed to send. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-primary text-on-primary py-4 rounded-lg font-label font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary-container transition-all editorial-shadow disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 md:pb-24 container mx-auto px-6 md:px-12">
        <div className="w-full h-96 md:h-[500px] rounded-3xl overflow-hidden editorial-shadow relative bg-surface-container-low">
          <iframe
            src="https://maps.google.com/maps?q=Tallaguda,Telangana&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="Business Location"
          ></iframe>
        </div>
      </section>
    </motion.div>
  );
}
