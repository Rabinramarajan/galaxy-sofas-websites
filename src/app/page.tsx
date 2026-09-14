import { AboutSection } from "@/components/home/AboutSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ContactPreview } from "@/components/home/ContactPreview";
import { CustomSofaCTA } from "@/components/home/CustomSofaCTA";
import { FaqSection, homeFaqs } from "@/components/home/FaqSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { GallerySection } from "@/components/home/GallerySection";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/constants/site";
import { pageMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  absoluteTitle: `${site.name} | Custom Sofas & Sofa Store in ${site.city}`,
  title: `Custom Sofas & Sofa Store in ${site.city}`,
  description:
    "Explore custom sofas, L shape sofas, recliners, sofa cum beds and sofa services from Galaxy Sofas in Chennai. Enquire for a sofa designed for your home.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <HeroSection />
      <CategoriesSection />
      <AboutSection />
      <WhyChooseUs />
      <FeaturedProducts />
      <CustomSofaCTA />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <FaqSection />
      <ContactCTA />
      <ContactPreview />
    </>
  );
}
