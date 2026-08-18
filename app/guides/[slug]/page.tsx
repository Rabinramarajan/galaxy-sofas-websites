import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, getGuide } from "@/data/guides";
import { products } from "@/data/products";
import { Container, JsonLd } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { ProductCard } from "@/components/products/product-card";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import type { Metadata } from "next";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) {
    return createMetadata({
      title: "Guide not found",
      description: "This guide is no longer published.",
      path: `/guides/${slug}`,
      index: false,
    });
  }
  return createMetadata({
    title: guide.seoTitle.replace(" | Galaxy Sofas", ""),
    description: guide.seoDescription,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = products.filter((product) => guide.relatedProductSlugs.includes(product.slug));

  return (
    <article className="pb-24 pt-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ])}
      />
      <Container className="max-w-3xl">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Guides", href: "/guides" },
            { name: guide.title },
          ]}
        />
        <h1 className="mt-8 font-display text-5xl">{guide.title}</h1>
        <p className="mt-4 text-lg text-muted">{guide.excerpt}</p>
        {guide.content.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="font-display text-3xl">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
        <p className="mt-10 text-sm">
          Continue to{" "}
          <Link className="underline" href={`/${guide.relatedCategory}`}>
            explore our {guide.relatedCategory}
          </Link>
          .
        </p>
      </Container>
      {related.length ? (
        <Container className="mt-16">
          <h2 className="font-display text-3xl">Pieces that relate to this guide</h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      ) : null}
    </article>
  );
}
