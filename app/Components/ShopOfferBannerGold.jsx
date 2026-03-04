"use client";
import { useState } from "react";

// ─── Golden Angel Offer Banner ────────────────────────────────────────
export default function ShopOfferBannerGold() {
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

        @media (max-width: 768px) {
          .gold-offer-grid { grid-template-columns: 1fr !important; }
          .gold-image-col  { min-height: 300px !important; order: -1; }
          .gold-text-col   { padding: 40px 28px !important; }
        }
      `}</style>

      <section style={{ width: "100%", background: "#0A0806" }}>
        <div
          className="gold-offer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "420px",
            overflow: "hidden",
          }}
        >
          {/* ── Left: Text ── */}
          <div
            className="gold-text-col"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "56px 52px 56px 56px",
              background: "#100D0A",
              animation: "fadeSlideLeft 0.9s ease forwards",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle warm radial glow */}
            <div style={{
              position: "absolute",
              top: "50%", left: "-60px",
              transform: "translateY(-50%)",
              width: "320px", height: "320px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(196,145,79,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Offer headline */}
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "clamp(17px, 2vw, 23px)",
              fontWeight: 400,
              color: "#FFFFFF",
              lineHeight: 1.45,
              marginBottom: "36px",
              letterSpacing: "0.01em",
              position: "relative",
            }}>
              Limited Time Offer:{" "}
              <span style={{ color: "#C4914F", fontWeight: 600 }}>25% OFF</span>
              <br />on Golden Angel Perfume!
            </p>

            {/* Gold divider */}
            <div style={{
              width: "48px", height: "1px",
              background: "linear-gradient(to right, #C4914F, transparent)",
              marginBottom: "28px",
            }} />

            {/* Product name */}
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(22px, 2.8vw, 34px)",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "8px",
              letterSpacing: "0.01em",
              lineHeight: 1.2,
              position: "relative",
            }}>
              Golden Angel
            </h2>

            {/* Tagline in gold */}
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "#C4914F",
              marginBottom: "20px",
              letterSpacing: "0.03em",
              position: "relative",
            }}>
              Unleash Your Divine Glow
            </p>

            {/* Description */}
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "13.5px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.75,
              marginBottom: "36px",
              maxWidth: "360px",
              position: "relative",
            }}>
              Indulge in the divine allure of Golden Angel, a fragrance that embodies celestial
              elegance and radiance.
            </p>

            {/* CTA */}
            <div style={{ position: "relative" }}>
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

          {/* ── Right: Image ── */}
          <div
            className="gold-image-col"
            style={{
              position: "relative",
              minHeight: "420px",
              overflow: "hidden",
            }}
          >
            {/*
              Replace placeholder with:
              <img
                src="/images/shop/golden-angel-banner.jpg"
                alt="Golden Angel Perfume"
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
              background:
                "radial-gradient(ellipse at 60% 50%, rgba(196,130,30,0.2) 0%, rgba(10,8,6,0.92) 70%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed rgba(196,145,79,0.2)",
              gap: "10px",
            }}>
              <svg width="40" height="40" fill="none" stroke="rgba(196,145,79,0.35)"
                strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "rgba(196,145,79,0.4)",
                textTransform: "uppercase",
              }}>
                Golden Angel Product Photo
              </span>
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "10px",
                color: "rgba(196,145,79,0.25)",
              }}>
                {/* Replace with angel bottle + golden bokeh background */}
              </span>
            </div>

            {/* Gold atmospheric glow */}
            <div style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 60% 45%, rgba(196,145,79,0.14) 0%, transparent 60%)",
              pointerEvents: "none",
            }} />

            {/* Left fade into text bg */}
            <div style={{
              position: "absolute",
              top: 0, left: 0, bottom: 0,
              width: "35%",
              background:
                "linear-gradient(to left, transparent 0%, rgba(16,13,10,0.9) 100%)",
              pointerEvents: "none",
            }} />
          </div>
        </div>
      </section>
    </>
  );
}