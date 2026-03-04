"use client";
import { useState } from "react";

// ─── Sale Banner Section ──────────────────────────────────────────────
export default function SaleBannerSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 768px) {
          .sale-inner { grid-template-columns: 1fr !important; text-align: center; }
          .sale-image-col { min-height: 280px !important; order: -1; }
        }
      `}</style>

      <section
        style={{
          width: "100%",
          position: "relative",
          overflow: "hidden",
          background: "#0D0B09",
        }}
      >
        {/*
          BACKGROUND IMAGE — Replace div below with:
          <img
            src="/images/sale-banner-bg.jpg"
            alt=""
            style={{ position:'absolute', inset:0, width:'100%', height:'100%',
                     objectFit:'cover', opacity:0.55, zIndex:0 }}
          />
        */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(40,35,28,0.9) 0%, rgba(10,8,6,0.97) 65%)",
          }}
        />
        {/* Placeholder label */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed rgba(196,145,79,0.12)",
        }}>
          <span style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(196,145,79,0.2)",
            textTransform: "uppercase",
          }}>
            {/* Background — Replace with your dark smoky/atmospheric photo */}
          </span>
        </div>

        {/* Subtle left vignette */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to right, rgba(10,8,6,0.75) 0%, rgba(10,8,6,0.2) 50%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* Content grid */}
        <div
          className="sale-inner"
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1160px",
            margin: "0 auto",
            padding: "0 48px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            minHeight: "340px",
          }}
        >
          {/* Left: Text */}
          <div style={{ animation: "fadeSlideLeft 0.85s ease forwards", padding: "60px 0" }}>
            {/* Limited time badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(196,145,79,0.12)",
              border: "1px solid rgba(196,145,79,0.3)",
              borderRadius: "20px",
              padding: "4px 14px",
              marginBottom: "20px",
            }}>
              <span style={{
                width: "6px", height: "6px",
                borderRadius: "50%",
                background: "#C4914F",
                display: "inline-block",
                animation: "pulse 1.8s infinite",
              }} />
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "#C4914F",
                textTransform: "uppercase",
              }}>Limited Time Offer</span>
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.2,
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}
            >
              Perfume Year-End Sale!<br />
              <span style={{ color: "#C4914F" }}>Up to 50% OFF</span>
            </h2>

            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                marginBottom: "32px",
                maxWidth: "380px",
              }}
            >
              Discover an exquisite collection of premium perfumes at
              unbelievable prices during our exclusive Perfume Sale!
            </p>

            <a
              href="#"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                display: "inline-block",
                background: hovered ? "#b07d3f" : "#C4914F",
                color: "#fff",
                fontFamily: "'Jost', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "13px 30px",
                borderRadius: "4px",
                transition: "all 0.25s",
                transform: hovered ? "translateY(-2px)" : "translateY(0)",
                boxShadow: hovered
                  ? "0 8px 24px rgba(196,145,79,0.35)"
                  : "0 4px 12px rgba(196,145,79,0.2)",
              }}
            >
              Know More
            </a>
          </div>

          {/* Right: Bottle image */}
          <div
            className="sale-image-col"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "340px",
              animation: "fadeSlideRight 0.9s ease forwards",
            }}
          >
            {/*
              Replace the placeholder below with:
              <img
                src="/images/sale-bottle.png"
                alt="Sale Perfume Bottle"
                style={{
                  maxHeight: '320px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.7))',
                }}
              />
            */}
            <div style={{
              width: "220px",
              height: "300px",
              border: "2px dashed rgba(196,145,79,0.25)",
              borderRadius: "8px",
              background: "rgba(196,145,79,0.03)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}>
              <svg width="36" height="36" fill="none" stroke="rgba(196,145,79,0.35)"
                strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "rgba(196,145,79,0.35)",
                textTransform: "uppercase",
                textAlign: "center",
                padding: "0 16px",
              }}>
                Sale Bottle Image<br />
                <span style={{ opacity: 0.6, fontSize: "9px" }}>
                  {/* Replace with your product photo */}
                </span>
              </span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50%       { opacity: 0.5; transform: scale(1.4); }
          }
        `}</style>
      </section>
    </>
  );
}