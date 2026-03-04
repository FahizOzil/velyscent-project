"use client";
import { useState } from "react";
import Link from "next/link";

// ─── Related Products Data ────────────────────────────────────────────
const relatedProducts = [
  {
    id: 1,
    slug: "luxurious-elixir-rough",
    name: "Luxurious Elixir Rough",
    price: "220.00",
    volume: "100ml",
    // img: "/images/products/elixir-rough.png",
  },
  {
    id: 2,
    slug: "golden-legacy",
    name: "The Golden Legacy",
    price: "160.00",
    volume: "100ml",
    // img: "/images/products/golden-legacy.png",
  },
  {
    id: 3,
    slug: "luxurious-elixir",
    name: "Luxurious Elixir",
    price: "250.00",
    volume: "100ml",
    // img: "/images/products/elixir.png",
  },
  {
    id: 4,
    slug: "luxurious-golden-legacy",
    name: "Luxurious Golden Legacy",
    price: "240.00",
    volume: "100ml",
    // img: "/images/products/golden-legacy-lux.png",
  },
  {
    id: 5,
    slug: "royal-oud",
    name: "Royal Oud",
    price: "310.00",
    volume: "100ml",
    // img: "/images/products/royal-oud.png",
  },
  {
    id: 6,
    slug: "velyscent-noir",
    name: "Velyscent Noir",
    price: "290.00",
    volume: "100ml",
    // img: "/images/products/noir.png",
  },
];

const VISIBLE = 4;

// ─── Product Card ─────────────────────────────────────────────────────
function DiscoverCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        background: hovered ? "#1C1814" : "#131110",
        borderRadius: "8px",
        overflow: "hidden",
        border: hovered
          ? "1px solid rgba(196,145,79,0.3)"
          : "1px solid rgba(255,255,255,0.05)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5)" : "none",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{
        width: "100%",
        aspectRatio: "3 / 4",
        background: "linear-gradient(160deg, #1c1916 0%, #0e0c0a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/*
          Replace with:
          <img
            src={product.img}
            alt={product.name}
            style={{
              width: '75%', height: '85%', objectFit: 'contain',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
              filter: 'drop-shadow(0 8px 32px rgba(196,145,79,0.25))',
            }}
          />
        */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "8px",
          transition: "transform 0.5s ease",
          transform: hovered ? "scale(1.07)" : "scale(1)",
        }}>
          <svg width="32" height="32" fill="none" stroke="rgba(196,145,79,0.3)"
            strokeWidth="1.2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.15em",
            color: "rgba(196,145,79,0.3)",
            textTransform: "uppercase",
          }}>
            Product Image
          </span>
        </div>

        {/* Add to cart on hover */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          padding: "10px",
          background: "linear-gradient(to top, rgba(10,8,6,0.92) 0%, transparent 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s",
        }}>
          <button
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%", padding: "8px",
              background: "#C4914F", border: "none", borderRadius: "4px",
              color: "#fff", fontFamily: "'Jost', sans-serif",
              fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#b07d3f")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#C4914F")}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 14px 16px" }}>
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "13px", fontWeight: 400,
          color: "#FFFFFF",
          marginBottom: "6px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {product.name}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "13px", fontWeight: 500,
            color: "#C4914F",
          }}>
            $ {product.price}
          </span>
          <span style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "11px",
            color: "rgba(255,255,255,0.3)",
          }}>
            {product.volume}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Arrow Button ─────────────────────────────────────────────────────
function ArrowBtn({ direction, onClick, disabled }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "absolute",
        top: "45%",
        transform: "translateY(-50%)",
        [direction === "left" ? "left" : "right"]: "-22px",
        zIndex: 10,
        width: "40px", height: "40px",
        borderRadius: "50%",
        border: "1px solid rgba(196,145,79,0.4)",
        background: hov ? "rgba(196,145,79,0.15)" : "rgba(10,8,6,0.85)",
        color: disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s",
        backdropFilter: "blur(8px)",
      }}
    >
      {direction === "left" ? (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      ) : (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </button>
  );
}

// ─── Discover More Section ────────────────────────────────────────────
export default function DiscoverMore() {
  const [startIndex, setStartIndex] = useState(0);
  const maxIndex = relatedProducts.length - VISIBLE;

  const prev = () => setStartIndex((i) => Math.max(0, i - 1));
  const next = () => setStartIndex((i) => Math.min(maxIndex, i + 1));

  const visible = relatedProducts.slice(startIndex, startIndex + VISIBLE);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .discover-row { flex-wrap: wrap !important; }
          .discover-row a { flex: 0 0 calc(50% - 8px) !important; }
        }
        @media (max-width: 520px) {
          .discover-row a { flex: 0 0 100% !important; }
        }
      `}</style>

      <section style={{
        width: "100%",
        background: "#0A0806",
        padding: "72px 0 96px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px" }}>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(24px, 3vw, 38px)",
            fontWeight: 600,
            color: "#C4914F",
            textAlign: "center",
            marginBottom: "40px",
            letterSpacing: "0.01em",
            animation: "fadeUp 0.8s ease forwards",
          }}>
            Discover More
          </h2>

          {/* Slider */}
          <div style={{ position: "relative" }}>
            <ArrowBtn direction="left" onClick={prev} disabled={startIndex === 0} />

            <div className="discover-row" style={{
              display: "flex",
              gap: "16px",
              overflow: "hidden",
            }}>
              {visible.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  style={{
                    flex: "0 0 calc(25% - 12px)",
                    minWidth: 0,
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  <DiscoverCard product={product} />
                </Link>
              ))}
            </div>

            <ArrowBtn direction="right" onClick={next} disabled={startIndex >= maxIndex} />
          </div>

          {/* Dot indicators */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "32px",
          }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIndex(i)}
                style={{
                  width: i === startIndex ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: i === startIndex ? "#C4914F" : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}