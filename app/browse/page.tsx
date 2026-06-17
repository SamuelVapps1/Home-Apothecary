import { AppShell } from "@/components/screens/AppShell";
import { BrowseScreen } from "@/components/screens/BrowseScreen";
import { getRecipes } from "@/lib/recipes";

export default async function BrowsePage() {
  const { recipes, rateLimited } = await getRecipes();

  return (
    <AppShell title="Virtual Apothecary" navIndex={1}>
      <BrowseScreen recipes={recipes} rateLimited={rateLimited} />
    </AppShell>
  );
}
