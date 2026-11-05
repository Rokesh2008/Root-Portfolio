import type { ReactNode } from "react";

/** Primary button — underline + hover fill (from the blueprint). */
export function PrimaryButton({
  children,
  href = "#",
  onClick,
  light = false,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  light?: boolean;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      data-cursor
      className={`group relative inline-flex items-center gap-3 overflow-hidden border px-6 py-3 font-mono text-xs uppercase tracking-[0.3em] ${
        light ? "border-ink/40 text-ink" : "border-paper/40 text-paper"
      }`}
    >
      <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-out group-hover:translate-x-0" />
      <span className="relative z-10 transition-colors group-hover:text-paper">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-paper">→</span>
    </a>
  );
}

/** Secondary action — minimal bracketed arrow */
export function BracketLink({ children, href = "#" }: { children: ReactNode; href?: string }) {
  return (
    <a href={href} data-cursor className="group inline-flex items-center gap-2 font-mono text-sm text-accent">
      <span className="transition-transform group-hover:-translate-x-1">[</span>
      <span className="transition-transform group-hover:translate-x-1">{children}</span>
      <span className="transition-transform group-hover:translate-x-1">]</span>
    </a>
  );
}
