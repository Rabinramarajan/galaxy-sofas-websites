import type { Metadata } from "next";
import {
  CategorySlugPage,
  generateCategoryParams,
  generateCategorySlugMetadata,
} from "@/components/products/category-slug-page";

export function generateStaticParams() {
  return generateCategoryParams("furniture");
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/furniture/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return generateCategorySlugMetadata("furniture", slug, await searchParams);
}

export default async function Page({ params }: PageProps<"/furniture/[slug]">) {
  const { slug } = await params;
  return <CategorySlugPage category="furniture" slug={slug} />;
}
