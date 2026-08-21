"use client";

import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] items-center py-20">
      <Container width="narrow" className="text-center">
        <h1 className="page-title">Something went wrong</h1>
        <p className="mt-4 text-muted">Please try again, or contact the showroom if the page still fails to load.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={reset}>Try again</Button>
          <Button href="/contact" variant="secondary">
            Enquire Now
          </Button>
        </div>
      </Container>
    </div>
  );
}
