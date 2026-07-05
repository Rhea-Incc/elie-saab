import { useEffect, useRef, useState } from "react";

export function AtelierCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    let raf = 0;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      setVisible(true);
      const t = e.target as HTMLElement | null;
      const overImage = !!t?.closest("[data-cursor='image']");
      setExpanded(overImage);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[60] hidden rounded-full border border-charcoal/50 mix-blend-multiply transition-[width,height,opacity] duration-700 ease-out md:block ${
        expanded ? "h-20 w-20 border-ivory bg-charcoal/0" : "h-3 w-3"
      } ${visible ? "opacity-100" : "opacity-0"}`}
    />
  );
}
