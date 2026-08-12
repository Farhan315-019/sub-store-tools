import type { Testimonial } from "@/types";

const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed.replace(/\s+/g, "_")}`;

export const testimonials: Testimonial[] = [
  {
    name: "Ahmed Raza",
    role: "Netflix Subscriber",
    quote:
      "Ordered Netflix Premium and received the credentials within 10 minutes. The team confirmed everything on WhatsApp before delivery. Smooth and professional.",
    rating: 5,
    product: "Netflix Premium",
    verified: true,
    avatar: avatar("Ahmed Raza"),
  },
  {
    name: "Sana Malik",
    role: "Reseller Partner",
    quote:
      "I resell plans from Sub Store Tools and their response time is unbeatable. Clear order management and always helpful support. My customers are satisfied.",
    rating: 5,
    product: "Reseller Program",
    verified: true,
    avatar: avatar("Sana Malik"),
  },
  {
    name: "Bilal Hussain",
    role: "YouTube Premium User",
    quote:
      "Got YouTube Premium for 6 months at a great price. Delivery was quick and support helped me set it up right away. Highly recommended.",
    rating: 5,
    product: "YouTube Premium",
    verified: true,
    avatar: avatar("Bilal Hussain"),
  },
  {
    name: "Fatima Noor",
    role: "AI Tools User",
    quote:
      "Bought ChatGPT Plus and the activation was instant. Easy to browse, easy to order, and the WhatsApp support replies fast. Will order again.",
    rating: 5,
    product: "ChatGPT Plus",
    verified: true,
    avatar: avatar("Fatima Noor"),
  },
  {
    name: "Usman Tariq",
    role: "CapCut Pro User",
    quote:
      "Perfect service. CapCut Pro subscription activated without any hassle. The whole checkout took less than a minute.",
    rating: 5,
    product: "CapCut Pro",
    verified: true,
    avatar: avatar("Usman Tariq"),
  },
  {
    name: "Ayesha Khan",
    role: "Frequent Customer",
    quote:
      "Second time ordering and still impressed. Everything is delivered on time and the prices are the best I've found. Trustworthy team.",
    rating: 5,
    product: "Spotify Premium",
    verified: true,
    avatar: avatar("Ayesha Khan"),
  },
  {
    name: "Hamza Sheikh",
    role: "VPN Customer",
    quote:
      "Very responsive support on WhatsApp. Ordered NordVPN and it worked perfectly. Simple process from start to finish.",
    rating: 5,
    product: "NordVPN",
    verified: true,
    avatar: avatar("Hamza Sheikh"),
  },
  {
    name: "Mariam Javed",
    role: "Content Creator",
    quote:
      "As a creator I need reliable tools, and this store delivered. InVideo Pro setup was quick and support guided me through everything.",
    rating: 5,
    product: "InVideo Pro",
    verified: true,
    avatar: avatar("Mariam Javed"),
  },
  {
    name: "Zainab Ali",
    role: "Grammarly User",
    quote:
      "Amazing service and great prices. Ordered Grammarly Premium and it was activated in minutes. Support on WhatsApp is very helpful.",
    rating: 5,
    product: "Grammarly Premium",
    verified: true,
    avatar: avatar("Zainab Ali"),
  },
  {
    name: "Ali Ahmed",
    role: "Crunchyroll Subscriber",
    quote:
      "Fast delivery and honest seller. My Crunchyroll subscription works perfectly on all devices. Will definitely order again.",
    rating: 5,
    product: "Crunchyroll",
    verified: true,
    avatar: avatar("Ali Ahmed"),
  },
  {
    name: "Hira Shahid",
    role: "Canva Pro User",
    quote:
      "The whole experience was easy. Paid on WhatsApp, got my Canva Pro account within minutes. Very professional team.",
    rating: 5,
    product: "Canva Pro",
    verified: true,
    avatar: avatar("Hira Shahid"),
  },
  {
    name: "Danish Iqbal",
    role: "ExpressVPN Customer",
    quote:
      "Best prices I could find and the setup support was excellent. They walked me through everything on WhatsApp step by step.",
    rating: 5,
    product: "ExpressVPN",
    verified: true,
    avatar: avatar("Danish Iqbal"),
  },
];
