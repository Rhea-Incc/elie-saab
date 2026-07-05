import { A } from "@/lib/assets";

export function Emblem({ className, alt = "Elie Saab" }: { className?: string; alt?: string }) {
  return (
    <img
      src={A.logo}
      alt={alt}
      className={className}
      draggable={false}
    />
  );
}
