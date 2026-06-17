import { redirect } from "next/navigation";

export default async function RemedyRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/recipes/${slug}`);
}
