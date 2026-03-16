"use client";

export default function HeroSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 48px;
        }
        .hero-text    { animation: fadeSlideUp 0.9s ease forwards; }
        .hero-desc    { max-width: 380px; }
        .hero-btns    { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
        .hero-stats   { display: flex; gap: 40px; margin-top: 56px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.08); }
        .hero-eyebrow { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 24px; }
        .hero-image-wrap { position: relative; display: flex; justify-content: center; align-items: center; }
        .hero-ring-1  { position: absolute; width: 420px; height: 420px; border-radius: 50%; border: 1px solid rgba(196,145,79,0.15); }
        .hero-ring-2  { position: absolute; width: 340px; height: 340px; border-radius: 50%; border: 1px solid rgba(196,145,79,0.08); }

        /* Large tablet (769–1024px) */
        @media (max-width: 1024px) {
          .hero-grid   { gap: 32px; }
          .hero-ring-1 { width: 300px; height: 300px; }
          .hero-ring-2 { width: 240px; height: 240px; }
          .hero-placeholder { width: 280px !important; height: 360px !important; }
        }

        /* Tablet & mobile (≤ 768px) */
        @media (max-width: 768px) {
          .hero-grid        { grid-template-columns: 1fr !important; text-align: center; }
          .hero-desc        { max-width: 100%; margin: 0 auto 40px; }
          .hero-btns        { justify-content: center; }
          .hero-stats       { justify-content: center; gap: 28px; }
          .hero-eyebrow     { justify-content: center; }
          .hero-image-wrap  { margin-top: 8px; }
          .hero-ring-1      { width: 260px; height: 260px; }
          .hero-ring-2      { width: 200px; height: 200px; }
          .hero-placeholder { width: 240px !important; height: 300px !important; }
          .scroll-indicator { display: none !important; }
        }

        /* Mobile (≤ 480px) */
        @media (max-width: 480px) {
          .hero-stats       { gap: 16px; flex-wrap: wrap; justify-content: center; }
          .hero-stat        { min-width: 80px; text-align: center; }
          .hero-ring-1      { width: 210px; height: 210px; }
          .hero-ring-2      { width: 160px; height: 160px; }
          .hero-placeholder { width: 190px !important; height: 240px !important; }
        }
      `}</style>

      <section style={{
        position: "relative",
        minHeight: "100vh",
        background: "#0A0806",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}>

        {/* Radial glow */}
        <div style={{
          position: "absolute", right: "8%", top: "50%",
          transform: "translateY(-50%)",
          width: "520px", height: "520px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,145,79,0.18) 0%, rgba(196,145,79,0.06) 45%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Grain overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
          pointerEvents: "none", opacity: 0.4,
        }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: "1280px", width: "100%",
          margin: "0 auto",
          padding: "clamp(88px, 10vw, 108px) clamp(20px, 5vw, 48px) 48px",
        }}>
          <div className="hero-grid">

            {/* ── Text ── */}
            <div className="hero-text">

              <div className="hero-eyebrow">
                <span style={{ display: "block", width: "32px", height: "1px", background: "#C4914F" }} />
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: "#C4914F", textTransform: "uppercase", fontWeight: 500 }}>
                  Premium Collection
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: "clamp(28px, 4.5vw, 58px)",
                fontWeight: 700, color: "#FFFFFF",
                lineHeight: 1.18, margin: "0 0 20px",
                letterSpacing: "-0.01em",
              }}>
                Elevate Your Spirit with
                <br />
                <span style={{ color: "#C4914F" }}>Victory Scented</span> Fragrances!
              </h1>

              <p className="hero-desc" style={{
                fontFamily: "'Jost',sans-serif",
                fontSize: "clamp(13px, 1.5vw, 15px)",
                color: "rgba(255,255,255,0.58)",
                lineHeight: 1.7, margin: "0 0 40px", fontWeight: 300,
              }}>
                Shop now and embrace the sweet smell of victory with Velyscent.
              </p>

              <div className="hero-btns">
                <a href="/shop" style={{
                  display: "inline-block", background: "#C4914F", color: "#fff",
                  fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  textDecoration: "none", padding: "14px 32px", borderRadius: "4px",
                  transition: "background 0.25s, transform 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#b07d3f"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#C4914F"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Shop Now
                </a>

                <a href="/shop" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500,
                  color: "rgba(255,255,255,0.65)", textDecoration: "none",
                  letterSpacing: "0.06em", transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}
                >
                  Explore Collection
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Stats */}
              <div className="hero-stats">
                {[
                  { num: "200+", label: "Unique Scents" },
                  { num: "50K+", label: "Happy Customers" },
                  { num: "15+",  label: "Awards Won" },
                ].map((s) => (
                  <div key={s.label} className="hero-stat">
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 700, color: "#C4914F", lineHeight: 1, marginBottom: "4px" }}>
                      {s.num}
                    </div>
                    <div style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Image ── */}
            <div className="hero-image-wrap">
              <div className="hero-ring-1" />
              <div className="hero-ring-2" />

              {/*
                Replace with your actual image:
                <img
                  src="/images/hero-bottle.png"
                  alt="Velyscent Perfume Bottle"
                  style={{ width: "100%", maxWidth: "460px", position: "relative", zIndex: 2,
                           filter: "drop-shadow(0 40px 80px rgba(196,145,79,0.35))" }}
                />
              */}
              <div className="hero-placeholder" style={{
                width: "380px", height: "460px",
                position: "relative", zIndex: 2,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                border: "2px dashed rgba(196,145,79,0.3)", borderRadius: "12px",
                background: "rgba(196,145,79,0.04)",
                color: "rgba(196,145,79,0.5)",
                fontFamily: "'Jost',sans-serif", fontSize: "13px",
                letterSpacing: "0.08em", gap: "10px",
              }}>
                <svg width="40" height="40" fill="none" stroke="rgba(196,145,79,0.5)" strokeWidth="1.2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                HERO BOTTLE IMAGE
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator — hidden on mobile */}
        <div className="scroll-indicator" style={{
          position: "absolute", bottom: "32px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "8px",
          animation: "bounce 2s infinite",
        }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
            Scroll
          </span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(196,145,79,0.8), transparent)" }} />
        </div>

      </section>
    </>
  );
}