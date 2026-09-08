import { realPhoto } from "../lib/images";

// Truthful, fabric-level construction details pulled from the launch products
// themselves, replacing the earlier certification/health claims that had no
// supporting documentation.
export const productProof = [
  {
    id: "proof-1",
    title: "Breathable Cotton and Cotton Blends",
    description: "Every Everyday Set and Nightwear piece is cut from organic cotton or a cotton blend, chosen for everyday comfort.",
    icon: "leaf",
  },
  {
    id: "proof-2",
    title: "Flat-Lock Seams and Elasticated Waists",
    description: "Seams and waistbands are finished for comfortable, all-day movement, from climbing to naptime.",
    icon: "shield-check",
  },
  {
    id: "proof-3",
    title: "Built for India's Climate",
    description: "Lightweight, breathable fabrics chosen to keep little ones comfortable through warm and humid days.",
    icon: "wind",
  },
  {
    id: "proof-4",
    title: "Machine Washable, Made to Last",
    description: "Colourfast dyes and reinforced stitching so pieces hold up wash after wash.",
    icon: "recycle",
  },
];

export const brandStory = {
  eyebrow: "Our Story",
  title: "Made for Little Adventures",
  body:
    "Pip & Panda began with a simple idea: dressing children shouldn't mean choosing between comfort and craftsmanship. Every piece is designed with everyday movement in mind: climbing, twirling, napping, and everything in between, using fabrics soft enough for sensitive skin and sturdy enough for daily play.",
  image: realPhoto("1776660913956-213dc8e7e1af"),
};

export const faqs = [
  {
    category: "Orders & Payment",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards, UPI, net banking, and popular wallets. Cash on delivery is available on select pincodes." },
      { q: "Can I modify or cancel my order after placing it?", a: "You can cancel or edit your order within 2 hours of placing it from the Order Tracking page. After that, our fulfilment team may have already begun packing it." },
      { q: "Do you offer EMI options?", a: "Yes, EMI is available on orders above ₹3,000 through select bank cards at checkout." },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      { q: "How long does delivery take?", a: "Most orders arrive within 3–6 business days depending on your pincode. Metro cities typically see 2–4 day delivery." },
      { q: "Do you deliver across India?", a: "Yes, we deliver to over 500 cities and towns across India. Enter your pincode on any product page to check serviceability." },
      { q: "Is shipping free?", a: "Shipping is free on all prepaid orders above ₹1,499. A nominal fee applies below this threshold." },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      { q: "What is your return policy?", a: "We offer a 15-day easy return and exchange window from the date of delivery, provided the tags are intact and the product is unworn." },
      { q: "How do I initiate a return?", a: "Go to Order Tracking, select the item, and choose 'Return or Exchange'. A pickup will be scheduled from your address." },
      { q: "When will I get my refund?", a: "Refunds are processed within 5–7 business days after the returned item passes quality check." },
    ],
  },
  {
    category: "Sizing & Products",
    items: [
      { q: "How do I choose the right size?", a: "Each product page includes a detailed Size Guide with age and body measurement charts. When in doubt, we recommend sizing up for growing children." },
      { q: "Are your fabrics safe for sensitive skin?", a: "Yes, all our fabrics are lab-tested for harmful substances and finished without harsh chemical treatments." },
    ],
  },
];
