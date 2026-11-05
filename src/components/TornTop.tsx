import { useMemo } from "react";

function jag(seed: number, steps: number, amp: number, offset: number) {
  let s = seed * 9301 + 49297;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  let d = `M0,60 L0,${offset + rnd() * amp}`;
  for (let i = 1; i <= steps; i++) {
    const x = (i / steps) * 1000;
    const y = offset + rnd() * amp + Math.sin(i * 0.37 + seed) * (amp * 0.35);
    d += ` L${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d + " L1000,60 Z";
}

/** A torn-paper edge that sits on the top of a section and overlaps the previous one. */
export default function TornTop({
  fill,
  rim = "#F5F3EE",
  seed = 1,
}: {
  fill: string;
  rim?: string;
  seed?: number;
}) {
  const rimPath = useMemo(() => jag(seed, 90, 22, 2), [seed]);
  const fillPath = useMemo(() => jag(seed + 7, 90, 18, 12), [seed]);
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-10 -translate-y-[calc(100%-1px)] md:h-16">
      <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className="block h-full w-full">
        <path d={rimPath} fill={rim} />
        <path d={fillPath} fill={fill} />
      </svg>
    </div>
  );
}
