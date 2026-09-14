import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { getCategoryLabel } from "@/data/products";
import type { Product } from "@/types";
import { getProductEnquiryUrl } from "@/utils/whatsapp";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/products/${product.slug}/`}
        className="relative block aspect-[4/5] cursor-pointer overflow-hidden rounded-lg bg-dark/5"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          className="object-cover transition-opacity duration-200 group-hover:opacity-90"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>
      <div className="flex items-start justify-between gap-4 pt-4">
        <div className="min-w-0">
          <h3 className="font-serif text-lg text-dark sm:text-xl">
            <Link
              href={`/products/${product.slug}/`}
              className="cursor-pointer transition-colors duration-200 group-hover:text-primary"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-[0.8125rem] text-primary">
            {getCategoryLabel(product.category)}
          </p>
        </div>
        <a
          href={getProductEnquiryUrl(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-1 text-sm text-dark transition-colors duration-200 hover:text-primary"
          aria-label={`Enquire about ${product.name} on WhatsApp`}
        >
          Enquire
          <Icon name="arrowUpRight" size={16} />
        </a>
      </div>
    </article>
  );
}
