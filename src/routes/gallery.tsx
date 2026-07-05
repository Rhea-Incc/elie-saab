import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { A } from "@/lib/assets";
import { motion, AnimatePresence } from "framer-motion";

const plates = [
  { src: A.facadeDusk, caption: "The façade at blue hour" },
  { src: A.facade, caption: "The lattice, illuminated" },
  { src: A.rain, caption: "Vertical rain along the balconies" },
  { src: A.aerial, caption: "Terraced gardens, aerial study" },
  { src: A.amenity, caption: "Sky terrace at dusk" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Elie Saab Residences" },
      { name: "description", content: "An editorial gallery of the maison, presented one plate at a time." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") setI((v) => Math.min(v + 1, plates.length - 1));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") setI((v) => Math.max(v - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const p = plates[i];

  return (
    <section className="relative min-h-dvh bg-ivory pt-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-14">
        <div className="flex items-baseline justify-between border-b border-hairline pb-6">
          <p className="eyebrow">Gallery — Plate {String(i + 1).padStart(2, "0")} of {String(plates.length).padStart(2, "0")}</p>
          <p className="hidden text-[10px] uppercase tracking-[0.32em] text-stone md:block">Use ← → to turn the page</p>
        </div>

        <div className="relative mt-10">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <motion.img
                  src={p.src}
                  alt={p.caption}
                  initial={{ scale: 1.04 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2, ease: [0.22, 0.61, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-6 flex items-baseline justify-between border-t border-hairline pt-4">
                <span className="font-display text-lg italic text-charcoal">{p.caption}</span>
                <span className="text-[10px] uppercase tracking-[0.32em] text-stone">Elie Saab Residences</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-16 flex items-center justify-between border-t border-hairline pt-6">
            <button
              onClick={() => setI((v) => Math.max(v - 1, 0))}
              disabled={i === 0}
              className="text-[10px] uppercase tracking-[0.32em] text-charcoal transition-colors hover:text-bronze disabled:opacity-30"
            >
              ← Previous
            </button>
            <div className="flex gap-2">
              {plates.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Plate ${idx + 1}`}
                  className={`h-px w-10 transition-all ${idx === i ? "bg-charcoal" : "bg-hairline hover:bg-stone"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setI((v) => Math.min(v + 1, plates.length - 1))}
              disabled={i === plates.length - 1}
              className="text-[10px] uppercase tracking-[0.32em] text-charcoal transition-colors hover:text-bronze disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
