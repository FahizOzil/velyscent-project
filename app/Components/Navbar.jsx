"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useSearchStore } from "@/store/searchStore";

// ─── Icons ────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const UserIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const HeartIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const BagIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Nav Links ────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Shop",     href: "/shop" },
  { label: "About us", href: "/about" },
  { label: "Blog",     href: "/blog" },
];

// ─── Navbar ───────────────────────────────────────────────────────────
export default function Navbar() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen]         = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);
  const userDropRef = useRef(null);

  const { items: wishlistItems } = useWishlistStore();
  const wishlistCount = wishlistItems.length;

  const { items } = useCartStore();
  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);

  const { openSearch } = useSearchStore();

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (userDropRef.current && !userDropRef.current.contains(e.target)) {
        setUserDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserDropOpen(false);
    setMenuOpen(false);
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Account";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Jost:wght@300;400;500&display=swap');

        .nav-link:hover     { color: #C4914F !important; }
        .nav-icon-btn:hover { color: #C4914F !important; }

        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .desktop-only { display: flex !important; }
        .mobile-only  { display: none  !important; }

        /* Tablet */
        @media (max-width: 1024px) {
          .nav-desktop-links { display: none !important; }
          .user-name         { display: none !important; }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .desktop-only  { display: none !important; }
          .mobile-only   { display: flex !important; }
          .nav-bar-pad   { padding: 0 20px !important; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .mobile-only   { display: none  !important; }
          .desktop-only  { display: flex  !important; }
          .nav-bar-pad   { padding: 0 32px !important; }
          /* Show hamburger on tablet too */
          .tablet-menu   { display: flex  !important; }
        }

        @media (min-width: 1025px) {
          .tablet-menu   { display: none  !important; }
          .nav-bar-pad   { padding: 0 48px !important; }
        }
      `}</style>

      {/* ── Navbar bar ── */}
      <nav className="nav-bar-pad" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "72px",
        background: "rgba(10,8,6,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(196,145,79,0.12)",
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <img src="/main-logo.png" alt="Velyscent" style={{ height: "60px", display: "block" }} />
        </Link>

        {/* Desktop Nav Links — hidden on tablet & mobile */}
        <ul className="nav-desktop-links" style={{
          display: "flex", gap: "36px",
          listStyle: "none", margin: 0, padding: 0,
        }}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="nav-link" style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "14px", fontWeight: 400,
                color: "rgba(255,255,255,0.72)",
                textDecoration: "none",
                letterSpacing: "0.03em",
                transition: "color 0.2s",
              }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>

          {/* Search */}
          <button className="nav-icon-btn" onClick={openSearch} style={{
            background: "none", border: "none",
            color: "rgba(255,255,255,0.8)", cursor: "pointer",
            padding: "4px", display: "flex", alignItems: "center",
            transition: "color 0.2s",
          }}>
            <SearchIcon />
          </button>

          {/* User dropdown — desktop only */}
          <div ref={userDropRef} style={{ position: "relative" }} className="desktop-only">
            {user ? (
              <button onClick={() => setUserDropOpen(!userDropOpen)} style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "none", border: "none", cursor: "pointer", padding: "4px",
              }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #C4914F, #8a6535)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: 600, color: "#fff" }}>
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="user-name" style={{
                  fontFamily: "'Jost',sans-serif", fontSize: "13px",
                  fontWeight: 400, color: "rgba(255,255,255,0.7)",
                }}>
                  {displayName}
                </span>
              </button>
            ) : (
              <Link href="/signin" className="nav-icon-btn" style={{
                background: "none", border: "none",
                color: "rgba(255,255,255,0.8)", cursor: "pointer",
                padding: "4px", display: "flex", alignItems: "center",
                transition: "color 0.2s", textDecoration: "none",
              }}>
                <UserIcon />
              </Link>
            )}

            {/* Dropdown menu */}
            {user && userDropOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 12px)", right: 0,
                minWidth: "200px", background: "#141210",
                border: "1px solid rgba(196,145,79,0.2)", borderRadius: "8px",
                padding: "8px 0", boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                animation: "dropDown 0.25s ease forwards", zIndex: 200,
              }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "6px" }}>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#fff", marginBottom: "2px" }}>
                    {user.user_metadata?.full_name || "User"}
                  </p>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.email}
                  </p>
                </div>
                {[
                  { label: "My Orders",  href: "/orders" },
                  { label: "Wishlist",   href: "/wishlist" },
                  { label: "My Account", href: "/account" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} style={{
                    display: "block", padding: "10px 16px",
                    fontFamily: "'Jost',sans-serif", fontSize: "13px",
                    color: "rgba(255,255,255,0.65)", textDecoration: "none", transition: "all 0.15s",
                  }}
                    onClick={() => setUserDropOpen(false)}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,145,79,0.08)"; e.currentTarget.style.color = "#C4914F"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "6px", paddingTop: "6px" }}>
                  <button onClick={handleSignOut} style={{
                    display: "block", width: "100%", padding: "10px 16px",
                    background: "none", border: "none", textAlign: "left",
                    fontFamily: "'Jost',sans-serif", fontSize: "13px",
                    color: "rgba(255,100,100,0.7)", cursor: "pointer", transition: "all 0.15s",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,60,60,0.08)"; e.currentTarget.style.color = "#ff6b6b"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,100,100,0.7)"; }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link href="/wishlist" className="nav-icon-btn" style={{
            color: "rgba(255,255,255,0.8)", padding: "4px",
            display: "flex", alignItems: "center",
            transition: "color 0.2s", textDecoration: "none", position: "relative",
          }}>
            <HeartIcon />
            {wishlistCount > 0 && (
              <span style={{
                position: "absolute", top: "-4px", right: "-4px",
                background: "#C4914F", borderRadius: "50%",
                width: "16px", height: "16px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Jost',sans-serif", fontSize: "9px", fontWeight: 600, color: "#fff",
              }}>
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="nav-icon-btn" style={{
            color: "rgba(255,255,255,0.8)", padding: "4px",
            display: "flex", alignItems: "center",
            transition: "color 0.2s", textDecoration: "none", position: "relative",
          }}>
            <BagIcon />
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: "-4px", right: "-4px",
                background: "#C4914F", borderRadius: "50%",
                width: "16px", height: "16px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Jost',sans-serif", fontSize: "9px", fontWeight: 600, color: "#fff",
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger — mobile + tablet */}
          <button
            className="tablet-menu mobile-only"
            onClick={() => setMenuOpen(true)}
            style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,0.8)", cursor: "pointer",
              padding: "4px", display: "none", alignItems: "center",
              transition: "color 0.2s",
            }}
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* ── Backdrop overlay ── */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 150,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(2px)",
            animation: "overlayIn 0.3s ease forwards",
          }}
        />
      )}

      {/* ── Slide-in Drawer ── */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        zIndex: 200,
        width: "min(320px, 85vw)",
        background: "#0e0c0a",
        borderLeft: "1px solid rgba(196,145,79,0.15)",
        display: "flex", flexDirection: "column",
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: menuOpen ? "-20px 0 60px rgba(0,0,0,0.6)" : "none",
        overflowY: "auto",
      }}>

        {/* Drawer header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px", height: "72px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}>
          <img src="/main-logo.png" alt="Velyscent" style={{ height: "52px" }} />
          <button onClick={() => setMenuOpen(false)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.5)", padding: "4px",
            display: "flex", alignItems: "center", transition: "color 0.2s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Main nav links */}
        <div style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 24px",
                fontFamily: "'Jost',sans-serif", fontSize: "15px", fontWeight: 400,
                color: "rgba(255,255,255,0.8)", textDecoration: "none",
                transition: "all 0.2s",
                borderLeft: "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#C4914F";
                e.currentTarget.style.borderLeftColor = "#C4914F";
                e.currentTarget.style.background = "rgba(196,145,79,0.04)";
                e.currentTarget.style.paddingLeft = "28px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                e.currentTarget.style.borderLeftColor = "transparent";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.paddingLeft = "24px";
              }}
            >
              {link.label}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ opacity: 0.3 }}>
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </Link>
          ))}
        </div>

        {/* Account quick links */}
        <div style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          <p style={{ padding: "10px 24px 4px", fontFamily: "'Jost',sans-serif", fontSize: "10px", fontWeight: 500, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Account
          </p>
          {[
            { label: "My Orders",  href: "/orders",
              icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>,
            },
            { label: "Wishlist",   href: "/wishlist",  icon: <HeartIcon /> },
            { label: "My Account", href: "/account",   icon: <UserIcon /> },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 24px",
                fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 400,
                color: "rgba(255,255,255,0.55)", textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#C4914F"; e.currentTarget.style.background = "rgba(196,145,79,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ opacity: 0.6, display: "flex" }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Auth at bottom */}
        <div style={{ padding: "24px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          {user ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, #C4914F, #8a6535)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 600, color: "#fff" }}>
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div style={{ overflow: "hidden", flex: 1 }}>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#fff", marginBottom: "2px" }}>
                    {user.user_metadata?.full_name || "User"}
                  </p>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.email}
                  </p>
                </div>
              </div>
              <button onClick={handleSignOut} style={{
                width: "100%", padding: "11px",
                background: "rgba(220,60,60,0.08)",
                border: "1px solid rgba(220,60,60,0.2)", borderRadius: "6px",
                fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 400,
                color: "rgba(255,100,100,0.8)", cursor: "pointer", transition: "all 0.2s",
              }}>
                Sign Out
              </button>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/signin" onClick={() => setMenuOpen(false)} style={{
                display: "block", padding: "11px", textAlign: "center",
                border: "1px solid rgba(196,145,79,0.4)", borderRadius: "6px",
                fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500,
                color: "#C4914F", textDecoration: "none",
              }}>
                Sign In
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)} style={{
                display: "block", padding: "11px", textAlign: "center",
                background: "#C4914F", borderRadius: "6px",
                fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500,
                color: "#fff", textDecoration: "none",
              }}>
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}