"use client";
import { useState } from "react";
import { productsData } from "@/lib/productsData";
import { useCartStore } from "@/store/cartStore";

// ─── Mock product data ────────────────────────────────────────────────
const product = {
  "luxurious-elixir": {
    name: "Luxurious Elixir",
    price: "250.00",
    rating: 5,
    reviews: 80,
    description: "Step into a world of unparalleled opulence...",
    variants: [
      { id: 1, volume: "100 ml" },
      { id: 2, volume: "150 ml" },
    ],
  },
  "golden-legacy": {
    name: "The Golden Legacy",
    price: "160.00",
    rating: 4,
    reviews: 170,
    description: "A timeless classic...",
    variants: [
      { id: 1, volume: "100 ml" },
    ],
  },
  // add new products here anytime ✅
};

// ─── Star Rating ──────────────────────────────────────────────────────
function Stars({ rating, size = 16 }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24"
          fill={s <= rating ? "#C4914F" : "rgba(196,145,79,0.25)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Product Details Top Section ──────────────────────────────────────
export default function ProductDetailsTop({ slug }) {
  const product = productsData[slug]; // ← move to TOP before all hooks


  const { addToCart } = useCartStore();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToBag, setAddedToBag] = useState(false);

   if (!product) return (
    <div style={{
      color: "rgba(255,255,255,0.5)",
      textAlign: "center",
      padding: "120px 0",
      fontFamily: "'Jost', sans-serif",
      fontSize: "16px",
      background: "#0A0806",
      minHeight: "60vh",
    }}>
      Product not found.
    </div>
  );

  const handleAddToBag = () => {
  addToCart({
    slug: slug,
    name: product.name,
    price: product.price,
    volume: product.variants[selectedVariant]?.volume || "100 ml",
    variant: product.variants[selectedVariant]?.volume || "100 ml",
    // img: product.img,
  });
  setAddedToBag(true);
  setTimeout(() => setAddedToBag(false), 2000);
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bagSuccess {
          0%   { transform: scale(1); }
          50%  { transform: scale(0.96); }
          100% { transform: scale(1); }
        }

        .qty-btn:hover { background: rgba(196,145,79,0.15) !important; color: #C4914F !important; }
        .variant-thumb:hover { border-color: rgba(196,145,79,0.5) !important; }

        @media (max-width: 860px) {
          .pdp-grid { grid-template-columns: 1fr !important; }
          .pdp-image-col { min-height: 360px !important; }
        }
      `}</style>

      <section style={{ width: "100%", background: "#0A0806", padding: "28px 0 72px" , marginTop: "72px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "36px" }}>
            {["Home", "Products", product.name].map((crumb, i, arr) => (
              <span key={crumb} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <a href="#" style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "12px",
                  color: i === arr.length - 1 ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                  onMouseLeave={(e) => e.currentTarget.style.color = i === arr.length - 1 ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)"}
                >
                  {crumb}
                </a>
                {i < arr.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>/</span>
                )}
              </span>
            ))}
          </div>

          {/* Main grid */}
          <div className="pdp-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}>

            {/* ── Left: Image gallery ── */}
            <div className="pdp-image-col" style={{ animation: "fadeUp 0.8s ease forwards" }}>
              {/* Main image */}
              <div style={{
                width: "100%",
                aspectRatio: "3 / 4",
                background: "linear-gradient(160deg, #1c1916 0%, #0e0c0a 100%)",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                marginBottom: "16px",
              }}>
                {/*
                  Replace with:
                  <img
                    src={product.mainImages[activeImage]}
                    alt={product.name}
                    style={{ width:'70%', height:'85%', objectFit:'contain',
                             filter:'drop-shadow(0 16px 48px rgba(196,145,79,0.3))' }}
                  />
                */}
                <div style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "10px",
                }}>
                  <svg width="44" height="44" fill="none" stroke="rgba(196,145,79,0.3)"
                    strokeWidth="1.2" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  <span style={{
                    fontFamily: "'Jost', sans-serif", fontSize: "10px",
                    letterSpacing: "0.2em", color: "rgba(196,145,79,0.3)",
                    textTransform: "uppercase",
                  }}>
                    Main Product Image {activeImage + 1}
                  </span>
                </div>

                {/* Glow */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at 50% 70%, rgba(196,145,79,0.08) 0%, transparent 65%)",
                  pointerEvents: "none",
                }} />
              </div>

              {/* Dot indicators */}
              <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                {[0, 1].map((i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    style={{
                      width: i === activeImage ? "20px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background: i === activeImage ? "#C4914F" : "rgba(255,255,255,0.2)",
                      border: "none", cursor: "pointer",
                      transition: "all 0.3s ease", padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ── Right: Product info ── */}
            <div style={{ animation: "fadeUp 0.9s ease forwards", paddingTop: "8px" }}>

              {/* Name */}
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(26px, 3vw, 38px)",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "20px",
                letterSpacing: "0.01em",
                lineHeight: 1.2,
              }}>
                {product.name}
              </h1>

              {/* Description */}
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.58)",
                lineHeight: 1.8,
                marginBottom: "20px",
              }}>
                {product.description}
              </p>

              {/* Rating row */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                <Stars rating={product.rating} />
                <span style={{
                  fontFamily: "'Jost', sans-serif", fontSize: "12px",
                  color: "rgba(255,255,255,0.4)",
                }}>
                  ({product.reviews})
                </span>
                <a href="#reviews" style={{
                  fontFamily: "'Jost', sans-serif", fontSize: "12px",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                >
                  Reviews and Ratings
                </a>
              </div>

              {/* Volume variants */}
              <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    className="variant-thumb"
                    onClick={() => setSelectedVariant(i)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px",
                      background: "transparent",
                      border: selectedVariant === i
                        ? "1px solid #C4914F"
                        : "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                      width: "72px",
                    }}
                  >
                    {/*
                      Replace inner div with:
                      <img src={v.img} alt={v.volume}
                        style={{ width:'44px', height:'52px', objectFit:'contain',
                                 filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }} />
                    */}
                    <div style={{
                      width: "44px", height: "52px",
                      border: "1px dashed rgba(196,145,79,0.25)",
                      borderRadius: "4px",
                      background: "rgba(196,145,79,0.04)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="18" height="18" fill="none" stroke="rgba(196,145,79,0.3)"
                        strokeWidth="1.2" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                    </div>
                    <span style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "11px",
                      color: selectedVariant === i ? "#C4914F" : "rgba(255,255,255,0.5)",
                      transition: "color 0.2s",
                    }}>
                      {v.volume}
                    </span>
                  </button>
                ))}
              </div>

              {/* Price */}
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "26px",
                fontWeight: 600,
                color: "#C4914F",
                marginBottom: "28px",
                letterSpacing: "0.02em",
              }}>
                $ {product.price}
              </p>

              {/* Qty + Wishlist row */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "20px",
              }}>
                <span style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 400,
                }}>Qty</span>

                {/* Qty stepper */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}>
                  <button
                    className="qty-btn"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    style={{
                      width: "36px", height: "36px",
                      background: "transparent",
                      border: "none",
                      borderRight: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "16px",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    −
                  </button>
                  <span style={{
                    width: "40px",
                    textAlign: "center",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#FFFFFF",
                  }}>
                    {qty}
                  </span>
                  <button
                    className="qty-btn"
                    onClick={() => setQty((q) => q + 1)}
                    style={{
                      width: "36px", height: "36px",
                      background: "transparent",
                      border: "none",
                      borderLeft: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "16px",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => setWished(!wished)}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    background: "transparent", border: "none",
                    color: wished ? "#C4914F" : "rgba(255,255,255,0.6)",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "13px", cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                >
                  <span>Wish list</span>
                  <svg width="18" height="18" viewBox="0 0 24 24"
                    fill={wished ? "#C4914F" : "none"}
                    stroke={wished ? "#C4914F" : "rgba(255,255,255,0.6)"}
                    strokeWidth="1.8">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAddToBag}
                style={{
                  width: "100%",
                  padding: "15px",
                  background: addedToBag ? "#8a6535" : "transparent",
                  border: "1px solid #C4914F",
                  borderRadius: "6px",
                  color: addedToBag ? "#fff" : "#C4914F",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  marginBottom: "16px",
                  animation: addedToBag ? "bagSuccess 0.3s ease" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!addedToBag) {
                    e.currentTarget.style.background = "rgba(196,145,79,0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!addedToBag) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {addedToBag ? "✓ Added to Bag!" : "Add to Bag"}
              </button>

              {/* Afterpay */}
              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                {/* Afterpay badge placeholder */}
                <div style={{
                  background: "#B2FCE4",
                  borderRadius: "4px",
                  padding: "3px 8px",
                  display: "flex", alignItems: "center", gap: "2px",
                }}>
                  <span style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#000",
                    letterSpacing: "0.02em",
                  }}>
                    afterpay<span style={{ color: "#B2FCE4", background: "#000", borderRadius: "2px", padding: "0 2px" }}>⚡</span>
                  </span>
                </div>
                <span style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.4)",
                  fontWeight: 300,
                }}>
                  Shop now and pay later with 4 payments
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}