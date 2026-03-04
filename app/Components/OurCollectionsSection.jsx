"use client";
import { useState } from "react";

const collections = [
  {
    id: 1,
    name: "Designer Delights Collection",
    gridArea: "a",
    // img: "/images/collections/designer-delights.jpg",
  },
  {
    id: 2,
    name: "Travel Essentials Collection",
    gridArea: "b",
    // img: "/images/collections/travel-essentials.jpg",
  },
  {
    id: 3,
    name: "Special Occasions Collection",
    gridArea: "c",
    // img: "/images/collections/special-occasions.jpg",
  },
  {
    id: 4,
    name: "Seasonal Sensations Collection",
    gridArea: "d",
    // img: "/images/collections/seasonal-sensations.jpg",
  },
  {
    id: 5,
    name: "Vintage Treasures Collection",
    gridArea: "e",
    // img: "/images/collections/vintage-treasures.jpg",
  },
  {
    id: 6,
    name: "Limited Edition Treasures",
    gridArea: "f",
    // img: "/images/collections/limited-edition.jpg",
  },
  {
    id: 7,
    name: "Modern Classics Collection",
    gridArea: "g",
    // img: "/images/collections/modern-classics.jpg",
  },
];

// ─── Collection Card ──────────────────────────────────────────────────
function CollectionCard({ item, height }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height: height || "220px",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        background: "#141210",
      }}
    >
      {/*
        Replace the placeholder below with:
        <img
          src={item.img}
          alt={item.name}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%',
                   objectFit:'cover', transition:'transform 0.5s ease',
                   transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
      */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed rgba(196,145,79,0.2)",
          background: `rgba(196,145,79,0.03)`,
          gap: "8px",
          transition: "transform 0.5s ease",
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}
      >
        <svg width="32" height="32" fill="none" stroke="rgba(196,145,79,0.35)"
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
        }}>
          Collection Image
        </span>
      </div>

      {/* Dark gradient overlay at bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)",
          transition: "background 0.35s ease",
          zIndex: 1,
        }}
      />

      {/* Gold left border on hover */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "3px",
        background: "#C4914F",
        zIndex: 2,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }} />

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: "14px",
          left: "16px",
          right: "16px",
          zIndex: 3,
        }}
      >
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: "#FFFFFF",
            letterSpacing: "0.02em",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {item.name}
        </p>

        {/* Explore arrow — slides in on hover */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "6px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "all 0.3s ease",
        }}>
          <span style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "11px",
            color: "#C4914F",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>Explore</span>
          <svg width="14" height="14" fill="none" stroke="#C4914F"
            strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Our Collections Section ──────────────────────────────────────────
export default function OurCollectionsSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .collections-row-top,
          .collections-row-mid,
          .collections-row-bot { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        style={{
          width: "100%",
          background: "#0A0806",
          padding: "80px 0 96px",
        }}
      >
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 40px" }}>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(26px, 3vw, 40px)",
              fontWeight: 600,
              color: "#C4914F",
              textAlign: "center",
              marginBottom: "40px",
              letterSpacing: "0.01em",
              animation: "fadeUp 0.8s ease forwards",
            }}
          >
            Our Collections
          </h2>

          {/* ── Row 1: 2 equal columns ── */}
          <div
            className="collections-row-top"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <CollectionCard item={collections[0]} height="240px" />
            <CollectionCard item={collections[1]} height="240px" />
          </div>

          {/* ── Row 2: 2 equal columns ── */}
          <div
            className="collections-row-mid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <CollectionCard item={collections[2]} height="240px" />
            <CollectionCard item={collections[3]} height="240px" />
          </div>

          {/* ── Row 3: 3 equal columns ── */}
          <div
            className="collections-row-bot"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
            }}
          >
            <CollectionCard item={collections[4]} height="220px" />
            <CollectionCard item={collections[5]} height="220px" />
            <CollectionCard item={collections[6]} height="220px" />
          </div>

        </div>
      </section>
    </>
  );
}