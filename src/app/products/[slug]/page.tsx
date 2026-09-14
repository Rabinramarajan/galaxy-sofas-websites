import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ProductCard } from "@/components/products/ProductCard";
import { site } from "@/constants/site";
import {
  getCategoryLabel,
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/data/products";
import { getProductEnquiryMessage } from "@/utils/whatsapp";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product" };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}/` },
    openGraph: {
      title: `${product.name} | Galaxy Sofas`,
      description: product.shortDescription,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  return (
    <Container className="section-y">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.gallery.map((image, index) => (
              <div key={`${image}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-md">
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="20vw"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-primary">{getCategoryLabel(product.category)}</p>
          <h1 className="mt-2 font-serif text-[1.75rem] text-dark sm:text-[2.5rem]">{product.name}</h1>
          <p className="mt-5 max-w-lg leading-relaxed">{product.description}</p>
          <h2 className="mt-10 font-serif text-xl text-dark">Features</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {product.features.map((feature) => (
              <li key={feature} className="border-t border-line pt-2">
                {feature}
              </li>
            ))}
          </ul>
          <div className="action-stack mt-10">
            <WhatsAppButton
              message={getProductEnquiryMessage(product.name)}
              label="Enquire on WhatsApp"
            />
            <Button href={site.phoneHref} variant="outline">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </Button>
          </div>
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">Related products</h2>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
