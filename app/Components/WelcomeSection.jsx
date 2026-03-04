"use client";

// ─── Welcome Section ─────────────────────────────────────────────────
export default function WelcomeSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── PART 1: Welcome to Velyscent ── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "90px 24px",
          overflow: "hidden",
          background: "#0A0806",
        }}
      >
        {/* Background image placeholder */}
        {/*
          Replace the div below with:
          <img
            src="/images/welcome-bg.jpg"
            alt=""
            style={{ position:'absolute', inset:0, width:'100%', height:'100%',
                     objectFit:'cover', opacity:0.35, zIndex:0 }}
          />
        */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed rgba(196,145,79,0.2)",
            background: "rgba(196,145,79,0.03)",
          }}
        >
          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "rgba(196,145,79,0.35)",
              textTransform: "uppercase",
            }}
          >
            {/* Background Image — replace with your lifestyle/perfume photo */}
          </span>
        </div>

        {/* Dark gradient overlay (same as screenshot) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,8,6,0.72) 0%, rgba(10,8,6,0.55) 50%, rgba(10,8,6,0.80) 100%)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "680px",
            animation: "fadeUp 0.9s ease forwards",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 600,
              color: "#C4914F",
              marginBottom: "28px",
              letterSpacing: "0.01em",
            }}
          >
            Welcome to Velyscent
          </h2>

          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.85,
              letterSpacing: "0.02em",
            }}
          >
            Welcome to Velyscent Perfumes, where the spirit of victory and triumph come alive
            through scents that empower and inspire. Our curated collection, aptly named "Victory
            Scented," is a celebration of success and elegance, designed to unleash your victorious
            essence. Indulge in the sweet taste of triumph with captivating fragrances that tell the
            tale of your achievements. At Velyscent, we believe that every victory deserves a
            signature scent, and we are dedicated to providing unforgettable fragrances that
            elevate your spirit and empower your journey.
          </p>
        </div>
      </section>
    </>
  );
}