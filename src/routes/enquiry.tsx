import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { RESIDENCES } from "@/lib/residences";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Private Enquiry — Elie Saab Residences" },
      { name: "description", content: "A private introduction with our client atelier." },
    ],
  }),
  component: Enquiry,
});

const RESIDENCE_NAMES = RESIDENCES.map((r) => r.name) as [string, ...string[]];

const schema = z.object({
  name: z.string().trim().min(2, "A name, please.").max(80, "A little shorter."),
  email: z.string().trim().email("A valid email, please.").max(160),
  tel: z
    .string()
    .trim()
    .max(40)
    .optional()
    .refine((v) => !v || /^[+()0-9\s.\-]{6,}$/.test(v), "A telephone as it would be dialled."),
  residence: z
    .string()
    .trim()
    .max(80)
    .optional()
    .refine((v) => !v || RESIDENCE_NAMES.includes(v), "Please choose from the collection."),
  time: z.string().trim().max(80).optional(),
  country: z.string().trim().max(80).optional(),
  message: z.string().trim().max(1000, "A shorter note, please.").optional(),
});

type FormValues = z.infer<typeof schema>;
type FieldName = keyof FormValues;

const FIELDS: { name: FieldName; label: string; type?: string; required?: boolean; placeholder?: string; className: string; }[] = [
  { name: "name", label: "Name", required: true, className: "col-span-12 md:col-span-6" },
  { name: "email", label: "Email", type: "email", required: true, className: "col-span-12 md:col-span-6" },
  { name: "tel", label: "Telephone", type: "tel", className: "col-span-12 md:col-span-6" },
  { name: "time", label: "Preferred contact time", placeholder: "Morning · Afternoon · Evening", className: "col-span-12 md:col-span-6" },
  { name: "country", label: "Country", className: "col-span-12 md:col-span-6" },
];


function Enquiry() {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "", email: "", tel: "", residence: "", time: "", country: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  const setValue = (name: FieldName, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validateField = (name: FieldName) => {
    const field = schema.shape[name];
    const result = field.safeParse(values[name] === "" ? undefined : values[name]);
    setErrors((e) => ({ ...e, [name]: result.success ? undefined : result.error.issues[0]?.message }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<FieldName, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldName | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setPending(true);
    setTimeout(() => { setPending(false); setSent(true); }, 1400);
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
                className="border-y border-hairline py-24 text-center"
                role="status"
                aria-live="polite"
              >
                <p className="eyebrow">Received</p>
                <p className="mt-8 font-display text-4xl font-light italic leading-tight text-charcoal md:text-5xl">
                  Thank you.
                </p>
                <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-stone">
                  Our Private Client team will contact you shortly.
                </p>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                  style={{ transformOrigin: "center" }}
                  className="mx-auto mt-12 block h-px w-24 bg-bronze"
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
                {FIELDS.map((f) => (
                  <Field
                    key={f.name}
                    label={f.label}
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    className={f.className}
                    value={values[f.name] ?? ""}
                    error={errors[f.name]}
                    onChange={(v) => setValue(f.name, v)}
                    onBlur={() => validateField(f.name)}
                  />
                ))}

                <ResidenceSelect
                  value={values.residence ?? ""}
                  error={errors.residence}
                  onChange={(v) => setValue("residence", v)}
                  onBlur={() => validateField("residence")}
                />



                <div className="col-span-12">
                  <label htmlFor="message" className="eyebrow block">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={values.message ?? ""}
                    onChange={(e) => setValue("message", e.target.value)}
                    onBlur={() => validateField("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`mt-4 w-full resize-none border-0 border-b bg-transparent pb-3 font-display text-2xl font-light italic text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-0 ${errors.message ? "border-bronze focus:border-bronze" : "border-hairline focus:border-bronze"}`}
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
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; className?: string;
  value: string; error?: string; onChange: (v: string) => void; onBlur: () => void;
}) {
  const errorId = `${name}-error`;
  return (
    <div className={className}>
      <label htmlFor={name} className="eyebrow block">
        {label}{required && <span className="ml-1 text-bronze">·</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`mt-4 w-full border-0 border-b bg-transparent pb-3 font-display text-2xl font-light italic text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-0 ${error ? "border-bronze focus:border-bronze" : "border-hairline focus:border-bronze"}`}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-3 text-[11px] uppercase tracking-[0.28em] text-bronze"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

function ResidenceSelect({
  value, error, onChange, onBlur,
}: {
  value: string; error?: string; onChange: (v: string) => void; onBlur: () => void;
}) {
  const errorId = "residence-error";
  return (
    <div className="col-span-12 md:col-span-6">
      <label htmlFor="residence" className="eyebrow block">
        Preferred residence
      </label>
      <div className={`relative mt-4 border-0 border-b ${error ? "border-bronze" : "border-hairline focus-within:border-bronze"}`}>
        <select
          id="residence"
          name="residence"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full appearance-none bg-transparent pb-3 pr-8 font-display text-2xl font-light italic focus:outline-none focus:ring-0 ${value ? "text-charcoal" : "text-stone/60"}`}
        >
          <option value="">Select from the collection…</option>
          {RESIDENCES.map((r) => {
            const unavailable = r.availability === "Reserved";
            return (
              <option key={r.code} value={r.name} disabled={unavailable}>
                {r.name} — {r.area} · {r.availability}
              </option>
            );
          })}
        </select>
        <span aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.32em] text-stone">
          ▾
        </span>
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

