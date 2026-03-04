"use client";
import { useState } from "react";

// ─── Hero Section ────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#0A0806",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow behind bottle */}
      <div
        style={{
          position: "absolute",
          right: "8%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,145,79,0.18) 0%, rgba(196,145,79,0.06) 45%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle grain texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          opacity: 0.4,
        }}
      />

      {/* Left: Text Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "48px",
          paddingTop: "72px",
        }}
      >
        {/* Text */}
        <div style={{ animation: "fadeSlideUp 0.9s ease forwards" }}>
          {/* Eyebrow label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "32px",
                height: "1px",
                background: "#C4914F",
              }}
            />
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "#C4914F",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Premium Collection
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 4.5vw, 58px)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.18,
              margin: "0 0 20px 0",
              letterSpacing: "-0.01em",
            }}
          >
            Elevate Your Spirit with
            <br />
            <span style={{ color: "#C4914F" }}>Victory Scented</span>{" "}
            Fragrances!
          </h1>

          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.58)",
              lineHeight: 1.7,
              margin: "0 0 40px 0",
              maxWidth: "380px",
              fontWeight: 300,
            }}
          >
            Shop now and embrace the sweet smell of victory
            <br />
            with Velyscent.
          </p>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a
              href="#"
              style={{
                display: "inline-block",
                background: "#C4914F",
                color: "#fff",
                fontFamily: "'Jost', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "14px 32px",
                borderRadius: "4px",
                transition: "background 0.25s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#b07d3f";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#C4914F";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Shop Now
            </a>

            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Jost', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                letterSpacing: "0.06em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C4914F")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.65)")
              }
            >
              Explore Collection
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              marginTop: "56px",
              paddingTop: "32px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              { num: "200+", label: "Unique Scents" },
              { num: "50K+", label: "Happy Customers" },
              { num: "15+", label: "Awards Won" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "26px",
                    fontWeight: 700,
                    color: "#C4914F",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.45)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Bottle Image */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Gold ring decoration */}
          <div
            style={{
              position: "absolute",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              border: "1px solid rgba(196,145,79,0.15)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "340px",
              height: "340px",
              borderRadius: "50%",
              border: "1px solid rgba(196,145,79,0.08)",
            }}
          />

          {/* ── IMAGE PLACEHOLDER ──
              Replace the div below with your <img> tag:
              <img
                src="/images/hero-bottle.png"
                alt="Velyscent Perfume Bottle"
                style={{ width: '100%', maxWidth: '460px', position: 'relative', zIndex: 2,
                         filter: 'drop-shadow(0 40px 80px rgba(196,145,79,0.35))' }}
              />
          */}
          <div
            style={{
              width: "380px",
              height: "460px",
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed rgba(196,145,79,0.3)",
              borderRadius: "12px",
              background: "rgba(196,145,79,0.04)",
              color: "rgba(196,145,79,0.5)",
              fontFamily: "'Jost', sans-serif",
              fontSize: "13px",
              letterSpacing: "0.08em",
              gap: "10px",
            }}
          >
            <svg width="40" height="40" fill="none" stroke="rgba(196,145,79,0.5)" strokeWidth="1.2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            HERO BOTTLE IMAGE
            {/* <span style={{ fontSize: "11px", opacity: 0.6 }}>Replace with your perfume bottle photo</span> */}
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          animation: "bounce 2s infinite",
        }}
      >
        <span
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, rgba(196,145,79,0.8), transparent)",
          }}
        />
      </div>

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

        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          section > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}


export default HeroSection;