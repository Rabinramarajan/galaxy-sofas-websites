import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { ProductCollection } from "@/components/products/ProductCollection";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the Galaxy Sofas collection in Chennai: L shape sofas, recliners, sofa cum beds, 3 seaters, 2 seaters and custom designs.",
  alternates: { canonical: "/products/" },
  openGraph: {
    title: "Our Sofa Collection | Galaxy Sofas",
    description:
      "Browse L shape sofas, recliners, sofa cum beds and custom sofa designs from Galaxy Sofas.",
  },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Our Sofa Collection"
        description="Browse sofas by type, then enquire on WhatsApp for fabric options, sizes and custom work."
      />
      <Container className="section-y">
        <ProductCollection />
      </Container>
    </>
  );
}
