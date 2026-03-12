"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [ready, setReady]           = useState(false); // session detected
  const [done, setDone]             = useState(false);

  // Supabase fires PASSWORD_RECOVERY event when user lands from email link
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async () => {
    setError("");
    if (!password) return setError("Please enter a new password.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) return setError(error.message);
    setDone(true);
    setTimeout(() => router.push("/signin"), 3000);
  };

  // ── Success screen ────────────────────────────────────────────────
  if (done) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
          @keyframes checkDraw { from { stroke-dashoffset:100; } to { stroke-dashoffset:0; } }
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
                fontSize: "28px", fontWeight: 700, color: "#C4914F",
                letterSpacing: "0.08em", marginBottom: "36px", display: "block",
              }}>VELYSCENT</h1>
            </Link>

            <div style={{
              background: "#111009", border: "1px solid rgba(196,145,79,0.2)",
              borderRadius: "12px", padding: "40px 32px",
            }}>
              {/* Check circle */}
              <div style={{
                width: "72px", height: "72px", margin: "0 auto 24px",
                borderRadius: "50%",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="32" height="32" fill="none" stroke="#4ade80"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12"
                    style={{ strokeDasharray: 100, strokeDashoffset: 0, animation: "checkDraw 0.5s ease 0.2s both" }} />
                </svg>
              </div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontSize: "22px",
                fontWeight: 600, color: "#FFFFFF", marginBottom: "12px",
              }}>Password Updated!</h2>

              <p style={{
                fontFamily: "'Jost', sans-serif", fontSize: "14px",
                fontWeight: 300, color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7, marginBottom: "28px",
              }}>
                Your password has been changed successfully. Redirecting you to sign in...
              </p>

              <Link href="/signin" style={{
                display: "block", padding: "13px", background: "#C4914F",
                borderRadius: "6px", color: "#fff",
                fontFamily: "'Jost', sans-serif", fontSize: "13px", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none",
              }}>
                Sign In Now
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Waiting for session (invalid/expired link) ────────────────────
  if (!ready) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
        <div style={{
          minHeight: "100vh", background: "#0A0806",
          display: "flex", alignItems: "center",
          justifyContent: "center", padding: "40px 20px", flexDirection: "column", gap: "20px",
        }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            border: "2px solid rgba(196,145,79,0.2)",
            borderTopColor: "#C4914F",
            animation: "spin 0.8s linear infinite",
          }} />
          <p style={{
            fontFamily: "'Jost', sans-serif", fontSize: "14px",
            color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em",
          }}>
            Verifying reset link...
          </p>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontSize: "12px",
            color: "rgba(255,255,255,0.2)",
          }}>
            If nothing happens,{" "}
            <Link href="/forgot-password" style={{ color: "#C4914F", textDecoration: "none" }}>
              request a new link
            </Link>
          </p>
        </div>
      </>
    );
  }

  // ── Reset Password Form ───────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
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
            }}>Create new password</p>
          </div>

          <div style={{
            background: "#111009", border: "1px solid rgba(255,255,255,0.08)",
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
              fontFamily: "'Playfair Display', serif", fontSize: "20px",
              fontWeight: 600, color: "#FFFFFF",
              marginBottom: "8px", textAlign: "center",
            }}>Set New Password</h2>

            <p style={{
              fontFamily: "'Jost', sans-serif", fontSize: "13px",
              fontWeight: 300, color: "rgba(255,255,255,0.4)",
              textAlign: "center", lineHeight: 1.7, marginBottom: "28px",
            }}>
              Choose a strong password for your Velyscent account.
            </p>

            {/* New Password */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{
                fontFamily: "'Jost', sans-serif", fontSize: "12px", fontWeight: 500,
                color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em",
                textTransform: "uppercase", display: "block", marginBottom: "8px",
              }}>New Password</label>
              <div style={{ position: "relative" }}>
                <input className="auth-input"
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: "44px" }} />
                <button onClick={() => setShowPass(!showPass)} style={{
                  position: "absolute", right: "14px", top: "50%",
                  transform: "translateY(-50%)", background: "none",
                  border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 0,
                }}>
                  {showPass ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                fontFamily: "'Jost', sans-serif", fontSize: "12px", fontWeight: 500,
                color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em",
                textTransform: "uppercase", display: "block", marginBottom: "8px",
              }}>Confirm Password</label>
              <input className="auth-input" type="password"
                placeholder="Repeat new password"
                value={confirm} onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleReset()} />
            </div>

            {/* Password strength hint */}
            {password.length > 0 && (
              <div style={{
                display: "flex", gap: "4px", marginBottom: "18px",
              }}>
                {[1, 2, 3, 4].map((level) => {
                  const strength = password.length >= 12 ? 4 : password.length >= 8 ? 3 : password.length >= 6 ? 2 : 1;
                  const colors = ["#ef4444", "#f97316", "#eab308", "#4ade80"];
                  return (
                    <div key={level} style={{
                      flex: 1, height: "3px", borderRadius: "2px",
                      background: level <= strength ? colors[strength - 1] : "rgba(255,255,255,0.1)",
                      transition: "background 0.3s",
                    }} />
                  );
                })}
                <span style={{
                  fontFamily: "'Jost', sans-serif", fontSize: "11px",
                  color: "rgba(255,255,255,0.3)", marginLeft: "8px", whiteSpace: "nowrap",
                }}>
                  {password.length >= 12 ? "Strong" : password.length >= 8 ? "Good" : password.length >= 6 ? "Weak" : "Too short"}
                </span>
              </div>
            )}

            {error && (
              <div style={{
                background: "rgba(220,60,60,0.1)", border: "1px solid rgba(220,60,60,0.3)",
                borderRadius: "6px", padding: "10px 14px", marginBottom: "16px",
                fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#ff6b6b",
              }}>{error}</div>
            )}

            <button className="auth-btn" onClick={handleReset} disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </button>
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