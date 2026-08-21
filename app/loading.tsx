import { ProductSkeleton } from "@/components/products/product-skeleton";
import { Container } from "@/components/ui/primitives";

export default function Loading() {
  return (
    <div className="py-16" role="status" aria-label="Loading page">
      <Container>
        <div className="h-4 w-40 animate-pulse bg-linen" />
        <div className="mt-8 h-12 max-w-md animate-pulse bg-linen" />
        <div className="mt-4 h-16 max-w-xl animate-pulse bg-linen" />
        <div className="mt-12 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </Container>
    </div>
  );
}
