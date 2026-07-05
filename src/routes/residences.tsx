import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { A } from "@/lib/assets";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/couture/Reveal";

const list = [
  {
    code: "I",
    name: "The Atelier",
    area: "182 m²",
    beds: "2 Bedrooms",
    orient: "East · Morning light",
    copy: "A private study of morning light — natural stone, oak, linen — softened by curtains that move with the day.",
    image: A.rain,
    video: A.videos[0],
  },
  {
    code: "II",
    name: "The Salon",
    area: "264 m²",
    beds: "3 Bedrooms",
    orient: "South · Garden view",
    copy: "A drawing room suspended within the lattice, opening onto a terrace of quiet green.",
    image: A.amenity,
    video: A.videos[1],
  },
  {
    code: "III",
    name: "The Maison",
    area: "412 m²",
    beds: "4 Bedrooms",
    orient: "West · Skyline",
    copy: "A duplex residence with private garden and library — a house within the tower.",
    image: A.facade,
    video: A.videos[2],
  },
  {
    code: "IV",
    name: "The Couture Penthouse",
    area: "820 m²",
    beds: "5 Bedrooms",
    orient: "Crown · Panorama",
    copy: "A singular crown residence with sky garden, reflection pool, and private lift.",
    image: A.aerial,
    video: A.videos[3],
  },
];

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
