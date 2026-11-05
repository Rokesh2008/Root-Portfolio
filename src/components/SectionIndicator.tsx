import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { sections } from "../data";
import { go } from "./Nav";

export default function SectionIndicator() {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.5;
      let idx = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 right-5 z-[70] hidden flex-col items-end gap-3 text-paper mix-blend-difference md:flex md:right-8">
      <div className="pointer-events-auto flex flex-col items-end gap-[6px]">
        {sections.map((s, i) => (
          <button
            key={s.id}
            data-cursor
            onClick={() => go(s.id)}
            aria-label={s.label}
            className="group flex items-center gap-3"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-100">
              {s.label.toUpperCase()}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${i === active ? "w-10 bg-paper" : "w-4 bg-paper/50"}`}
            />
          </button>
        ))}
      </div>
      <div className="flex items-end gap-3">
        <div className="relative h-14 w-px bg-paper/30">
          <motion.div style={{ scaleY: fill }} className="absolute inset-0 origin-top bg-paper" />
        </div>
        <div className="font-mono leading-none">
          <span className="font-display text-4xl">{String(active + 1).padStart(2, "0")}</span>
          <span className="ml-1 text-[11px] tracking-widest opacity-70">/ 0{sections.length}</span>
        </div>
      </div>
    </div>
  );
}
