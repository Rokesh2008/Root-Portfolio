import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TornTop from "../components/TornTop";
import Globe from "../components/Globe";
import { SectionTag, SplitReveal } from "../components/Reveal";
import { skills } from "../data";

const ticker = "REACT ✦ VITE ✦ TAILWIND ✦ PYTHON ✦ JAVA ✦ DOCKER ✦ GIT ✦ MYSQL ✦ AI ✦ DATA ✦ ";

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(p, [0, 1], [-60, 420]);
  const globeY = useTransform(p, [0, 1], ["10%", "-15%"]);
  const tickA = useTransform(p, [0, 1], ["0%", "-40%"]);
  const tickB = useTransform(p, [0, 1], ["-40%", "0%"]);

  return (
    <section id="skills" ref={ref} className="relative bg-ink pb-24 pt-32 md:pt-44">
      <TornTop fill="#080808" seed={9} />
      <div className="grid-lines absolute inset-0 opacity-40" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:grid-cols-[1.1fr_1fr] md:px-12">
        <div>
          <SectionTag n="S4" label="Skill Stack" />
          <h2 className="mt-6 font-display text-[24vw] leading-[0.82] text-paper md:text-[12vw]">
            <SplitReveal text="SKILL" />
            <br />
            <SplitReveal text="STACK" delay={0.15} />
            <motion.span
              initial={{ opacity: 0, rotate: -40, scale: 0.4 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 140 }}
              className="inline-block text-accent"
            >
              /
            </motion.span>
          </h2>

          <div className="mt-10 border-t border-paper/20">
            {skills.map((s, i) => (
              <motion.div
                key={s.group}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="grid grid-cols-[110px_1fr] items-center gap-4 border-b border-paper/20 py-4 md:grid-cols-[150px_1fr]"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{s.group}</div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <motion.span
                      key={it}
                      data-cursor
                      whileHover={{ y: -4, rotate: -2 }}
                      className="border border-paper/40 px-4 py-1.5 font-mono text-xs tracking-widest text-paper transition-colors hover:border-accent hover:bg-accent"
                    >
                      {it}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div style={{ y: globeY }} className="relative flex items-center justify-center">
          <div className="absolute h-[70%] w-[70%] rounded-full bg-accent/20 blur-[90px]" />
          <Globe rotate={rotate} />
          <div className="absolute -bottom-6 right-0 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            Fig. 04 — Rotates as you scroll
          </div>
        </motion.div>
      </div>

      {/* scroll-driven ticker */}
      <div className="relative mt-24 -rotate-2 overflow-hidden bg-accent py-3">
        <motion.div style={{ x: tickA }} className="whitespace-nowrap font-display text-5xl text-ink md:text-7xl">
          {ticker.repeat(4)}
        </motion.div>
      </div>
      <div className="relative -mt-2 rotate-1 overflow-hidden border-y border-paper/30 bg-ink py-3">
        <motion.div style={{ x: tickB }} className="text-outline whitespace-nowrap font-display text-5xl md:text-7xl">
          {ticker.repeat(4)}
        </motion.div>
      </div>
    </section>
  );
}
