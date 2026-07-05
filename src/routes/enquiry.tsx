import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Private Enquiry — Elie Saab Residences" },
      { name: "description", content: "A private introduction with our client atelier." },
    ],
  }),
  component: Enquiry,
});

function Enquiry() {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  return (
    <section className="relative min-h-dvh bg-ivory pt-32">
      <div className="mx-auto max-w-[1200px] px-6 pb-32 md:px-14">
        <p className="eyebrow">Private Enquiry</p>
        <h1 className="mt-6 max-w-3xl font-display text-6xl font-light leading-[1.02] text-charcoal md:text-8xl">
          Begin your <em className="text-bronze">conversation</em>.
        </h1>
        <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-stone">
          Our client atelier will contact you personally to arrange a private introduction to the
          residences.
        </p>

        <div className="relative mt-24">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
                className="border-y border-hairline py-24 text-center"
              >
                <p className="eyebrow">Received</p>
                <p className="mt-8 font-display text-4xl font-light italic leading-tight text-charcoal md:text-5xl">
                  Thank you.
                </p>
                <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-stone">
                  Our Private Client team will contact you shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setPending(true);
                  setTimeout(() => { setPending(false); setSent(true); }, 1200);
                }}
                className="grid grid-cols-12 gap-x-8 gap-y-12"
              >
                <Field label="Name" name="name" required className="col-span-12 md:col-span-6" />
                <Field label="Email" name="email" type="email" required className="col-span-12 md:col-span-6" />
                <Field label="Telephone" name="tel" type="tel" className="col-span-12 md:col-span-6" />
                <Field label="Preferred residence" name="residence" placeholder="The Atelier · The Salon · The Maison · Penthouse" className="col-span-12 md:col-span-6" />
                <Field label="Preferred contact time" name="time" placeholder="Morning · Afternoon · Evening" className="col-span-12 md:col-span-6" />
                <Field label="Country" name="country" className="col-span-12 md:col-span-6" />

                <div className="col-span-12">
                  <label className="eyebrow block">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="mt-4 w-full resize-none border-0 border-b border-hairline bg-transparent pb-3 font-display text-2xl font-light italic text-charcoal placeholder:text-stone/50 focus:border-bronze focus:outline-none focus:ring-0"
                    placeholder="A few words…"
                  />
                </div>

                <div className="col-span-12 mt-6 flex flex-wrap items-center justify-between gap-6 border-t border-hairline pt-8">
                  <p className="max-w-md text-[11px] leading-relaxed text-stone">
                    Your details remain private to the Elie Saab Residences client atelier.
                  </p>
                  <button
                    type="submit"
                    disabled={pending}
                    className="group inline-flex items-center gap-4 border border-charcoal/70 px-10 py-4 text-[10px] uppercase tracking-[0.32em] text-charcoal transition-all duration-500 hover:-translate-y-[2px] hover:border-charcoal hover:text-bronze disabled:opacity-50"
                  >
                    <span>{pending ? "Sending" : "Sign the registry"}</span>
                    <span aria-hidden className="h-px w-6 bg-current transition-all duration-500 group-hover:w-12" />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required, placeholder, className = "",
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="eyebrow block">{label}{required && <span className="ml-1 text-bronze">·</span>}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-4 w-full border-0 border-b border-hairline bg-transparent pb-3 font-display text-2xl font-light italic text-charcoal placeholder:text-stone/50 focus:border-bronze focus:outline-none focus:ring-0"
      />
    </div>
  );
}
