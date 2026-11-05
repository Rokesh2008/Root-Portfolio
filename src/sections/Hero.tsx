import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import statue from "../assets/hero.jpg";
import news from "../assets/newspaper.jpg";
import { profile } from "../data";
import { go } from "../components/Nav";

const ease = [0.2, 0.8, 0.2, 1] as const;

function Letters({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", rotate: 8 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 1, ease, delay: delay + i * 0.06 }}
          className="inline-block"
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // A. enter  → B. transform  → C. reveal  → D. settle
  const bgY = useTransform(p, [0, 1], ["0%", "28%"]);
  const statueY = useTransform(p, [0, 1], ["0%", "-16%"]);
  const statueScale = useTransform(p, [0, 0.6, 1], [1, 1.18, 1.45]);
  const statueRotate = useTransform(p, [0, 1], [0, 4]);
  const barSkew = useTransform(p, [0, 0.4], [0, -14]);
  const barX = useTransform(p, [0, 0.4], ["0%", "30%"]);

  const theX = useTransform(p, [0.12, 0.5], ["0vw", "-55vw"]);
  const rootX = useTransform(p, [0.12, 0.5], ["0vw", "55vw"]);
  const titleOpacity = useTransform(p, [0.1, 0.45], [1, 0]);
  const titleScale = useTransform(p, [0, 0.4], [1, 1.25]);
  const hudOpacity = useTransform(p, [0, 0.15], [1, 0]);

  const statementOpacity = useTransform(p, [0.6, 0.72], [0, 1]);
  const l1 = useTransform(p, [0.6, 0.72], ["110%", "0%"]);
  const l2 = useTransform(p, [0.66, 0.78], ["110%", "0%"]);
  const l3 = useTransform(p, [0.72, 0.84], ["110%", "0%"]);
  const pClip = useTransform(p, [0.8, 0.95], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const statueFade = useTransform(p, [0.5, 0.75], [1, 0.0]);

  const bars = [0, 1, 2, 3, 4].map((i) => ({
    y: useTransform(p, [0.28 + i * 0.05, 0.55 + i * 0.05], [i % 2 ? "110%" : "-110%", "0%"]),
  }));

  return (
    <section id="home" ref={ref} className="relative h-[360vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        {/* parallax layer 1: newspaper texture */}
        <motion.div
          style={{ y: bgY, backgroundImage: `url(${news})` }}
          className="absolute -inset-[15%] bg-cover bg-center opacity-[0.2] grayscale contrast-150"
        />
        <div className="grid-lines absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent" />

        {/* parallax layer 2: statue + red bar */}
        <motion.div style={{ opacity: statueFade }} className="absolute inset-0">
          <motion.div
            style={{ y: statueY, scale: statueScale, rotate: statueRotate }}
            className="absolute -right-[22%] top-[-4%] aspect-[832/1248] h-[112vh] md:right-[1%]"
          >
            <motion.img
              src={statue}
              alt="Classical statue collage"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease }}
              className="h-full w-full select-none mix-blend-lighten"
              draggable={false}
            />
            <motion.div
              style={{ skewX: barSkew, x: barX }}
              className="absolute left-[-14%] top-[33.5%] h-[6.5%] w-[122%]"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1], delay: 0.9 }}
                className="h-full w-full origin-left bg-accent"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* animated scribble */}
        <motion.svg
          style={{ opacity: titleOpacity }}
          viewBox="0 0 500 400"
          className="pointer-events-none absolute left-[8vw] top-[8vh] hidden w-[38vw] md:block"
          fill="none"
        >
          {[
            "M20,320 C60,60 260,20 300,120 S120,260 220,300 S430,220 470,90",
            "M60,360 C180,250 330,360 440,180",
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="#F5F3EE"
              strokeWidth={1.4}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.6, delay: 1.2 + i * 0.5, ease: "easeInOut" }}
            />
          ))}
        </motion.svg>

        {/* A → B: THE ROOT... */}
        <motion.div
          style={{ opacity: titleOpacity, scale: titleScale }}
          className="absolute inset-0 flex items-center px-[4vw]"
        >
          <div className="font-display leading-[0.78] text-paper">
            <motion.div style={{ x: theX }} className="text-[34vw] md:text-[19vw]">
              <Letters text="THE" delay={0.3} />
            </motion.div>
            <motion.div style={{ x: rootX }} className="text-[34vw] md:text-[19vw]">
              <Letters text="ROOT" delay={0.55} />
              <Letters text="..." delay={1.0} className="text-accent" />
            </motion.div>
          </div>
        </motion.div>

        {/* HUD */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute bottom-8 left-5 right-5 flex items-end justify-between md:bottom-10 md:left-10 md:right-24"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="pointer-events-auto font-mono text-[10px] uppercase leading-relaxed tracking-[0.25em] text-muted"
          >
            <div className="text-paper">Rokeshwaran M.</div>
            <div>AI &amp; Data Science · Developer</div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => go("contact")}
                className="inline-flex items-center gap-2 text-paper transition-colors hover:text-accent"
              >
                <span className="relative flex h-2 w-2">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Open to build
              </button>
              <span className="text-paper/40">/</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="text-paper transition-colors hover:text-accent"
              >
                GitHub ↗
              </a>
              <span className="text-paper/40">/</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="text-paper transition-colors hover:text-accent"
              >
                LinkedIn ↗
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="pointer-events-auto max-w-[250px] text-right"
          >
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-paper/80">
              A portfolio that documents the journey of a developer, a builder, and a curious mind.
            </p>
            <button
              onClick={() => go("manifesto")}
              className="mt-4 inline-flex items-center justify-end gap-2 font-mono text-[10px] tracking-[0.3em] text-paper transition-colors hover:text-accent"
            >
              SCROLL
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
                ↓
              </motion.span>
            </button>
          </motion.div>
        </motion.div>

        {/* C. red slashes wipe in */}
        <div className="pointer-events-none absolute inset-y-0 -left-[10%] -right-[10%]">
          {bars.map((b, i) => (
            <motion.div
              key={i}
              style={{ y: b.y, left: `${i * 21}%`, skewX: -14 }}
              className="absolute inset-y-0 w-[26%] bg-accent"
            />
          ))}
        </div>

        {/* D. statement revealed over red wall */}
        <motion.div
          style={{ opacity: statementOpacity }}
          className="absolute inset-0 flex flex-col justify-center px-[5vw] text-ink"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper">/ Who am I</div>
          <div className="mt-4 font-display text-[19vw] leading-[0.82] md:text-[14vw]">
            {[
              { t: "DEVELOPER.", y: l1 },
              { t: "BUILDER.", y: l2 },
              { t: "CURIOUS MIND.", y: l3 },
            ].map((l) => (
              <div key={l.t} className="overflow-hidden">
                <motion.div style={{ y: l.y }}>{l.t}</motion.div>
              </div>
            ))}
          </div>
          <motion.p
            style={{ clipPath: pClip }}
            className="mt-8 max-w-md font-mono text-xs uppercase leading-relaxed tracking-[0.2em] text-paper"
          >
            Every project starts as a root — curiosity first, then learning, then building, then impact.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
