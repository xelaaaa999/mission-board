export async function logout() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Always redirect to login, even if logout fails
    window.location.href = "/login";
  }
}