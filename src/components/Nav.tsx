import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { profile } from "../data";

const links = [
  { n: "01", label: "HOME", id: "home" },
  { n: "02", label: "ABOUT", id: "about" },
  { n: "03", label: "WORK", id: "work" },
  { n: "04", label: "CONTACT", id: "contact" },
];

export function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div style={{ scaleX: bar }} className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left bg-accent" />
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-5 mix-blend-difference md:px-10"
      >
        <button onClick={() => go("home")} className="font-display text-2xl tracking-wide text-paper">
          ROKESH<span className="blink text-accent">_</span>
        </button>
        <nav className="hidden items-center gap-7 font-mono text-[11px] tracking-[0.25em] text-paper md:flex">
          {links.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className="group relative py-1">
              <span className="text-accent">/{l.n}</span> {l.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-paper transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
          <span className="text-paper/30">|</span>
          <div className="flex items-center gap-4 text-[10px] tracking-[0.2em]">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-paper/80 transition-colors hover:text-accent"
              aria-label="GitHub"
            >
              GH ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-paper/80 transition-colors hover:text-accent"
              aria-label="LinkedIn"
            >
              IN ↗
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-paper/80 transition-colors hover:text-accent"
              aria-label="Email"
            >
              MAIL ↗
            </a>
          </div>
        </nav>
        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="flex h-8 w-8 flex-col items-end justify-center gap-1.5 md:hidden"
        >
          <span className={`h-0.5 bg-paper transition-all ${open ? "w-6 translate-y-2 rotate-45" : "w-6"}`} />
          <span className={`h-0.5 bg-paper transition-all ${open ? "opacity-0" : "w-4"}`} />
          <span className={`h-0.5 bg-paper transition-all ${open ? "w-6 -translate-y-2 -rotate-45" : "w-5"}`} />
        </button>
      </motion.header>

      <motion.div
        initial={false}
        animate={{ clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
        className="fixed inset-0 z-[65] flex flex-col justify-center gap-4 bg-accent px-8 md:hidden"
      >
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => {
              setOpen(false);
              setTimeout(() => go(l.id), 300);
            }}
            className="text-left font-display text-7xl text-ink"
          >
            <span className="mr-3 font-mono text-sm text-paper">/{l.n}</span>
            {l.label}
          </button>
        ))}
        <div className="mt-6 flex flex-wrap gap-3 border-t border-ink/20 pt-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="border border-ink/60 bg-ink/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            GitHub ↗
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="border border-ink/60 bg-ink/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            LinkedIn ↗
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="border border-ink/60 bg-ink/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Gmail ↗
          </a>
        </div>
      </motion.div>
    </>
  );
}
