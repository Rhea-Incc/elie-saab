import logo from "@/assets/logo-02.png.asset.json";
import facade from "@/assets/Elie-saab.png.asset.json";
import facadeDusk from "@/assets/Elie_Saab.png.asset.json";
import aerial from "@/assets/Elie-03.png.asset.json";
import amenity from "@/assets/Elie-saab_amenity.png.asset.json";
import rain from "@/assets/Elie-vertical-rain.png.asset.json";
import vid1 from "@/assets/vid-1.mp4.asset.json";
import vid2 from "@/assets/vid-2.mp4.asset.json";
import vid3 from "@/assets/vid-3.mp4.asset.json";
import vid4 from "@/assets/vid-4.mp4.asset.json";

// Lovable assets are served from /__l5e/assets-v1/... on the Lovable domain.
// When the site is deployed to a non-Lovable host (Vercel, Railway, Render, etc.)
// the relative path 404s. Set VITE_ASSET_BASE_URL to your Lovable published
// origin (e.g. https://elie-saab.lovable.app) at build time to rewrite every
// media URL to an absolute, globally reachable CDN URL.
const RAW_BASE = (import.meta.env?.VITE_ASSET_BASE_URL ?? "").toString().trim();
const ASSET_BASE = RAW_BASE.replace(/\/+$/, "");

function abs(url: string) {
  if (!ASSET_BASE) return url;
  if (/^https?:\/\//i.test(url)) return url;
  return `${ASSET_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
}

export const A = {
  logo: abs(logo.url),
  facade: abs(facade.url),
  facadeDusk: abs(facadeDusk.url),
  aerial: abs(aerial.url),
  amenity: abs(amenity.url),
  rain: abs(rain.url),
  videos: [abs(vid1.url), abs(vid2.url), abs(vid3.url), abs(vid4.url)] as const,
};
