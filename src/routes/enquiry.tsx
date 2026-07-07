import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Private Enquiry — Elie Saab Residences" },
      { name: "description", content: "A private introduction with our client atelier." },
      { property: "og:title", content: "Private Enquiry — Elie Saab Residences" },
      {
        property: "og:description",
        content: "Begin a private conversation with the Elie Saab Residences client atelier.",
      },
    ],
  }),
  component: Enquiry,
});

const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "A name, kindly." })
    .max(80, { message: "A little briefer, if you would." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "An address for our reply." })
    .email({ message: "A valid email address, please." })
    .max(120),
  tel: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),
  residence: z.string().trim().max(80).optional().or(z.literal("")),
  time: z.string().trim().max(80).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(1000, { message: "Please keep it under a thousand characters." })
    .optional()
    .or(z.literal("")),
});

type EnquiryValues = z.infer<typeof enquirySchema>;
type Errors = Partial<Record<keyof EnquiryValues, string>>;

const initial: EnquiryValues = {
  name: "",
  email: "",
  tel: "",
  residence: "",
  time: "",
  country: "",
  message: "",
};

function Enquiry() {
  const [values, setValues] = useState<EnquiryValues>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryValues, boolean>>>({});
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  const setField = (key: keyof EnquiryValues) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (touched[key]) {
      const single = enquirySchema.shape[key].safeParse(v);
      setErrors((prev) => ({
        ...prev,
        [key]: single.success ? undefined : single.error.issues[0]?.message,
      }));
    }
  };

  const blurField = (key: keyof EnquiryValues) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const single = enquirySchema.shape[key].safeParse(values[key]);
    setErrors((prev) => ({
      ...prev,
      [key]: single.success ? undefined : single.error.issues[0]?.message,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof EnquiryValues;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setTouched({
        name: true, email: true, tel: true, residence: true,
        time: true, country: true, message: true,
      });
      return;
    }
    setErrors({});
    setPending(true);
    // Simulated ceremonial pause — no popups, no alerts.
    window.setTimeout(() => {
      setPending(false);
      setSent(true);
    }, 1400);
  };

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
                className="border-y border-hairline py-32 text-center"
                aria-live="polite"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.6, ease: [0.22, 0.61, 0.36, 1] }}
                  className="mx-auto h-px w-24 origin-center bg-bronze"
                />
                <p className="eyebrow mt-10">Received</p>
                <p className="mt-8 font-display text-4xl font-light italic leading-tight text-charcoal md:text-6xl">
                  Thank you.
                </p>
                <p className="mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-stone">
                  Our Private Client team will contact you shortly.
                </p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                  className="mx-auto mt-16 h-px w-16 origin-center bg-hairline"
                />
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                onSubmit={onSubmit}
                noValidate
                className="grid grid-cols-12 gap-x-8 gap-y-12"
              >
                <Field
                  label="Name"
                  name="name"
                  required
                  value={values.name}
                  error={errors.name}
                  onChange={setField("name")}
                  onBlur={blurField("name")}
                  className="col-span-12 md:col-span-6"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  value={values.email}
                  error={errors.email}
                  onChange={setField("email")}
                  onBlur={blurField("email")}
                  className="col-span-12 md:col-span-6"
                />
                <Field
                  label="Telephone"
                  name="tel"
                  type="tel"
                  value={values.tel ?? ""}
                  error={errors.tel}
                  onChange={setField("tel")}
                  onBlur={blurField("tel")}
                  className="col-span-12 md:col-span-6"
                />
                <Field
                  label="Preferred residence"
                  name="residence"
                  placeholder="The Atelier · The Salon · The Maison · Penthouse"
                  value={values.residence ?? ""}
                  error={errors.residence}
                  onChange={setField("residence")}
                  onBlur={blurField("residence")}
                  className="col-span-12 md:col-span-6"
                />
                <Field
                  label="Preferred contact time"
                  name="time"
                  placeholder="Morning · Afternoon · Evening"
                  value={values.time ?? ""}
                  error={errors.time}
                  onChange={setField("time")}
                  onBlur={blurField("time")}
                  className="col-span-12 md:col-span-6"
                />
                <Field
                  label="Country"
                  name="country"
                  value={values.country ?? ""}
                  error={errors.country}
                  onChange={setField("country")}
                  onBlur={blurField("country")}
                  className="col-span-12 md:col-span-6"
                />

                <div className="col-span-12">
                  <label htmlFor="message" className="eyebrow block">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={values.message ?? ""}
                    onChange={(e) => setField("message")(e.target.value)}
                    onBlur={blurField("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="mt-4 w-full resize-none border-0 border-b border-hairline bg-transparent pb-3 font-display text-2xl font-light italic text-charcoal placeholder:text-stone/50 focus:border-bronze focus:outline-none focus:ring-0"
                    placeholder="A few words…"
                  />
                  <FieldError id="message-error" message={errors.message} />
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
  value, error, onChange, onBlur,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  const errorId = `${name}-error`;
  return (
    <div className={className}>
      <label htmlFor={name} className="eyebrow block">
        {label}
        {required && <span className="ml-1 text-bronze">·</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`mt-4 w-full border-0 border-b bg-transparent pb-3 font-display text-2xl font-light italic text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-0 ${
          error ? "border-bronze focus:border-bronze" : "border-hairline focus:border-bronze"
        }`}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <div className="mt-3 min-h-[14px]" aria-live="polite">
      <AnimatePresence mode="wait">
        {message ? (
          <motion.p
            key={message}
            id={id}
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-[10px] uppercase tracking-[0.28em] text-bronze"
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
