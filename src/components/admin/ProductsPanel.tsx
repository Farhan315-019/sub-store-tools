"use client";

import { Image as ImageIcon, Pencil, Plus, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Input, Label, Select, Textarea } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import { categories } from "@/data/categories";
import { adminPost, adminSend, useAdminFetch } from "./useAdminFetch";

type ImageUploaderProps = {
  value: string;
  onUploaded: (url: string) => void;
  onError: (message: string) => void;
};

function ImageUploader({ value, onUploaded, onError }: ImageUploaderProps) {
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (response.status === 401) {
        window.location.reload();
        return;
      }
      const data = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!response.ok || !data?.url) {
        onError(data?.error ?? "Image upload failed.");
        return;
      }
      onUploaded(data.url);
    } catch {
      onError("Image upload failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-surface-2">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Product preview" className="size-full object-cover" />
        ) : (
          <ImageIcon className="size-5 text-muted-2" aria-hidden="true" />
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent/40 disabled:opacity-50"
        >
          {busy ? "Uploading..." : value ? "Change image" : "Upload image"}
        </button>
        {value ? (
          <button
            type="button"
            onClick={() => onUploaded("")}
            className="text-left text-xs font-medium text-muted transition-colors hover:text-danger"
          >
            Remove image
          </button>
        ) : null}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

type ProductEditFormProps = {
  product: Product;
  onClose: () => void;
  onSaved: () => void;
};

function ProductEditForm({ product, onClose, onSaved }: ProductEditFormProps) {
  const [price, setPrice] = useState(product.plans[0]?.price?.toString() ?? "");
  const [originalPrice, setOriginalPrice] = useState(
    product.plans[0]?.originalPrice?.toString() ?? ""
  );
  const [duration, setDuration] = useState(product.plans[0]?.duration ?? "");
  const [badge, setBadge] = useState(product.badge ?? "");
  const [image, setImage] = useState(product.image ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setBusy(true);
    setError("");
    const result = await adminSend(`/api/admin/products/${product.slug}`, "PATCH", {
      price: price === "" ? undefined : Number(price),
      originalPrice: originalPrice === "" ? "" : Number(originalPrice),
      duration,
      badge,
      image,
    });
    setBusy(false);
    if (!result.ok) {
      setError(result.error ?? "Failed to save.");
      return;
    }
    onSaved();
  };

  return (
    <div className="mt-3 grid gap-4 rounded-xl border border-accent/30 bg-surface-1 p-4 sm:grid-cols-2">
      <Field label="Price (PKR)" htmlFor={`edit-price-${product.slug}`}>
        <Input
          id={`edit-price-${product.slug}`}
          type="number"
          min="0"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </Field>
      <Field
        label="Original price (PKR)"
        htmlFor={`edit-original-${product.slug}`}
        hint="Higher than the sale price to show a discount. Empty removes the discount."
      >
        <Input
          id={`edit-original-${product.slug}`}
          type="number"
          min="0"
          value={originalPrice}
          onChange={(event) => setOriginalPrice(event.target.value)}
        />
      </Field>
      <Field label="Plan duration" htmlFor={`edit-duration-${product.slug}`}>
        <Input
          id={`edit-duration-${product.slug}`}
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          placeholder="e.g. Monthly"
        />
      </Field>
      <Field label="Badge (optional)" htmlFor={`edit-badge-${product.slug}`}>
        <Input
          id={`edit-badge-${product.slug}`}
          value={badge}
          onChange={(event) => setBadge(event.target.value)}
          placeholder="e.g. New / Hot Deal"
        />
      </Field>
      <div className="sm:col-span-2">
        <Label htmlFor={`edit-image-${product.slug}`}>Product image</Label>
        <div className="mt-1.5">
          <ImageUploader value={image} onUploaded={setImage} onError={setError} />
        </div>
      </div>
      {error ? (
        <p role="alert" className="text-sm text-danger sm:col-span-2">
          {error}
        </p>
      ) : null}
      <div className="flex items-center gap-2 sm:col-span-2">
        <Button size="sm" onClick={handleSave} disabled={busy}>
          {busy ? "Saving..." : "Save"}
        </Button>
        <Button size="sm" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export function ProductsPanel() {
  const { data, busy, error, reload } = useAdminFetch<{ products: Product[] }>(
    "/api/admin/products"
  );

  const [name, setName] = useState("");
  const [categorySlug, setCategorySlug] = useState(categories[0]?.slug ?? "");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [badge, setBadge] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [popular, setPopular] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [formError, setFormError] = useState("");
  const [formBusy, setFormBusy] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const handleAdd = async (event: FormEvent) => {
    event.preventDefault();
    setFormError("");
    setFormBusy(true);
    const result = await adminPost("/api/admin/products", {
      name,
      categorySlug,
      price: price === "" ? undefined : Number(price),
      originalPrice: originalPrice === "" ? undefined : Number(originalPrice),
      duration: duration || undefined,
      badge: badge || undefined,
      image: image || undefined,
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
    setOriginalPrice("");
    setDuration("");
    setBadge("");
    setImage("");
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
          Add new products or edit prices, discounts and images. Changes reflect on the site
          instantly.
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
          <Field
            label="Original price (PKR)"
            htmlFor="admin-product-original-price"
            hint="Higher than the sale price to show a discount %."
          >
            <Input
              id="admin-product-original-price"
              type="number"
              min="0"
              value={originalPrice}
              onChange={(event) => setOriginalPrice(event.target.value)}
              placeholder="e.g. 1200"
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
          <div className="sm:col-span-2">
            <Label htmlFor="admin-product-image">Product image</Label>
            <div className="mt-1.5">
              <ImageUploader value={image} onUploaded={setImage} onError={setFormError} />
            </div>
          </div>
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
              <li key={product.id} className="px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                      {product.plans[0]?.originalPrice
                        ? ` · was ${formatPrice(product.plans[0].originalPrice)}`
                        : ""}
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
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
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
                      onClick={() =>
                        setEditingSlug((current) =>
                          current === product.slug ? null : product.slug
                        )
                      }
                      aria-label={`Edit ${product.name}`}
                      className="grid size-9 place-items-center rounded-xl border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent-text"
                    >
                      {editingSlug === product.slug ? (
                        <X className="size-4" aria-hidden="true" />
                      ) : (
                        <Pencil className="size-4" aria-hidden="true" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product.slug, product.name)}
                      aria-label={`Delete ${product.name}`}
                      className="grid size-9 place-items-center rounded-xl border border-border text-muted transition-colors hover:border-danger/40 hover:text-danger"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {editingSlug === product.slug ? (
                  <ProductEditForm
                    product={product}
                    onClose={() => setEditingSlug(null)}
                    onSaved={() => {
                      setEditingSlug(null);
                      void reload();
                    }}
                  />
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
