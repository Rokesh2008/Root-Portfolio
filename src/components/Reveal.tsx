import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/** Word-by-word masked headline reveal when scrolled into view. */
export function SplitReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-bottom pb-[0.04em]">
          <motion.span
            aria-hidden
            className="inline-block"
            initial={{ y: "115%", rotate: 4 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.95, ease: [0.2, 0.8, 0.2, 1], delay: delay + i * 0.09 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Word({ w, p, range }: { w: string; p: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(p, range, [0.14, 1]);
  const y = useTransform(p, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">
      {w}
    </motion.span>
  );
}

/** Paragraph whose words light up as you scroll. */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} w={w} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

export function SectionTag({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] ${dark ? "text-ink" : "text-paper"}`}
    >
      <span className="bg-accent px-2 py-1 text-paper">{n}</span>
      <span className="h-px w-10 bg-current opacity-50" />
      <span>{label}</span>
    </motion.div>
  );
}
