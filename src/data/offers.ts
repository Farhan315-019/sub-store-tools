import type { Offer } from "@/types";

export const offers: Offer[] = [
  {
    id: "streaming-bundle",
    title: "Streaming Starter Bundle",
    description:
      "Popular streaming services bundled together for a complete entertainment setup. Mix and match to fit your taste.",
    badge: "Bundle",
    includes: ["Netflix", "Prime Video", "YouTube Premium"],
    productSlugs: ["netflix", "prime-video", "youtube-premium"],
    cta: "Request This Bundle",
  },
  {
    id: "creator-kit",
    title: "Creator Power Kit",
    description:
      "Everything a content creator needs — editing, design and AI tools in one convenient package.",
    badge: "Creator",
    includes: ["CapCut Pro", "Canva", "ElevenLabs"],
    productSlugs: ["capcut-pro", "canva", "elevenlabs"],
    cta: "Request This Bundle",
  },
  {
    id: "privacy-pack",
    title: "Privacy & Security Pack",
    description:
      "Stay private and protected online with leading VPN services on flexible, wallet-friendly plans.",
    badge: "Security",
    includes: ["NordVPN", "Surfshark"],
    productSlugs: ["nordvpn", "surfshark"],
    cta: "Request This Pack",
  },
  {
    id: "study-bundle",
    title: "Study & Learn Bundle",
    description:
      "Boost your learning and writing with AI assistants, study platforms and productivity tools together.",
    badge: "Students",
    includes: ["ChatGPT Plus", "Grammarly", "Coursera"],
    productSlugs: ["chatgpt-plus", "grammarly", "coursera"],
    cta: "Request This Bundle",
  },
];
