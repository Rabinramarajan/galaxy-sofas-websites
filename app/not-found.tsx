import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center py-20">
      <Container className="max-w-xl text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-walnut">404</p>
        <h1 className="mt-4 font-display text-5xl">This page is not in the showroom</h1>
        <p className="mt-4 text-muted">
          The link may be out of date. Browse sofas, beds and furniture, or send an enquiry and we will point you to the
          right piece.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/sofas">Explore our sofas</Button>
          <Button href="/contact" variant="secondary">
            Enquire Now
          </Button>
        </div>
      </Container>
    </div>
  );
}
