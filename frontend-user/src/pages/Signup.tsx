import React from 'react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { authApi, setAuthToken, getAuthToken } from '../api';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to profile
  if (getAuthToken()) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.register({ name, email, password });
      setAuthToken(response.access_token);
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-surface flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-md bg-white rounded-3xl editorial-shadow p-8 md:p-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="font-headline text-4xl font-bold text-primary">Start Your Journey</h1>
          <p className="text-on-surface-variant">Join the Nelatalli Organics community</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold block ml-1">
              Full Name
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-secondary transition-colors" size={20} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-secondary/10 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold block ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-secondary transition-colors" size={20} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-secondary/10 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold block ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-secondary transition-colors" size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-secondary/10 transition-all outline-none"
              />
            </div>
          </div>

          <p className="text-[10px] text-on-surface-variant leading-relaxed px-1">
            By creating an account, you agree to Nelatalli's <button type="button" className="text-secondary font-bold hover:underline">Terms of Service</button> and <button type="button" className="text-secondary font-bold hover:underline">Privacy Policy</button>.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-label font-bold text-sm tracking-widest uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? 'Creating Account...' : (
              <>
                Create Account <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-sm text-on-surface-variant border-t border-outline-variant/10 pt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
