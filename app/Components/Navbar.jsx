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
  // { label: "Services", href: "/services" },
  { label: "Blog",     href: "/blog" },
];

// ─── Navbar ───────────────────────────────────────────────────────────
export default function Navbar() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen]       = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);
  const userDropRef = useRef(null);

  const { items: wishlistItems } = useWishlistStore();
const wishlistCount = wishlistItems.length;

  const { items } = useCartStore();
const cartCount = items.reduce((sum, i) => sum + i.qty, 0);

const { openSearch } = useSearchStore();

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
  };

  // Get display name
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Account";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Jost:wght@300;400;500&display=swap');

        .nav-link:hover { color: #C4914F !important; }
        .nav-icon-btn:hover { color: #C4914F !important; }

        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .desktop-nav   { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: "72px",
        background: "rgba(10,8,6,0.88)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(196,145,79,0.12)",
      }}>

        {/* Logo */}
        <Link href="/" style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "22px", fontWeight: 700,
          color: "#C4914F", letterSpacing: "0.02em",
          textDecoration: "none", flexShrink: 0,
        }}>
         <img src="/main-logo.png" alt="Logo" style={{ height: "70px" }}  />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="desktop-nav" style={{
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
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

          {/* Search */}
          <button className="nav-icon-btn" onClick={openSearch} style={{
            background: "none", border: "none",
            color: "rgba(255,255,255,0.8)", cursor: "pointer",
            padding: "4px", display: "flex", alignItems: "center",
            transition: "color 0.2s",
          }}>
            <SearchIcon />
          </button>

          {/* User icon / dropdown */}
          <div ref={userDropRef} style={{ position: "relative" }}>
            {user ? (
              // ── Logged in: show avatar + dropdown ──
              <button
                onClick={() => setUserDropOpen(!userDropOpen)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "none", border: "none", cursor: "pointer",
                  padding: "4px",
                }}
              >
                {/* Avatar circle */}
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #C4914F, #8a6535)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "12px", fontWeight: 600, color: "#fff",
                  }}>
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
                {/* Name — hide on small screens */}
                <span className="desktop-nav" style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "13px", fontWeight: 400,
                  color: "rgba(255,255,255,0.7)",
                }}>
                  {displayName}
                </span>
              </button>
            ) : (
              // ── Logged out: link to signin ──
              <Link href="/signin" className="nav-icon-btn" style={{
                background: "none", border: "none",
                color: "rgba(255,255,255,0.8)", cursor: "pointer",
                padding: "4px", display: "flex", alignItems: "center",
                transition: "color 0.2s", textDecoration: "none",
              }}>
                <UserIcon />
              </Link>
            )}

            {/* User dropdown menu */}
            {user && userDropOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 12px)", right: 0,
                minWidth: "200px",
                background: "#141210",
                border: "1px solid rgba(196,145,79,0.2)",
                borderRadius: "8px",
                padding: "8px 0",
                boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                animation: "dropDown 0.25s ease forwards",
                zIndex: 100,
              }}>
                {/* User info */}
                <div style={{
                  padding: "12px 16px 12px",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  marginBottom: "6px",
                }}>
                  <p style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "13px", fontWeight: 500, color: "#fff",
                    marginBottom: "2px",
                  }}>
                    {user.user_metadata?.full_name || "User"}
                  </p>
                  <p style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "11px", fontWeight: 300,
                    color: "rgba(255,255,255,0.4)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {user.email}
                  </p>
                </div>

                {/* Menu items */}
                {[
                  { label: "My Orders",   href: "/orders" },
                  { label: "Wishlist",    href: "/wishlist" },
                  { label: "My Account",  href: "/account" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} style={{
                    display: "block", padding: "10px 16px",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "13px", fontWeight: 400,
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none", transition: "all 0.15s",
                  }}
                    onClick={() => setUserDropOpen(false)}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,145,79,0.08)"; e.currentTarget.style.color = "#C4914F"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Sign out */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "6px", paddingTop: "6px" }}>
                  <button onClick={handleSignOut} style={{
                    display: "block", width: "100%", padding: "10px 16px",
                    background: "none", border: "none", textAlign: "left",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "13px", fontWeight: 400,
                    color: "rgba(255,100,100,0.7)",
                    cursor: "pointer", transition: "all 0.15s",
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
  background: "none", border: "none",
  color: "rgba(255,255,255,0.8)", cursor: "pointer",
  padding: "4px", display: "flex", alignItems: "center",
  transition: "color 0.2s", textDecoration: "none",
  position: "relative",  // ✅ this one line fixes it
}}>
  <HeartIcon />
  {wishlistCount > 0 && (
    <span style={{
      position: "absolute", top: "-4px", right: "-4px",
      background: "#C4914F", borderRadius: "50%",
      width: "16px", height: "16px",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Jost',sans-serif", fontSize: "9px",
      fontWeight: 600, color: "#fff",
    }}>
      {wishlistCount}
    </span>
  )}
          </Link>

          {/* Cart / Bag */}
          <Link href="/cart" className="nav-icon-btn" style={{
            background: "none", border: "none",
            color: "rgba(255,255,255,0.8)", cursor: "pointer",
            padding: "4px", display: "flex", alignItems: "center",
            transition: "color 0.2s", textDecoration: "none",
            position: "relative",
          }}>
            <BagIcon />
            {/* Cart count badge — wire up with cart state later */}
            {cartCount > 0 && (
              <span style={{
                position:"absolute", top:"-4px", right:"-4px",
                background:"#C4914F", borderRadius:"50%",
                width:"16px", height:"16px",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"'Jost',sans-serif", fontSize:"9px",
                fontWeight:600, color:"#fff",
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,0.8)", cursor: "pointer",
              display: "none", alignItems: "center",
            }}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div style={{
            position: "absolute", top: "72px", left: 0, right: 0,
            background: "rgba(10,8,6,0.97)",
            borderTop: "1px solid rgba(196,145,79,0.2)",
            padding: "24px 32px",
            display: "flex", flexDirection: "column", gap: "4px",
            zIndex: 49,
          }}>
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "15px", fontWeight: 400,
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                transition: "color 0.2s",
              }}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.85)"}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile auth */}
            <div style={{ paddingTop: "16px" }}>
              {user ? (
                <div>
                  <p style={{
                    fontFamily: "'Jost', sans-serif", fontSize: "13px",
                    color: "rgba(255,255,255,0.5)", marginBottom: "12px",
                  }}>
                    Signed in as <strong style={{ color: "#C4914F" }}>{displayName}</strong>
                  </p>
                  <button onClick={handleSignOut} style={{
                    background: "none", border: "1px solid rgba(255,100,100,0.3)",
                    borderRadius: "4px", padding: "8px 16px",
                    fontFamily: "'Jost', sans-serif", fontSize: "12px",
                    color: "rgba(255,100,100,0.7)", cursor: "pointer",
                  }}>
                    Sign Out
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "12px" }}>
                  <Link href="/signin" onClick={() => setMenuOpen(false)} style={{
                    padding: "10px 20px", border: "1px solid #C4914F",
                    borderRadius: "4px", fontFamily: "'Jost', sans-serif",
                    fontSize: "13px", color: "#C4914F", textDecoration: "none",
                  }}>
                    Sign In
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)} style={{
                    padding: "10px 20px", background: "#C4914F",
                    border: "1px solid #C4914F", borderRadius: "4px",
                    fontFamily: "'Jost', sans-serif", fontSize: "13px",
                    color: "#fff", textDecoration: "none",
                  }}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}