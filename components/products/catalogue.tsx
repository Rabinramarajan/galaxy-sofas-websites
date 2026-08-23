"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import type { SubcategoryDefinition } from "@/types/product";
import { filterCatalogue, unique } from "@/lib/utils";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";

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
        subcategoryMatch: subcategories.find((item) => item.slug === activeSubcategory)?.match,
        material: searchParams.get("material") ?? "",
        color: searchParams.get("color") ?? "",
        availability: searchParams.get("availability") ?? "",
        sort: searchParams.get("sort") ?? "",
      }),
    [products, searchParams, activeSubcategory, subcategories],
  );

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 border-y border-border py-5 lg:flex-row lg:items-end lg:justify-between">
        <form
          className="flex min-h-11 min-w-0 flex-1 gap-2"
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
            className="field-input min-w-0"
          />
          <Button type="submit" className="shrink-0 px-4">
            Search
          </Button>
        </form>
        <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-4">
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
              className="inline-flex min-h-11 shrink-0 items-center border border-border px-4 text-[11px] uppercase tracking-[0.14em] hover:border-charcoal"
            >
              {item.name}
            </a>
          ))}
        </div>
      ) : null}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="section-title">No furniture matched your search.</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Try clearing search or colour, or browse the full collection. You can also enquire and we will
            suggest a piece from the showroom floor.
          </p>
          <div className="mt-8">
            <Button href={pathname} variant="secondary">
              Clear filters
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="pt-8 text-sm text-muted">
            Showing {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="grid gap-10 pt-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
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
    <div className="min-w-0">
      <label htmlFor={id} className="eyebrow mb-1 block tracking-[0.16em] text-muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-input max-w-full"
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
