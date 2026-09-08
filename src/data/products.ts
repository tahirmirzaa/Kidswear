import type { AgeGroup, Category, ColorOption, Fabric, Gender, Occasion, Product } from "../types";
import { buildReviews } from "./reviewBank";
import { slugify } from "../lib/utils";
import { placeholderImage } from "../lib/images";

const CATEGORY_TAGS: Record<Category, string> = {
  Baby: "baby,infant,clothing",
  Girls: "girl,kids,fashion",
  Boys: "boy,kids,fashion",
  "Occasion Wear": "festival,traditional,kids",
  Nightwear: "pajamas,sleepwear,kids",
  Accessories: "accessories,baby,kids",
};

const PALETTE: Record<string, ColorOption> = {
  ivory: { name: "Ivory", hex: "#FAF7F2" },
  blush: { name: "Blush Pink", hex: "#F3D9D6" },
  sage: { name: "Sage Green", hex: "#B7CDB0" },
  sky: { name: "Powder Blue", hex: "#B3D1DE" },
  butter: { name: "Butter Yellow", hex: "#F6E8C8" },
  terracotta: { name: "Terracotta", hex: "#C4694F" },
  navy: { name: "Navy", hex: "#33415C" },
  white: { name: "White", hex: "#FFFFFF" },
  charcoal: { name: "Charcoal", hex: "#3A362F" },
  mustard: { name: "Mustard", hex: "#D9A441" },
  lilac: { name: "Lilac", hex: "#D9CEE8" },
  coral: { name: "Coral", hex: "#E88B72" },
  gold: { name: "Festive Gold", hex: "#C9A24B" },
  indigo: { name: "Washed Indigo", hex: "#465A78" },
};

interface Template {
  name: string;
  category: Category;
  gender: Gender;
  ageGroups: AgeGroup[];
  occasions: Occasion[];
  fabric: Fabric;
  sizes: string[];
  colorways: string[][];
  price: number;
  discount?: number;
  description: string;
  fit: string;
  benefits: string[];
  care: string[];
  seedTag: string;
  isNew?: boolean;
  isBestseller?: boolean;
  outOfStockIn?: number[];
}

// Launch range = cotton/cotton-blend, Casual-occasion templates whose sizes cover
// the four proposed launch sizes (2-3Y/3-4Y/4-5Y/5-6Y). Everything else stays in the
// data file as a draft so it can come back without re-authoring, but is hidden from
// every customer-facing surface until it's genuinely part of a launch drop.
const EVERYDAY_SEED_TAGS = new Set(["tiered-frock", "coord-girls", "corduroy-pinafore", "shirt-shorts", "polo-chino", "overshirt"]);
const NIGHTWEAR_SEED_TAGS = new Set(["pajama-print", "nightdress"]);

const BABY_SIZES = ["0-3M", "3-6M", "6-9M", "9-12M", "12-18M"];
const TODDLER_SIZES = ["1-2Y", "2-3Y", "3-4Y"];
const KIDS_SIZES = ["4-5Y", "5-6Y", "6-7Y", "7-8Y"];
const TWEEN_SIZES = ["8-9Y", "9-10Y", "10-12Y", "12-14Y"];

