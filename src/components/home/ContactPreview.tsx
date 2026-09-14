import { Container } from "@/components/common/Container";
import { ContactCards } from "@/components/common/ContactCards";

export function ContactPreview() {
  return (
    <section className="section-y">
      <Container>
        <ContactCards />
      </Container>
    </section>
  );
}
