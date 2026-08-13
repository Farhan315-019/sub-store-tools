"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import { categories } from "@/data/categories";
import { adminPost, useAdminFetch } from "./useAdminFetch";

export function ProductsPanel() {
  const { data, busy, error, reload } = useAdminFetch<{ products: Product[] }>(
    "/api/admin/products"
  );

  const [name, setName] = useState("");
  const [categorySlug, setCategorySlug] = useState(categories[0]?.slug ?? "");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [badge, setBadge] = useState("");
  const [description, setDescription] = useState("");
  const [popular, setPopular] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [formError, setFormError] = useState("");
  const [formBusy, setFormBusy] = useState(false);

  const handleAdd = async (event: FormEvent) => {
    event.preventDefault();
    setFormError("");
    setFormBusy(true);
    const result = await adminPost("/api/admin/products", {
      name,
      categorySlug,
      price: price === "" ? undefined : Number(price),
      duration: duration || undefined,
      badge: badge || undefined,
      description: description || undefined,
      popular,
      featured,
    });
    setFormBusy(false);
    if (!result.ok) {
      setFormError(result.error ?? "Failed to add product.");
      return;
    }
    setName("");
    setPrice("");
    setDuration("");
    setBadge("");
    setDescription("");
    setPopular(false);
    setFeatured(false);
    void reload();
  };

  const toggleFlag = async (slug: string, key: "popular" | "featured", value: boolean) => {
    await adminPost(`/api/admin/products/${slug}`, { [key]: value });
    void reload();
  };

  const handleDelete = async (slug: string, nameToDelete: string) => {
    if (!window.confirm(`Delete "${nameToDelete}" from the store?`)) return;
    const res = await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
    if (res.status === 401) {
      window.location.reload();
      return;
    }
    if (res.ok) void reload();
  };

  const products = data?.products ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Products</h1>
        <p className="mt-1 text-sm text-muted">
          Add new products or remove existing ones. Changes reflect on the site instantly.
        </p>
      </div>

      <form
        onSubmit={handleAdd}
        className="rounded-card-lg border border-border bg-surface p-5 sm:p-6"
      >
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <Plus className="size-4 text-accent-text" aria-hidden="true" />
          Add Product
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Product name" htmlFor="admin-product-name">
            <Input
              id="admin-product-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Canva Pro"
              required
            />
          </Field>
          <Field label="Category" htmlFor="admin-product-category">
            <Select
              id="admin-product-category"
              value={categorySlug}
              onChange={(event) => setCategorySlug(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Price (PKR)" htmlFor="admin-product-price">
            <Input
              id="admin-product-price"
              type="number"
              min="0"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="e.g. 800"
            />
          </Field>
          <Field label="Plan duration (optional)" htmlFor="admin-product-duration">
            <Input
              id="admin-product-duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="e.g. Monthly"
            />
          </Field>
          <Field label="Badge (optional)" htmlFor="admin-product-badge">
            <Input
              id="admin-product-badge"
              value={badge}
              onChange={(event) => setBadge(event.target.value)}
              placeholder="e.g. New / Hot Deal"
            />
          </Field>
          <div className="flex items-end gap-5 pb-3">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Checkbox checked={popular} onChange={(event) => setPopular(event.target.checked)} />
              Popular
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Checkbox checked={featured} onChange={(event) => setFeatured(event.target.checked)} />
              Featured
            </label>
          </div>
          <div className="sm:col-span-2">
            <Field label="Short description (optional)" htmlFor="admin-product-description">
              <Textarea
                id="admin-product-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="One or two lines about the product."
                className="min-h-20"
              />
            </Field>
          </div>
        </div>

        {formError ? (
          <p role="alert" className="mt-3 rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
            {formError}
          </p>
        ) : null}

        <Button type="submit" disabled={formBusy} className="mt-5">
          <Plus className="size-4" aria-hidden="true" />
          {formBusy ? "Adding..." : "Add Product"}
        </Button>
      </form>

      <div className="rounded-card-lg border border-border bg-surface">
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <h2 className="font-display text-base font-bold text-foreground">
            Current Products <span className="font-normal text-muted">({products.length})</span>
          </h2>
        </div>

        {busy ? (
          <p className="px-6 py-8 text-sm text-muted">Loading products...</p>
        ) : error ? (
          <p className="px-6 py-8 text-sm text-danger">{error}</p>
        ) : products.length === 0 ? (
          <p className="px-6 py-8 text-sm text-muted">No products yet. Add your first product above.</p>
        ) : (
          <ul className="divide-y divide-border">
            {products.map((product) => (
              <li key={product.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-foreground">{product.name}</p>
                    {product.badge ? (
                      <span className="rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-text">
                        {product.badge}
                      </span>
                    ) : null}
                    {product.popular ? (
                      <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted">
                        Popular
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-muted-2">
                    {product.category}
                    {product.plans[0]?.price ? ` · ${formatPrice(product.plans[0].price)}` : " · Contact us"}
                    {" · "}
                    <a
                      href={`/products/${product.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-text hover:underline"
                    >
                      View
                    </a>
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-muted">
                    <Checkbox
                      checked={product.popular}
                      onChange={(event) => toggleFlag(product.slug, "popular", event.target.checked)}
                    />
                    Popular
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-muted">
                    <Checkbox
                      checked={product.featured}
                      onChange={(event) => toggleFlag(product.slug, "featured", event.target.checked)}
                    />
                    Featured
                  </label>
                  <button
                    type="button"
                    onClick={() => handleDelete(product.slug, product.name)}
                    aria-label={`Delete ${product.name}`}
                    className="grid size-9 place-items-center rounded-xl border border-border text-muted transition-colors hover:border-danger/40 hover:text-danger"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
