"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    if (!form.fullName || !form.email || !form.password) return setError("All fields are required.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");

    setLoading(true);
    const { error } = await signUp(form.email, form.password, form.fullName);
    setLoading(false);

    if (error) return setError(error.message);
    router.push("/"); // redirect to home after signup
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .auth-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 13px 16px;
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .auth-input:focus { border-color: rgba(196,145,79,0.6); }
        .auth-input::placeholder { color: rgba(255,255,255,0.25); }

        .auth-btn {
          width: 100%;
          padding: 14px;
          background: #C4914F;
          border: none;
          border-radius: 6px;
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          margin-top: 8px;
        }
        .auth-btn:hover { background: #b07d3f; transform: translateY(-1px); }
        .auth-btn:disabled { background: rgba(196,145,79,0.4); cursor: not-allowed; transform: none; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#0A0806",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}>
        <div style={{
          width: "100%",
          maxWidth: "440px",
          animation: "fadeUp 0.8s ease forwards",
        }}>

          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "28px", fontWeight: 700,
                color: "#C4914F", letterSpacing: "0.08em",
              }}>
                VELYSCENT
              </h1>
            </Link>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "13px", fontWeight: 300,
              color: "rgba(255,255,255,0.4)",
              marginTop: "6px", letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              Create your account
            </p>
          </div>

          {/* Card */}
          <div style={{
            background: "#111009",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "36px 32px",
          }}>

            {/* Full Name */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{
                fontFamily: "'Jost', sans-serif", fontSize: "12px",
                fontWeight: 500, color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.08em", textTransform: "uppercase",
                display: "block", marginBottom: "8px",
              }}>
                Full Name
              </label>
              <input
                className="auth-input"
                name="fullName"
                type="text"
                placeholder="Your full name"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{
                fontFamily: "'Jost', sans-serif", fontSize: "12px",
                fontWeight: 500, color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.08em", textTransform: "uppercase",
                display: "block", marginBottom: "8px",
              }}>
                Email Address
              </label>
              <input
                className="auth-input"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{
                fontFamily: "'Jost', sans-serif", fontSize: "12px",
                fontWeight: 500, color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.08em", textTransform: "uppercase",
                display: "block", marginBottom: "8px",
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  className="auth-input"
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  style={{ paddingRight: "44px" }}
                />
                <button onClick={() => setShowPass(!showPass)} style={{
                  position: "absolute", right: "14px", top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.3)", padding: 0,
                }}>
                  {showPass ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                fontFamily: "'Jost', sans-serif", fontSize: "12px",
                fontWeight: 500, color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.08em", textTransform: "uppercase",
                display: "block", marginBottom: "8px",
              }}>
                Confirm Password
              </label>
              <input
                className="auth-input"
                name="confirm"
                type="password"
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={handleChange}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: "rgba(220,60,60,0.1)",
                border: "1px solid rgba(220,60,60,0.3)",
                borderRadius: "6px", padding: "10px 14px",
                marginBottom: "18px",
                fontFamily: "'Jost', sans-serif",
                fontSize: "13px", color: "#ff6b6b",
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              className="auth-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Divider */}
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              margin: "24px 0",
            }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
              <span style={{
                fontFamily: "'Jost', sans-serif", fontSize: "12px",
                color: "rgba(255,255,255,0.25)",
              }}>
                already have an account?
              </span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
            </div>

            {/* Sign in link */}
            <Link href="/signin" style={{
              display: "block", textAlign: "center",
              fontFamily: "'Jost', sans-serif", fontSize: "13px",
              fontWeight: 500, color: "#C4914F",
              textDecoration: "none", letterSpacing: "0.05em",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.75"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              Sign In →
            </Link>
          </div>

          {/* Back to home */}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Link href="/" style={{
              fontFamily: "'Jost', sans-serif", fontSize: "12px",
              color: "rgba(255,255,255,0.3)", textDecoration: "none",
              letterSpacing: "0.05em", transition: "color 0.2s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
            >
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}