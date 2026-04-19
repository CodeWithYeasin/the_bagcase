"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || coarsePointer) return;

    setEnabled(true);
    const move = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const handleHover = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, select")) setActive(true);
    };
    const leaveHover = () => setActive(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mouseout", leaveHover);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mouseout", leaveHover);
    };
  }, []);

  if (!enabled) return null;

  return (
    <span
      className="pointer-events-none fixed z-[110] hidden rounded-full border border-gold mix-blend-multiply transition-all duration-200 md:block"
      style={{
        width: active ? 40 : 24,
        height: active ? 40 : 24,
        transform: `translate(${position.x - (active ? 20 : 12)}px, ${position.y - (active ? 20 : 12)}px)`,
      }}
      aria-hidden={true}
    />
  );
}
