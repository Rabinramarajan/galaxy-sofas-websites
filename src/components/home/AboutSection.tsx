import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";

const highlights = [
  "Quality materials",
  "Skilled craftsmanship",
  "Custom designs",
  "Customer-focused service",
];

export function AboutSection() {
  return (
    <section className="section-y">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src="/images/sofas/tan-leather-three-seater-sofa.webp"
            alt="Tan leather three seater sofa made by Galaxy Sofas"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">
            Designed for Comfort. Built to Last.
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed">
            Galaxy Sofas is a furniture brand focused on stylish, comfortable and durable sofas
            for modern homes in Chennai. Every piece is made to feel inviting on day one and stay
            dependable through daily use.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="border-t border-line pt-3 text-sm text-dark">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/about/" variant="outline">
              Know More About Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
