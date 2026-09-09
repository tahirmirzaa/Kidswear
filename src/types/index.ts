export type Gender = "girls" | "boys" | "unisex";

export type AgeGroup =
  | "Newborn"
  | "0-2 Years"
  | "2-5 Years"
  | "5-8 Years"
  | "8-12 Years"
  | "12-14 Years";

export type Category =
  | "Baby"
  | "Girls"
  | "Boys"
  | "Occasion Wear"
  | "Nightwear"
  | "Accessories";

export type Occasion = "Festive" | "Birthday" | "Casual" | "Holiday" | "Gifting";

export type Fabric =
  | "Organic Cotton"
  | "Cotton Blend"
  | "Muslin"
  | "Linen"
  | "Fleece"
  | "Silk Blend"
  | "Denim";

export interface ColorOption {
  name: string;
  hex: string;
  /** Slug of the sibling product variant this colour navigates to, when the
   * colour represents a separate SKU rather than a decorative multi-tone swatch. */
  slug?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  childAge?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandLine?: string;
  category: Category;
  gender: Gender;
  ageGroups: AgeGroup[];
  occasions: Occasion[];
  fabric: Fabric;
  sizes: string[];
  colors: ColorOption[];
  price: number;
  discountPrice?: number;
  images: string[];
  hoverImage?: string;
  description: string;
  fit: string;
  careInstructions: string[];
  benefits: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  tags?: string[];
  launchVisible?: boolean;
  launchCollection?: "everyday-sets" | "nightwear";
}

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface Address {
  id: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  type: "Home" | "Work" | "Other";
}

export interface Order {
  id: string;
  date: string;
  status: "Placed" | "Packed" | "Shipped" | "Out for Delivery" | "Delivered";
  items: { productId: string; size: string; color: string; quantity: number; price: number }[];
  total: number;
  address: Address;
  eta: string;
}
