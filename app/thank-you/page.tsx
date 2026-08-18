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
      <Container className="max-w-xl text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-walnut">Enquiry received</p>
        <h1 className="mt-4 font-display text-5xl">We will be in touch</h1>
        <p className="mt-4 text-muted">
          Thank you. A specialist at {site.name} will reply by phone or email. If you need the showroom today, call{" "}
          {site.phoneDisplay}.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/sofas">Explore our sofas</Button>
          <Button href="/" variant="secondary">
            Back home
          </Button>
        </div>
      </Container>
    </div>
  );
}
