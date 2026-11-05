import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import TornTop from "../components/TornTop";
import news from "../assets/newspaper.jpg";
import { SectionTag, SplitReveal } from "../components/Reveal";
import { experience, profile } from "../data";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const { scrollYProgress: lp } = useScroll({ target: listRef, offset: ["start 0.7", "end 0.6"] });
  const line = useSpring(lp, { stiffness: 120, damping: 28 });
  const bgY = useTransform(p, [0, 1], ["-10%", "10%"]);
  const wordX = useTransform(p, [0, 1], ["10%", "-25%"]);

  return (
    <section id="experience" ref={ref} className="relative bg-paper py-32 text-ink md:py-44">
      <TornTop fill="#F5F3EE" rim="#D9D9D9" seed={17} />
      <motion.div
        style={{ y: bgY, backgroundImage: `url(${news})` }}
        className="absolute -inset-y-[10%] inset-x-0 bg-cover opacity-[0.14] mix-blend-multiply grayscale"
      />
      <div className="pointer-events-none absolute inset-x-0 top-6 overflow-hidden">
        <motion.div style={{ x: wordX }} className="text-outline-ink whitespace-nowrap font-display text-[26vw] leading-none opacity-[0.12]">
          2025 2025 2025 2025
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-12">
        <SectionTag n="S6" label="Experience" dark />
        <h2 className="mt-6 font-display text-[22vw] leading-[0.82] md:text-[12vw]">
          <SplitReveal text="EXPERIENCE" />
          <span className="text-accent">/</span>
        </h2>

        <div ref={listRef} className="relative mt-16 pl-8 md:pl-16">
          {/* the drawn line */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-ink/20 md:left-[15px]" />
          <motion.div style={{ scaleY: line }} className="absolute bottom-0 left-[6px] top-0 w-[3px] origin-top bg-accent md:left-[14px]" />

          {experience.map((e, i) => (
            <motion.a
              key={e.company}
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative mb-6 flex flex-col justify-between gap-3 border border-ink/80 bg-paper p-6 transition-colors duration-500 hover:bg-ink hover:text-paper md:flex-row md:items-center md:p-8"
            >
              <span className="absolute -left-[38px] top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center md:-left-[58px]">
                <span className="pulse-ring absolute h-full w-full rounded-full bg-accent" />
                <span className="relative h-3 w-3 rounded-full bg-accent ring-4 ring-paper" />
              </span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  Stage 0{i + 1}
                </div>
                <h3 className="mt-1 font-display text-4xl leading-none md:text-6xl">{e.company}</h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] opacity-70">{e.detail}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="border border-current px-4 py-1.5 font-mono text-xs tracking-widest">{e.year}</span>
                <span className="text-2xl text-accent transition-transform duration-300 group-hover:translate-x-2">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