const templates: Template[] = [
  // ---------- BABY ----------
  {
    name: "Organic Cotton Romper",
    category: "Baby", gender: "unisex", ageGroups: ["Newborn", "0-2 Years"], occasions: ["Casual"],
    fabric: "Organic Cotton", sizes: BABY_SIZES,
    colorways: [["ivory"], ["sage"], ["blush"]],
    price: 1299, discount: 999,
    description: "A gentle everyday romper cut from breathable organic cotton, designed with flat-lock seams so there's nothing to irritate delicate newborn skin.",
    fit: "Relaxed fit with room to move; true to size.",
    benefits: ["Organic cotton", "Flat-lock seams, tag-free", "Easy snap closures for quick changes"],
    care: ["Machine wash cold with like colours", "Do not bleach", "Tumble dry low", "Warm iron if needed"],
    seedTag: "romper", isNew: true, isBestseller: true,
  },
  {
    name: "Muslin Swaddle Set",
    category: "Baby", gender: "unisex", ageGroups: ["Newborn"], occasions: ["Gifting", "Casual"],
    fabric: "Muslin", sizes: ["One Size"],
    colorways: [["sage", "ivory"], ["sky", "ivory"], ["blush", "ivory"]],
    price: 1799,
    description: "A set of two ultra-soft muslin swaddles that get softer with every wash, breathable enough for year-round Indian weather.",
    fit: "Generously sized 110x110cm wrap.",
    benefits: ["6-layer breathable muslin weave", "Softens with every wash", "Doubles as a burp cloth or car-seat cover"],
    care: ["Machine wash cold", "Line dry in shade", "No fabric softener needed"],
    seedTag: "swaddle", isBestseller: true,
  },
  {
    name: "Snap-Button Sleepsuit",
    category: "Baby", gender: "unisex", ageGroups: ["Newborn", "0-2 Years"], occasions: ["Casual"],
    fabric: "Organic Cotton", sizes: BABY_SIZES,
    colorways: [["butter"], ["sky"], ["charcoal", "ivory"]],
    price: 1499,
    description: "Footed sleepsuit with front snap buttons for fuss-free 2am changes, made from breathable interlock cotton that keeps baby cosy without overheating.",
    fit: "Snug through the body, roomy at the toes.",
    benefits: ["Two-way zip alternative snap placket", "Breathable interlock knit", "Non-slip footed sole grips"],
    care: ["Machine wash cold", "Tumble dry low", "Do not iron print"],
    seedTag: "sleepsuit",
  },
  {
    name: "Cotton Dungaree Set",
    category: "Baby", gender: "unisex", ageGroups: ["0-2 Years"], occasions: ["Casual", "Gifting"],
    fabric: "Cotton Blend", sizes: ["6-9M", "9-12M", "12-18M", "1-2Y"],
    colorways: [["sky", "white"], ["sage", "white"]],
    price: 1899, discount: 1499,
    description: "A dungaree-and-tee set finished with playful embroidered motifs and adjustable straps that grow with your little one.",
    fit: "Adjustable straps, relaxed leg.",
    benefits: ["Adjustable shoulder straps", "Reinforced knee stitching", "Matching tee included"],
    care: ["Machine wash cold, inside out", "Do not bleach", "Line dry"],
    seedTag: "dungaree",
  },
  {
    name: "Hooded Bath Wrap",
    category: "Baby", gender: "unisex", ageGroups: ["Newborn", "0-2 Years"], occasions: ["Gifting"],
    fabric: "Organic Cotton", sizes: ["One Size"],
    colorways: [["blush"], ["sage"], ["butter"]],
    price: 1299,
    description: "A cloud-soft hooded towel wrap with extra absorbency, finished with an embroidered ear detail on the hood.",
    fit: "One size, fits up to 2 years.",
    benefits: ["600 GSM absorbent cotton terry", "Embroidered hood detail", "Machine washable"],
    care: ["Machine wash warm", "Tumble dry low", "Do not bleach"],
    seedTag: "bathwrap",
  },
  {
    name: "Cotton Onesie Pack of 3",
    category: "Baby", gender: "unisex", ageGroups: ["Newborn", "0-2 Years"], occasions: ["Casual"],
    fabric: "Organic Cotton", sizes: BABY_SIZES,
    colorways: [["ivory", "sage", "blush"], ["white", "sky", "butter"]],
    price: 1699,
    description: "Everyday essential onesies in a pack of three, cut from soft ribbed cotton with envelope necklines for easy dressing.",
    fit: "Fitted through body for layering.",
    benefits: ["Envelope neckline, easy over head", "Ribbed cotton stretch", "Colourfast dyes"],
    care: ["Machine wash cold", "Tumble dry low"],
    seedTag: "onesie", isBestseller: true,
  },
  // ---------- GIRLS ----------
  {
    name: "Tiered Cotton Frock",
    category: "Girls", gender: "girls", ageGroups: ["2-5 Years", "5-8 Years"], occasions: ["Casual", "Birthday"],
    fabric: "Cotton Blend", sizes: [...TODDLER_SIZES, ...KIDS_SIZES],
    colorways: [["blush"], ["sage"], ["butter"]],
    price: 2199, discount: 1749,
    description: "A twirl-worthy tiered frock in a floral print, with a comfortable elasticated waist and puffed sleeves for all-day play.",
    fit: "Flared silhouette, true to size.",
    benefits: ["Elasticated waist for comfort", "Soft cotton lining", "Twirl-friendly flared hem"],
    care: ["Hand wash recommended", "Do not bleach", "Cool iron on reverse"],
    seedTag: "tiered-frock", isNew: true, isBestseller: true,
  },
  {
    name: "Puff-Sleeve Dress",
    category: "Girls", gender: "girls", ageGroups: ["2-5 Years", "5-8 Years"], occasions: ["Birthday", "Gifting"],
    fabric: "Cotton Blend", sizes: [...TODDLER_SIZES, ...KIDS_SIZES],
    colorways: [["blush"], ["lilac"], ["coral"]],
    price: 2499,
    description: "A party-ready dress with statement puff sleeves and a delicate ruffle hem, finished with a satin sash tie-back.",
    fit: "Fitted bodice, flared skirt.",
    benefits: ["Satin sash included", "Soft cotton inner lining", "Concealed back zip"],
    care: ["Hand wash cold", "Do not wring", "Iron on reverse, low heat"],
    seedTag: "puff-dress",
  },
  {
    name: "Cotton Co-ord Set",
    category: "Girls", gender: "girls", ageGroups: ["5-8 Years", "8-12 Years"], occasions: ["Casual"],
    fabric: "Cotton Blend", sizes: [...KIDS_SIZES, ...TWEEN_SIZES],
    colorways: [["sage", "ivory"], ["sky", "ivory"]],
    price: 1899,
    description: "A relaxed gingham co-ord set with a cropped shirt and elasticated shorts, perfect for warm-weather playdates.",
    fit: "Relaxed, unisex-inspired fit.",
    benefits: ["Breathable gingham weave", "Elasticated shorts waistband", "Machine washable"],
    care: ["Machine wash cold", "Line dry", "Warm iron"],
    seedTag: "coord-girls", isBestseller: true,
  },
  {
    name: "Denim Pinafore Dress",
    category: "Girls", gender: "girls", ageGroups: ["2-5 Years", "5-8 Years"], occasions: ["Casual"],
    fabric: "Denim", sizes: [...TODDLER_SIZES, ...KIDS_SIZES],
    colorways: [["indigo"], ["ivory"]],
    price: 2299,
    description: "A soft washed-denim pinafore designed to layer over tees, with adjustable button straps and roomy front pockets.",
    fit: "A-line, adjustable straps.",
    benefits: ["Soft-washed stretch denim", "Adjustable button straps", "Reinforced pocket stitching"],
    care: ["Machine wash cold, inside out", "Line dry"],
    seedTag: "pinafore",
  },
  {
    name: "Ruffle Top & Skirt Set",
    category: "Girls", gender: "girls", ageGroups: ["2-5 Years"], occasions: ["Birthday", "Festive"],
    fabric: "Cotton Blend", sizes: TODDLER_SIZES,
    colorways: [["butter"], ["blush"]],
    price: 1999, discount: 1599,
    description: "A cheerful daisy-print top paired with a matching flared skirt, finished with ruffled cap sleeves.",
    fit: "Relaxed top, elasticated skirt waist.",
    benefits: ["Elasticated comfort waist", "Soft cotton, no scratchy tags", "Machine washable"],
    care: ["Machine wash cold", "Tumble dry low"],
    seedTag: "ruffle-set",
  },
  {
    name: "Corduroy Pinafore",
    category: "Girls", gender: "girls", ageGroups: ["5-8 Years", "8-12 Years"], occasions: ["Casual", "Holiday"],
    fabric: "Cotton Blend", sizes: [...KIDS_SIZES, ...TWEEN_SIZES],
    colorways: [["terracotta"], ["mustard"]],
    price: 2599,
    description: "A cosy corduroy pinafore built for cooler days, layered easily over full-sleeve tees for a smart casual look.",
    fit: "A-line, relaxed through the body.",
    benefits: ["Soft-brushed corduroy", "Adjustable buckle straps", "Deep front pockets"],
    care: ["Machine wash cold", "Do not tumble dry", "Cool iron"],
    seedTag: "corduroy-pinafore",
  },
  // ---------- BOYS ----------
  {
    name: "Cotton Shirt & Shorts Set",
    category: "Boys", gender: "boys", ageGroups: ["2-5 Years", "5-8 Years"], occasions: ["Casual"],
    fabric: "Cotton Blend", sizes: [...TODDLER_SIZES, ...KIDS_SIZES],
    colorways: [["sky"], ["sage"], ["ivory"]],
    price: 1799,
    description: "A crisp striped shirt paired with comfortable elasticated shorts, tailored for warm-weather play and family outings.",
    fit: "Regular fit, true to size.",
    benefits: ["Breathable cotton poplin", "Elasticated shorts waist", "Colourfast stripe weave"],
    care: ["Machine wash cold", "Warm iron", "Line dry"],
    seedTag: "shirt-shorts", isBestseller: true,
  },
  {
    name: "Denim Dungaree",
    category: "Boys", gender: "boys", ageGroups: ["0-2 Years", "2-5 Years"], occasions: ["Casual", "Gifting"],
    fabric: "Denim", sizes: [...BABY_SIZES.slice(2), ...TODDLER_SIZES],
    colorways: [["indigo"]],
    price: 2099,
    description: "A classic dungaree in soft-washed denim with adjustable straps and a roomy front pocket for little treasures.",
    fit: "Relaxed straight fit.",
    benefits: ["Soft-washed stretch denim", "Adjustable straps", "Reinforced stitching at stress points"],
    care: ["Machine wash cold, inside out", "Line dry"],
    seedTag: "dungaree-boy",
  },
  {
    name: "Printed Polo & Chino Set",
    category: "Boys", gender: "boys", ageGroups: ["5-8 Years", "8-12 Years"], occasions: ["Casual", "Holiday"],
    fabric: "Cotton Blend", sizes: [...KIDS_SIZES, ...TWEEN_SIZES],
    colorways: [["sage"], ["navy", "ivory"]],
    price: 2299, discount: 1899,
    description: "A relaxed polo in a soft pique knit, paired with tapered chinos finished with an adjustable waistband.",
    fit: "Regular polo, tapered chino leg.",
    benefits: ["Breathable pique knit polo", "Adjustable waistband chinos", "Fade-resistant print"],
    care: ["Machine wash cold", "Warm iron", "Line dry"],
    seedTag: "polo-chino", isNew: true,
  },
  {
    name: "Corduroy Overshirt",
    category: "Boys", gender: "boys", ageGroups: ["5-8 Years", "8-12 Years", "12-14 Years"], occasions: ["Casual", "Holiday"],
    fabric: "Cotton Blend", sizes: [...KIDS_SIZES, ...TWEEN_SIZES],
    colorways: [["mustard"], ["terracotta"]],
    price: 2799,
    description: "A textured corduroy overshirt that layers easily over tees, with chest pockets and a soft brushed cotton lining.",
    fit: "Relaxed, layer-friendly fit.",
    benefits: ["Soft-brushed corduroy", "Chest pocket detailing", "Durable button placket"],
    care: ["Machine wash cold", "Cool iron", "Do not tumble dry"],
    seedTag: "overshirt",
  },
  {
    name: "Linen Shirt Set",
    category: "Boys", gender: "boys", ageGroups: ["2-5 Years", "5-8 Years"], occasions: ["Festive", "Holiday"],
    fabric: "Linen", sizes: [...TODDLER_SIZES, ...KIDS_SIZES],
    colorways: [["ivory"], ["sky"]],
    price: 2399,
    description: "A breathable linen-blend shirt and shorts set, ideal for warm celebrations and beach holidays alike.",
    fit: "Relaxed, breathable fit.",
    benefits: ["Breathable linen-cotton blend", "Mother-of-pearl style buttons", "Pre-washed for softness"],
    care: ["Machine wash cold", "Warm iron while damp", "Line dry"],
    seedTag: "linen-set",
  },
  // ---------- OCCASION WEAR ----------
  {
    name: "Embroidered Kurta Set",
    category: "Occasion Wear", gender: "boys", ageGroups: ["2-5 Years", "5-8 Years", "8-12 Years"], occasions: ["Festive", "Gifting"],
    fabric: "Silk Blend", sizes: [...TODDLER_SIZES, ...KIDS_SIZES, ...TWEEN_SIZES],
    colorways: [["gold"], ["terracotta"], ["ivory"]],
    price: 3499, discount: 2799,
    description: "A festive kurta-pyjama set with delicate thread embroidery, tailored in a breathable silk-cotton blend for all-day comfort.",
    fit: "Regular fit, true to size.",
    benefits: ["Breathable silk-cotton blend", "Hand-finished embroidery", "Elasticated pyjama waist"],
    care: ["Dry clean recommended", "Store folded, away from sunlight"],
    seedTag: "kurta-set", isBestseller: true,
  },
  {
    name: "Silk-Blend Sherwani Set",
    category: "Occasion Wear", gender: "boys", ageGroups: ["5-8 Years", "8-12 Years", "12-14 Years"], occasions: ["Festive"],
    fabric: "Silk Blend", sizes: [...KIDS_SIZES, ...TWEEN_SIZES],
    colorways: [["ivory"], ["gold"]],
    price: 4999,
    description: "A regal sherwani set finished with delicate zari borders, tailored for weddings and grand family celebrations.",
    fit: "Structured, tailored fit.",
    benefits: ["Zari-bordered detailing", "Soft inner lining", "Comes with matching bottom"],
    care: ["Dry clean only", "Store on padded hanger"],
    seedTag: "sherwani",
  },
  {
    name: "Sequin Party Dress",
    category: "Occasion Wear", gender: "girls", ageGroups: ["2-5 Years", "5-8 Years", "8-12 Years"], occasions: ["Festive", "Birthday"],
    fabric: "Silk Blend", sizes: [...TODDLER_SIZES, ...KIDS_SIZES, ...TWEEN_SIZES],
    colorways: [["blush"], ["gold"], ["lilac"]],
    price: 3799, discount: 2999,
    description: "A shimmering sequin party dress with a twirl-ready flared skirt, fully lined for comfort against delicate skin.",
    fit: "Fitted bodice, flared skirt.",
    benefits: ["Soft cotton inner lining", "Concealed back zip", "Skin-friendly sequin backing"],
    care: ["Dry clean recommended", "Do not wring"],
    seedTag: "sequin-dress", isNew: true,
  },
  {
    name: "Bandhgala Set",
    category: "Occasion Wear", gender: "boys", ageGroups: ["2-5 Years", "5-8 Years", "8-12 Years"], occasions: ["Festive", "Gifting"],
    fabric: "Cotton Blend", sizes: [...TODDLER_SIZES, ...KIDS_SIZES, ...TWEEN_SIZES],
    colorways: [["terracotta"], ["navy"], ["charcoal"]],
    price: 3299,
    description: "A sharply tailored bandhgala jacket set with a mandarin collar, finished with fabric-covered buttons.",
    fit: "Structured, tailored through shoulders.",
    benefits: ["Structured inner canvas", "Fabric-covered buttons", "Comes with matching trousers"],
    care: ["Dry clean only"],
    seedTag: "bandhgala",
  },
  {
    name: "Anarkali Set",
    category: "Occasion Wear", gender: "girls", ageGroups: ["5-8 Years", "8-12 Years", "12-14 Years"], occasions: ["Festive"],
    fabric: "Silk Blend", sizes: [...KIDS_SIZES, ...TWEEN_SIZES],
    colorways: [["sage"], ["terracotta"], ["blush"]],
    price: 3999,
    description: "A flowing anarkali set with delicate embroidery along the yoke, paired with matching churidar and dupatta.",
    fit: "Flared, flowing silhouette.",
    benefits: ["Three-piece set with dupatta", "Breathable inner lining", "Hand-finished embroidery"],
    care: ["Dry clean recommended"],
    seedTag: "anarkali",
  },
  // ---------- NIGHTWEAR ----------
  {
    name: "Cotton Printed Pajama Set",
    category: "Nightwear", gender: "unisex", ageGroups: ["2-5 Years", "5-8 Years", "8-12 Years"], occasions: ["Casual"],
    fabric: "Organic Cotton", sizes: [...TODDLER_SIZES, ...KIDS_SIZES, ...TWEEN_SIZES],
    colorways: [["sky"], ["sage"], ["blush"]],
    price: 1399,
    description: "A breathable cloud-print pajama set designed for sound sleep, cut from lightweight cotton that stays cool through the night.",
    fit: "Relaxed, roomy fit for comfortable sleep.",
    benefits: ["Breathable lightweight cotton", "Tag-free comfort neckline", "Elasticated pyjama waist"],
    care: ["Machine wash cold", "Tumble dry low"],
    seedTag: "pajama-print", isBestseller: true,
  },
  {
    name: "Fleece Sleep Set",
    category: "Nightwear", gender: "unisex", ageGroups: ["0-2 Years", "2-5 Years"], occasions: ["Casual"],
    fabric: "Fleece", sizes: [...BABY_SIZES.slice(3), ...TODDLER_SIZES],
    colorways: [["sage"], ["butter"]],
    price: 1699,
    description: "A cosy fleece sleep set for cooler nights, brushed on the inside for extra warmth without feeling heavy.",
    fit: "Relaxed, warm fit.",
    benefits: ["Brushed fleece interior", "Ribbed cuffs to trap warmth", "Non-slip footed option"],
    care: ["Machine wash cold", "Tumble dry low", "Do not iron"],
    seedTag: "fleece-set",
  },
  {
    name: "Cotton Nightdress",
    category: "Nightwear", gender: "girls", ageGroups: ["2-5 Years", "5-8 Years"], occasions: ["Casual"],
    fabric: "Organic Cotton", sizes: [...TODDLER_SIZES, ...KIDS_SIZES],
    colorways: [["blush"], ["lilac"]],
    price: 1299,
    description: "A star-printed cotton nightdress with a relaxed swing silhouette, perfect for warm nights and lazy weekend mornings.",
    fit: "Relaxed swing fit.",
    benefits: ["Lightweight breathable cotton", "Tag-free comfort neckline", "Colourfast print"],
    care: ["Machine wash cold", "Line dry"],
    seedTag: "nightdress",
  },
  // ---------- ACCESSORIES ----------
  {
    name: "Cotton Sun Hat",
    category: "Accessories", gender: "unisex", ageGroups: ["0-2 Years", "2-5 Years"], occasions: ["Holiday", "Casual"],
    fabric: "Cotton Blend", sizes: ["One Size"],
    colorways: [["blush"], ["sage"], ["butter"]],
    price: 699,
    description: "A wide-brimmed sun hat in breathable cotton twill with an adjustable chin strap for a secure, comfortable fit.",
    fit: "Adjustable strap, one size.",
    benefits: ["UPF sun-safe weave", "Adjustable chin strap", "Machine washable"],
    care: ["Hand wash cold", "Reshape and air dry"],
    seedTag: "sunhat",
  },
  {
    name: "Knit Booties",
    category: "Accessories", gender: "unisex", ageGroups: ["Newborn", "0-2 Years"], occasions: ["Gifting"],
    fabric: "Organic Cotton", sizes: ["0-6M", "6-12M"],
    colorways: [["ivory"], ["sage"], ["blush"]],
    price: 599,
    description: "Hand-finished knit booties that stay snugly in place, gentle enough for the most sensitive newborn feet.",
    fit: "Elasticated ankle, snug fit.",
    benefits: ["Soft knit cotton yarn", "Elasticated ankle opening", "Non-slip sole grips"],
    care: ["Hand wash cold", "Lay flat to dry"],
    seedTag: "booties",
  },
  {
    name: "Printed Bandana Bibs Set of 3",
    category: "Accessories", gender: "unisex", ageGroups: ["Newborn", "0-2 Years"], occasions: ["Gifting", "Casual"],
    fabric: "Organic Cotton", sizes: ["One Size"],
    colorways: [["sage", "butter", "blush"]],
    price: 799,
    description: "Absorbent bandana-style bibs in a set of three, backed with soft fleece to catch drool and prevent chest rashes.",
    fit: "Adjustable snap closures, one size.",
    benefits: ["Absorbent cotton front", "Fleece backing", "Adjustable snap sizing"],
    care: ["Machine wash cold", "Tumble dry low"],
    seedTag: "bibs", isBestseller: true,
  },
  {
    name: "Cotton Socks Set of 5",
    category: "Accessories", gender: "unisex", ageGroups: ["0-2 Years", "2-5 Years", "5-8 Years"], occasions: ["Casual", "Gifting"],
    fabric: "Cotton Blend", sizes: ["S", "M", "L"],
    colorways: [["ivory", "sage", "blush", "butter", "sky"]],
    price: 599,
    description: "A pastel five-pack of ribbed cotton socks with reinforced heels and toes for everyday durability.",
    fit: "Stretch-fit, true to size.",
    benefits: ["Reinforced heel and toe", "Breathable ribbed cotton", "Fade-resistant dyes"],
    care: ["Machine wash cold", "Tumble dry low"],
    seedTag: "socks",
  },
  {
    name: "Soft Hair Clip Set",
    category: "Accessories", gender: "girls", ageGroups: ["2-5 Years", "5-8 Years", "8-12 Years"], occasions: ["Gifting", "Festive"],
    fabric: "Cotton Blend", sizes: ["One Size"],
    colorways: [["blush", "sage", "butter"]],
    price: 499,
    description: "A set of fabric-wrapped hair clips in soft pastel tones, gentle on fine hair and finished with secure grip teeth.",
    fit: "One size fits all.",
    benefits: ["Fabric-wrapped, snag-free", "Secure non-slip grip", "Set of 6 mixed pastel tones"],
    care: ["Wipe clean with a damp cloth"],
    seedTag: "hairclips",
  },
  {
    name: "Canvas Tote Backpack",
    category: "Accessories", gender: "unisex", ageGroups: ["5-8 Years", "8-12 Years"], occasions: ["Casual", "Gifting"],
    fabric: "Cotton Blend", sizes: ["One Size"],
    colorways: [["sage"], ["mustard"], ["sky"]],
    price: 1299, discount: 999,
    description: "A durable canvas backpack sized for school essentials, with a padded interior pocket for tablets or books.",
    fit: "One size, adjustable straps.",
    benefits: ["Heavy-duty canvas construction", "Padded interior pocket", "Adjustable padded straps"],
    care: ["Spot clean with a damp cloth"],
    seedTag: "backpack",
  },
];

