import { Link } from "@tanstack/react-router";
import { Emblem } from "./Emblem";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-ivory">
      <div aria-hidden className="gold-line" />
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-14 md:py-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Emblem className="h-16 w-auto opacity-90" />
            <p className="mt-10 max-w-md font-display text-2xl font-light italic leading-tight text-charcoal">
              A private residential maison, tailored with the discipline of haute couture.
            </p>
          </div>

          <div className="md:col-span-3">
            <span className="eyebrow">The Maison</span>
            <ul className="mt-6 space-y-3 text-sm text-charcoal/80">
              <li><Link to="/" className="hover:text-bronze">Philosophy</Link></li>
              <li><Link to="/residences" className="hover:text-bronze">Residences</Link></li>
              <li><Link to="/gallery" className="hover:text-bronze">Gallery</Link></li>
              <li><Link to="/masterplan" className="hover:text-bronze">Masterplan</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <span className="eyebrow">Contact</span>
            <ul className="mt-6 space-y-3 text-sm text-charcoal/80">
              <li><Link to="/enquiry" className="hover:text-bronze">Private Enquiry</Link></li>
              <li>Press</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <span className="eyebrow">Languages</span>
            <ul className="mt-6 space-y-3 text-sm text-charcoal/80">
              <li>English</li>
              <li>Français</li>
              <li>العربية</li>
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-10 text-[10px] uppercase tracking-[0.32em] text-stone md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Elie Saab Residences. All rights reserved.</span>
          <span>Site by the Maison · Beirut</span>
        </div>
      </div>
    </footer>
  );
}
