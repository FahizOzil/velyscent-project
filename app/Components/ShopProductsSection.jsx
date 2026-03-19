// ShopProductsSection.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

const PER_PAGE = 12;
const SORT_OPTIONS = ["Best Selling", "Price: Low to High", "Price: High to Low", "Newest", "Top Rated"];

// ─── Star Rating ──────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24"
          fill={s <= rating ? "#C4914F" : "rgba(196,145,79,0.25)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Filter Dropdown ──────────────────────────────────────────────────
function FilterDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: "6px",
        background: open ? "rgba(196,145,79,0.1)" : "rgba(255,255,255,0.04)",
        border: open ? "1px solid rgba(196,145,79,0.4)" : "1px solid rgba(255,255,255,0.1)",
        borderRadius: "6px", padding: "8px 14px",
        color: value ? "#C4914F" : "rgba(255,255,255,0.75)",
        fontFamily: "'Jost',sans-serif", fontSize: "13px",
        cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
      }}>
        {value || label}
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0,
          minWidth: "160px", background: "#1a1714",
          border: "1px solid rgba(196,145,79,0.2)", borderRadius: "6px",
          padding: "6px 0", zIndex: 50, boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
        }}>
          <button onClick={() => { onChange(null); setOpen(false); }} style={{
            display: "block", width: "100%", padding: "9px 16px",
            background: "transparent", border: "none",
            color: "rgba(255,255,255,0.35)", fontFamily: "'Jost',sans-serif",
            fontSize: "12px", textAlign: "left", cursor: "pointer",
          }}>All</button>
          {options.map((opt) => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }} style={{
              display: "block", width: "100%", padding: "9px 16px",
              background: value === opt ? "rgba(196,145,79,0.1)" : "transparent",
              border: "none",
              color: value === opt ? "#C4914F" : "rgba(255,255,255,0.65)",
              fontFamily: "'Jost',sans-serif", fontSize: "13px",
              textAlign: "left", cursor: "pointer", transition: "all 0.15s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,145,79,0.08)"; e.currentTarget.style.color = "#C4914F"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = value === opt ? "rgba(196,145,79,0.1)" : "transparent"; e.currentTarget.style.color = value === opt ? "#C4914F" : "rgba(255,255,255,0.65)"; }}
            >{opt}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────
