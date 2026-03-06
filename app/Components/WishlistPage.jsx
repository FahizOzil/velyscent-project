"use client";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

// ─── Wishlist Item Card ───────────────────────────────────────────────
function WishlistCard({ item }) {
  const { removeFromWishlist } = useWishlistStore();
  const { addToCart, items: cartItems } = useCartStore();
  const [added, setAdded] = useState(false);

  const inCart = cartItems.some((i) => i.slug === item.slug);

  const handleAddToCart = () => {
    addToCart({
      slug: item.slug,
      name: item.name,
      price: item.price,
      variant: item.volume,
      volume: item.volume,
      qty: 1,
      // img: item.img,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{
      background: "#111009",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "10px",
      overflow: "hidden",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column",
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = "1px solid rgba(196,145,79,0.3)";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <Link href={`/shop/${item.slug}`} style={{ textDecoration: "none" }}>
        <div style={{
          width: "100%", aspectRatio: "3 / 4",
          background: "linear-gradient(160deg, #1c1814 0%, #0e0c0a 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          {/*
            Replace with:
            <img src={item.img} alt={item.name}
              style={{ width:'70%', height:'80%', objectFit:'contain',
                       filter:'drop-shadow(0 8px 24px rgba(196,145,79,0.25))' }} />
          */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <svg width="36" height="36" fill="none" stroke="rgba(196,145,79,0.3)"
              strokeWidth="1.2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <span style={{
              fontFamily: "'Jost', sans-serif", fontSize: "9px",
              letterSpacing: "0.15em", color: "rgba(196,145,79,0.3)",
              textTransform: "uppercase",
            }}>
              Product Image
            </span>
          </div>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 60%, rgba(196,145,79,0.05) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: "16px 16px 20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Link href={`/shop/${item.slug}`} style={{ textDecoration: "none" }}>
          <h3 style={{
            fontFamily: "'Jost', sans-serif", fontSize: "14px",
            fontWeight: 400, color: "#FFFFFF", marginBottom: "6px",
            transition: "color 0.2s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#FFFFFF"}
          >
            {item.name}
          </h3>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <span style={{
            fontFamily: "'Jost', sans-serif", fontSize: "14px",
            fontWeight: 500, color: "#C4914F",
          }}>
            $ {item.price}
          </span>
          <span style={{
            fontFamily: "'Jost', sans-serif", fontSize: "11px",
            color: "rgba(255,255,255,0.3)",
          }}>
            {item.volume}
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
          {/* Add to Cart */}
          <button onClick={handleAddToCart} style={{
            flex: 1, padding: "10px 8px",
            background: added || inCart ? "rgba(196,145,79,0.15)" : "transparent",
            border: "1px solid #C4914F",
            borderRadius: "5px", color: "#C4914F",
            fontFamily: "'Jost', sans-serif", fontSize: "11px",
            fontWeight: 600, letterSpacing: "0.06em",
            textTransform: "uppercase", cursor: "pointer",
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(196,145,79,0.15)"}
            onMouseLeave={(e) => {
              if (!added && !inCart) e.currentTarget.style.background = "transparent";
            }}
          >
            {added ? "✓ Added!" : inCart ? "In Cart" : "Add to Cart"}
          </button>

          {/* Remove from wishlist */}
          <button onClick={() => removeFromWishlist(item.slug)} style={{
            width: "36px", height: "36px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "5px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(255,255,255,0.25)", transition: "all 0.2s",
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,100,100,0.4)";
              e.currentTarget.style.color = "#ff6b6b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "rgba(255,255,255,0.25)";
            }}
            title="Remove from wishlist"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor"
              strokeWidth="1.8" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6M9 6V4h6v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Wishlist Page ────────────────────────────────────────────────────
export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();

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
          .wishlist-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .wishlist-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section style={{
        width: "100%", background: "#0A0806",
        minHeight: "100vh", padding: "100px 0 96px",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
            {["Home", "Wishlist"].map((crumb, i, arr) => (
              <span key={crumb} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Link href={i === 0 ? "/" : "/wishlist"} style={{
                  fontFamily: "'Jost', sans-serif", fontSize: "12px",
                  color: i === arr.length - 1 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)",
                  textDecoration: "none", transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                  onMouseLeave={(e) => e.currentTarget.style.color = i === arr.length - 1 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)"}
                >
                  {crumb}
                </Link>
                {i < arr.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>/</span>
                )}
              </span>
            ))}
          </div>

          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: "40px",
            flexWrap: "wrap", gap: "16px",
            animation: "fadeUp 0.8s ease forwards",
          }}>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600,
              color: "#C4914F", letterSpacing: "0.01em",
            }}>
              My Wishlist{" "}
              {items.length > 0 && (
                <span style={{
                  fontFamily: "'Jost', sans-serif", fontSize: "16px",
                  fontWeight: 400, color: "rgba(255,255,255,0.4)",
                }}>
                  ({items.length} {items.length === 1 ? "item" : "items"})
                </span>
              )}
            </h1>

            {items.length > 0 && (
              <button onClick={clearWishlist} style={{
                background: "none", border: "none",
                fontFamily: "'Jost', sans-serif", fontSize: "12px",
                color: "rgba(255,100,100,0.5)", cursor: "pointer",
                letterSpacing: "0.06em", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#ff6b6b"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,100,100,0.5)"}
              >
                Clear Wishlist
              </button>
            )}
          </div>

          {/* ── Empty state ── */}
          {items.length === 0 && (
            <div style={{
              textAlign: "center", padding: "80px 0",
              animation: "fadeUp 0.8s ease forwards",
            }}>
              <svg width="64" height="64" fill="none" stroke="rgba(196,145,79,0.3)"
                strokeWidth="1.2" viewBox="0 0 24 24" style={{ marginBottom: "20px" }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px", color: "rgba(255,255,255,0.5)",
                marginBottom: "12px",
              }}>
                Your wishlist is empty
              </p>
              <p style={{
                fontFamily: "'Jost', sans-serif", fontSize: "14px",
                fontWeight: 300, color: "rgba(255,255,255,0.3)",
                marginBottom: "32px",
              }}>
                Save your favourite fragrances here
              </p>
              <Link href="/shop" style={{
                padding: "13px 36px", background: "#C4914F",
                border: "none", borderRadius: "6px", color: "#fff",
                fontFamily: "'Jost', sans-serif", fontSize: "13px",
                fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", textDecoration: "none",
                transition: "all 0.25s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#b07d3f"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#C4914F"}
              >
                Explore Products
              </Link>
            </div>
          )}

          {/* ── Wishlist Grid ── */}
          {items.length > 0 && (
            <>
              <div className="wishlist-grid" style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                marginBottom: "48px",
              }}>
                {items.map((item) => (
                  <WishlistCard key={item.slug} item={item} />
                ))}
              </div>

              {/* Bottom CTA */}
              <div style={{
                display: "flex", justifyContent: "center", gap: "16px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                flexWrap: "wrap",
              }}>
                <Link href="/shop" style={{
                  padding: "13px 32px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "6px", color: "rgba(255,255,255,0.65)",
                  fontFamily: "'Jost', sans-serif", fontSize: "13px",
                  fontWeight: 500, letterSpacing: "0.06em",
                  textTransform: "uppercase", textDecoration: "none",
                  transition: "all 0.25s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C4914F"; e.currentTarget.style.color = "#C4914F"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                >
                  Continue Shopping
                </Link>
                <Link href="/cart" style={{
                  padding: "13px 32px", background: "#C4914F",
                  border: "1px solid #C4914F", borderRadius: "6px",
                  color: "#fff", fontFamily: "'Jost', sans-serif",
                  fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em",
                  textTransform: "uppercase", textDecoration: "none",
                  transition: "all 0.25s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#b07d3f"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#C4914F"}
                >
                  View Cart
                </Link>
              </div>
            </>
          )}

        </div>
      </section>
    </>
  );
}