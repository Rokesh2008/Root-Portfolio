import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import portrait from "../assets/about.jpg";
import TornTop from "../components/TornTop";
import { ScrollWords, SectionTag } from "../components/Reveal";
import { PrimaryButton } from "../components/Button";
import { go } from "../components/Nav";

const stats = [
  { n: "03", l: "Virtual internships" },
  { n: "04", l: "Languages in daily use" },
  { n: "∞", l: "Curiosity" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const aboutX = useTransform(p, [0, 1], ["12%", "-30%"]);
  const meX = useTransform(p, [0, 1], ["-10%", "20%"]);
  const imgY = useTransform(p, [0, 1], ["-8%", "12%"]);
  const imgScale = useTransform(p, [0, 0.5, 1], [1.25, 1.1, 1.0]);
  const blockY = useTransform(p, [0, 1], ["14%", "-20%"]);
  const blockRotate = useTransform(p, [0, 1], [-6, 6]);

  return (
    <section id="about" ref={ref} className="relative bg-ink py-32 md:py-48">
      <TornTop fill="#080808" seed={5} />
      <div className="grid-lines absolute inset-0 opacity-50" />

      {/* giant parallax headline */}
      <div className="pointer-events-none absolute left-0 top-16 w-full select-none overflow-hidden md:top-10">
        <motion.div style={{ x: aboutX }} className="text-outline whitespace-nowrap font-display text-[32vw] leading-[0.8] opacity-60">
          ABOUT ABOUT ABOUT
        </motion.div>
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:grid-cols-[1fr_1.1fr] md:px-12">
        {/* portrait with mask reveal and layered speeds */}
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <motion.div
            style={{ y: blockY, rotate: blockRotate }}
            className="absolute -left-6 -top-6 h-[85%] w-[70%] bg-accent md:-left-10"
          />
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.3, ease: [0.7, 0, 0.2, 1] }}
            className="relative aspect-[4/5] overflow-hidden border border-paper/20 bg-ink"
          >
            <motion.img
              src={portrait}
              alt="Developer at work"
              style={{ y: imgY, scale: imgScale }}
              className="h-full w-full object-cover grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-paper">
              Fig. 03 — The builder at work
            </div>
          </motion.div>
          <motion.div
            style={{ y: useTransform(p, [0, 1], ["30%", "-40%"]) }}
            className="absolute -bottom-8 -right-3 hidden bg-paper px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink md:block"
          >
            Chennai, IN — 13.08°N
          </motion.div>
        </div>

        <div className="relative">
          <SectionTag n="S3" label="About" />
          <h2 className="mt-6 font-display text-[22vw] leading-[0.82] text-paper md:text-[11vw]">
            <motion.span style={{ x: meX }} className="block">
              ABOUT
            </motion.span>
            <span className="block">
              ME<span className="text-accent">/</span>
            </span>
          </h2>

          <ScrollWords
            className="mt-10 max-w-xl text-xl font-light leading-snug text-paper md:text-3xl"
            text="I'm Rokeshwaran M., a B.Tech AI & Data Science student who loves building real-world applications, exploring AI systems and software engineering."
          />

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-paper/20 pt-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
              >
                <div className="font-display text-5xl text-accent">{s.n}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{s.l}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <PrimaryButton
              href="#experience"
              onClick={() => {
                go("experience");
              }}
            >
              More
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
