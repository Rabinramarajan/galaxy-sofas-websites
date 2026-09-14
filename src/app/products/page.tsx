import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { ProductCollection } from "@/components/products/ProductCollection";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/constants/site";
import { productCategories } from "@/data/products";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, collectionSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: `Sofa Collection in ${site.city}`,
  description:
    "Browse the Galaxy Sofas collection in Chennai: L shape sofas, recliners, sofa cum beds, 3 seaters, 2 seaters and fully custom designs, all made to order.",
  path: "/products/",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={[
          collectionSchema(
            `Sofa collection in ${site.city}`,
            "Sofa types made to order by Galaxy Sofas in Chennai.",
            "/products/",
            productCategories.map((category) => ({
              name: category.name,
              path: `/products/${category.slug}/`,
            })),
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sofas", path: "/products/" },
          ]),
        ]}
      />
      <PageHero
        title="Sofa Collection in Chennai"
        description="Browse sofas by type, then enquire on WhatsApp for fabric options, sizes and custom work."
      />
      <Container className="section-y">
        <p className="mb-10 max-w-2xl leading-relaxed sm:mb-14">
          Every sofa below is made to order in our Chennai workshop, so size, seat depth, foam
          density and fabric are decided with you rather than picked off a shelf. Start with the
          type that fits your room, or tell us the measurements and we will work backwards from the
          space.
        </p>
        <ProductCollection />
      </Container>
    </>
  );
}
