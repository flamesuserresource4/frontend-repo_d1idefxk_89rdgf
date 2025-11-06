import { motion } from 'framer-motion';
import { Sparkles, Zap, MousePointer2, Layers } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Grainy Gradients',
    desc: 'Vibrant purple-blue gradients with cinematic grain for a premium look.'
  },
  {
    icon: Zap,
    title: 'Smooth Motion',
    desc: 'Micro-interactions and transitions tuned for delightful responsiveness.'
  },
  {
    icon: MousePointer2,
    title: 'Interactive 3D',
    desc: 'A live Spline scene that responds to your pointer for instant immersion.'
  },
  {
    icon: Layers,
    title: 'Modern Stack',
    desc: 'React, Tailwind, Framer Motion, and Spline — performance-first.'
  }
];

export default function Features() {
  return (
    <section id="features" className="relative bg-[#0a0b1c] py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.15)_0%,rgba(56,189,248,0.12)_35%,rgba(17,24,39,0)_80%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">Designed for flow</h2>
          <p className="mt-4 text-white/70">Everything you need to launch a futuristic landing — fast, smooth, and beautiful.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-tr from-violet-500/20 to-sky-500/20 blur-2xl transition group-hover:scale-110" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-sky-500 text-white shadow-md">
                  <f.icon size={18} />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-white/70">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
