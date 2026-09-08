import type { Review } from "../types";

interface ReviewSeed {
  author: string;
  title: string;
  body: string;
  childAge: string;
}

export const reviewBank: ReviewSeed[] = [
  {
    author: "Ananya R.",
    title: "Softest fabric we've bought",
    body: "The fabric feels genuinely gentle on my daughter's skin and hasn't gone rough even after several washes. The fit runs true to size.",
    childAge: "Parent of a 2-year-old",
  },
  {
    author: "Kabir M.",
    title: "Great quality, worth the price",
    body: "Stitching and finish feel premium compared to other kidswear brands we've tried. My son wore this to a birthday party and got so many compliments.",
    childAge: "Parent of a 6-year-old",
  },
  {
    author: "Priya S.",
    title: "True to size and comfortable",
    body: "Ordered as per the size chart and it fit perfectly. Breathable fabric, ideal for Indian weather. Will be buying more colours.",
    childAge: "Parent of a 4-year-old",
  },
  {
    author: "Rahul V.",
    title: "Lovely for festive occasions",
    body: "We got this for a family function and it looked even better in person. The colours are rich and the embroidery detail is neat.",
    childAge: "Parent of an 8-year-old",
  },
  {
    author: "Meera K.",
    title: "Perfect for newborns",
    body: "Snap buttons make diaper changes so much easier and the fabric is wonderfully soft. This has become our go-to brand for baby basics.",
    childAge: "Parent of a newborn",
  },
  {
    author: "Sanjay T.",
    title: "Durable after multiple washes",
    body: "Colour hasn't faded even after five to six washes and the seams are holding up well despite rough play. Impressed with the quality.",
    childAge: "Parent of a 5-year-old",
  },
  {
    author: "Divya N.",
    title: "Beautiful packaging and product",
    body: "Ordered this as a gift and the unboxing experience alone was worth it. The outfit itself is even better, soft and well finished.",
    childAge: "Parent of a 3-year-old",
  },
  {
    author: "Arjun P.",
    title: "Good but runs slightly large",
    body: "Lovely fabric and design, though it ran a size bigger than expected. Would recommend sizing down if your child is petite.",
    childAge: "Parent of a 7-year-old",
  },
  {
    author: "Neha G.",
    title: "My daughter refuses to wear anything else now",
    body: "She loves how comfortable it is and it doesn't feel scratchy at all. The colours are also true to what's shown on the website.",
    childAge: "Parent of a 9-year-old",
  },
  {
    author: "Vikram J.",
    title: "Ideal for daily school wear",
    body: "Holds up well through an entire school day of running around. Easy to wash and doesn't wrinkle much either.",
    childAge: "Parent of a 10-year-old",
  },
  {
    author: "Ritika D.",
    title: "Exceeded expectations",
    body: "Was a little skeptical ordering kidswear online but this fit perfectly and the fabric quality is genuinely premium.",
    childAge: "Parent of a 1-year-old",
  },
  {
    author: "Farhan A.",
    title: "Comfortable and breathable",
    body: "Bought this for summer and it's kept my son cool through the day. The fit is relaxed without being baggy.",
    childAge: "Parent of a 5-year-old",
  },
];

const AGE_GROUP_RANGES: Record<string, [number, number]> = {
  Newborn: [0, 0.3],
  "0-2 Years": [0, 2],
  "2-5 Years": [2, 5],
  "5-8 Years": [5, 8],
  "8-12 Years": [8, 12],
  "12-14 Years": [12, 14],
};

function childAgeInYears(childAge: string): number {
  if (/newborn/i.test(childAge)) return 0;
  const match = childAge.match(/(\d+)-year-old/);
  return match ? Number(match[1]) : 5;
}

function isAgeCompatible(childAge: string, ageGroups: string[]): boolean {
  const years = childAgeInYears(childAge);
  return ageGroups.some((group) => {
    const range = AGE_GROUP_RANGES[group];
    return !range || (years >= range[0] && years <= range[1]);
  });
}

export function buildReviews(seedIndex: number, count: number, idPrefix: string, ageGroups: string[]): Review[] {
  const pool = reviewBank.filter((r) => isAgeCompatible(r.childAge, ageGroups));
  const source = pool.length > 0 ? pool : reviewBank;
  const actualCount = Math.min(count, source.length);
  const reviews: Review[] = [];
  for (let i = 0; i < actualCount; i++) {
    const entry = source[(seedIndex + i) % source.length];
    const rating = 4 + ((seedIndex + i) % 2 === 0 ? 1 : 0) - (i === actualCount - 1 && actualCount > 3 ? 1 : 0);
    reviews.push({
      id: `${idPrefix}-rev-${i + 1}`,
      author: entry.author,
      rating: Math.min(5, Math.max(3, rating)),
      date: new Date(2026, (seedIndex + i) % 8, ((seedIndex * 3 + i * 7) % 27) + 1).toISOString(),
      title: entry.title,
      body: entry.body,
      childAge: entry.childAge,
    });
  }
  return reviews;
}
