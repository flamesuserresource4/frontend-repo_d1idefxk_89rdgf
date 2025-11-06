import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] w-full overflow-hidden bg-[#070815] text-white">
      {/* Gradient Background Layers */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0c1f] via-[#0a0b1c] to-[#070815] opacity-90" />
      <div className="pointer-events-none absolute -inset-40 bg-[radial-gradient(75%_75%_at_50%_10%,rgba(124,58,237,0.25)_0%,rgba(56,189,248,0.15)_35%,rgba(17,24,39,0)_70%)]" />

      {/* 3D Spline Scene */}
      <div className="absolute right-0 top-0 h-full w-full md:w-3/5">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-24 md:pt-36">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-violet-400 to-sky-400" />
            Futuristic 3D interactions
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Elevate your brand with immersive, interactive design
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            A smooth, responsive landing crafted with subtle motion, bold gradients, and a real-time 3D scene that reacts to your visitors.
          </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#features" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-sky-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/20 transition hover:opacity-95">
              Explore Features
            </a>
            <a href="#cta" className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10">
              Get Started
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
