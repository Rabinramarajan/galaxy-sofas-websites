import type { Metadata } from "next";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 sm:py-20 text-center">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-3 font-serif text-[1.75rem] text-dark sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md">
        The page you are looking for is not available. Continue to the collection or send us a
        WhatsApp enquiry.
      </p>
      <div className="action-stack mt-8 sm:justify-center">
        <Button href="/">Back to Home</Button>
        <Button href="/products/" variant="outline">
          View Products
        </Button>
      </div>
    </Container>
  );
}
