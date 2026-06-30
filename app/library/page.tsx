import { AppShell } from "@/components/screens/AppShell";
import { LibraryScreen } from "@/components/screens/LibraryScreen";
import { getPlants } from "@/lib/plants";

export default async function LibraryPage() {
  const { plants, rateLimited, error } = await getPlants();

  return (
    <AppShell title="Virtual Apothecary" navIndex={1}>
      <LibraryScreen plants={plants} rateLimited={rateLimited} error={error} />
    </AppShell>
  );
}
