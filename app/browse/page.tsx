import { AppShell } from "@/components/screens/AppShell";
import { BrowseScreen } from "@/components/screens/BrowseScreen";
import { getRemedies } from "@/lib/remedies";

export default async function BrowsePage() {
  const remedies = await getRemedies();

  return (
    <AppShell title="Home Apothecary" navIndex={1}>
      <BrowseScreen remedies={remedies} />
    </AppShell>
  );
}
