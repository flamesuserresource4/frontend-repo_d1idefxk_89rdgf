import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[#0a0b1c] py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.15)_0%,rgba(56,189,248,0.12)_35%,rgba(17,24,39,0)_80%)]" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-tr from-white/10 to-white/5 p-8 backdrop-blur-lg sm:p-12">
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-2xl font-semibold sm:text-3xl">
            Ready to craft something extraordinary?
          </motion.h3>

          <motion.form
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none backdrop-blur focus:border-white/20"
            />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-sky-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/20 transition hover:opacity-95">
              Join the waitlist
            </button>
          </motion.form>

          <p className="mt-4 text-center text-xs text-white/60">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
