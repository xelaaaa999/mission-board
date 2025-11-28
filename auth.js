// auth.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// 1. Configure Supabase
const SUPABASE_URL = "SUPABASE_URL_HERE";          // e.g. https://xyzcompany.supabase.co
const SUPABASE_ANON_KEY = "SUPABASE_ANON_KEY_HERE";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Get DOM elements
const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const loginMessage = document.getElementById("login-message");
const signupMessage = document.getElementById("signup-message");
const authBox = document.getElementById("auth-box");
const userBox = document.getElementById("user-box");
const userEmailSpan = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");

// 3. Toggle login/signup tabs
tabLogin.addEventListener("click", () => {
  tabLogin.classList.add("active");
  tabSignup.classList.remove("active");
  loginForm.classList.add("visible");
  signupForm.classList.remove("visible");
  loginMessage.textContent = "";
  signupMessage.textContent = "";
});

tabSignup.addEventListener("click", () => {
  tabSignup.classList.add("active");
  tabLogin.classList.remove("active");
  signupForm.classList.add("visible");
  loginForm.classList.remove("visible");
  loginMessage.textContent = "";
  signupMessage.textContent = "";
});

// 4. Helper: show messages
function showMessage(el, text, isError = false) {
  el.textContent = text;
  el.classList.remove("error", "success");
  if (text) {
    el.classList.add(isError ? "error" : "success");
  }
}

// 5. Signup handler
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  showMessage(signupMessage, "Creating account...");
  showMessage(loginMessage, "");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    showMessage(signupMessage, error.message || "Error signing up", true);
    return;
  }

  // Depending on Supabase email settings, user may need to confirm via email
  showMessage(
    signupMessage,
    "Sign up successful! Check your email for confirmation if required."
  );
});

// 6. Login handler
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  showMessage(loginMessage, "Logging in...");
  showMessage(signupMessage, "");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    showMessage(loginMessage, error.message || "Error logging in", true);
    return;
  }

  showMessage(loginMessage, "Logged in!");
  await refreshUserState();
});

// 7. Logout handler
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  await refreshUserState();
});

// 8. Check session on load and on changes
async function refreshUserState() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session && session.user) {
    const email = session.user.email || "(no email)";
    userEmailSpan.textContent = email;
    authBox.classList.add("hidden");
    userBox.classList.remove("hidden");
  } else {
    authBox.classList.remove("hidden");
    userBox.classList.add("hidden");
  }
}

// Listen to auth changes (optional but nice)
supabase.auth.onAuthStateChange((_event, _session) => {
  refreshUserState();
});

// Initialize state on first load
refreshUserState();
