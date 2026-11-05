import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import TornTop from "../components/TornTop";
import news from "../assets/newspaper.jpg";
import { projects } from "../data";

function MockScreen({ i }: { i: number }) {
  // abstract UI mock built from divs — each project gets a slightly different layout
  return (
    <div className="relative h-full w-full overflow-hidden border border-paper/25 bg-ink/80">
      <div className="flex items-center gap-1.5 border-b border-paper/20 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="h-2 w-2 rounded-full bg-paper/40" />
        <span className="h-2 w-2 rounded-full bg-paper/40" />
        <span className="ml-3 h-2 w-1/3 bg-paper/15" />
      </div>
      <div className="grid h-[calc(100%-33px)] grid-cols-[28%_1fr] gap-3 p-3">
        <div className="space-y-2">
          {Array.from({ length: 7 }).map((_, k) => (
            <div key={k} className={`h-2 ${k === i % 7 ? "bg-accent" : "bg-paper/20"}`} style={{ width: `${55 + ((k * 17) % 45)}%` }} />
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-[34%] bg-gradient-to-br from-paper/20 to-transparent" />
          {Array.from({ length: 6 }).map((_, k) => (
            <div key={k} className="flex gap-2">
              <span className="h-2 w-5 bg-accent/80" />
              <span className="h-2 bg-paper/20" style={{ width: `${30 + ((k * 23 + i * 11) % 60)}%` }} />
            </div>
          ))}
        </div>
      </div>
      <motion.div
        animate={{ y: ["-10%", "110%"] }}
        transition={{ repeat: Infinity, duration: 3.5 + i, ease: "linear" }}
        className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-accent/15 to-transparent"
      />
    </div>
  );
}

function Card({ project, i, p, total }: { project: (typeof projects)[number]; i: number; p: MotionValue<number>; total: number }) {
  const center = (i + 0.5) / total;
  const inner = useTransform(p, [center - 0.35, center + 0.35], [-60, 60]);
  const big = useTransform(p, [center - 0.35, center + 0.35], [80, -80]);
  return (
    <article
      data-cursor
      className="group relative flex h-[68vh] w-[84vw] shrink-0 flex-col justify-between overflow-hidden border border-paper/25 bg-ink p-5 md:w-[58vw] md:p-8"
    >
      <div
        className="absolute inset-0 bg-cover opacity-[0.12] grayscale transition-opacity duration-500 group-hover:opacity-25"
        style={{ backgroundImage: `url(${news})` }}
      />
      <motion.div
        style={{ x: big }}
        className="text-outline pointer-events-none absolute -right-4 -top-6 font-display text-[28vh] leading-none opacity-50"
      >
        0{i + 1}
      </motion.div>

      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
        <span>Project 0{i + 1} / 0{total}</span>
        <span className="text-accent">● Live</span>
      </div>

      <motion.div style={{ x: inner }} className="relative z-10 my-4 min-h-0 flex-1">
        <div className="h-full w-[92%] -rotate-1 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.03]">
          <MockScreen i={i} />
        </div>
      </motion.div>

      <div className="relative z-10 flex items-end justify-between gap-4">
        <div>
          <a
            href={project.href}
            target={project.href.startsWith("http") ? "_blank" : undefined}
            rel={project.href.startsWith("http") ? "noreferrer noopener" : undefined}
            className="group/title block"
          >
            <h3 className="font-display text-5xl leading-none text-paper transition-colors group-hover/title:text-accent md:text-7xl">
              {project.title}
            </h3>
          </a>
          <p className="mt-2 max-w-md text-sm text-paper/70">{project.blurb}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="border border-paper/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest">
                {t}
              </span>
            ))}
          </div>
        </div>
        <a
          href={project.href}
          target={project.href.startsWith("http") ? "_blank" : undefined}
          rel={project.href.startsWith("http") ? "noreferrer noopener" : undefined}
          aria-label={`Open ${project.title}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent text-xl text-paper transition-transform duration-300 group-hover:-rotate-45 md:h-14 md:w-14"
        >
          →
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const d = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      setDist(d);
      setHeight(d + window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(p, [0, 1], [0, -dist]);
  const titleX = useTransform(p, [0, 0.3], [0, -250]);
  const bar = useTransform(p, [0, 1], [0, 1]);
  const counter = useTransform(p, (v) => String(Math.min(projects.length, Math.floor(v * projects.length) + 1)).padStart(2, "0"));

  return (
    <section
      id="work"
      ref={ref}
      className="relative"
      style={{ height: height ?? `${projects.length * 100 + 100}vh` }}
    >
      <TornTop fill="#080808" seed={12} />
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-ink">
        <div className="grid-lines absolute inset-0 opacity-40" />
        <motion.div ref={trackRef} style={{ x }} className="relative flex w-max items-center gap-6 pl-5 pr-[10vw] md:gap-10 md:pl-12">
          {/* intro panel */}
          <div className="flex h-[68vh] w-[80vw] shrink-0 flex-col justify-between md:w-[42vw]">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em]">
              <span className="bg-accent px-2 py-1">S5</span>
              <span className="h-px w-10 bg-paper/50" />
              <span>Selected work</span>
            </div>
            <motion.h2 style={{ x: titleX }} className="font-display text-[26vw] leading-[0.8] text-paper md:text-[13vw]">
              PROJECTS<span className="text-accent">/</span>
            </motion.h2>
            <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              Keep scrolling <span className="text-xl text-accent">→</span>
            </div>
          </div>

          {projects.map((pr, i) => (
            <Card key={pr.title} project={pr} i={i} p={p} total={projects.length} />
          ))}
        </motion.div>

        {/* progress */}
        <div className="absolute bottom-8 left-5 right-5 flex items-center gap-4 md:left-12 md:right-28">
          <motion.span className="font-display text-3xl">{counter}</motion.span>
          <div className="relative h-px flex-1 bg-paper/25">
            <motion.div style={{ scaleX: bar }} className="absolute inset-0 origin-left bg-accent" />
          </div>
          <span className="font-mono text-xs tracking-widest text-muted">0{projects.length}</span>
        </div>
      </div>
    </section>
  );
}
