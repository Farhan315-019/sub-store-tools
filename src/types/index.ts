export type ProductStatus = "available" | "limited" | "unavailable";

export type ProductPlan = {
  id: string;
  name: string;
  duration?: string;
  price?: number;
  originalPrice?: number;
  note?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  features: string[];
  plans: ProductPlan[];
  featured: boolean;
  popular: boolean;
  status: ProductStatus;
  badge?: string;
  deliveryTime?: string;
  seoTitle: string;
  seoDescription: string;
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  badge: string;
  includes: string[];
  productSlugs: string[];
  cta: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  product: string;
  verified: boolean;
};

export type DashboardOrder = {
  id: string;
  product: string;
  plan: string;
  date: string;
  status: "completed" | "pending" | "processing";
  amount: number;
};

export type DashboardTransaction = {
  id: string;
  type: "credit" | "debit";
  description: string;
  date: string;
  amount: number;
};
