"use client";
import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, removeFromCart, updateQty, clearCart } = useCartStore();
  const [promoCode, setPromoCode]       = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError]     = useState("");

  const subtotal = items.reduce((sum, i) => sum + parseFloat(i.price) * i.qty, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping  = subtotal > 1000 ? 0 : 150;
  const total     = subtotal - discount + shipping;

  const handlePromo = () => {
    setPromoError("");
    if (promoCode.toUpperCase() === "VELYSCENT10") {
      setPromoApplied(true);
    } else {
      setPromoError("Invalid promo code.");
      setPromoApplied(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .qty-btn:hover    { background: rgba(196,145,79,0.15) !important; color: #C4914F !important; }
        .remove-btn:hover { color: #ff6b6b !important; }
        .promo-input::placeholder { color: rgba(255,255,255,0.25); }
        .promo-input:focus { outline: none; border-color: rgba(196,145,79,0.4) !important; }
        @media (max-width: 860px) { .cart-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px) {
          .cart-item-row { grid-template-columns: 1fr auto auto !important; }
          .cart-item-price { display: none !important; }
        }
      `}</style>

      <section style={{ width: "100%", background: "#0A0806", minHeight: "100vh", padding: "100px 0 96px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
            {["Home", "Cart"].map((crumb, i, arr) => (
              <span key={crumb} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Link href={i === 0 ? "/" : "/cart"} style={{
                  fontFamily: "'Jost',sans-serif", fontSize: "12px",
                  color: i === arr.length - 1 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)",
                  textDecoration: "none", transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                  onMouseLeave={(e) => e.currentTarget.style.color = i === arr.length - 1 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)"}
                >{crumb}</Link>
                {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>/</span>}
              </span>
            ))}
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "clamp(26px,3vw,38px)", fontWeight: 600,
            color: "#C4914F", marginBottom: "40px", letterSpacing: "0.01em",
            animation: "fadeUp 0.8s ease forwards",
          }}>
            Your Cart {items.length > 0 && (
              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "16px", fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>
                ({items.reduce((s, i) => s + i.qty, 0)} items)
              </span>
            )}
          </h1>

          {/* ── Empty ── */}
          {items.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", animation: "fadeUp 0.8s ease forwards" }}>
              <svg width="64" height="64" fill="none" stroke="rgba(196,145,79,0.3)" strokeWidth="1.2" viewBox="0 0 24 24" style={{ marginBottom: "20px" }}>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "22px", color: "rgba(255,255,255,0.5)", marginBottom: "16px" }}>Your cart is empty</p>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.3)", marginBottom: "32px" }}>Discover our luxurious fragrance collection</p>
              <Link href="/shop" style={{
                padding: "13px 36px", background: "#C4914F", borderRadius: "6px",
                color: "#fff", fontFamily: "'Jost',sans-serif", fontSize: "13px",
                fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                textDecoration: "none", transition: "all 0.25s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#b07d3f"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#C4914F"}
              >Shop Now</Link>
            </div>
          )}

          {/* ── Cart grid ── */}
          {items.length > 0 && (
            <div className="cart-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "40px", alignItems: "start" }}>

              {/* ── Left: Items ── */}
              <div>
                {/* Header */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 120px 120px 40px",
                  gap: "16px", padding: "0 0 14px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "8px",
                }}>
                  {["Product", "Price", "Quantity", ""].map((h) => (
                    <span key={h} style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{h}</span>
                  ))}
                </div>

                {/* Items */}
                {items.map((item, i) => (
                  <div key={`${item.slug}-${item.variant}`} className="cart-item-row" style={{
                    display: "grid", gridTemplateColumns: "1fr 120px 120px 40px",
                    gap: "16px", alignItems: "center",
                    padding: "20px 0",
                    borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    animation: "fadeUp 0.5s ease forwards",
                  }}>

                    {/* Product info */}
                    <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                      {/* Image */}
                      <div style={{
                        width: "64px", height: "80px", flexShrink: 0,
                        background: "linear-gradient(160deg, #1c1814 0%, #0e0c0a 100%)",
                        borderRadius: "6px", border: "1px solid rgba(255,255,255,0.07)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        overflow: "hidden",
                      }}>
                        {item.image ? (
                          <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }}/>
                        ) : (
                          <svg width="20" height="20" fill="none" stroke="rgba(196,145,79,0.3)" strokeWidth="1.2" viewBox="0 0 24 24">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <path d="m21 15-5-5L5 21"/>
                          </svg>
                        )}
                      </div>

                      <div>
                        <Link href={`/shop/${item.slug}`} style={{
                          fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 400,
                          color: "#FFFFFF", textDecoration: "none",
                          display: "block", marginBottom: "4px", transition: "color 0.2s",
                        }}
                          onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                          onMouseLeave={(e) => e.currentTarget.style.color = "#FFFFFF"}
                        >{item.name}</Link>
                        <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.35)" }}>
                          {item.variant}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <span className="cart-item-price" style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#C4914F" }}>
                      PKR {parseFloat(item.price).toLocaleString()}
                    </span>

                    {/* Qty stepper */}
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", overflow: "hidden", width: "fit-content" }}>
                      <button className="qty-btn" onClick={() => updateQty(item.slug, item.variant, item.qty - 1)} style={{ width: "32px", height: "32px", background: "transparent", border: "none", borderRight: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>−</button>
                      <span style={{ width: "36px", textAlign: "center", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#fff" }}>{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.slug, item.variant, item.qty + 1)} style={{ width: "32px", height: "32px", background: "transparent", border: "none", borderLeft: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>+</button>
                    </div>

                    {/* Remove */}
                    <button className="remove-btn" onClick={() => removeFromCart(item.slug, item.variant)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.25)", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center", transition: "color 0.2s" }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Clear cart */}
                <div style={{ marginTop: "20px" }}>
                  <button onClick={clearCart} style={{
                    background: "none", border: "none",
                    fontFamily: "'Jost',sans-serif", fontSize: "12px",
                    color: "rgba(255,100,100,0.5)", cursor: "pointer",
                    letterSpacing: "0.06em", transition: "color 0.2s",
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#ff6b6b"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,100,100,0.5)"}
                  >Clear Cart</button>
                </div>
              </div>

              {/* ── Right: Order Summary ── */}
              <div style={{ background: "#111009", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "28px", position: "sticky", top: "90px" }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "18px", fontWeight: 600, color: "#FFFFFF", marginBottom: "24px" }}>Order Summary</h3>

                {[
                  { label: "Subtotal", value: `PKR ${subtotal.toLocaleString()}` },
                  promoApplied && { label: "Discount (10%)", value: `− PKR ${discount.toLocaleString()}`, gold: true },
                  { label: "Shipping", value: shipping === 0 ? "Free" : `PKR ${shipping.toLocaleString()}` },
                ].filter(Boolean).map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.5)" }}>{row.label}</span>
                    <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 400, color: row.gold ? "#C4914F" : "rgba(255,255,255,0.75)" }}>{row.value}</span>
                  </div>
                ))}

                {shipping === 0 && (
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(196,145,79,0.6)", marginBottom: "14px", letterSpacing: "0.04em" }}>✓ You qualify for free shipping!</p>
                )}

                <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "16px 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "16px", fontWeight: 600, color: "#fff" }}>Total</span>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "18px", fontWeight: 700, color: "#C4914F" }}>PKR {total.toLocaleString()}</span>
                </div>

                {/* Promo */}
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input className="promo-input" type="text" placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "10px 12px", color: "#fff", fontFamily: "'Jost',sans-serif", fontSize: "13px" }}/>
                    <button onClick={handlePromo} style={{ padding: "10px 16px", background: "rgba(196,145,79,0.15)", border: "1px solid rgba(196,145,79,0.3)", borderRadius: "6px", color: "#C4914F", fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(196,145,79,0.25)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(196,145,79,0.15)"}
                    >Apply</button>
                  </div>
                  {promoApplied && <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "#C4914F", marginTop: "8px" }}>✓ Promo code applied — 10% off!</p>}
                  {promoError  && <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "#ff6b6b", marginTop: "8px" }}>{promoError}</p>}
                </div>

                {/* Checkout */}
                <Link href="/checkout" style={{ display: "block", width: "100%", padding: "14px", background: "#C4914F", borderRadius: "6px", color: "#fff", fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", textAlign: "center", transition: "all 0.25s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#b07d3f"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#C4914F"; e.currentTarget.style.transform = "translateY(0)"; }}
                >Proceed to Checkout</Link>

                <Link href="/shop" style={{ display: "block", textAlign: "center", marginTop: "14px", fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                >← Continue Shopping</Link>
              </div>

            </div>
          )}
        </div>
      </section>
    </>
  );
}