import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { A } from "@/lib/assets";
import { AnimatePresence, motion } from "framer-motion";

type Zone = { id: string; label: string; kind: string; x: number; y: number; copy: string };
const zones: Zone[] = [
  { id: "z1", label: "The Tower", kind: "Residences", x: 50, y: 46, copy: "Twenty-two floors of tailored residences, drawn within the woven lattice." },
  { id: "z2", label: "Reflection Pool", kind: "Landscape", x: 22, y: 68, copy: "A slow sheet of water, catching the sky between the trees." },
  { id: "z3", label: "Sky Terrace", kind: "Amenity", x: 70, y: 20, copy: "A suspended clearing for sunrise wellness and private dining." },
  { id: "z4", label: "Native Garden", kind: "Landscape", x: 80, y: 74, copy: "Local planting composed to mature with the residence." },
  { id: "z5", label: "Arrival Court", kind: "Approach", x: 42, y: 86, copy: "A quiet plaza of pale stone, framed by water." },
];

export const Route = createFileRoute("/masterplan")({
  head: () => ({
    meta: [
      { title: "Masterplan — Elie Saab Residences" },
      { name: "description", content: "An illustrated study of the residence, its gardens and amenities." },
    ],
  }),
  component: Masterplan,
});

function Masterplan() {
  const [active, setActive] = useState<Zone | null>(null);
  return (
    <section className="relative min-h-dvh bg-ivory pt-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-14">
        <p className="eyebrow">Masterplan</p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-light leading-[1.02] text-charcoal md:text-7xl">
          A single <em className="text-bronze">composition</em>, drawn in stone and green.
        </h1>

        <div className="mt-16 grid grid-cols-12 gap-6 md:gap-10">
          <div className="relative col-span-12 md:col-span-8" data-cursor="image">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img src={A.aerial} alt="Aerial illustrated view of the masterplan" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-ivory/10 mix-blend-luminosity" />
              {zones.map((z) => (
                <button
                  key={z.id}
                  onMouseEnter={() => setActive(z)}
                  onFocus={() => setActive(z)}
                  onClick={() => setActive(z)}
                  aria-label={z.label}
                  style={{ left: `${z.x}%`, top: `${z.y}%` }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <span className={`block h-3 w-3 rounded-full border transition-all duration-700 ${active?.id === z.id ? "border-bronze bg-gold" : "border-ivory bg-transparent"}`} />
                  <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.32em] text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {z.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <aside className="col-span-12 md:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active?.id ?? "idle"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
                className="border-y border-hairline py-10"
              >
                <p className="eyebrow">{active?.kind ?? "The composition"}</p>
                <h2 className="mt-6 font-display text-4xl font-light italic text-charcoal">
                  {active?.label ?? "Hover the plan"}
                </h2>
                <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-stone">
                  {active?.copy ?? "Rest the cursor on the plan to reveal residences, gardens and amenities."}
                </p>
              </motion.div>
            </AnimatePresence>

            <ul className="mt-10 divide-y divide-hairline border-b border-hairline">
              {zones.map((z) => (
                <li key={z.id}>
                  <button
                    onMouseEnter={() => setActive(z)}
                    onClick={() => setActive(z)}
                    className={`flex w-full items-baseline justify-between py-4 text-left text-[13px] uppercase tracking-[0.3em] transition-colors ${active?.id === z.id ? "text-bronze" : "text-stone hover:text-charcoal"}`}
                  >
                    <span>{z.label}</span>
                    <span className="text-[10px] tracking-[0.32em]">{z.kind}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
