import type { Metadata } from "next";
import {
  CategorySlugPage,
  generateCategoryParams,
  generateCategorySlugMetadata,
} from "@/components/products/category-slug-page";

export function generateStaticParams() {
  return generateCategoryParams("beds");
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/beds/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return generateCategorySlugMetadata("beds", slug, await searchParams);
}

export default async function Page({ params }: PageProps<"/beds/[slug]">) {
  const { slug } = await params;
  return <CategorySlugPage category="beds" slug={slug} />;
}
