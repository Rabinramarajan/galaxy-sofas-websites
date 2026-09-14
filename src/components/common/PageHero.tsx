import Image from "next/image";
import { Container } from "@/components/common/Container";

type PageHeroProps = {
  title: string;
  description?: string;
  image?: string;
};

export function PageHero({
  title,
  description,
  image = "/images/hero/galaxy-sofas-hero.jpg",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-dark">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dark/40" />
      <div className="relative">
        <Container className="flex min-h-[11.5rem] flex-col justify-end py-10 sm:min-h-[300px] sm:py-16">
          <h1 className="max-w-2xl font-serif text-[1.75rem] leading-tight text-white sm:text-[2.75rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-[0.975rem]">
              {description}
            </p>
          ) : null}
        </Container>
      </div>
    </section>
  );
}
