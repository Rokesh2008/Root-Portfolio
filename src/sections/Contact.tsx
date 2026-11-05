import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import TornTop from "../components/TornTop";
import hands from "../assets/hands.jpg";
import { SectionTag } from "../components/Reveal";
import { profile } from "../data";

const GitHub = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
const LinkedIn = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);
const Mail = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });

  // The two hands drift together as you arrive
  const leftX = useTransform(p, [0, 1], ["-32%", "0%"]);
  const rightX = useTransform(p, [0, 1], ["32%", "0%"]);
  const glow = useTransform(p, [0.7, 1], [0, 1]);
  const spark = useTransform(p, [0.85, 1], [0, 1]);
  const sparkScale = useTransform(p, [0.85, 1], [0.2, 1.4]);
  const titleY = useTransform(p, [0, 1], ["30%", "0%"]);

  const links = [
    { k: "Email", v: profile.email, href: `mailto:${profile.email}`, external: false },
    { k: "GitHub", v: "github.com/Rokesh2008", href: profile.github, external: true },
    { k: "LinkedIn", v: "linkedin.com/in/rokeshwaran", href: profile.linkedin, external: true },
    { k: "Phone", v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, external: false },
    { k: "Base", v: profile.location, href: "https://maps.google.com/?q=Chennai,+India", external: true },
  ];

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-ink pb-10 pt-32 md:pt-44">
      <TornTop fill="#080808" seed={23} />
      <div className="grid-lines absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-12">
        <SectionTag n="S7" label="Contact" />

        <div className="relative mt-6">
          {/* hands */}
          <div className="relative mx-auto aspect-[3/2] w-full max-w-[1100px]">
            <motion.div
              style={{ opacity: glow }}
              className="absolute left-1/2 top-[45%] h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/50 blur-[80px]"
            />
            <motion.img
              src={hands}
              alt=""
              style={{ x: leftX, clipPath: "inset(0 46.7% 0 0)" }}
              className="absolute inset-0 h-full w-full select-none mix-blend-lighten"
              draggable={false}
            />
            <motion.img
              src={hands}
              alt=""
              style={{ x: rightX, clipPath: "inset(0 0 0 53.3%)" }}
              className="absolute inset-0 h-full w-full select-none mix-blend-lighten"
              draggable={false}
            />
            <motion.div
              style={{ opacity: spark, scale: sparkScale }}
              className="absolute left-[52.8%] top-[54%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_60px_20px_rgba(225,6,0,0.8)]"
            />
          </div>

          {/* headline over hands */}
          <motion.h2
            style={{ y: titleY }}
            className="pointer-events-none relative -mt-[12vw] text-center font-display text-[24vw] leading-[0.8] md:-mt-[9vw] md:text-[17vw]"
          >
            <span className="block mix-blend-difference">
              LET&apos;S BUILD<span className="text-accent">/</span>
              <motion.span
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="inline-block text-accent"
              >
                ?
              </motion.span>
            </span>
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">/ Get in touch</div>
            <div className="mt-4 divide-y divide-paper/20 border-y border-paper/20">
              {links.map((l) => (
                <a
                  key={l.k}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noreferrer noopener" : undefined}
                  data-cursor
                  className="group flex items-center justify-between gap-4 py-4 transition-all hover:px-4 hover:bg-accent"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted group-hover:text-paper">{l.k}</span>
                  <span className="break-all text-right font-display text-2xl tracking-wide md:text-4xl">{l.v}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            {[
              { n: "GitHub", i: <GitHub />, h: profile.github, ext: true },
              { n: "LinkedIn", i: <LinkedIn />, h: profile.linkedin, ext: true },
              { n: "Gmail", i: <Mail />, h: `mailto:${profile.email}`, ext: false },
            ].map((s) => (
              <motion.a
                key={s.n}
                href={s.h}
                target={s.ext ? "_blank" : undefined}
                rel={s.ext ? "noreferrer noopener" : undefined}
                aria-label={s.n}
                title={s.n}
                whileHover={{ y: -6, rotate: -6 }}
                className="flex h-14 w-14 items-center justify-center border border-paper/40 transition-colors hover:border-accent hover:bg-accent"
              >
                {s.i}
              </motion.a>
            ))}
          </div>
        </div>

        {/* footer */}
        <div className="mt-24 flex flex-col items-start justify-between gap-3 border-t border-paper/20 pt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:flex-row md:items-center">
          <span>© 2025 {profile.name} — All roots reserved</span>
          <span>
            Designed &amp; built with React · Vite · Tailwind · Framer Motion
          </span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-paper hover:text-accent">
            Back to the root ↑
          </button>
        </div>
      </div>
    </section>
  );
}
