import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import TornTop from "../components/TornTop";

const words = ["BUILD", "THINK", "SHIP", "REPEAT"];

function Line({ word, i, p }: { word: string; i: number; p: MotionValue<number> }) {
  const a = 0.04 + i * 0.16;
  const opacity = useTransform(p, [a, a + 0.12], [0, 1]);
  const y = useTransform(p, [a, a + 0.12], ["60%", "0%"]);
  const skew = useTransform(p, [a, a + 0.12], [-16, 0]);
  const x = useTransform(p, [a, a + 0.12], [-80, 0]);
  const last = i === words.length - 1;
  return (
    <div className="overflow-hidden">
      <motion.div style={{ opacity, y, skewX: skew, x }} className="flex items-center gap-[0.1em]">
        <span className={i % 2 ? "text-paper" : "text-ink"}>{word}</span>
        {last && <span className="text-paper">/</span>}
      </motion.div>
    </div>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const draw = useTransform(p, [0.08, 0.8], [0, 1]);
  const spin = useTransform(p, [0, 1], [0, 360]);
  const textOpacity = useTransform(p, [0.62, 0.78], [0, 1]);
  const textY = useTransform(p, [0.62, 0.78], [40, 0]);
  const bigX = useTransform(p, [0, 1], ["0%", "-35%"]);

  return (
    <section id="manifesto" ref={ref} className="relative h-[420vh]">
      <TornTop fill="#E10600" seed={3} />
      <div className="sticky top-0 h-screen overflow-hidden bg-accent">
        <div className="halftone absolute inset-0 opacity-30" />

        {/* parallax backdrop word */}
        <motion.div
          style={{ x: bigX }}
          className="text-outline-ink absolute bottom-[-4vh] left-0 whitespace-nowrap font-display text-[40vh] leading-none opacity-30"
        >
          S2 — MANIFESTO — S2 — MANIFESTO — S2
        </motion.div>

        <div className="relative mx-auto flex h-full max-w-[1500px] items-center px-5 md:px-12">
          <div className="grid w-full items-center gap-6 md:grid-cols-[1.1fr_1fr]">
            <div className="font-display text-[19vh] leading-[0.84] md:text-[21vh]">
              {words.map((w, i) => (
                <Line key={w} word={w} i={i} p={p} />
              ))}
            </div>

            <div className="relative hidden h-[60vh] md:block">
              {/* animated graphic scribble */}
              <svg viewBox="0 0 420 360" className="absolute inset-0 h-full w-full" fill="none">
                <motion.path
                  d="M20,300 C70,40 230,30 210,150 S60,300 170,290 S340,60 395,140 S380,300 300,250 S250,130 340,40"
                  stroke="#080808"
                  strokeWidth={3}
                  strokeLinecap="round"
                  style={{ pathLength: draw }}
                />
                <motion.path
                  d="M30,330 C140,310 300,340 400,300"
                  stroke="#F5F3EE"
                  strokeWidth={2}
                  strokeLinecap="round"
                  style={{ pathLength: draw }}
                />
              </svg>
              <motion.div
                style={{ opacity: textOpacity, y: textY }}
                className="absolute bottom-0 right-0 max-w-xs bg-ink p-5 text-paper"
              >
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">/ Manifesto</div>
                <p className="text-sm leading-relaxed text-paper/90">
                  I turn ideas into functional software, explore AI systems, and build products that solve real
                  problems.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* mobile text */}
        <motion.p
          style={{ opacity: textOpacity }}
          className="absolute inset-x-5 bottom-8 bg-ink p-4 text-sm text-paper md:hidden"
        >
          I turn ideas into functional software, explore AI systems, and build products that solve real problems.
        </motion.p>

        {/* rotating badge */}
        <motion.svg
          style={{ rotate: spin }}
          viewBox="0 0 200 200"
          className="absolute right-6 top-24 h-28 w-28 md:right-24 md:top-20 md:h-36 md:w-36"
        >
          <defs>
            <path id="circ" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
          </defs>
          <text className="fill-ink font-mono" fontSize="14.5" letterSpacing="5">
            <textPath href="#circ">SCROLL · THINK · BUILD · SHIP · REPEAT ·</textPath>
          </text>
          <circle cx="100" cy="100" r="8" className="fill-paper" />
        </motion.svg>
      </div>
    </section>
  );
}
