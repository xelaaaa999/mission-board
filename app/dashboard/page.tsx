import { createClient } from "@/lib/supabaseserver";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold">Welcome, {user.email}</h1>
      <p className="mt-4 text-gray-300">Your dashboard is ready.</p>
    </div>
  );
}