function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  const { addToCart } = useCartStore();
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const wished = isWishlisted(product.slug);

  const handleAddToCart = (e) => {
    e.preventDefault(); e.stopPropagation();
    addToCart({
      slug:    product.slug,
      name:    product.name,
      price:   String(product.price),
      variant: product.variants?.[0]?.volume || "100ml",
      image:   product.images?.[0] || "",
      qty:     1,
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault(); e.stopPropagation();
    toggleWishlist({
      slug:   product.slug,
      name:   product.name,
      price:  String(product.price),
      image:  product.images?.[0] || "",
      volume: product.variants?.[0]?.volume || "100ml",
    });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#1C1814" : "#131110",
        borderRadius: "8px", overflow: "hidden",
        border: hovered ? "1px solid rgba(196,145,79,0.3)" : "1px solid rgba(255,255,255,0.05)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5)" : "none",
        cursor: "pointer", position: "relative",
      }}
    >
      {/* Wishlist btn */}
      <button onClick={handleWishlist} style={{
        position: "absolute", top: "10px", right: "10px", zIndex: 3,
        background: "rgba(10,8,6,0.7)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "50%", width: "30px", height: "30px",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", opacity: hovered || wished ? 1 : 0, transition: "opacity 0.2s",
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24"
          fill={wished ? "#C4914F" : "none"}
          stroke={wished ? "#C4914F" : "rgba(255,255,255,0.7)"} strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Image */}
      <div style={{
        width: "100%", aspectRatio: "1 / 1.1",
        background: "linear-gradient(160deg, #1c1916 0%, #0e0c0a 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} style={{
            width: "70%", height: "80%", objectFit: "contain",
            transition: "transform 0.5s", transform: hovered ? "scale(1.07)" : "scale(1)",
            filter: "drop-shadow(0 8px 24px rgba(196,145,79,0.2))",
          }} />
        ) : (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
            transition: "transform 0.5s", transform: hovered ? "scale(1.07)" : "scale(1)",
          }}>
            <svg width="28" height="28" fill="none" stroke="rgba(196,145,79,0.3)" strokeWidth="1.2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(196,145,79,0.3)", textTransform: "uppercase" }}>
              Product Image
            </span>
          </div>
        )}

        {/* Add to cart overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px",
          background: "linear-gradient(to top, rgba(10,8,6,0.92) 0%, transparent 100%)",
          opacity: hovered ? 1 : 0, transition: "opacity 0.25s",
        }}>
          <button onClick={handleAddToCart} style={{
            width: "100%", padding: "8px", background: "#C4914F",
            border: "none", borderRadius: "4px", color: "#fff",
            fontFamily: "'Jost',sans-serif", fontSize: "10px",
            fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", cursor: "pointer",
          }}>Add to Cart</button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "12px 14px 16px" }}>
        <p style={{
          fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 400,
          color: "#FFFFFF", marginBottom: "6px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {product.name}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
          <Stars rating={Math.round(product.rating || 5)} />
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>
            ({product.review_count || 0})
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#C4914F" }}>
            PKR {parseFloat(product.price).toLocaleString()}
          </span>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
            {product.variants?.[0]?.volume || "100ml"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Shop Products Section ────────────────────────────────────────────
export default function ShopProductsSection({ products = [], categories = [] }) {
  const [currentPage, setCurrentPage]       = useState(1);
  const [filterCategory, setFilterCategory] = useState(null);
  const [sortBy, setSortBy]                 = useState(null);

  let filtered = filterCategory
    ? products.filter((p) => p.category === filterCategory)
    : products;

  if (sortBy === "Price: Low to High")  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "Price: High to Low")  filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "Top Rated")           filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  if (sortBy === "Best Selling")        filtered = [...filtered].sort((a, b) => (b.review_count || 0) - (a.review_count || 0));

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 900px) { .products-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .products-grid { grid-template-columns: 1fr !important; } .filter-bar { flex-wrap: wrap !important; gap: 8px !important; } }
      `}</style>

      <section style={{ width: "100%", background: "#0A0806", minHeight: "100vh", padding: "32px 0 80px", marginTop: "72px" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 40px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "28px" }}>
            {["Home", "Products"].map((crumb, i, arr) => (
              <span key={crumb} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Link href={i === 0 ? "/" : "/shop"} style={{
                  fontFamily: "'Jost',sans-serif", fontSize: "12px",
                  color: i === arr.length - 1 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.4)",
                  textDecoration: "none", transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                  onMouseLeave={(e) => e.currentTarget.style.color = i === arr.length - 1 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.4)"}
                >{crumb}</Link>
                {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>/</span>}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "clamp(26px,3vw,38px)", fontWeight: 600,
            color: "#C4914F", textAlign: "center", marginBottom: "36px",
          }}>
            Our Collection{" "}
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "16px", fontWeight: 300, color: "rgba(255,255,255,0.3)" }}>
              ({filtered.length} products)
            </span>
          </h1>

          {/* Filter bar */}
          <div className="filter-bar" style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: "28px", gap: "12px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>Filter by</span>
              <FilterDropdown
                label="Category" options={categories}
                value={filterCategory}
                onChange={(v) => { setFilterCategory(v); setCurrentPage(1); }}
              />
            </div>
            <FilterDropdown label="Sort by" options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} />
          </div>

          {/* Grid */}
          {paginated.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.35)" }}>No products found.</p>
            </div>
          ) : (
            <div className="products-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px", marginBottom: "48px",
            }}>
              {paginated.map((product) => (
                <Link key={product.id} href={`/shop/${product.slug}`} style={{ textDecoration: "none" }}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} style={{
                width: "36px", height: "36px", borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)", background: "transparent",
                color: currentPage === 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: currentPage === 1 ? "not-allowed" : "pointer", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { if (currentPage !== 1) { e.currentTarget.style.borderColor = "#C4914F"; e.currentTarget.style.color = "#C4914F"; } }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = currentPage === 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)"; }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
              </button>

              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                Page <span style={{ color: "#C4914F", fontWeight: 500 }}>{currentPage}</span> of {totalPages}
              </span>

              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{
                width: "36px", height: "36px", borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)", background: "transparent",
                color: currentPage === totalPages ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { if (currentPage !== totalPages) { e.currentTarget.style.borderColor = "#C4914F"; e.currentTarget.style.color = "#C4914F"; } }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = currentPage === totalPages ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)"; }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          )}

        </div>
      </section>
    </>
  );
}