import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Emblem } from "./Emblem";

const nav = [
  { label: "Philosophy", to: "/#philosophy" },
  { label: "Architecture", to: "/#architecture" },
  { label: "Residences", to: "/residences" },
  { label: "Gallery", to: "/gallery" },
  { label: "Masterplan", to: "/masterplan" },
];

export function Navigation() {
  const { scrollY } = useScroll();
  const pad = useTransform(scrollY, [0, 200], [28, 16]);
  const bg = useTransform(scrollY, [0, 200], ["rgba(248,246,242,0)", "rgba(248,246,242,0.86)"]);
  const border = useTransform(scrollY, [0, 200], ["rgba(217,210,199,0)", "rgba(217,210,199,1)"]);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "FR" | "AR">("EN");

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        style={{
          paddingTop: pad,
          paddingBottom: pad,
          backgroundColor: bg,
          borderColor: border,
        }}
        className="fixed inset-x-0 top-0 z-40 border-b backdrop-blur-[6px] transition-colors"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-14">
          <Link to="/" aria-label="Elie Saab Residences — Home" className="flex items-center gap-3">
            <Emblem className="h-8 w-auto opacity-90" />
            <span className="hidden font-display text-[15px] tracking-[0.42em] text-charcoal md:inline">
              ELIE&nbsp;SAAB
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="story-underline relative text-[10px] uppercase tracking-[0.32em] text-charcoal/80 transition-colors hover:text-bronze"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-stone md:flex">
              {(["EN", "FR", "AR"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`transition-colors ${lang === l ? "text-charcoal" : "hover:text-charcoal"}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link
              to="/enquiry"
              className="hidden border-b border-charcoal/50 pb-1 text-[10px] uppercase tracking-[0.32em] text-charcoal transition-all hover:border-bronze hover:text-bronze md:inline-block"
            >
              Private Enquiry
            </Link>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="flex h-8 w-8 flex-col items-end justify-center gap-[6px]"
            >
              <span
                className={`h-px bg-charcoal transition-all duration-500 ${open ? "w-6 translate-y-[3.5px] rotate-45" : "w-6"}`}
              />
              <span
                className={`h-px bg-charcoal transition-all duration-500 ${open ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-ivory"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
              className="mx-auto flex h-full max-w-[1600px] flex-col justify-center px-8 pt-24 md:px-20"
            >
              <span className="eyebrow mb-16">The Maison</span>
              <ul className="flex flex-col gap-6 md:gap-8">
                {[...nav, { label: "Private Enquiry", to: "/enquiry" }].map((n, i) => (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className="font-display text-5xl font-light tracking-tight text-charcoal transition-colors hover:text-bronze md:text-7xl"
                      style={{ transitionDelay: `${i * 20}ms` }}
                    >
                      <span className="italic">{n.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-hairline pt-8 text-[10px] uppercase tracking-[0.32em] text-stone">
                <span>Elie Saab Residences</span>
                <span>Beirut · Paris · Dubai</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
