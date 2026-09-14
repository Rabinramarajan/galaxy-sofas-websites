import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ContactPreview } from "@/components/home/ContactPreview";
import { CustomSofaCTA } from "@/components/home/CustomSofaCTA";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { GallerySection } from "@/components/home/GallerySection";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export const metadata: Metadata = {
  title: {
    absolute: "Galaxy Sofas | Custom & Premium Sofas in Chennai",
  },
  description:
    "Discover stylish, comfortable and custom-made sofas from Galaxy Sofas in Chennai. Explore L shape sofas, recliners, sofa cum beds, custom designs and sofa services.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Galaxy Sofas | Custom & Premium Sofas in Chennai",
    description:
      "Discover stylish, comfortable and custom-made sofas from Galaxy Sofas in Chennai.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <AboutSection />
      <WhyChooseUs />
      <FeaturedProducts />
      <CustomSofaCTA />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactCTA />
      <ContactPreview />
    </>
  );
}
