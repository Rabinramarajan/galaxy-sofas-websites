export function ProductSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="aspect-[4/5] bg-linen" />
      <div className="pt-4">
        <div className="h-3 w-20 bg-linen" />
        <div className="mt-3 h-7 w-3/4 bg-linen" />
        <div className="mt-3 h-4 w-24 bg-linen" />
        <div className="mt-4 h-11 w-32 bg-linen" />
      </div>
    </div>
  );
}

export function CatalogueSkeleton() {
  return (
    <div className="mt-10" role="status" aria-label="Loading furniture">
      <div className="h-24 animate-pulse border-y border-border bg-linen/60" />
      <div className="grid gap-10 pt-8 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
