import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { productCategories } from "@/data/products";

export function CategoriesSection() {
  return (
    <section className="section-y">
      <Container>
        <SectionHeader title="Find Your Perfect Sofa" />
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
          {productCategories.map((category) => (
            <article key={category.id}>
              <Link href={`/products/#${category.id}`} className="group block cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-dark/5">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-opacity duration-200 group-hover:opacity-90"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="mt-4 font-serif text-lg text-dark transition-colors duration-200 group-hover:text-primary sm:text-xl">
                  {category.name}
                </h3>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
