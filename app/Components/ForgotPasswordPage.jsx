"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail]       = useState("");
  const [sent, setSent]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email) return setError("Please enter your email address.");
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Please enter a valid email address.");

    setLoading(true);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://velyscent-project.vercel.app";
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/reset-password`,
    });
    setLoading(false);

    if (error) return setError(error.message);
    setSent(true);
  };

  // ── Email Sent Screen ─────────────────────────────────────────────
  if (sent) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50%       { opacity: 1;   transform: scale(1.05); }
          }
        `}</style>

        <div style={{
          minHeight: "100vh", background: "#0A0806",
          display: "flex", alignItems: "center",
          justifyContent: "center", padding: "40px 20px",
        }}>
          <div style={{
            width: "100%", maxWidth: "440px", textAlign: "center",
            animation: "fadeUp 0.8s ease forwards",
          }}>

            <Link href="/" style={{ textDecoration: "none" }}>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "28px", fontWeight: 700,
                color: "#C4914F", letterSpacing: "0.08em",
                marginBottom: "36px", display: "block",
              }}>VELYSCENT</h1>
            </Link>

            <div style={{
              background: "#111009",
              border: "1px solid rgba(196,145,79,0.2)",
              borderRadius: "12px", padding: "40px 32px",
            }}>

              {/* Icon */}
              <div style={{
                width: "72px", height: "72px", margin: "0 auto 24px",
                borderRadius: "50%",
                background: "rgba(196,145,79,0.1)",
                border: "1px solid rgba(196,145,79,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: "pulse 2.5s ease-in-out infinite",
              }}>
                <svg width="30" height="30" fill="none" stroke="#C4914F"
                  strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px", fontWeight: 600,
                color: "#FFFFFF", marginBottom: "12px",
              }}>Check Your Email</h2>

              <p style={{
                fontFamily: "'Jost', sans-serif", fontSize: "14px",
                fontWeight: 300, color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7, marginBottom: "8px",
              }}>
                We've sent a password reset link to
              </p>

              <p style={{
                fontFamily: "'Jost', sans-serif", fontSize: "14px",
                fontWeight: 500, color: "#C4914F",
                marginBottom: "28px", wordBreak: "break-all",
              }}>
                {email}
              </p>

              {/* Steps */}
              <div style={{
                textAlign: "left", marginBottom: "28px",
                display: "flex", flexDirection: "column", gap: "12px",
              }}>
                {[
                  "Open the reset email we just sent you",
                  "Click the reset link inside",
                  "Create your new password",
                ].map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{
                      width: "22px", height: "22px", flexShrink: 0,
                      borderRadius: "50%",
                      background: "rgba(196,145,79,0.12)",
                      border: "1px solid rgba(196,145,79,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{
                        fontFamily: "'Jost', sans-serif", fontSize: "11px",
                        fontWeight: 600, color: "#C4914F",
                      }}>{i + 1}</span>
                    </div>
                    <p style={{
                      fontFamily: "'Jost', sans-serif", fontSize: "13px",
                      fontWeight: 300, color: "rgba(255,255,255,0.55)",
                      paddingTop: "2px", lineHeight: 1.5,
                    }}>{step}</p>
                  </div>
                ))}
              </div>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "20px" }} />

              <p style={{
                fontFamily: "'Jost', sans-serif", fontSize: "12px",
                fontWeight: 300, color: "rgba(255,255,255,0.3)",
                marginBottom: "20px", lineHeight: 1.6,
              }}>
                Didn't receive the email? Check your spam folder or{" "}
                <button onClick={() => setSent(false)} style={{
                  background: "none", border: "none", color: "#C4914F",
                  cursor: "pointer", padding: 0,
                  fontFamily: "'Jost', sans-serif", fontSize: "12px",
                  textDecoration: "underline",
                }}>try again</button>
              </p>

              <Link href="/signin" style={{
                display: "block", padding: "13px",
                background: "#C4914F", borderRadius: "6px", color: "#fff",
                fontFamily: "'Jost', sans-serif", fontSize: "13px", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                textDecoration: "none", transition: "background 0.25s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#b07d3f"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#C4914F"}
              >
                Back to Sign In
              </Link>
            </div>

            <div style={{ marginTop: "24px" }}>
              <Link href="/" style={{
                fontFamily: "'Jost', sans-serif", fontSize: "12px",
                color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
              >← Back to Home</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Forgot Password Form ──────────────────────────────────────────
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
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 6px;
          padding: 13px 16px; color: #fff;
          font-family: 'Jost', sans-serif; font-size: 14px;
          outline: none; transition: border-color 0.2s; box-sizing: border-box;
        }
        .auth-input:focus { border-color: rgba(196,145,79,0.6); }
        .auth-input::placeholder { color: rgba(255,255,255,0.25); }
        .auth-btn {
          width: 100%; padding: 14px; background: #C4914F;
          border: none; border-radius: 6px; color: #fff;
          font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s ease; margin-top: 8px;
        }
        .auth-btn:hover { background: #b07d3f; transform: translateY(-1px); }
        .auth-btn:disabled { background: rgba(196,145,79,0.4); cursor: not-allowed; transform: none; }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#0A0806",
        display: "flex", alignItems: "center",
        justifyContent: "center", padding: "40px 20px",
      }}>
        <div style={{
          width: "100%", maxWidth: "440px",
          animation: "fadeUp 0.8s ease forwards",
        }}>

          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "28px", fontWeight: 700,
                color: "#C4914F", letterSpacing: "0.08em",
              }}>VELYSCENT</h1>
            </Link>
            <p style={{
              fontFamily: "'Jost', sans-serif", fontSize: "13px", fontWeight: 300,
              color: "rgba(255,255,255,0.4)", marginTop: "6px",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>Reset your password</p>
          </div>

          {/* Card */}
          <div style={{
            background: "#111009",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px", padding: "36px 32px",
          }}>

            {/* Lock icon */}
            <div style={{
              width: "56px", height: "56px", margin: "0 auto 24px",
              borderRadius: "50%",
              background: "rgba(196,145,79,0.08)",
              border: "1px solid rgba(196,145,79,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="24" height="24" fill="none" stroke="#C4914F"
                strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "20px", fontWeight: 600,
              color: "#FFFFFF", marginBottom: "8px", textAlign: "center",
            }}>Forgot Password?</h2>

            <p style={{
              fontFamily: "'Jost', sans-serif", fontSize: "13px",
              fontWeight: 300, color: "rgba(255,255,255,0.4)",
              textAlign: "center", lineHeight: 1.7, marginBottom: "28px",
            }}>
              No worries. Enter your email and we'll send you a link to reset your password.
            </p>

            {/* Email field */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                fontFamily: "'Jost', sans-serif", fontSize: "12px", fontWeight: 500,
                color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em",
                textTransform: "uppercase", display: "block", marginBottom: "8px",
              }}>Email Address</label>
              <input
                className="auth-input" type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            {error && (
              <div style={{
                background: "rgba(220,60,60,0.1)", border: "1px solid rgba(220,60,60,0.3)",
                borderRadius: "6px", padding: "10px 14px", marginBottom: "16px",
                fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#ff6b6b",
              }}>{error}</div>
            )}

            <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <Link href="/signin" style={{
                fontFamily: "'Jost', sans-serif", fontSize: "13px",
                fontWeight: 500, color: "rgba(255,255,255,0.35)",
                textDecoration: "none", transition: "color 0.2s",
                display: "inline-flex", alignItems: "center", gap: "6px",
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor"
                  strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Back to Sign In
              </Link>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Link href="/" style={{
              fontFamily: "'Jost', sans-serif", fontSize: "12px",
              color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
            >← Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}