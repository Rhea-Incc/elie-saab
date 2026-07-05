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

export const A = {
  logo: logo.url,
  facade: facade.url,
  facadeDusk: facadeDusk.url,
  aerial: aerial.url,
  amenity: amenity.url,
  rain: rain.url,
  videos: [vid1.url, vid2.url, vid3.url, vid4.url] as const,
};
