"use client";

// ─── Services Hero Section ────────────────────────────────────────────
export default function ServicesHero() {
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
        paddingTop: "72px",
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
          {["Home", "Services"].map((crumb, i, arr) => (
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
              src="/images/services/services-hero-bg.jpg"
              alt="Our Services"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, #1e1510 0%, #0c0908 100%)",
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
              Services Hero Background — replace with your perfume bottles / store photo
            </span>
          </div>

          {/* Dark overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(8,6,4,0.70)",
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
              fontSize: "clamp(30px, 4vw, 46px)",
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: "28px",
              letterSpacing: "0.01em",
              lineHeight: 1.2,
            }}>
              Our Services
            </h1>

            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.62)",
              lineHeight: 1.85,
              letterSpacing: "0.02em",
            }}>
              At Velyscent, we are dedicated to providing you with a delightful and immersive perfume
              shopping experience. Our services are tailored to ensure that you find the perfect fragrance that
              complements your unique personality and style. We take pride in offering a range of services that
              go beyond just selling perfumes, aiming to make your journey with us truly special.
            </p>
          </div>
        </div>

      </section>
    </>
  );
}