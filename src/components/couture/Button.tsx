import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type Common = { children: ReactNode; className?: string };

const base =
  "group inline-flex items-center gap-3 border border-charcoal/70 px-8 py-4 text-[10px] uppercase tracking-[0.32em] text-charcoal transition-all duration-500 ease-out hover:border-charcoal hover:-translate-y-[2px] hover:text-bronze";

export function CoutureButton({
  children,
  className = "",
  ...rest
}: Common & ComponentProps<"button">) {
  return (
    <button {...rest} className={`${base} ${className}`}>
      <span>{children}</span>
      <span aria-hidden className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
    </button>
  );
}

export function CoutureLink({
  to,
  children,
  className = "",
}: Common & { to: string }) {
  return (
    <Link to={to} className={`${base} ${className}`}>
      <span>{children}</span>
      <span aria-hidden className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
    </Link>
  );
}
