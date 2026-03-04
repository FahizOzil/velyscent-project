"use client";
import { useState } from "react";

// ─── Shop Featured Offer Banner ───────────────────────────────────────
export default function ShopOfferBanner() {
  const [btnHov, setBtnHov] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        @media (max-width: 768px) {
          .offer-grid { grid-template-columns: 1fr !important; }
          .offer-image-col { min-height: 300px !important; }
          .offer-text-col  { padding: 40px 28px !important; }
        }
      `}</style>

      <section
        style={{
          width: "100%",
          background: "#0A0806",
          padding: "0 0 0",
        }}
      >
        <div
          className="offer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "420px",
            overflow: "hidden",
          }}
        >
          {/* ── Left: Product Image ── */}
          <div
            className="offer-image-col"
            style={{
              position: "relative",
              minHeight: "420px",
              overflow: "hidden",
            }}
          >
            {/*
              Replace placeholder with:
              <img
                src="/images/shop/aqua-serenity-banner.jpg"
                alt="Aqua Serenity Perfume"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 40% 60%, rgba(0,140,160,0.18) 0%, rgba(10,8,6,0.95) 70%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed rgba(0,180,200,0.2)",
                gap: "10px",
              }}
            >
              <svg width="40" height="40" fill="none" stroke="rgba(0,180,200,0.35)"
                strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "rgba(0,180,200,0.4)",
                textTransform: "uppercase",
              }}>
                Aqua Serenity Product Photo
              </span>
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "10px",
                color: "rgba(0,180,200,0.25)",
              }}>
                {/* Replace with your bottle + water/teal background image */}
              </span>
            </div>

            {/* Teal atmospheric glow overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 35% 55%, rgba(0,160,180,0.12) 0%, transparent 65%)",
              pointerEvents: "none",
            }} />

            {/* Right-side fade into dark */}
            <div style={{
              position: "absolute",
              top: 0, right: 0, bottom: 0,
              width: "40%",
              background:
                "linear-gradient(to right, transparent 0%, rgba(10,8,6,0.85) 100%)",
              pointerEvents: "none",
            }} />
          </div>

          {/* ── Right: Text content ── */}
          <div
            className="offer-text-col"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "56px 56px 56px 48px",
              background: "#0D0B09",
              animation: "fadeSlideRight 0.9s ease forwards",
            }}
          >
            {/* Limited time offer label */}
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "clamp(16px, 2vw, 22px)",
                fontWeight: 400,
                color: "#FFFFFF",
                lineHeight: 1.45,
                marginBottom: "36px",
                letterSpacing: "0.01em",
              }}
            >
              Limited Time Offer: <span style={{ color: "#C4914F", fontWeight: 600 }}>20% OFF</span>
              <br />on Aqua Serenity Perfume!
            </p>

            {/* Divider */}
            <div style={{
              width: "48px",
              height: "1px",
              background: "linear-gradient(to right, #C4914F, transparent)",
              marginBottom: "28px",
            }} />

            {/* Product name */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(22px, 2.8vw, 34px)",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "8px",
                letterSpacing: "0.01em",
                lineHeight: 1.2,
              }}
            >
              Aqua Serenity
            </h2>

            {/* Tagline in teal (matching the screenshot accent) */}
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                color: "#2BBFD4",
                marginBottom: "20px",
                letterSpacing: "0.03em",
              }}
            >
              Embrace the Tranquil Tides
            </p>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "13.5px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
                marginBottom: "36px",
                maxWidth: "380px",
              }}
            >
              Immerse yourself in the calming embrace of Aqua Serenity, a captivating fragrance
              that evokes the essence of water.
            </p>

            {/* CTA */}
            <div>
              <a
                href="#"
                onMouseEnter={() => setBtnHov(true)}
                onMouseLeave={() => setBtnHov(false)}
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  border: btnHov
                    ? "1px solid #C4914F"
                    : "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "4px",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: btnHov ? "#C4914F" : "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  background: btnHov ? "rgba(196,145,79,0.08)" : "transparent",
                  transition: "all 0.25s ease",
                }}
              >
                Know More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}