function buildColorOptions(keys: string[]): ColorOption[] {
  return keys.map((k) => PALETTE[k]);
}

function buildProducts(): Product[] {
  const products: Product[] = [];
  let seed = 0;

  templates.forEach((t) => {
    t.colorways.forEach((colorKeys, variantIdx) => {
      seed += 1;
      const colorLabel = colorKeys.map((k) => PALETTE[k].name.split(" ")[0]).join(" & ");
      const name = t.colorways.length > 1 ? `${t.name} – ${colorLabel}` : t.name;
      const slug = slugify(`${t.seedTag}-${colorLabel}-${seed}`);
      const id = `p-${seed.toString().padStart(3, "0")}`;
      const reviewCount = t.isBestseller ? 18 + (seed % 24) : 3 + (seed % 12);
      const rating = Number((3.9 + ((seed * 7) % 11) / 10).toFixed(1));

      products.push({
        id,
        slug,
        name,
        category: t.category,
        gender: t.gender,
        ageGroups: t.ageGroups,
        occasions: t.occasions,
        fabric: t.fabric,
        sizes: t.sizes,
        colors: buildColorOptions(colorKeys.length > 1 ? colorKeys : [colorKeys[0], ...(t.colorways[(variantIdx + 1) % t.colorways.length] || [])].filter((v, i, a) => a.indexOf(v) === i)),
        price: t.price,
        discountPrice: t.discount,
        images: [
          placeholderImage(800, 1000, CATEGORY_TAGS[t.category], `${t.seedTag}-${seed}-a`),
          placeholderImage(800, 1000, CATEGORY_TAGS[t.category], `${t.seedTag}-${seed}-c`),
          placeholderImage(800, 1000, CATEGORY_TAGS[t.category], `${t.seedTag}-${seed}-d`),
        ],
        hoverImage: placeholderImage(800, 1000, CATEGORY_TAGS[t.category], `${t.seedTag}-${seed}-b`),
        description: t.description,
        fit: t.fit,
        careInstructions: t.care,
        benefits: t.benefits,
        isNew: t.isNew && variantIdx === 0,
        isBestseller: t.isBestseller,
        inStock: !(t.outOfStockIn || []).includes(variantIdx),
        rating,
        reviewCount,
        reviews: buildReviews(seed, Math.min(5, Math.max(2, reviewCount % 5 + 2)), id, t.ageGroups),
        tags: [t.category, t.gender, t.fabric],
        launchVisible: EVERYDAY_SEED_TAGS.has(t.seedTag) || NIGHTWEAR_SEED_TAGS.has(t.seedTag),
        launchCollection: EVERYDAY_SEED_TAGS.has(t.seedTag) ? "everyday-sets" : NIGHTWEAR_SEED_TAGS.has(t.seedTag) ? "nightwear" : undefined,
      });
    });
  });

  return products;
}

