import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Container } from "@/components/common/Container";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ProductCard } from "@/components/products/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/constants/site";
import {
  getCategoryBySlug,
  getCategoryById,
  getCategoryLabel,
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
  productCategories,
  products,
} from "@/data/products";
import { pageMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  categoryProductListSchema,
  productSchema,
} from "@/lib/structured-data";
import type { ProductCategory } from "@/types";
import { getCustomDesignMessage, getProductEnquiryMessage } from "@/utils/whatsapp";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * One route serves two page types under short, readable URLs:
 *   /products/l-shape/            -> category landing page
 *   /products/aurora-l-shape-sofa/ -> product detail page
 * Category and product slugs are disjoint, and categories win the lookup.
 */
export function generateStaticParams() {
  return [
    ...productCategories.map((category) => ({ slug: category.slug })),
    ...products.map((product) => ({ slug: product.slug })),
  ];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);
  if (category) {
    return pageMetadata({
      title: category.metaTitle,
      description: category.metaDescription,
      path: `/products/${category.slug}/`,
      image: category.image,
      imageAlt: category.imageAlt,
    });
  }

  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product" };
  }

  return pageMetadata({
    title: `${product.name} in ${site.city}`,
    description: `${product.shortDescription} Made to order in ${site.city} by ${site.businessName} — enquire on WhatsApp for sizes, fabric and lead time.`,
    path: `/products/${product.slug}/`,
    image: product.image,
    imageAlt: product.imageAlt,
  });
}

export default async function ProductOrCategoryPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);
  if (category) {
    return <CategoryPage category={category} />;
  }

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);
  const categoryName = getCategoryLabel(product.category);
  const productCategory = getCategoryById(product.category);

  return (
    <Container className="section-y">
      <JsonLd
        data={[
          productSchema(product, categoryName),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sofas", path: "/products/" },
            { name: categoryName, path: `/products/${product.category}/` },
            { name: product.name, path: `/products/${product.slug}/` },
          ]),
        ]}
      />
      <Breadcrumbs
        className="mb-8"
        trail={[
          { name: "Home", path: "/" },
          { name: "Sofas", path: "/products/" },
          { name: categoryName, path: `/products/${product.category}/` },
        ]}
        current={product.name}
      />
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority
              fetchPriority="high"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.gallery.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative aspect-[4/3] overflow-hidden rounded-md"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 30vw, 15vw"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm">
            <Link href={`/products/${product.category}/`} className="cursor-pointer text-primary hover:underline">
              {categoryName}
            </Link>
          </p>
          <h1 className="mt-2 font-serif text-[1.75rem] text-dark sm:text-[2.5rem]">
            {product.name}
          </h1>
          <p className="mt-5 max-w-lg leading-relaxed">{product.description}</p>
          <h2 className="mt-10 font-serif text-xl text-dark">Features</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {product.features.map((feature) => (
              <li key={feature} className="border-t border-line pt-2">
                {feature}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-relaxed">
            Sizes, fabric and cushion firmness are decided with you before manufacturing, so this
            design can be adapted to your room. Sofa sizes, fabrics and finishes are confirmed on
            enquiry; we do not publish fixed prices because every build is measured to the room.
          </p>
          <div className="action-stack mt-8">
            <WhatsAppButton
              message={getProductEnquiryMessage(product.name)}
              label="Enquire on WhatsApp"
            />
            <Button href={site.phoneHref} variant="outline">
              <Icon name="phone" size={18} />
              Call {site.phoneDisplay}
            </Button>
          </div>
          {productCategory ? (
            <p className="mt-6 text-sm">
              See more{" "}
              <Link
                href={`/products/${productCategory.slug}/`}
                className="cursor-pointer text-primary hover:underline"
              >
                {productCategory.name.toLowerCase()} in {site.city}
              </Link>{" "}
              or ask about a{" "}
              <Link href="/products/custom/" className="cursor-pointer text-primary hover:underline">
                fully custom sofa
              </Link>
              .
            </p>
          ) : null}
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">
            Related sofa designs
          </h2>
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

function CategoryPage({ category }: { category: ProductCategory }) {
  const items = getProductsByCategory(category.id);
  const relatedCategories = category.related
    .map((id) => getCategoryById(id))
    .filter((item): item is ProductCategory => Boolean(item));

  return (
    <Container className="section-y">
      <JsonLd
        data={[
          categoryProductListSchema(category, items),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sofas", path: "/products/" },
            { name: category.name, path: `/products/${category.slug}/` },
          ]),
        ]}
      />
      <Breadcrumbs
        className="mb-8"
        trail={[
          { name: "Home", path: "/" },
          { name: "Sofas", path: "/products/" },
        ]}
        current={category.name}
      />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
        <div>
          <h1 className="font-serif text-[1.875rem] text-dark sm:text-[2.75rem]">
            {category.heading}
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed">{category.intro}</p>
          {category.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-4 max-w-xl leading-relaxed">
              {paragraph}
            </p>
          ))}
          <div className="action-stack mt-8">
            <WhatsAppButton
              message={`Hi Galaxy Sofas, I am looking for ${category.name.toLowerCase()} in ${site.city}. Please share options and sizes.`}
              label="Enquire on WhatsApp"
            />
            <Button href="/contact/" variant="outline">
              Send an enquiry
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={category.image}
            alt={category.imageAlt}
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </div>

      <section className="mt-16 sm:mt-20">
        <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">
          {category.name} we make
        </h2>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-line pt-10 sm:mt-20">
        <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">
          Before you order
        </h2>
        <ul className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
          {category.considerations.map((point) => (
            <li key={point} className="border-t border-line pt-3 text-sm leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">
          Related sofa types
        </h2>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {relatedCategories.map((item) => (
            <li key={item.id}>
              <Link href={`/products/${item.slug}/`} className="cursor-pointer text-primary hover:underline">
                Explore {item.name.toLowerCase()}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/services/" className="cursor-pointer text-primary hover:underline">
              Sofa repair and upholstery services
            </Link>
          </li>
          <li>
            <Link href="/gallery/" className="cursor-pointer text-primary hover:underline">
              See finished sofa work
            </Link>
          </li>
        </ul>
        <p className="mt-8 max-w-xl text-sm leading-relaxed">
          Galaxy Sofas builds and delivers across {site.serviceArea}. Call{" "}
          <a href={site.phoneHref} className="cursor-pointer text-primary hover:underline">
            {site.phoneDisplay}
          </a>{" "}
          or{" "}
          <a
            href={`${site.whatsappUrl}?text=${encodeURIComponent(getCustomDesignMessage())}`}
            className="cursor-pointer text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            message us on WhatsApp
          </a>{" "}
          with your room measurements.
        </p>
      </section>
    </Container>
  );
}
