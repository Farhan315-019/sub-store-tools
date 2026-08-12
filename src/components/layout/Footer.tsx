import Link from "next/link";
import { Mail } from "lucide-react";
import { categories } from "@/data/categories";
import { siteConfig } from "@/config/site";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";

const productLinks = ["/products", "/offers", "/reseller", "/categories"];
const productLabels = ["All Products", "Special Offers", "Reseller Program", "Browse Categories"];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const socials = [
  { label: "Facebook", href: siteConfig.socials.facebook, icon: FacebookIcon },
  { label: "Instagram", href: siteConfig.socials.instagram, icon: InstagramIcon },
  { label: "TikTok", href: siteConfig.socials.tiktok, icon: TikTokIcon },
  { label: "Twitter / X", href: siteConfig.socials.twitter, icon: XIcon },
  { label: "YouTube", href: siteConfig.socials.youtube, icon: YouTubeIcon },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background-elevated">
      <div className="container-x py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-extrabold tracking-tight">
              SUB STORE <span className="text-accent-text">TOOLS</span>
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-2">
              Digital Software Solutions
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Premium digital tools, streaming services, AI platforms and software solutions — one
              trusted store for everything digital.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 text-sm text-muted">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex w-fit items-center gap-2.5 transition-colors hover:text-foreground"
              >
                <Mail className="size-4 text-accent-text" aria-hidden="true" />
                {siteConfig.emailDisplay}
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/[^\d]/g, "")}`}
                className="inline-flex w-fit items-center gap-2.5 transition-colors hover:text-foreground"
              >
                <WhatsAppIcon className="size-4 text-accent-text" aria-hidden="true" />
                {siteConfig.whatsappDisplay}
              </a>
            </div>
            <div className="mt-6 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent-text"
                >
                  <social.icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Products">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Products</h3>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((href, index) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {productLabels[index]}
                  </Link>
                </li>
              ))}
              {categories.slice(0, 4).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <span className="text-sm text-muted">{siteConfig.hours}</span>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-2">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="max-w-xl text-[0.7rem] leading-relaxed text-muted-2">
            {siteConfig.name} is an independent storefront. All product names, logos and brands are
            property of their respective owners and are used for identification purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
