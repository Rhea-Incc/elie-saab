import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/couture/Reveal";
import { RESIDENCES } from "@/lib/residences";

const list = RESIDENCES;

export const Route = createFileRoute("/residences")({
  head: () => ({
    meta: [
      { title: "Residences — Elie Saab Residences" },
      { name: "description", content: "A collection of private residences, tailored to their light." },
    ],
  }),
  component: Residences,
});

function Residences() {
  const [i, setI] = useState(0);
  const r = list[i];
  return (
    <section className="relative bg-ivory pt-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-14">
        <Reveal>
          <p className="eyebrow">The Collection</p>
          <h1 className="mt-6 font-display text-6xl font-light leading-[1.02] text-charcoal md:text-8xl">
            Residences, <em className="text-bronze">tailored to their light</em>.
          </h1>
        </Reveal>

        <div className="mt-24 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-7" data-cursor="image">
            <AnimatePresence mode="wait">
              <motion.div
                key={r.code}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
                className="relative aspect-[4/5] w-full overflow-hidden"
              >
                <video src={r.video} poster={r.image} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="col-span-12 md:col-span-5 md:pt-10">
            <div className="border-y border-hairline">
              {list.map((res, idx) => (
                <button
                  key={res.code}
                  onClick={() => setI(idx)}
                  className={`flex w-full items-baseline justify-between gap-6 border-b border-hairline py-6 text-left last:border-b-0 transition-colors ${idx === i ? "text-charcoal" : "text-stone hover:text-charcoal"}`}
                >
                  <span className="font-display text-xs tracking-[0.4em]">{res.code}</span>
                  <span className={`flex-1 font-display text-2xl italic md:text-3xl ${idx === i ? "text-bronze" : ""}`}>{res.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.32em]">{res.area}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={r.code}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 1 }}
                className="mt-10"
              >
                <p className="max-w-md text-[15px] leading-relaxed text-charcoal/90">{r.copy}</p>
                <dl className="mt-10 grid grid-cols-2 gap-y-4 text-[13px]">
                  <dt className="eyebrow">Area</dt><dd className="text-charcoal">{r.area}</dd>
                  <dt className="eyebrow">Configuration</dt><dd className="text-charcoal">{r.beds}</dd>
                  <dt className="eyebrow">Orientation</dt><dd className="text-charcoal">{r.orient}</dd>
                  <dt className="eyebrow">Availability</dt><dd className="text-charcoal italic">On enquiry</dd>
                </dl>
                <div className="mt-12 flex flex-wrap items-center gap-8">
                  <button className="border-b border-charcoal pb-1 text-[10px] uppercase tracking-[0.32em] hover:border-bronze hover:text-bronze">Download Brochure</button>
                  <Link to="/enquiry" className="border-b border-charcoal pb-1 text-[10px] uppercase tracking-[0.32em] hover:border-bronze hover:text-bronze">Private Enquiry</Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-32" />
      </div>
    </section>
  );
}
