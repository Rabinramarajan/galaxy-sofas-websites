"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import type { SubcategoryDefinition } from "@/types/product";
import { filterCatalogue, unique } from "@/lib/utils";
import { ProductCard } from "@/components/products/product-card";

export function Catalogue({
  products,
  subcategories,
  activeSubcategory,
}: {
  products: Product[];
  subcategories: SubcategoryDefinition[];
  activeSubcategory?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const materials = unique(
    products.flatMap((product) =>
      product.material.toLowerCase().includes("leather")
        ? ["Leather"]
        : product.material.toLowerCase().includes("wood") || product.material.toLowerCase().includes("timber")
          ? ["Wood"]
          : ["Fabric"],
    ),
  );
  const colors = unique(products.flatMap((product) => product.colors.map((color) => color.name)));

  const filtered = useMemo(
    () =>
      filterCatalogue(products, {
        query: searchParams.get("q") ?? "",
        subcategory: activeSubcategory,
        material: searchParams.get("material") ?? "",
        color: searchParams.get("color") ?? "",
        availability: searchParams.get("availability") ?? "",
        sort: searchParams.get("sort") ?? "",
      }),
    [products, searchParams, activeSubcategory],
  );

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-border py-5 lg:flex-row lg:items-end lg:justify-between">
        <form
          className="flex min-h-11 flex-1 gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            update("q", query);
          }}
        >
          <label htmlFor="catalogue-search" className="sr-only">
            Search this collection
          </label>
          <input
            id="catalogue-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, category or tag"
            className="min-h-11 w-full border border-border bg-parchment px-3 text-sm"
          />
          <button
            type="submit"
            className="min-h-11 cursor-pointer bg-charcoal px-4 text-[10px] uppercase tracking-[0.16em] text-parchment"
          >
            Search
          </button>
        </form>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <FilterSelect
            id="material"
            label="Material"
            value={searchParams.get("material") ?? ""}
            onChange={(value) => update("material", value)}
            options={materials}
          />
          <FilterSelect
            id="color"
            label="Colour"
            value={searchParams.get("color") ?? ""}
            onChange={(value) => update("color", value)}
            options={colors}
          />
          <FilterSelect
            id="availability"
            label="Availability"
            value={searchParams.get("availability") ?? ""}
            onChange={(value) => update("availability", value)}
            options={[
              { value: "in-stock", label: "Available to view" },
              { value: "made-to-order", label: "Made to order" },
              { value: "limited", label: "Limited" },
            ]}
          />
          <FilterSelect
            id="sort"
            label="Sort"
            value={searchParams.get("sort") ?? ""}
            onChange={(value) => update("sort", value)}
            options={[
              { value: "name", label: "Name" },
              { value: "price-asc", label: "Price: low to high" },
              { value: "price-desc", label: "Price: high to low" },
            ]}
          />
        </div>
      </div>
      {!activeSubcategory ? (
        <div className="flex gap-2 overflow-x-auto py-5">
          {subcategories.map((item) => (
            <a
              key={item.slug}
              href={`/${item.category}/${item.slug}`}
              className="min-h-11 shrink-0 border border-border px-4 py-2 text-[11px] uppercase tracking-[0.14em] hover:border-charcoal"
            >
              {item.name}
            </a>
          ))}
        </div>
      ) : null}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="font-display text-3xl">No pieces match those filters</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Try clearing search or colour, or browse the full collection. You can also enquire and we will
            suggest a piece from the showroom floor.
          </p>
          <a href={pathname} className="mt-6 inline-block text-sm underline">
            Clear filters
          </a>
        </div>
      ) : (
        <div className="grid gap-10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<string | { value: string; label: string }>;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full border border-border bg-parchment px-2 text-sm"
      >
        <option value="">All</option>
        {options.map((option) => {
          const item = typeof option === "string" ? { value: option, label: option } : option;
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
