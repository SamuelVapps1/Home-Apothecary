import { WelcomeScreen } from "@/components/screens/WelcomeScreen";
import { getCurrentAccount } from "@/lib/auth";
import { getWelcomeData } from "@/lib/welcome";
import { redirect } from "next/navigation";

export default async function WelcomePage() {
  const account = await getCurrentAccount();

  if (!account?.user) {
    redirect("/onboarding?next=/welcome");
  }

  const { plants, recipes } = await getWelcomeData();
  const accessTier = account.profile?.access_level ?? "free";

  return <WelcomeScreen plants={plants} recipes={recipes} accessTier={accessTier} />;
}
