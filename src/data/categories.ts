import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "ott-services",
    name: "OTT Services",
    tagline: "Stream the content you love",
    description:
      "Premium subscription access for streaming platforms — movies, series, live sports and regional content from around the world.",
    icon: "clapperboard",
    seoTitle: "OTT Streaming Services | Netflix, Prime Video, Disney+ & More",
    seoDescription:
      "Browse premium OTT streaming services including Netflix, Prime Video, YouTube Premium, Disney+ and more. Fast delivery and dedicated support.",
  },
  {
    slug: "ai-tools",
    name: "AI Tools",
    tagline: "Work smarter with AI",
    description:
      "Access powerful AI platforms for video generation, image creation, voice synthesis, coding assistance and everyday productivity.",
    icon: "sparkles",
    seoTitle: "AI Tools & AI Platform Subscriptions | Sub Store Tools",
    seoDescription:
      "Discover AI tools and platforms — video generators, image models, voice AI, code assistants and more. Browse plans and order with ease.",
  },
  {
    slug: "vpn-proxy",
    name: "VPN & Proxy",
    tagline: "Private, secure, unrestricted",
    description:
      "Reliable VPN and proxy solutions for privacy, security and unrestricted access to the content you need, wherever you are.",
    icon: "shield",
    seoTitle: "VPN & Proxy Subscriptions | NordVPN, Surfshark & More",
    seoDescription:
      "Explore VPN and proxy subscriptions from NordVPN, Surfshark, ExpressVPN and more. Fast delivery and dedicated support.",
  },
  {
    slug: "study-professional",
    name: "Study & Professional",
    tagline: "Learn, grow and get ahead",
    description:
      "Premium tools for learning, writing, productivity and professional growth — from course platforms to office suites.",
    icon: "graduation-cap",
    seoTitle: "Study & Professional Subscriptions | ChatGPT Plus, Grammarly & More",
    seoDescription:
      "Premium study and professional subscriptions — ChatGPT Plus, Grammarly, QuillBot, Microsoft 365 and more to boost your work and learning.",
  },
  {
    slug: "editing-software",
    name: "Editing Software",
    tagline: "Create without limits",
    description:
      "Professional editing suites and creative tools for video, photo and design — from CapCut Pro to Adobe Creative Cloud.",
    icon: "wand",
    seoTitle: "Editing Software Subscriptions | CapCut Pro, Canva, Adobe CC & More",
    seoDescription:
      "Premium editing software subscriptions — CapCut Pro, Canva, InShot Pro, Filmora, Adobe Creative Cloud and more for creators.",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
