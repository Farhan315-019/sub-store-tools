export const siteConfig = {
  name: "Sub Store Tools",
  shortName: "SST",
  tagline: "Digital Software Solutions",
  url: "https://substoretools.com",
  description:
    "Discover premium digital tools, streaming services, AI platforms, productivity solutions and editing software — one trusted store for your digital needs.",
  whatsapp: "+923338217435",
  whatsappDisplay: "+92 333 8217435",
  email: "support@substoretools.com",
  emailDisplay: "support@substoretools.com",
  phone: "+923338217435",
  phoneDisplay: "+92 333 8217435",
  hours: "Mon – Sat, 10:00 AM – 8:00 PM",
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://x.com/",
    youtube: "https://youtube.com/",
    tiktok: "https://tiktok.com/",
  },
  announcement: "Mega Sale — Flat 50% to 80% OFF on All Products • Order on WhatsApp",
  indicativePricingNote:
    "All prices are in PKR and already include the current sale discount. Final pricing is confirmed when you place your order.",
} as const;

export type SiteConfig = typeof siteConfig;
