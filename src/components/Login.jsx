import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Shield } from 'lucide-react';

export default function Login({ onAuth }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'admin'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', admin_key: '' });

  // If VITE_BACKEND_URL is provided, use it. Otherwise use relative path and rely on Vite proxy.
  const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let endpoint = '/auth/login';
      let body = {};

      if (mode === 'login') {
        endpoint = '/auth/login';
        body = { email: form.email, password: form.password };
      } else if (mode === 'register') {
        endpoint = '/auth/register';
        body = { name: form.name, email: form.email, password: form.password };
      } else if (mode === 'admin') {
        endpoint = '/auth/create-admin';
        body = { name: form.name, email: form.email, password: form.password, admin_key: form.admin_key || undefined };
      }

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.message || 'Request failed');

      if (data.token && data.user) {
        localStorage.setItem('nebula_token', data.token);
        localStorage.setItem('nebula_user', JSON.stringify(data.user));
        onAuth?.(data.user);
      } else {
        // For endpoints that don't return token/user (not used here), just show success
        setError('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#070815] text-white">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0c1f] via-[#0a0b1c] to-[#070815]" />
      <div className="pointer-events-none absolute -inset-40 bg-[radial-gradient(80%_80%_at_50%_0%,rgba(99,102,241,0.18)_0%,rgba(56,189,248,0.14)_30%,rgba(0,0,0,0)_70%)]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl place-items-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-sky-500 text-white shadow-lg">
              {mode === 'login' ? <Lock size={18} /> : mode === 'register' ? <User size={18} /> : <Shield size={18} />}
            </div>
            <h1 className="text-2xl font-semibold">
              {mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Create your account' : 'Create admin account'}
            </h1>
            <p className="mt-1 text-sm text-white/70">
              {mode === 'login' ? 'Sign in to continue' : mode === 'register' ? 'Join the experience in seconds' : 'Bootstrap or add an admin'}
            </p>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-2">
            <button onClick={() => setMode('login')} className={`rounded-xl px-3 py-2 text-sm ${mode==='login'?'bg-white/15':'bg-white/5'} border border-white/10`}>Login</button>
            <button onClick={() => setMode('register')} className={`rounded-xl px-3 py-2 text-sm ${mode==='register'?'bg-white/15':'bg-white/5'} border border-white/10`}>Register</button>
            <button onClick={() => setMode('admin')} className={`rounded-xl px-3 py-2 text-sm ${mode==='admin'?'bg-white/15':'bg-white/5'} border border-white/10`}>Admin</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {(mode === 'register' || mode === 'admin') && (
              <div className="space-y-2">
                <label className="text-sm text-white/80">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none backdrop-blur focus:border-white/20"
                  placeholder="Your name"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm text-white/80">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none backdrop-blur focus:border-white/20"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/80">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={mode==='admin' ? 8 : 6}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none backdrop-blur focus:border-white/20"
                placeholder="••••••••"
              />
            </div>

            {mode === 'admin' && (
              <div className="space-y-2">
                <label className="text-sm text-white/80">Admin setup key (optional for first admin)</label>
                <input
                  name="admin_key"
                  type="text"
                  value={form.admin_key}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none backdrop-blur focus:border-white/20"
                  placeholder="Enter ADMIN_SETUP_KEY if configured"
                />
                <p className="text-xs text-white/60">If this is the first admin, you can leave this empty. Otherwise provide the server's ADMIN_SETUP_KEY.</p>
              </div>
            )}

            {error && (
              <p className="text-sm text-rose-300/90">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-sky-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/20 transition hover:opacity-95 disabled:opacity-60">
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Create Admin'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
