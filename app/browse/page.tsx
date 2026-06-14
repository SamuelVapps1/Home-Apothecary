import { AppShell } from "@/components/screens/AppShell";
import { BrowseScreen } from "@/components/screens/BrowseScreen";

export default function BrowsePage() {
  return (
    <AppShell title="Home Apothecary" navIndex={1}>
      <BrowseScreen />
    </AppShell>
  );
}
