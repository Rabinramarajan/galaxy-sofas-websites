import Link from "next/link";
import { guides } from "@/data/guides";
import { Container, JsonLd } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Furniture Buying Guides",
  description: `Practical guides on sofa size, bed size and fabric from ${site.name} in ${site.city}. Written to help you choose — not to fill a blog.`,
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <div className="pb-24 pt-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          "Guides",
          guides.map((guide) => ({ name: guide.title, path: `/guides/${guide.slug}` })),
        )}
      />
      <Container>
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guides" }]} />
        <h1 className="mt-8 font-display text-5xl">Buying guides</h1>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="border-t border-border pt-5">
              <h2 className="font-display text-2xl">{guide.title}</h2>
              <p className="mt-3 text-sm text-muted">{guide.excerpt}</p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
