import { supabase } from "./supabaseclient";

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = "/login";
}
