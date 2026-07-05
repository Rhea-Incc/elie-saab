import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { A } from "@/lib/assets";
import { Emblem } from "@/components/couture/Emblem";
import { Reveal, ImageVeil } from "@/components/couture/Reveal";
import { CoutureLink } from "@/components/couture/Button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elie Saab Residences — Living Couture" },
      {
        property: "og:image",
        content: `https://id-preview--f24b1872-91e1-49fb-b531-46d9e26e1674.lovable.app${A.facadeDusk}`,
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Overture />
      <Philosophy />
      <Architecture />
      <Landscape />
      <Residences />
      <Rituals />
      <Legacy />
      <BeginConversation />
    </>
  );
}

/* ————————————————————————————————————————————————— */
/* CHAPTER I — THE ARRIVAL                             */
/* ————————————————————————————————————————————————— */

function Overture() {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.35]);

  useEffect(() => {
    if (reduce) { setStage(3); return; }
    const t1 = setTimeout(() => setStage(1), 400);
    const t2 = setTimeout(() => setStage(2), 2400);
    const t3 = setTimeout(() => setStage(3), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [reduce]);

  return (
    <section ref={ref} className="relative h-[110dvh] w-full overflow-hidden bg-ivory">
      {/* Emblem overture */}
      <AnimatePresence>
        {stage < 2 && (
          <motion.div
            key="overture"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 1.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-ivory"
          >
            <Emblem className="breathe h-24 w-auto md:h-32" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero image, revealed like dawn */}
      <motion.div
        style={{ scale: heroScale, y: heroY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 2 ? 1 : 0 }}
        transition={{ duration: 2.6, ease: [0.22, 0.61, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={A.facadeDusk}
          alt="Elie Saab Residences at blue hour, organic golden lattice softened by native trees"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-charcoal" />
        {/* Subtle veil for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      </motion.div>

      {/* Headline */}
      <div className="absolute inset-0 z-20 flex items-end pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 12 }}
            transition={{ duration: 1.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="eyebrow text-ivory/80"
          >
            Chapter I — The Arrival
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 30 }}
            transition={{ duration: 2.2, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-8 font-display text-[13vw] font-light leading-[0.95] text-ivory md:text-[9vw]"
          >
            Living <span className="italic text-gold">Couture</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 20 }}
            transition={{ duration: 2, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-10 max-w-xl text-sm leading-relaxed text-ivory/85 md:text-base"
          >
            Architecture tailored with the precision of haute couture and the permanence of
            timeless craftsmanship.
          </motion.p>
        </div>
      </div>

      {/* Scroll invitation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 3 ? 1 : 0 }}
        transition={{ duration: 1.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[0.32em] text-ivory/70"
      >
        <span className="drift inline-block">Scroll</span>
      </motion.div>
    </section>
  );
}

/* ————————————————————————————————————————————————— */
/* CHAPTER II — PHILOSOPHY                              */
/* ————————————————————————————————————————————————— */

function Philosophy() {
  const statements = [
    "Beauty is not added. It is woven into every surface.",
    "Nature becomes ornament. Light becomes material.",
    "Architecture becomes couture.",
  ];
  return (
    <section id="philosophy" className="relative bg-ivory py-40 md:py-64">
      <div className="mx-auto max-w-[1600px] px-6 md:px-14">
        <Reveal>
          <p className="eyebrow">Chapter II — Philosophy</p>
        </Reveal>
        <div className="mt-24 space-y-40 md:space-y-56">
          {statements.map((s, i) => (
            <Reveal key={i} delay={0.1} y={40}>
              <div className={i % 2 === 1 ? "md:pl-[38%]" : "md:pr-[38%]"}>
                <p className="font-display text-4xl font-light leading-[1.15] text-charcoal md:text-6xl lg:text-7xl">
                  {s.split(". ").map((frag, j, arr) => (
                    <span key={j}>
                      {j === arr.length - 1 && arr.length > 1 ? (
                        <em className="text-bronze">{frag}</em>
                      ) : (
                        frag + (j < arr.length - 1 ? "." : "")
                      )}
                      {j < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————— */
/* CHAPTER III — ARCHITECTURE                          */
/* ————————————————————————————————————————————————— */

function Architecture() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const lex = [
    ["woven structure", "an interlacing of bronze filaments"],
    ["architectural embroidery", "the façade tailored by hand"],
    ["living exoskeleton", "a lattice that breathes with the seasons"],
    ["organic lattice", "geometry drawn from the emblem"],
    ["tailored geometry", "each curve cut to a private measure"],
  ];

  return (
    <section id="architecture" className="relative bg-limestone py-40 md:py-56">
      <div className="mx-auto max-w-[1600px] px-6 md:px-14">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <Reveal className="col-span-12 md:col-span-5" y={30}>
            <p className="eyebrow">Chapter III — Architecture</p>
            <h2 className="mt-8 font-display text-5xl font-light leading-[1.05] text-charcoal md:text-6xl">
              A living <em className="text-bronze">craftsmanship</em>, woven around the residence.
            </h2>
            <p className="mt-10 max-w-md text-[15px] leading-relaxed text-stone">
              The façade is not a screen but a garment — a bronze lattice embroidered across the
              tower's silhouette, drawn from the flowing geometry of the Elie Saab emblem.
            </p>
          </Reveal>

          <div ref={ref} className="col-span-12 md:col-span-7">
            <div className="relative overflow-hidden" data-cursor="image">
              <motion.div style={{ y }} className="will-change-transform">
                <ImageVeil src={A.facade} alt="The lattice façade at nightfall" aspect="aspect-[3/4]" />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-7 md:order-2">
            <Reveal>
              <ImageVeil src={A.rain} alt="Vertical rain along the woven balconies" aspect="aspect-[3/4]" />
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-5 md:order-1 md:pt-20">
            <Reveal>
              <p className="eyebrow">The lexicon</p>
              <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
                {lex.map(([term, meaning]) => (
                  <li key={term} className="grid grid-cols-12 gap-4 py-6">
                    <span className="col-span-5 font-display text-xl italic text-charcoal md:text-2xl">{term}</span>
                    <span className="col-span-7 text-sm leading-relaxed text-stone">{meaning}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————— */
/* CHAPTER IV — LANDSCAPE                              */
/* ————————————————————————————————————————————————— */

function Landscape() {
  const scenes = [
    { label: "Gardens", copy: "Native planting drifts along every terrace." },
    { label: "Sky Terraces", copy: "Suspended clearings above the canopy." },
    { label: "Reflection Pools", copy: "Water quietly answering the sky." },
    { label: "Filtered Light", copy: "Bronze filigree dispersing the sun." },
  ];
  return (
    <section id="landscape" className="relative bg-ivory py-40 md:py-56">
      <div className="mx-auto max-w-[1600px] px-6 md:px-14">
        <Reveal>
          <p className="eyebrow">Chapter IV — Landscape</p>
          <h2 className="mt-8 max-w-3xl font-display text-5xl font-light leading-[1.05] text-charcoal md:text-6xl">
            Serenity, <em className="text-bronze">composed</em> in stone and green.
          </h2>
        </Reveal>
      </div>

      <div className="mt-24" data-cursor="image">
        <Reveal>
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img src={A.aerial} alt="Aerial view of terraced gardens and pools" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-24 max-w-[1600px] px-6 md:px-14">
        <div className="grid grid-cols-2 gap-x-10 gap-y-16 md:grid-cols-4">
          {scenes.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <p className="eyebrow">{`0${i + 1}`}</p>
              <h3 className="mt-6 font-display text-2xl font-light italic text-charcoal">{s.label}</h3>
              <p className="mt-4 text-sm leading-relaxed text-stone">{s.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————— */
/* CHAPTER V — LIVING SPACES                           */
/* ————————————————————————————————————————————————— */

const residences = [
  {
    code: "I",
    name: "The Atelier",
    area: "182 m²",
    beds: "2 Bedrooms",
    copy: "A private study of morning light — natural stone, oak, linen — softened by curtains that move with the day.",
    image: A.videos[0],
    poster: A.facade,
  },
  {
    code: "II",
    name: "The Salon",
    area: "264 m²",
    beds: "3 Bedrooms",
    copy: "A drawing room suspended within the lattice, opening onto a terrace of quiet green.",
    image: A.videos[1],
    poster: A.amenity,
  },
  {
    code: "III",
    name: "The Maison",
    area: "412 m²",
    beds: "4 Bedrooms",
    copy: "A duplex residence with private garden and library — a house within the tower.",
    image: A.videos[2],
    poster: A.rain,
  },
  {
    code: "IV",
    name: "The Couture Penthouse",
    area: "820 m²",
    beds: "5 Bedrooms",
    copy: "A singular crown residence with a sky garden, reflection pool, and private lift.",
    image: A.videos[3],
    poster: A.aerial,
  },
];

function Residences() {
  const [i, setI] = useState(0);
  const r = residences[i];
  return (
    <section id="residences" className="relative bg-limestone py-40 md:py-56">
      <div className="mx-auto max-w-[1600px] px-6 md:px-14">
        <Reveal>
          <p className="eyebrow">Chapter V — Living Spaces</p>
          <h2 className="mt-8 max-w-3xl font-display text-5xl font-light leading-[1.05] text-charcoal md:text-6xl">
            Interiors that begin with <em className="text-bronze">emotion</em>, and end with detail.
          </h2>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-stone">
            Morning light on natural stone. Curtains moving in the breeze. Only then, the plans.
          </p>
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
                <video
                  key={r.image}
                  src={r.image}
                  poster={r.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="col-span-12 md:col-span-5 md:pl-6 md:pt-10">
            <div className="border-y border-hairline">
              {residences.map((res, idx) => (
                <button
                  key={res.code}
                  onClick={() => setI(idx)}
                  className={`group flex w-full items-baseline justify-between gap-6 border-b border-hairline py-6 text-left transition-colors last:border-b-0 ${
                    idx === i ? "text-charcoal" : "text-stone hover:text-charcoal"
                  }`}
                >
                  <span className="font-display text-xs tracking-[0.4em]">{res.code}</span>
                  <span className={`flex-1 font-display text-2xl italic md:text-3xl ${idx === i ? "text-bronze" : ""}`}>
                    {res.name}
                  </span>
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
                transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
                className="mt-10"
              >
                <p className="max-w-md text-[15px] leading-relaxed text-charcoal/90">{r.copy}</p>
                <dl className="mt-10 grid grid-cols-2 gap-y-4 text-[13px]">
                  <dt className="eyebrow">Area</dt><dd className="text-charcoal">{r.area}</dd>
                  <dt className="eyebrow">Configuration</dt><dd className="text-charcoal">{r.beds}</dd>
                  <dt className="eyebrow">Floorplan</dt><dd className="text-charcoal italic">On enquiry</dd>
                  <dt className="eyebrow">Availability</dt><dd className="text-charcoal italic">Limited</dd>
                </dl>
                <div className="mt-12 flex flex-wrap items-center gap-8">
                  <button className="border-b border-charcoal pb-1 text-[10px] uppercase tracking-[0.32em] transition-colors hover:border-bronze hover:text-bronze">
                    Download Brochure
                  </button>
                  <Link to="/enquiry" className="border-b border-charcoal pb-1 text-[10px] uppercase tracking-[0.32em] transition-colors hover:border-bronze hover:text-bronze">
                    Private Enquiry
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————— */
/* CHAPTER VI — RITUALS OF LIVING                      */
/* ————————————————————————————————————————————————— */

function Rituals() {
  const moments = [
    {
      time: "Morning",
      hours: "05:30 — 11:00",
      title: "Sky gardens and sunrise wellness",
      copy: "Yoga above the canopy, coffee on the terrace, water still warming.",
      image: A.amenity,
    },
    {
      time: "Afternoon",
      hours: "12:00 — 17:00",
      title: "Private lounges, pool, reading rooms",
      copy: "Time slows. Light filters through the lattice onto pale stone.",
      image: A.aerial,
    },
    {
      time: "Evening",
      hours: "18:00 — 22:00",
      title: "Fire lounge and private dining",
      copy: "Skyline reflected in polished water. Conversation carries softly.",
      image: A.facadeDusk,
    },
    {
      time: "Night",
      hours: "22:00 — 05:00",
      title: "Reflections and quiet luxury",
      copy: "The lattice glows low. The city recedes. The maison rests.",
      image: A.rain,
    },
  ];
  return (
    <section id="rituals" className="relative bg-ivory py-40 md:py-56">
      <div className="mx-auto max-w-[1600px] px-6 md:px-14">
        <Reveal>
          <p className="eyebrow">Chapter VI — Rituals of Living</p>
          <h2 className="mt-8 max-w-3xl font-display text-5xl font-light leading-[1.05] text-charcoal md:text-6xl">
            Moments of <em className="text-bronze">retreat</em>, composed across the day.
          </h2>
        </Reveal>

        <div className="mt-24 space-y-32 md:space-y-40">
          {moments.map((m, i) => (
            <Reveal key={m.time}>
              <div className={`grid grid-cols-12 items-center gap-6 md:gap-12 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="col-span-12 md:col-span-7" data-cursor="image">
                  <ImageVeil src={m.image} alt={m.title} aspect="aspect-[16/10]" />
                </div>
                <div className="col-span-12 md:col-span-5">
                  <p className="eyebrow">{m.hours}</p>
                  <h3 className="mt-6 font-display text-4xl font-light italic text-charcoal md:text-5xl">
                    {m.time}
                  </h3>
                  <p className="mt-6 font-display text-2xl font-light leading-snug text-charcoal">
                    {m.title}
                  </p>
                  <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone">{m.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————— */
/* CHAPTER VII — LEGACY                                */
/* ————————————————————————————————————————————————— */

function Legacy() {
  return (
    <section id="legacy" className="relative overflow-hidden bg-limestone py-48 md:py-64">
      <div className="mx-auto max-w-[1600px] px-6 md:px-14">
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <p className="eyebrow">Chapter VII — Legacy</p>
              <h2 className="mt-8 font-display text-5xl font-light leading-[1.05] text-charcoal md:text-6xl">
                Craftsmanship <em className="text-bronze">outlasts</em> its moment.
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-24">
            <Reveal>
              <p className="max-w-lg text-[17px] leading-[1.9] text-charcoal/90">
                A residence made by hand ages differently. Stone deepens. Bronze softens. The
                lattice becomes as much a part of the city as the city becomes part of it.
                A tailored building is a permanent one.
              </p>
              <div className="mt-16 gold-line" />
              <blockquote className="mt-16 font-display text-3xl font-light italic leading-tight text-charcoal md:text-4xl">
                "What is made with care remains desirable long after fashion moves on."
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————— */
/* CHAPTER VIII — BEGIN YOUR CONVERSATION              */
/* ————————————————————————————————————————————————— */

function BeginConversation() {
  return (
    <section id="enquiry" className="relative bg-ivory py-40 md:py-56">
      <div className="mx-auto max-w-[1600px] px-6 md:px-14">
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-6">
            <Reveal>
              <p className="eyebrow">Chapter VIII — Private Enquiry</p>
              <h2 className="mt-8 font-display text-5xl font-light leading-[1.05] text-charcoal md:text-7xl">
                Begin your <em className="text-bronze">conversation</em>.
              </h2>
              <p className="mt-10 max-w-md text-[15px] leading-relaxed text-stone">
                A private introduction with our client atelier. Discreet, unhurried, and by
                appointment only.
              </p>
              <div className="mt-14">
                <CoutureLink to="/enquiry">Enter the atelier</CoutureLink>
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8" data-cursor="image">
            <Reveal>
              <ImageVeil src={A.aerial} alt="An aerial view of the residence at twilight" aspect="aspect-[4/5]" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
