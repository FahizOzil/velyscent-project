"use client";

// ─── Our Story Section ────────────────────────────────────────────────
export default function AboutStory() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section style={{
        width: "100%",
        background: "#0A0806",
      }}>

        {/* ── Top: Text block ── */}
        <div style={{
          maxWidth: "640px",
          margin: "0 auto",
          padding: "72px 40px 56px",
          textAlign: "center",
          animation: "fadeUp 0.9s ease forwards",
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            color: "#C4914F",
            marginBottom: "24px",
            letterSpacing: "0.01em",
          }}>
            Our Story
          </h2>

          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "14.5px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.62)",
            lineHeight: 1.9,
            letterSpacing: "0.02em",
          }}>
            Velyscent was founded by a group of perfume enthusiasts with a shared vision to
            create a haven for perfume lovers seeking authentic, locally-inspired fragrances. Inspired by
            the diversity and richness of cultures around the world, we set out on a journey to curate a
            collection of scents that capture the essence of each region. Our aim is to bring you closer
            to the heart and soul of different cultures through the art of perfumery.
          </p>
        </div>

        {/* ── Bottom: Full-width image ── */}
        <div style={{
          width: "100%",
          height: "420px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/*
            Replace placeholder with:
            <img
              src="/images/about/our-story.jpg"
              alt="Our Story — Velyscent perfume shelves"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 60%',
              }}
            />
          */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, #2a1e12 0%, #0e0b08 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed rgba(196,145,79,0.15)",
            gap: "10px",
          }}>
            <svg width="40" height="40" fill="none" stroke="rgba(196,145,79,0.3)"
              strokeWidth="1.2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <span style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "rgba(196,145,79,0.35)",
              textTransform: "uppercase",
            }}>
              Our Story Image
            </span>
            <span style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10px",
              color: "rgba(196,145,79,0.2)",
              letterSpacing: "0.05em",
            }}>
              Replace with your perfume shelf / store interior photo
            </span>
          </div>

          {/* Top fade — blends into dark bg above */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "80px",
            background: "linear-gradient(to bottom, #0A0806 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }} />

          {/* Bottom fade */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "80px",
            background: "linear-gradient(to top, #0A0806 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }} />
        </div>

      </section>
    </>
  );
}