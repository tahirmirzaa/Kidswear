import type { AgeGroup, Category, Occasion } from "../types";
import { realPhoto } from "../lib/images";

export interface AgeCard {
  label: AgeGroup;
  slug: string;
  blurb: string;
  image: string;
}

export const ageGroups: AgeCard[] = [
  { label: "Newborn", slug: "newborn", blurb: "0–3 months", image: realPhoto("1546015720-b8b30df5aa27") },
  { label: "0-2 Years", slug: "0-2-years", blurb: "First steps & play", image: realPhoto("1634188157846-c6e3bdf99420") },
  { label: "2-5 Years", slug: "2-5-years", blurb: "Preschool adventures", image: realPhoto("1516890896652-41ca1a35787c") },
  { label: "5-8 Years", slug: "5-8-years", blurb: "Big school energy", image: realPhoto("1519226135464-df5a9dbcd2a5") },
  { label: "8-12 Years", slug: "8-12-years", blurb: "Finding their style", image: realPhoto("1584225065315-a502458625ce") },
  { label: "12-14 Years", slug: "12-14-years", blurb: "Almost grown up", image: realPhoto("1759506265461-bcd5d7a8487f") },
];

export interface CategoryCard {
  label: Category;
  slug: string;
  description: string;
  image: string;
}

export const categories: CategoryCard[] = [
  { label: "Baby", slug: "baby", description: "Soft essentials for tiny beginnings", image: realPhoto("1622290319146-7b63df48a635") },
  { label: "Girls", slug: "girls", description: "Frocks, sets & everyday charm", image: realPhoto("1590480598135-3be152c87913") },
  { label: "Boys", slug: "boys", description: "Sharp, comfortable, ready to play", image: realPhoto("1519238263530-99bdd11df2ea") },
  { label: "Occasion Wear", slug: "occasion-wear", description: "Festive & celebration dressing", image: realPhoto("1749441975058-589213e556ff") },
  { label: "Nightwear", slug: "nightwear", description: "Breathable sets for sound sleep", image: realPhoto("1771419912747-df33d91c329d") },
  { label: "Accessories", slug: "accessories", description: "The finishing little touches", image: realPhoto("1503449377594-32dd9ac4467c") },
];

export interface OccasionCard {
  label: Occasion;
  slug: string;
  description: string;
  image: string;
}

export const occasions: OccasionCard[] = [
  { label: "Festive", slug: "festive", description: "Ethnic sets & celebration edits", image: realPhoto("1686823982616-ed159963f571") },
  { label: "Birthday", slug: "birthday", description: "Party-ready outfits", image: realPhoto("1516668557604-c8e814fdb184") },
  { label: "Casual", slug: "casual", description: "Everyday comfort staples", image: realPhoto("1599376672737-bd66af54c8f5") },
  { label: "Holiday", slug: "holiday", description: "Vacation & travel edits", image: realPhoto("1777732656260-72b78b617f22") },
  { label: "Gifting", slug: "gifting", description: "Curated gift-worthy picks", image: realPhoto("1637590957181-8893af2a8344") },
];

export const mainNav = [
  { label: "Shop All", to: "/new-arrivals" },
  { label: "Everyday Sets", to: "/category/everyday-sets" },
  { label: "Nightwear", to: "/category/nightwear" },
  { label: "Our Story", to: "/about" },
];

export interface LaunchSize {
  label: string;
  slug: string;
  image: string;
}

// The four proposed launch sizes (ages 2-6). Product `sizes` arrays use these exact
// labels already, so shop-by-size filters on `sizes`, not the broader `ageGroups` bands.
export const launchSizes: LaunchSize[] = [
  { label: "2-3Y", slug: "2-3y", image: realPhoto("1634188157846-c6e3bdf99420") },
  { label: "3-4Y", slug: "3-4y", image: realPhoto("1516890896652-41ca1a35787c") },
  { label: "4-5Y", slug: "4-5y", image: realPhoto("1519226135464-df5a9dbcd2a5") },
  { label: "5-6Y", slug: "5-6y", image: realPhoto("1584225065315-a502458625ce") },
];

export interface LaunchCollectionCard {
  slug: "everyday-sets" | "nightwear";
  label: string;
  description: string;
  image: string;
}

export const launchCollections: LaunchCollectionCard[] = [
  {
    slug: "everyday-sets",
    label: "Everyday Sets",
    description: "Cotton staples built for play, every single day.",
    // Placeholder reference photo (garment clearly visible), pending real
    // Pip & Panda catalogue photography.
    image: realPhoto("1634188157846-c6e3bdf99420"),
  },
  {
    slug: "nightwear",
    label: "Nightwear",
    description: "Breathable cotton sets for sound sleep.",
    // Swapped from a roadside/outdoor reference photo to a calm indoor scene
    // (page 6: "nightwear should use a calm indoor setting"). Still a
    // placeholder pending real Pip & Panda catalogue photography.
    image: realPhoto("1522771930-78848d9293e8"),
  },
];
