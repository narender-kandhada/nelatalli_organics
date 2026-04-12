import React, { useState } from 'react';
import { Leaf, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { Screen } from '@/src/types';
import { login } from '@/src/lib/api';
import logo from '../assets/logo.png';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Brand Identity */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-primary/10">
              <img 
                src={logo}
                alt="Nelatalli Organics Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="font-serif text-5xl font-extrabold tracking-tight text-primary italic mb-2">Nelatalli Organics</h1>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary font-bold">Editorial Admin Portal</p>
        </div>

        {/* Login Card */}
        <main className="bg-surface-container-lowest rounded-xl p-8 md:p-10 shadow-[0_32px_48px_-8px_rgba(29,28,24,0.06)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
          
          <header className="mb-8">
            <h2 className="font-serif text-3xl font-semibold text-on-surface leading-tight">Welcome Back</h2>
            <p className="text-on-surface-variant mt-2">Please enter your credentials to access the editorial dashboard.</p>
          </header>

          {error && (
            <div className="mb-6 p-4 bg-error-container/20 border border-error/20 rounded-lg flex items-center gap-3 text-error">
              <AlertCircle size={18} />
              <span className="text-sm font-bold">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-on-surface-variant mb-2" htmlFor="email">Email Address</label>
              <div className="relative group">
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low rounded-lg border-2 border-outline-variant/15 text-on-surface focus:outline-none focus:border-secondary focus:ring-0 transition-all placeholder:text-outline-variant" 
                  id="email" 
                  type="email" 
                  placeholder="admin@nelatalli.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  disabled={loading}
                />
                <div className="absolute inset-y-0 right-3 flex items-center text-outline-variant group-focus-within:text-secondary">
                  <Mail size={20} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface-variant mb-2" htmlFor="password">Password</label>
              <div className="relative group">
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low rounded-lg border-2 border-outline-variant/15 text-on-surface focus:outline-none focus:border-secondary focus:ring-0 transition-all placeholder:text-outline-variant" 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  disabled={loading}
                />
                <div className="absolute inset-y-0 right-3 flex items-center text-outline-variant group-focus-within:text-secondary">
                  <Lock size={20} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input 
                  className="h-5 w-5 rounded border-outline-variant/30 text-secondary focus:ring-secondary/20 transition-all cursor-pointer" 
                  id="remember-me" 
                  type="checkbox" 
                />
                <label className="ml-3 block text-sm text-on-surface-variant cursor-pointer" htmlFor="remember-me">
                  Remember me
                </label>
              </div>
              <button type="button" className="text-sm font-bold text-secondary hover:text-primary transition-colors">
                Forgot Password?
              </button>
            </div>

            <button 
              className="w-full py-4 px-6 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold text-lg hover:opacity-90 active:scale-95 transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <footer className="mt-10 pt-8 border-t border-outline-variant/10 text-center">
            <p className="text-xs text-on-surface-variant/70 leading-relaxed">
              By logging in, you agree to the Nelatalli Organics <br />
              <button className="underline hover:text-on-surface transition-colors">Terms of Service</button> and <button className="underline hover:text-on-surface transition-colors">Privacy Policy</button>.
            </p>
          </footer>
        </main>

        {/* Aesthetic Footer Images */}
        <div className="mt-8 grid grid-cols-3 gap-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="aspect-square rounded-lg overflow-hidden bg-surface-container">
            <img 
              src="https://picsum.photos/seed/botanical1/300/300" 
              alt="Botanical 1" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden bg-surface-container">
            <img 
              src="https://picsum.photos/seed/botanical2/300/300" 
              alt="Botanical 2" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden bg-surface-container">
            <img 
              src="https://picsum.photos/seed/botanical3/300/300" 
              alt="Botanical 3" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        
        <p className="mt-8 text-center text-xs text-on-surface-variant/40 tracking-widest uppercase">
          © 2024 Nelatalli Editorial
        </p>
      </div>
    </div>
  );
}
