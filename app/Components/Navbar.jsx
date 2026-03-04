"use client";
import { useState } from "react";
import Link from "next/link";

// ─── Icon Components ────────────────────────────────────────────────
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
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// ─── Navbar ─────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Shop",     href: "/shop" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog",     href: "/blog" },
];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: "72px",
        background: "rgba(10,8,6,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(196,145,79,0.12)",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "22px",
          fontWeight: 700,
          color: "#C4914F",
          letterSpacing: "0.02em",
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        Velyscent
      </a>

      {/* Desktop Nav Links */}
      <ul
        style={{
          display: "flex",
          gap: "36px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
        className="desktop-nav"
      >
        {navLinks.map((link) => (
  <li key={link.label}>
    <Link
      href={link.href}
      style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: "14px",
        fontWeight: link.label === "Home" ? 500 : 400,
        color: link.label === "Home" ? "#fff" : "rgba(255,255,255,0.72)",
        textDecoration: "none",
        letterSpacing: "0.03em",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.target.style.color = "#C4914F")}
      onMouseLeave={(e) =>
        (e.target.style.color =
          link.label === "Home" ? "#fff" : "rgba(255,255,255,0.72)")
      }
    >
      {link.label}
    </Link>
  </li>
))}
      </ul>

      {/* Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {[SearchIcon, UserIcon, HeartIcon, BagIcon].map((Icon, i) => (
          <button
            key={i}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.8)",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C4914F")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
            }
          >
            <Icon />
          </button>
        ))}

        {/* Mobile menu toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.8)",
            cursor: "pointer",
            display: "none",
          }}
        >
          <MenuIcon />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "72px",
            left: 0,
            right: 0,
            background: "rgba(10,8,6,0.97)",
            borderTop: "1px solid rgba(196,145,79,0.2)",
            padding: "24px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "15px",
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}


export default Navbar;

// ─── Page Export ─────────────────────────────────────────────────────
// export default function HomePage() {
//   return (
   
//   );
// }