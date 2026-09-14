import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { getCategoryLabel } from "@/data/products";
import type { Product } from "@/types";
import { getProductEnquiryUrl } from "@/utils/whatsapp";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col">
      <Link
        href={`/products/${product.slug}/`}
        className="group relative block aspect-[4/3] cursor-pointer overflow-hidden rounded-lg sm:aspect-[4/5]"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-200 group-hover:opacity-90"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[0.8125rem] text-primary">{getCategoryLabel(product.category)}</p>
        <h3 className="mt-1 font-serif text-lg text-dark sm:text-xl">
          <Link
            href={`/products/${product.slug}/`}
            className="cursor-pointer transition-colors duration-200 hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed">{product.shortDescription}</p>
        <div className="mt-4">
          <Button href={getProductEnquiryUrl(product.name)} variant="outline" className="w-full sm:w-auto" external>
            Enquire Now
          </Button>
        </div>
      </div>
    </article>
  );
}
