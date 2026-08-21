import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center py-20">
      <Container width="narrow" className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="page-title mt-4">Looks like this page has moved.</h1>
        <p className="mt-4 text-muted">
          The link may be out of date. Browse sofas, beds and furniture, or send an enquiry and we will point you to the
          right piece.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Back Home</Button>
          <Button href="/sofas" variant="secondary">
            Explore Sofas
          </Button>
        </div>
      </Container>
    </div>
  );
}
