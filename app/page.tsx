import { BetterMissionCard } from "@/components/cards/BetterMissionCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#072042] flex justify-center py-10">
      <div className="w-full max-w-md space-y-10">
  

        <BetterMissionCard
          title="Rewrite Auth Flow"
          description="Improve login by adding refresh token rotation and safer session state."
          criteria={[
            "Refresh tokens rotate automatically",
            "Dashboard route is protected",
            "Auto-logout works on expiry",
          ]}
          subtasks={[
            { id: 1, text: "Create refresh API", done: true },
            { id: 2, text: "Protect dashboard route", done: false },
            { id: 3, text: "Store tokens securely", done: false },
          ]}
          tags={["Backend", "Auth", "High Priority"]}
          owner="Aman"
          updatedAt="2 hours ago"
        />

      </div>
    </div>
  );
}
