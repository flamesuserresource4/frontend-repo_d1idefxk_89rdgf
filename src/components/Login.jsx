import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock } from 'lucide-react';

export default function Login({ onAuth }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          mode === 'login'
            ? { email: form.email, password: form.password }
            : { name: form.name, email: form.email, password: form.password }
        ),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Authentication failed');

      localStorage.setItem('nebula_token', data.token);
      localStorage.setItem('nebula_user', JSON.stringify(data.user));
      onAuth(data.user);
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
              {mode === 'login' ? <Lock size={18} /> : <User size={18} />}
            </div>
            <h1 className="text-2xl font-semibold">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="mt-1 text-sm text-white/70">
              {mode === 'login' ? 'Sign in to continue' : 'Join the experience in seconds'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
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
                minLength={6}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none backdrop-blur focus:border-white/20"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-rose-300/90">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-sky-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/20 transition hover:opacity-95 disabled:opacity-60">
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-white/70">
            {mode === 'login' ? (
              <>No account?{' '}<button onClick={() => setMode('register')} className="text-white hover:underline">Create one</button></>
            ) : (
              <>Already have an account?{' '}<button onClick={() => setMode('login')} className="text-white hover:underline">Sign in</button></>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
