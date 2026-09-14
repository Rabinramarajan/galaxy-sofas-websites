import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { SectionHeader } from "@/components/common/SectionHeader";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="section-y">
      <Container>
        <SectionHeader title="What Our Customers Say" />
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {testimonials.map((item) => (
            <blockquote key={item.id} className="border-t border-accent/50 pt-6">
              <div className="flex gap-1 text-accent" aria-label="5 out of 5 stars">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Icon key={index} name="star" size={14} />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed">{item.review}</p>
              <footer className="mt-5 text-sm text-dark">
                {item.name}
                <span className="text-foreground">, {item.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
