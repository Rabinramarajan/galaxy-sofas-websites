import type { Metadata } from "next";
import {
  CategorySlugPage,
  generateCategoryParams,
  generateCategorySlugMetadata,
} from "@/components/products/category-slug-page";

export function generateStaticParams() {
  return generateCategoryParams("sofas");
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/sofas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return generateCategorySlugMetadata("sofas", slug, await searchParams);
}

export default async function Page({ params }: PageProps<"/sofas/[slug]">) {
  const { slug } = await params;
  return <CategorySlugPage category="sofas" slug={slug} />;
}
