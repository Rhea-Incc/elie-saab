import { A } from "@/lib/assets";

export type Availability = "Available" | "Reserved" | "On enquiry";

export type Residence = {
  code: string;
  name: string;
  area: string;
  beds: string;
  orient: string;
  copy: string;
  image: string;
  poster: string;
  video: string;
  availability: Availability;
};

export const RESIDENCES: Residence[] = [
  {
    code: "I",
    name: "The Atelier",
    area: "182 m²",
    beds: "2 Bedrooms",
    orient: "East · Morning light",
    copy: "A private study of morning light — natural stone, oak, linen — softened by curtains that move with the day.",
    image: A.rain,
    poster: A.facade,
    video: A.videos[0],
    availability: "Available",
  },
  {
    code: "II",
    name: "The Salon",
    area: "264 m²",
    beds: "3 Bedrooms",
    orient: "South · Garden view",
    copy: "A drawing room suspended within the lattice, opening onto a terrace of quiet green.",
    image: A.amenity,
    poster: A.amenity,
    video: A.videos[1],
    availability: "Available",
  },
  {
    code: "III",
    name: "The Maison",
    area: "412 m²",
    beds: "4 Bedrooms",
    orient: "West · Skyline",
    copy: "A duplex residence with private garden and library — a house within the tower.",
    image: A.facade,
    poster: A.rain,
    video: A.videos[2],
    availability: "Reserved",
  },
  {
    code: "IV",
    name: "The Couture Penthouse",
    area: "820 m²",
    beds: "5 Bedrooms",
    orient: "Crown · Panorama",
    copy: "A singular crown residence with sky garden, reflection pool, and private lift.",
    image: A.aerial,
    poster: A.aerial,
    video: A.videos[3],
    availability: "On enquiry",
  },
];
