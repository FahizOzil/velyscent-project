"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// ─── Section Card ─────────────────────────────────────────────────────
function Card({ title, subtitle, children }) {
  return (
    <div style={{
      background: "#111009",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "10px", padding: "28px",
      marginBottom: "20px",
    }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "17px", fontWeight: 600, color: "#FFFFFF",
          marginBottom: "4px",
        }}>{title}</h2>
        {subtitle && (
          <p style={{
            fontFamily: "'Jost', sans-serif", fontSize: "12px",
            fontWeight: 300, color: "rgba(255,255,255,0.35)",
          }}>{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────
function Field({ label, type = "text", value, onChange, placeholder, disabled }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{
        fontFamily: "'Jost', sans-serif", fontSize: "11px",
        fontWeight: 500, color: "rgba(255,255,255,0.4)",
        letterSpacing: "0.08em", textTransform: "uppercase",
        display: "block", marginBottom: "8px",
      }}>{label}</label>
      <input
        type={type} value={value} onChange={onChange}
        placeholder={placeholder} disabled={disabled}
        style={{
          width: "100%", background: disabled ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "6px", padding: "12px 14px",
          color: disabled ? "rgba(255,255,255,0.3)" : "#fff",
          fontFamily: "'Jost', sans-serif", fontSize: "14px",
          outline: "none", transition: "border-color 0.2s",
          cursor: disabled ? "not-allowed" : "text",
          boxSizing: "border-box",
        }}
        onFocus={(e) => { if (!disabled) e.target.style.borderColor = "rgba(196,145,79,0.6)"; }}
        onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
      />
    </div>
  );
}

// ─── Save Button ──────────────────────────────────────────────────────
function SaveBtn({ loading, saved, onClick, label = "Save Changes" }) {
  return (
    <button onClick={onClick} disabled={loading} style={{
      padding: "11px 28px",
      background: saved ? "rgba(34,197,94,0.15)" : "#C4914F",
      border: saved ? "1px solid rgba(34,197,94,0.4)" : "none",
      borderRadius: "6px", color: saved ? "#4ade80" : "#fff",
      fontFamily: "'Jost', sans-serif", fontSize: "13px",
      fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.6 : 1, transition: "all 0.25s",
      display: "flex", alignItems: "center", gap: "8px",
    }}
      onMouseEnter={(e) => { if (!loading && !saved) e.currentTarget.style.background = "#b07d3f"; }}
      onMouseLeave={(e) => { if (!loading && !saved) e.currentTarget.style.background = "#C4914F"; }}
    >
      {saved ? (
        <>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Saved!
        </>
      ) : loading ? "Saving..." : label}
    </button>
  );
}

// ─── Alert ────────────────────────────────────────────────────────────
function Alert({ type, msg }) {
  if (!msg) return null;
  const isErr = type === "error";
  return (
    <div style={{
      padding: "10px 14px", borderRadius: "6px", marginBottom: "16px",
      background: isErr ? "rgba(220,60,60,0.1)" : "rgba(34,197,94,0.1)",
      border: `1px solid ${isErr ? "rgba(220,60,60,0.3)" : "rgba(34,197,94,0.3)"}`,
      fontFamily: "'Jost', sans-serif", fontSize: "13px",
      color: isErr ? "#ff6b6b" : "#4ade80",
    }}>
      {msg}
    </div>
  );
}

// ─── Account Page ─────────────────────────────────────────────────────
export default function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Profile state
  const [fullName, setFullName]   = useState("");
  const [phone, setPhone]         = useState("");
  const [profileMsg, setProfileMsg] = useState({ type: "", msg: "" });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSaved, setProfileSaved]     = useState(false);

  // Password state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass]         = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass]       = useState(false);
  const [passMsg, setPassMsg]         = useState({ type: "", msg: "" });
  const [passLoading, setPassLoading] = useState(false);
  const [passSaved, setPassSaved]     = useState(false);

  // Address state
  const [address, setAddress]   = useState("");
  const [city, setCity]         = useState("");
  const [province, setProvince] = useState("");
  const [postal, setPostal]     = useState("");
  const [addrMsg, setAddrMsg]   = useState({ type: "", msg: "" });
  const [addrLoading, setAddrLoading] = useState(false);
  const [addrSaved, setAddrSaved]     = useState(false);

  // Populate from user metadata
  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || "");
      setPhone(user.user_metadata?.phone || "");
      const addr = user.user_metadata?.address || {};
      setAddress(addr.street || "");
      setCity(addr.city || "");
      setProvince(addr.province || "");
      setPostal(addr.postal || "");
    }
  }, [user]);

  // ── Save Profile ──
  const saveProfile = async () => {
    setProfileLoading(true);
    setProfileMsg({ type: "", msg: "" });
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        phone,
      },
    });
    setProfileLoading(false);
    if (error) {
      setProfileMsg({ type: "error", msg: error.message });
    } else {
      setProfileSaved(true);
      setProfileMsg({ type: "success", msg: "" });
      setTimeout(() => setProfileSaved(false), 3000);
    }
  };

  // ── Save Password ──
  const savePassword = async () => {
    setPassMsg({ type: "", msg: "" });
    if (!newPass || newPass.length < 8) {
      setPassMsg({ type: "error", msg: "Password must be at least 8 characters." });
      return;
    }
    if (newPass !== confirmPass) {
      setPassMsg({ type: "error", msg: "Passwords do not match." });
      return;
    }
    setPassLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPass });
    setPassLoading(false);
    if (error) {
      setPassMsg({ type: "error", msg: error.message });
    } else {
      setPassSaved(true);
      setNewPass(""); setConfirmPass(""); setCurrentPass("");
      setPassMsg({ type: "success", msg: "" });
      setTimeout(() => setPassSaved(false), 3000);
    }
  };

  // ── Save Address ──
  const saveAddress = async () => {
    setAddrLoading(true);
    setAddrMsg({ type: "", msg: "" });
    const { error } = await supabase.auth.updateUser({
      data: {
        address: { street: address, city, province, postal },
      },
    });
    setAddrLoading(false);
    if (error) {
      setAddrMsg({ type: "error", msg: error.message });
    } else {
      setAddrSaved(true);
      setAddrMsg({ type: "success", msg: "" });
      setTimeout(() => setAddrSaved(false), 3000);
    }
  };

  // ── Not logged in ──
  if (!authLoading && !user) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0A0806",
        display: "flex", alignItems: "center",
        justifyContent: "center", flexDirection: "column",
        gap: "20px", padding: "40px",
      }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "rgba(255,255,255,0.5)" }}>
          Please sign in to view your account
        </p>
        <Link href="/signin" style={{
          padding: "13px 32px", background: "#C4914F",
          borderRadius: "6px", color: "#fff",
          fontFamily: "'Jost', sans-serif", fontSize: "13px",
          fontWeight: 600, textDecoration: "none", letterSpacing: "0.08em",
        }}>
          Sign In
        </Link>
      </div>
    );
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: rgba(255,255,255,0.2); }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 760px) {
          .account-grid { grid-template-columns: 1fr !important; }
          .field-row { flex-direction: column !important; }
        }
      `}</style>

      <section style={{
        width: "100%", background: "#0A0806",
        minHeight: "100vh", padding: "100px 0 96px",
      }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 40px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
            {["Home", "My Account"].map((crumb, i, arr) => (
              <span key={crumb} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Link href={i === 0 ? "/" : "/account"} style={{
                  fontFamily: "'Jost', sans-serif", fontSize: "12px",
                  color: i === arr.length - 1 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)",
                  textDecoration: "none", transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                  onMouseLeave={(e) => e.currentTarget.style.color = i === arr.length - 1 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)"}
                >
                  {crumb}
                </Link>
                {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>/</span>}
              </span>
            ))}
          </div>

          {/* Page title */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 600,
            color: "#C4914F", marginBottom: "36px",
            animation: "fadeUp 0.8s ease forwards",
          }}>
            My Account
          </h1>

          <div className="account-grid" style={{
            display: "grid", gridTemplateColumns: "240px 1fr", gap: "28px",
            alignItems: "start",
          }}>

            {/* ── Left: Profile summary + quick links ── */}
            <div>
              <div style={{
                background: "#111009",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px", padding: "24px",
                textAlign: "center", marginBottom: "16px",
              }}>
                {/* Avatar */}
                <div style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #C4914F, #8a6535)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 14px",
                }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "24px", fontWeight: 600, color: "#fff",
                  }}>
                    {initials}
                  </span>
                </div>
                <p style={{
                  fontFamily: "'Jost', sans-serif", fontSize: "15px",
                  fontWeight: 500, color: "#FFFFFF", marginBottom: "4px",
                }}>
                  {displayName}
                </p>
                <p style={{
                  fontFamily: "'Jost', sans-serif", fontSize: "12px",
                  fontWeight: 300, color: "rgba(255,255,255,0.35)",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {user?.email}
                </p>
              </div>

              {/* Quick links */}
              <div style={{
                background: "#111009",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px", overflow: "hidden",
              }}>
                {[
                  { label: "My Orders",  href: "/orders",   icon: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" },
                  { label: "Wishlist",   href: "/wishlist",  icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
                  { label: "Shop",       href: "/shop",      icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "13px 18px", textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontFamily: "'Jost', sans-serif", fontSize: "13px",
                    color: "rgba(255,255,255,0.55)", transition: "all 0.15s",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,145,79,0.07)"; e.currentTarget.style.color = "#C4914F"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                  >
                    <svg width="15" height="15" fill="none" stroke="currentColor"
                      strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d={item.icon} />
                    </svg>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Right: Forms ── */}
            <div>

              {/* Profile Info */}
              <Card title="Profile Information" subtitle="Update your name and contact details">
                <Alert {...profileMsg} />
                <div className="field-row" style={{ display: "flex", gap: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <Field label="Full Name" value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Field label="Phone Number" value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XX-XXXXXXX" />
                  </div>
                </div>
                <Field label="Email Address" value={user?.email || ""}
                  disabled placeholder="your@email.com" />
                <p style={{
                  fontFamily: "'Jost', sans-serif", fontSize: "11px",
                  color: "rgba(255,255,255,0.25)", marginBottom: "16px", marginTop: "-8px",
                }}>
                  Email cannot be changed
                </p>
                <SaveBtn loading={profileLoading} saved={profileSaved} onClick={saveProfile} />
              </Card>

              {/* Change Password */}
              <Card title="Change Password" subtitle="Use a strong password of at least 8 characters">
                <Alert {...passMsg} />
                <Field
                  label={`New Password ${showPass ? "" : "●●●●●●●●"}`}
                  type={showPass ? "text" : "password"}
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="New password (min 8 chars)"
                />
                <Field
                  label="Confirm New Password"
                  type={showPass ? "text" : "password"}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirm new password"
                />
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
                }}>
                  <label style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    cursor: "pointer", fontFamily: "'Jost', sans-serif",
                    fontSize: "12px", color: "rgba(255,255,255,0.4)",
                  }}>
                    <input type="checkbox" checked={showPass}
                      onChange={(e) => setShowPass(e.target.checked)}
                      style={{ accentColor: "#C4914F" }} />
                    Show password
                  </label>
                  <SaveBtn loading={passLoading} saved={passSaved}
                    onClick={savePassword} label="Update Password" />
                </div>
              </Card>

              {/* Saved Address */}
              <Card title="Saved Address" subtitle="Your default shipping address">
                <Alert {...addrMsg} />
                <Field label="Street Address" value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House #, Street, Area" />
                <div className="field-row" style={{ display: "flex", gap: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <Field label="City" value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Karachi" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Field label="Province" value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      placeholder="Sindh" />
                  </div>
                </div>
                <Field label="Postal Code" value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                  placeholder="74000" />
                <SaveBtn loading={addrLoading} saved={addrSaved} onClick={saveAddress} />
              </Card>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}