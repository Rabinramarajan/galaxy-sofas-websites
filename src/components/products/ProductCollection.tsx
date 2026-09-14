import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { getCategoryHref, getProductsByCategory, productCategories } from "@/data/products";

export function ProductCollection() {
  return (
    <div id="collection">
      <nav
        className="no-scrollbar -mx-4 overflow-x-auto overscroll-x-contain px-4 sm:mx-0 sm:overflow-visible sm:px-0"
        aria-label="Sofa categories"
      >
        <div className="flex w-max gap-5 sm:w-auto sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
          {productCategories.map((category) => (
            <Link
              key={category.id}
              href={getCategoryHref(category)}
              className="inline-flex min-h-11 shrink-0 cursor-pointer items-center border-b border-transparent text-sm text-dark transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              {category.shortName}
            </Link>
          ))}
        </div>
      </nav>
      <div className="mt-10 space-y-14 sm:mt-14 sm:space-y-20">
        {productCategories.map((category) => (
          // The id is kept so older /products/#l-shape links still land correctly.
          <section key={category.id} id={category.id} className="scroll-mt-24">
            <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">
              <Link
                href={getCategoryHref(category)}
                className="cursor-pointer transition-colors duration-200 hover:text-primary"
              >
                {category.name}
              </Link>
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed sm:text-base">
              {category.description}
            </p>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
              {getProductsByCategory(category.id).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <p className="mt-8 text-sm">
              <Link
                href={getCategoryHref(category)}
                className="cursor-pointer text-primary hover:underline"
              >
                Explore {category.name.toLowerCase()} in Chennai
              </Link>
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
