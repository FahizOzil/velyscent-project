"use client";

// ─── Blog Hero Section ────────────────────────────────────────────────
export default function BlogHero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 860px) {
          .blog-hero-grid { grid-template-columns: 1fr !important; }
          .blog-img-grid  { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
        }
      `}</style>

      <section style={{
        width: "100%",
        background: "#0A0806",
        padding: "72px 0 80px",
        marginTop: "72px",
      }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 40px" }}>

          {/* Page Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 600,
            color: "#FFFFFF",
            textAlign: "center",
            marginBottom: "56px",
            letterSpacing: "0.01em",
            animation: "fadeUp 0.8s ease forwards",
          }}>
            Our Blog Collection
          </h1>

          {/* Two-column layout */}
          <div className="blog-hero-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}>

            {/* ── Left: Text ── */}
            <div style={{ animation: "fadeSlideLeft 0.9s ease forwards" }}>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(20px, 2.2vw, 26px)",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "28px",
                letterSpacing: "0.01em",
                lineHeight: 1.3,
              }}>
                Discover the Art of Perfumery
              </h2>

              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.58)",
                lineHeight: 1.85,
                marginBottom: "22px",
              }}>
                Welcome to Velyscent's Perfumery Blog Collection! Here, we invite you to immerse yourself in the
                captivating world of fragrances, where each blog post is a sensory journey that unveils the magic and allure of
                perfumes. Our team of fragrance enthusiasts, industry experts, and perfumers have curated an array of
                captivating articles to enrich your understanding and appreciation for these olfactory delights.
              </p>

              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.58)",
                lineHeight: 1.85,
              }}>
                At Velyscent, we believe that perfumery is an extraordinary fusion of art, science, and emotion. Our
                passion for exquisite fragrances has inspired us to curate a treasure trove of blog posts, each designed to
                ignite your senses and deepen your appreciation for these olfactory wonders.
              </p>
            </div>

            {/* ── Right: Image grid (2x2 asymmetric) ── */}
            <div
              className="blog-img-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "220px 220px",
                gap: "10px",
                animation: "fadeSlideRight 0.9s ease forwards",
              }}
            >
              {/* Top-left: tall image spanning 2 rows */}
              <ImagePlaceholder
                label="Blog Hero Image 1"
                hint="Pink perfume bottle"
                style={{ gridRow: "1 / 3", borderRadius: "8px" }}
              />

              {/* Top-right */}
              <ImagePlaceholder
                label="Blog Hero Image 2"
                hint="Perfume display / artistic"
                style={{ borderRadius: "8px" }}
              />

              {/* Bottom-right */}
              <ImagePlaceholder
                label="Blog Hero Image 3"
                hint="Rose gold bottles / dreamy"
                style={{ borderRadius: "8px" }}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

// ─── Reusable image placeholder ──────────────────────────────────────
function ImagePlaceholder({ label, hint, style = {} }) {
  return (
    <div style={{
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(160deg, #1c1814 0%, #0e0c0a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: "2px dashed rgba(196,145,79,0.2)",
      gap: "8px",
      ...style,
    }}>
      {/*
        Replace with:
        <img
          src="/images/blog/hero-1.jpg"   ← change src per image
          alt={label}
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}
        />
      */}
      <svg width="28" height="28" fill="none" stroke="rgba(196,145,79,0.3)"
        strokeWidth="1.2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: "9px",
        letterSpacing: "0.18em",
        color: "rgba(196,145,79,0.3)",
        textTransform: "uppercase",
        textAlign: "center",
        padding: "0 12px",
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: "9px",
        color: "rgba(196,145,79,0.2)",
        textAlign: "center",
        padding: "0 12px",
      }}>
        {hint}
      </span>

      {/* Subtle gold glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 60%, rgba(196,145,79,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}