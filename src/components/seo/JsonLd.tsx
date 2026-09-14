type JsonLdProps = {
  /** A schema.org node or an array of nodes. Rendered as a single JSON-LD script. */
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Server-rendered JSON-LD. Kept as a plain script tag so the markup is present
 * in the static HTML and needs no client JavaScript to be discovered.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Data is authored in-repo, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
