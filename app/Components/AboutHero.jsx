"use client";

// ─── About Us Hero Section ────────────────────────────────────────────
export default function AboutHero() {
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
        paddingTop: "72px", // navbar height offset
      }}>

        {/* Breadcrumb */}
        <div style={{
          maxWidth: "1160px",
          margin: "0 auto",
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          {["Home", "About Us"].map((crumb, i, arr) => (
            <span key={crumb} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <a href={i === 0 ? "/" : "#"} style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "12px",
                color: i === arr.length - 1
                  ? "rgba(255,255,255,0.55)"
                  : "rgba(255,255,255,0.35)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                onMouseLeave={(e) => e.currentTarget.style.color = i === arr.length - 1 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)"}
              >
                {crumb}
              </a>
              {i < arr.length - 1 && (
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>/</span>
              )}
            </span>
          ))}
        </div>

        {/* Hero Banner */}
        <div style={{
          position: "relative",
          width: "100%",
          minHeight: "420px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}>

          {/*
            Replace placeholder with:
            <img
              src="/images/about/about-hero-bg.jpg"
              alt="About Us"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          */}
          {/* Background placeholder */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, #1a1410 0%, #0e0b08 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed rgba(196,145,79,0.1)",
          }}>
            <span style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(196,145,79,0.2)",
              textTransform: "uppercase",
            }}>
              About Us Hero Background — replace with your store/arch interior photo
            </span>
          </div>

          {/* Dark overlay — same deep vignette as screenshot */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(8,6,4,0.72)",
          }} />

          {/* Content */}
          <div style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "80px 40px",
            maxWidth: "640px",
            animation: "fadeUp 0.9s ease forwards",
          }}>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: "28px",
              letterSpacing: "0.01em",
              lineHeight: 1.2,
            }}>
              About Us
            </h1>

            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.85,
              letterSpacing: "0.02em",
            }}>
              At Velyrascent, we believe that perfumes are more than just scents; they are
              expressions of one's individuality and style. Our passion for exquisite fragrances led us
              to curate a collection that captures the essence of diverse personalities, bringing you
              an unparalleled olfactory experience.
            </p>
          </div>
        </div>

      </section>
    </>
  );
}