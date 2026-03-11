// app/not-found.jsx  ← Next.js 13+ auto-renders this for 404s

import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatGlow {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50%       { opacity: 0.28; transform: scale(1.06); }
        }
        @keyframes numberFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }

        .btn-primary:hover { background: #b07d3f !important; }
        .btn-ghost:hover   { border-color: #C4914F !important; color: #C4914F !important; }
        .nav-link-404:hover { color: #C4914F !important; }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#0A0806",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", padding: "40px 24px",
        position: "relative", overflow: "hidden",
        textAlign: "center",
      }}>

        {/* ── Background glow ── */}
        <div style={{
          position: "absolute",
          width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,145,79,0.12) 0%, transparent 70%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "floatGlow 5s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* ── 404 number ── */}
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(100px, 20vw, 180px)",
          fontWeight: 700, lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(196,145,79,0.25)",
          letterSpacing: "-0.02em",
          animation: "numberFloat 4s ease-in-out infinite",
          marginBottom: "8px",
          userSelect: "none",
        }}>
          404
        </div>

        {/* ── Gold divider line ── */}
        <div style={{
          width: "60px", height: "1px",
          background: "linear-gradient(90deg, transparent, #C4914F, transparent)",
          margin: "0 auto 28px",
          animation: "fadeUp 0.8s ease 0.2s both",
        }} />

        {/* ── Heading ── */}
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 600,
          color: "#FFFFFF", marginBottom: "14px",
          animation: "fadeUp 0.8s ease 0.3s both",
        }}>
          Page Not Found
        </h1>

        {/* ── Description ── */}
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "15px", fontWeight: 300,
          color: "rgba(255,255,255,0.45)",
          maxWidth: "380px", lineHeight: 1.7,
          marginBottom: "40px",
          animation: "fadeUp 0.8s ease 0.4s both",
        }}>
          The page you're looking for has been moved, removed, or doesn't exist.
        </p>

        {/* ── CTA Buttons ── */}
        <div style={{
          display: "flex", gap: "12px", flexWrap: "wrap",
          justifyContent: "center",
          animation: "fadeUp 0.8s ease 0.5s both",
        }}>
          <Link href="/" className="btn-primary" style={{
            padding: "13px 32px", background: "#C4914F",
            borderRadius: "6px", color: "#fff",
            fontFamily: "'Jost', sans-serif", fontSize: "13px",
            fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", textDecoration: "none",
            transition: "background 0.25s",
          }}>
            Back to Home
          </Link>
          <Link href="/shop" className="btn-ghost" style={{
            padding: "13px 32px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "6px", color: "rgba(255,255,255,0.6)",
            fontFamily: "'Jost', sans-serif", fontSize: "13px",
            fontWeight: 500, letterSpacing: "0.06em",
            textTransform: "uppercase", textDecoration: "none",
            transition: "all 0.25s",
          }}>
            Browse Shop
          </Link>
        </div>

        {/* ── Quick links ── */}
        <div style={{
          display: "flex", gap: "24px", flexWrap: "wrap",
          justifyContent: "center", marginTop: "48px",
          animation: "fadeUp 0.8s ease 0.6s both",
        }}>
          {[
            { label: "Shop",     href: "/shop" },
            { label: "About",    href: "/about" },
            { label: "Blog",     href: "/blog" },
            { label: "Services", href: "/services" },
          ].map((link) => (
            <Link key={link.label} href={link.href} className="nav-link-404" style={{
              fontFamily: "'Jost', sans-serif", fontSize: "12px",
              fontWeight: 400, color: "rgba(255,255,255,0.3)",
              textDecoration: "none", letterSpacing: "0.06em",
              textTransform: "uppercase", transition: "color 0.2s",
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Velyscent brand ── */}
        <div style={{
          position: "absolute", bottom: "32px",
          fontFamily: "'Playfair Display', serif",
          fontSize: "13px", color: "rgba(196,145,79,0.3)",
          letterSpacing: "0.08em",
        }}>
          Velyscent
        </div>

      </div>
    </>
  );
}