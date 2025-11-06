import { useState, useEffect } from 'react';
import { Rocket, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navClasses = scrolled
    ? 'backdrop-blur-md bg-black/40 shadow-lg border-b border-white/10'
    : 'bg-transparent';

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses}`}> 
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-sky-500 text-white shadow-lg shadow-fuchsia-500/20">
              <Rocket size={18} />
            </div>
            <span className="font-semibold tracking-tight text-white">Nebula</span>
          </button>

          <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            <button onClick={() => scrollTo('features')} className="hover:text-white transition">Features</button>
            <button onClick={() => scrollTo('cta')} className="hover:text-white transition">Get Started</button>
            <a href="#" className="rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur hover:bg-white/20 transition">Sign In</a>
          </nav>

          <button className="md:hidden text-white" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/90 backdrop-blur">
              <button onClick={() => scrollTo('features')} className="block w-full text-left px-2 py-2 rounded-lg hover:bg-white/10">Features</button>
              <button onClick={() => scrollTo('cta')} className="block w-full text-left px-2 py-2 rounded-lg hover:bg-white/10">Get Started</button>
              <a href="#" className="block w-full text-left px-2 py-2 rounded-lg hover:bg-white/10">Sign In</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