export const products: Product[] = buildProducts();
export const launchProducts: Product[] = products.filter((p) => p.launchVisible);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return launchProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count);
}

export function getCompleteTheLook(product: Product, count = 4): Product[] {
  return launchProducts
    .filter((p) => p.id !== product.id && p.category !== product.category && p.gender === product.gender)
    .slice(0, count);
}

export const newArrivals = launchProducts;
export const saleProducts = launchProducts.filter((p) => p.discountPrice);

function uniqueSorted<T>(values: T[]): T[] {
  return Array.from(new Set(values)).sort();
}

// Filter sidebar options should only ever offer values that actually exist among the
// launch products, so a hidden category/age/occasion/fabric can't leak back in as a
// selectable (and always-empty) filter.
const SIZE_ORDER = [...BABY_SIZES, ...TODDLER_SIZES, ...KIDS_SIZES, ...TWEEN_SIZES, "One Size"];
const availableSizes = new Set(launchProducts.flatMap((p) => p.sizes));

export const launchFilterOptions = {
  ageGroups: uniqueSorted(launchProducts.flatMap((p) => p.ageGroups)),
  categories: uniqueSorted(launchProducts.map((p) => p.category)),
  fabrics: uniqueSorted(launchProducts.map((p) => p.fabric)),
  occasions: uniqueSorted(launchProducts.flatMap((p) => p.occasions)),
  sizes: SIZE_ORDER.filter((s) => availableSizes.has(s)),
};
