"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Clapperboard,
  GraduationCap,
  Layers,
  Menu,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Wand,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { useSearch } from "@/components/search/SearchProvider";
import { useTheme } from "./ThemeProvider";
import { allProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { getCategoryColor } from "@/lib/categoryColors";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Offers", href: "/offers" },
  { label: "Reseller", href: "/reseller" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const categoryIcons: Record<string, LucideIcon> = {
  "ott-services": Clapperboard,
  "ai-tools": Sparkles,
  "vpn-proxy": ShieldCheck,
  "study-professional": GraduationCap,
  "editing-software": Wand,
};

const groupedProducts = categories.map((category) => ({
  category,
  products: allProducts.filter((product) => product.categorySlug === category.slug),
}));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0].slug);
  const [allProductsOpen, setAllProductsOpen] = useState(false);
  const pathname = usePathname();
  const { open: openSearch } = useSearch();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden overflow-hidden border-b border-border bg-background sm:block">
        <div className="flex min-h-9 flex-wrap items-center justify-center gap-x-3 gap-y-0.5 px-4 py-1.5 text-center">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted sm:text-xs">
            Mega Sale — Up to 80% OFF
          </span>
          <span className="text-accent-text" aria-hidden="true">•</span>
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted sm:text-xs">
            Premium Digital Services
          </span>
          <span className="text-accent-text" aria-hidden="true">•</span>
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted sm:text-xs">
            Fast Delivery
          </span>
          <span className="text-accent-text" aria-hidden="true">•</span>
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted sm:text-xs">
            Support Available
          </span>
        </div>
      </div>

        <div
          className={cn(
            "relative transition-all duration-300",
            scrolled ? "glass border-b border-border shadow-card" : "border-b border-transparent bg-transparent"
          )}
        >
        <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
          <BrandLogo />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              if (item.label === "Products") {
                const active = pathname.startsWith("/products");
                const activeGroup = groupedProducts.find((g) => g.category.slug === activeCategory);
                const ActiveCategoryIcon = categoryIcons[activeCategory] ?? Layers;
                return (
                  <div
                    key={item.href}
                    className="contents"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-accent-soft text-accent-text"
                          : "text-muted hover:text-foreground"
                      )}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={productsOpen}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-200",
                          productsOpen && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </Link>

                    <AnimatePresence>
                      {productsOpen ? (
                        <motion.div
                          key="products-mega-menu"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-x-0 top-full z-50 pt-3"
                          role="dialog"
                          aria-label="All products catalogue"
                        >
                          <div className="container-x">
                          <div className="overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-lift">
                            <div className="grid lg:grid-cols-[17rem_1fr]">
                              <aside className="border-b border-border p-4 lg:border-b-0 lg:border-r">
                                <Link
                                  href="/products"
                                  onClick={() => setProductsOpen(false)}
                                  className="group flex items-center justify-between gap-2 rounded-xl bg-accent-soft px-4 py-3 text-sm font-semibold text-accent-text transition-colors hover:bg-accent-soft/80"
                                >
                                  <span className="inline-flex items-center gap-2.5">
                                    <Layers className="size-4" aria-hidden="true" />
                                    All Products
                                  </span>
                                  <span className="text-xs font-medium text-muted">
                                    {allProducts.length}
                                  </span>
                                </Link>

                                <nav
                                  className="mt-2 space-y-0.5"
                                  aria-label="Browse catalogue by category"
                                >
                                  {groupedProducts.map(({ category, products }) => {
                                    const Icon = categoryIcons[category.slug] ?? Layers;
                                    const color = getCategoryColor(category.slug);
                                    const selected = category.slug === activeCategory;
                                    return (
                                      <button
                                        key={category.slug}
                                        type="button"
                                        onMouseEnter={() => setActiveCategory(category.slug)}
                                        onClick={() => setProductsOpen(false)}
                                        className={cn(
                                          "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                                          selected
                                            ? cn("bg-surface-2 text-foreground ring-1 ring-border-strong")
                                            : "text-muted hover:bg-surface-2 hover:text-foreground"
                                        )}
                                        aria-current={selected ? "true" : undefined}
                                      >
                                        <Icon className="size-4 shrink-0 text-accent-text" aria-hidden="true" />
                                        <span className="flex-1 truncate">{category.name}</span>
                                        <span className={cn("size-1.5 shrink-0 rounded-full", color.dot)} aria-hidden="true" />
                                        <span className="shrink-0 text-xs font-medium text-muted-2">
                                          {products.length}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </nav>

                                <Link
                                  href="/offers"
                                  onClick={() => setProductsOpen(false)}
                                  className="mt-2 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-accent-text transition-colors hover:bg-surface-2"
                                >
                                  <Sparkles className="size-4" aria-hidden="true" />
                                  Special Offers
                                </Link>
                              </aside>

                              <section className="min-w-0 p-5 sm:p-6" aria-live="polite">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2.5">
                                    <span className={cn("grid size-9 place-items-center rounded-xl border border-border bg-surface-2 text-accent-text")}>
                                      <ActiveCategoryIcon className="size-4" aria-hidden="true" />
                                    </span>
                                    <div>
                                      <h2 className="font-display text-base font-bold text-foreground">
                                        {activeGroup?.category.name}
                                      </h2>
                                      <p className="text-xs text-muted">
                                        {activeGroup?.products.length} products available
                                      </p>
                                    </div>
                                  </div>
                                  <Link
                                    href={`/categories/${activeCategory}`}
                                    onClick={() => setProductsOpen(false)}
                                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent-soft px-3.5 py-1.5 text-xs font-semibold text-accent-text transition-colors hover:bg-accent-soft/80"
                                  >
                                    View all
                                    <ArrowRight className="size-3.5" aria-hidden="true" />
                                  </Link>
                                </div>

                                <ul className="mt-4 grid max-h-[26rem] grid-cols-1 gap-1 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">
                                  {activeGroup?.products.map((product) => {
                                    const color = getCategoryColor(product.categorySlug);
                                    return (
                                      <li key={product.id}>
                                        <Link
                                          href={`/products/${product.slug}`}
                                          onClick={() => setProductsOpen(false)}
                                          className="group flex items-center gap-2.5 rounded-xl border border-transparent px-2.5 py-2 transition-colors hover:border-border hover:bg-surface-2"
                                        >
                                          <span className={cn("size-2 shrink-0 rounded-full", color.dot)} aria-hidden="true" />
                                          <span className="min-w-0 flex-1">
                                            <span className="block truncate text-[0.82rem] font-medium text-foreground group-hover:text-accent-text">
                                              {product.name}
                                            </span>
                                            <span className="block truncate text-[0.7rem] text-muted-2">
                                              {product.category}
                                            </span>
                                          </span>
                                          <ArrowRight className="size-3.5 shrink-0 text-muted-2 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-text" aria-hidden="true" />
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </section>
                            </div>

                            <div className="flex flex-col items-start justify-between gap-2 border-t border-border bg-accent-soft/60 px-6 py-3 sm:flex-row sm:items-center">
                              <p className="text-xs font-semibold text-accent-text">
                                Mega Sale — Flat 50% to 80% OFF across all products
                              </p>
                              <Link
                                href="/offers"
                                onClick={() => setProductsOpen(false)}
                                className="shrink-0 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
                              >
                                Browse Deals
                              </Link>
                            </div>
                          </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              }

              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent-soft text-accent-text"
                      : "text-muted hover:text-foreground"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search products (Ctrl + K)"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3 text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              <Search className="size-4" aria-hidden="true" />
              <span className="hidden text-sm md:inline">Search</span>
              <kbd className="hidden rounded-md border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-muted-2 lg:inline-flex">
                Ctrl K
              </kbd>
            </button>

            <button
              type="button"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="grid size-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="size-4" aria-hidden="true" />
              ) : (
                <Moon className="size-4" aria-hidden="true" />
              )}
            </button>

            <Link
              href="/login"
              className="hidden h-10 items-center rounded-full px-4 text-sm font-medium text-muted transition-colors hover:text-foreground sm:inline-flex"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="hidden h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-strong hover:shadow-glow sm:inline-flex"
            >
              Become a Reseller
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center rounded-full border border-border bg-surface text-foreground lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-50 flex w-[min(85vw,22rem)] flex-col bg-background-elevated shadow-lift lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-5">
                <BrandLogo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-full border border-border text-foreground"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile navigation">
                {navItems.map((item, index) => {
                  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors",
                          active
                            ? "bg-accent-soft text-accent-text"
                            : "text-foreground hover:bg-surface-2"
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                        <ArrowRight className="size-4 text-muted" aria-hidden="true" />
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * navItems.length, duration: 0.25 }}
                  className="mt-1 border-t border-border pt-2"
                >
                  <button
                    type="button"
                    onClick={() => setAllProductsOpen((open) => !open)}
                    aria-expanded={allProductsOpen}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-surface-2"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Layers className="size-4 text-accent-text" aria-hidden="true" />
                      All Products
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-4 text-muted transition-transform duration-200",
                        allProductsOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {allProductsOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        {groupedProducts.map(({ category, products }) => {
                          const color = getCategoryColor(category.slug);
                          return (
                            <div key={category.slug} className="px-4 py-3">
                              <Link
                                href={`/categories/${category.slug}`}
                                onClick={() => setMenuOpen(false)}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"
                              >
                                <span className={cn("size-2 rounded-full", color.dot)} aria-hidden="true" />
                                {category.name}
                              </Link>
                              <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                                {products.map((product) => (
                                  <li key={product.id}>
                                    <Link
                                      href={`/products/${product.slug}`}
                                      onClick={() => setMenuOpen(false)}
                                      className="block truncate py-0.5 text-[0.8rem] text-muted transition-colors hover:text-foreground"
                                    >
                                      {product.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              </nav>

              <div className="grid grid-cols-2 gap-3 border-t border-border p-4">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border-strong text-sm font-semibold text-foreground"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground"
                >
                  Become a Reseller
                </Link>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
