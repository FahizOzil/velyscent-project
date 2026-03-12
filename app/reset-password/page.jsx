import ResetPasswordPage from "@/app/Components/ResetPasswordPage";

export default function ResetPassword() {
  return <main style={{ background: "#0A0806" }}><ResetPasswordPage /></main>;
}
// ```
// No Navbar on reset page — user isn't logged in yet.

// ---

// **Also add to Supabase → Redirect URLs:**
// ```
// https://velyscent-project.vercel.app/reset-password
// http://localhost:3000/reset-password