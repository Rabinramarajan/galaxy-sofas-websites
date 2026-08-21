import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Thank you",
  description: `Your enquiry has been received by ${site.name}.`,
  path: "/thank-you",
  index: false,
});

export default function ThankYouPage() {
  return (
    <div className="flex min-h-[60vh] items-center py-20">
      <Container width="narrow" className="text-center">
        <p className="eyebrow">Enquiry received</p>
        <h1 className="page-title mt-4">We will be in touch</h1>
        <p className="mt-4 text-muted">
          Thank you. A specialist at {site.name} will reply by phone or email. If you need the showroom today, call{" "}
          {site.phoneDisplay}.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/sofas">Explore our sofas</Button>
          <Button href="/" variant="secondary">
            Back home
          </Button>
        </div>
      </Container>
    </div>
  );
}
