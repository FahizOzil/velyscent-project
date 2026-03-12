// app/admin/layout.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth as useAuthContext } from "@/context/AuthContext";

const NAV = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/>
        <line x1="9" y1="16" x2="13" y2="16"/>
      </svg>
    ),
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    href: "/admin/customers",
    label: "Customers",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

export default function AdminLayout({ children }) {
  const { user, loading, signOut } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/signin"); return; }
    const role = user.user_metadata?.role;
    if (role !== "admin") { router.replace("/"); return; }
    setChecking(false);
  }, [user, loading]);

  if (checking) {
    return (
      <div style={{ background: "#0A0806", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid rgba(196,145,79,0.2)", borderTopColor: "#C4914F", animation: "spin 0.7s linear infinite" }}/>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-link { transition: all 0.2s; }
        .nav-link:hover { background: rgba(196,145,79,0.08) !important; color: #C4914F !important; }
        .nav-link:hover svg { stroke: #C4914F !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: "#0A0806" }}>

        {/* ── Sidebar ── */}
        <aside style={{
          width: "220px", flexShrink: 0,
          background: "#0e0c0a",
          borderRight: "1px solid rgba(196,145,79,0.12)",
          display: "flex", flexDirection: "column",
          position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50,
        }}>
          {/* Logo */}
          <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(196,145,79,0.1)" }}>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "18px", fontWeight: 600, color: "#C4914F", letterSpacing: "0.04em" }}>
              Velyscent
            </p>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "10px", fontWeight: 500, color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "2px" }}>
              Admin Panel
            </p>
          </div>

          {/* Nav */}
          <nav style={{ padding: "16px 12px", flex: 1 }}>
            {NAV.map((item) => {
              const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href} className="nav-link" style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "6px", marginBottom: "4px",
                  textDecoration: "none", fontFamily: "'Jost',sans-serif",
                  fontSize: "13px", fontWeight: active ? 500 : 400,
                  color: active ? "#C4914F" : "rgba(255,255,255,0.6)",
                  background: active ? "rgba(196,145,79,0.1)" : "transparent",
                  border: active ? "1px solid rgba(196,145,79,0.2)" : "1px solid transparent",
                }}>
                  <span style={{ color: active ? "#C4914F" : "rgba(255,255,255,0.5)", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer: user info + sign out */}
          <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(196,145,79,0.1)" }}>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.email}
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <Link href="/" style={{
                flex: 1, padding: "7px", textAlign: "center",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "5px", fontFamily: "'Jost',sans-serif",
                fontSize: "11px", color: "rgba(255,255,255,0.5)", textDecoration: "none",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(196,145,79,0.3)"; e.currentTarget.style.color = "#C4914F"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
              >
                ← Site
              </Link>
              <button onClick={signOut} style={{
                flex: 1, padding: "7px",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "5px", fontFamily: "'Jost',sans-serif",
                fontSize: "11px", color: "rgba(255,255,255,0.5)", cursor: "pointer",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(196,145,79,0.3)"; e.currentTarget.style.color = "#C4914F"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
              >
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main style={{ marginLeft: "220px", flex: 1, padding: "32px", minHeight: "100vh" }}>
          {children}
        </main>

      </div>
    </>
  );
}