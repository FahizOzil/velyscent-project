"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/context/AuthContext";

// ─── Payment Methods ──────────────────────────────────────────────────
const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard via Safepay",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "easypaisa",
    label: "EasyPaisa",
    description: "Pay via EasyPaisa wallet",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 12l3 3 5-5"/>
      </svg>
    ),
  },
  {
    id: "jazzcash",
    label: "JazzCash",
    description: "Pay via JazzCash mobile account",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <line x1="12" y1="18" x2="12" y2="18"/>
      </svg>
    ),
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

// ─── Input Field ──────────────────────────────────────────────────────
function Field({ label, name, type = "text", placeholder, value, onChange, required, half }) {
  return (
    <div style={{ flex: half ? "0 0 calc(50% - 8px)" : "1 1 100%" }}>
      <label style={{
        fontFamily: "'Jost',sans-serif", fontSize: "11px",
        fontWeight: 500, color: "rgba(255,255,255,0.5)",
        letterSpacing: "0.08em", textTransform: "uppercase",
        display: "block", marginBottom: "8px",
      }}>
        {label} {required && <span style={{ color: "#C4914F" }}>*</span>}
      </label>
      <input name={name} type={type} placeholder={placeholder}
        value={value} onChange={onChange} required={required}
        style={{
          width: "100%", background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "6px", padding: "12px 14px",
          color: "#fff", fontFamily: "'Jost',sans-serif",
          fontSize: "14px", outline: "none", transition: "border-color 0.2s",
        }}
        onFocus={(e) => e.target.style.borderColor = "rgba(196,145,79,0.6)"}
        onBlur={(e)  => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
      />
    </div>
  );
}

// ─── Checkout Page ────────────────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, clearCart } = useCartStore();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [form, setForm] = useState({
    fullName:   user?.user_metadata?.full_name || "",
    email:      user?.email || "",
    phone:      "",
    address:    "",
    city:       "",
    province:   "",
    postalCode: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ── Totals ──
  const subtotal = items.reduce((s, i) => s + parseFloat(i.price) * i.qty, 0);
  const shipping  = subtotal > 1000 ? 0 : 150;
  const total     = subtotal + shipping;

  // ── Validate ──
  const validate = () => {
    if (!form.fullName || !form.email || !form.phone || !form.address || !form.city) {
      setError("Please fill in all required fields."); return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address."); return false;
    }
    if (items.length === 0) { setError("Your cart is empty."); return false; }
    return true;
  };

  // ── Save order ──
  const saveOrder = async (paymentStatus = "pending", safepayToken = null) => {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user?.id || null,
        items, subtotal, shipping, total,
        payment_method: paymentMethod,
        payment_status: paymentStatus,
        order_status: "processing",
        customer_name:  form.fullName,
        customer_email: form.email,
        customer_phone: form.phone,
        shipping_address: {
          address: form.address, city: form.city,
          province: form.province, postalCode: form.postalCode,
        },
        safepay_token: safepayToken,
      }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.order;
  };

  // ── COD ──
  const handleCOD = async () => {
    setLoading(true); setError("");
    try {
      const order = await saveOrder("pending");
      clearCart();
      router.push(`/order-confirmation?id=${order.id}&method=cod`);
    } catch (err) {
      setError(err.message || "Failed to place order. Please try again.");
    }
    setLoading(false);
  };

  // ── Safepay ──
  const handleSafepay = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/safepay-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: "PKR",
          order_id: `VELYSCENT-${Date.now()}`,
          customer: { name: form.fullName, email: form.email, phone: form.phone },
          payment_method: paymentMethod,
        }),
      });
      const { token, redirect_url, error: sfError } = await res.json();
      if (sfError) throw new Error(sfError);
      await saveOrder("pending", token);
      clearCart();
      window.location.href = redirect_url;
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    if (!validate()) return;
    paymentMethod === "cod" ? handleCOD() : handleSafepay();
  };

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "#0A0806", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "40px" }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "22px", color: "rgba(255,255,255,0.5)" }}>Your cart is empty</p>
        <Link href="/shop" style={{ padding: "13px 32px", background: "#C4914F", borderRadius: "6px", color: "#fff", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.08em" }}>Shop Now</Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: rgba(255,255,255,0.2); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 860px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .name-row { flex-wrap: wrap !important; }
        }
      `}</style>

      <section style={{ width: "100%", background: "#0A0806", minHeight: "100vh", padding: "100px 0 96px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

          <h1 style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "clamp(24px,3vw,36px)", fontWeight: 600,
            color: "#C4914F", marginBottom: "40px",
            animation: "fadeUp 0.8s ease forwards",
          }}>Checkout</h1>

          <div className="checkout-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "40px", alignItems: "start" }}>

            {/* ── Left: Form ── */}
            <div>

              {/* Shipping Info */}
              <div style={{ background: "#111009", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "28px", marginBottom: "24px" }}>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "18px", fontWeight: 600, color: "#FFFFFF", marginBottom: "24px" }}>
                  Shipping Information
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div className="name-row" style={{ display: "flex", gap: "16px" }}>
                    <Field label="Full Name"    name="fullName" placeholder="Your full name"    value={form.fullName}   onChange={handleChange} required half />
                    <Field label="Email"        name="email"    type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required half />
                  </div>
                  <Field label="Phone Number" name="phone" type="tel" placeholder="03XX-XXXXXXX" value={form.phone} onChange={handleChange} required />
                  <Field label="Street Address" name="address" placeholder="House #, Street, Area" value={form.address} onChange={handleChange} required />
                  <div className="name-row" style={{ display: "flex", gap: "16px" }}>
                    <Field label="City"     name="city"     placeholder="Karachi" value={form.city}     onChange={handleChange} required half />
                    <Field label="Province" name="province" placeholder="Sindh"   value={form.province} onChange={handleChange} half />
                  </div>
                  <Field label="Postal Code" name="postalCode" placeholder="74000" value={form.postalCode} onChange={handleChange} />
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ background: "#111009", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "28px" }}>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "18px", fontWeight: 600, color: "#FFFFFF", marginBottom: "24px" }}>
                  Payment Method
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {PAYMENT_METHODS.map((method) => {
                    const active = paymentMethod === method.id;
                    return (
                      <button key={method.id} onClick={() => setPaymentMethod(method.id)} style={{
                        display: "flex", alignItems: "center", gap: "16px",
                        padding: "16px 18px",
                        background: active ? "rgba(196,145,79,0.08)" : "rgba(255,255,255,0.02)",
                        border: active ? "1px solid rgba(196,145,79,0.5)" : "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "8px", cursor: "pointer",
                        transition: "all 0.2s", textAlign: "left",
                      }}
                        onMouseEnter={(e) => { if (!active) e.currentTarget.style.borderColor = "rgba(196,145,79,0.25)"; }}
                        onMouseLeave={(e) => { if (!active) e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                      >
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: active ? "2px solid #C4914F" : "2px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "border-color 0.2s" }}>
                          {active && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C4914F" }} />}
                        </div>
                        <div style={{ color: active ? "#C4914F" : "rgba(255,255,255,0.4)", flexShrink: 0 }}>{method.icon}</div>
                        <div>
                          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 500, color: active ? "#FFFFFF" : "rgba(255,255,255,0.7)", marginBottom: "2px" }}>{method.label}</p>
                          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.35)" }}>{method.description}</p>
                        </div>
                        {method.id === "cod" && (
                          <span style={{ marginLeft: "auto", background: "rgba(196,145,79,0.12)", border: "1px solid rgba(196,145,79,0.3)", borderRadius: "12px", padding: "2px 10px", fontFamily: "'Jost',sans-serif", fontSize: "10px", fontWeight: 500, color: "#C4914F", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                            No advance payment
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === "cod" && (
                  <div style={{ marginTop: "16px", padding: "12px 16px", background: "rgba(196,145,79,0.06)", border: "1px solid rgba(196,145,79,0.2)", borderRadius: "6px" }}>
                    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                      📦 Pay in cash when your order arrives at your doorstep. Please have the exact amount ready.
                    </p>
                  </div>
                )}

                {paymentMethod !== "cod" && (
                  <div style={{ marginTop: "16px", padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <svg width="16" height="16" fill="none" stroke="rgba(196,145,79,0.6)" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>
                      Secured by <strong style={{ color: "#C4914F" }}>Safepay</strong> — 256-bit SSL encryption
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div style={{ background: "#111009", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "28px", position: "sticky", top: "90px" }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "18px", fontWeight: 600, color: "#FFFFFF", marginBottom: "20px" }}>Order Summary</h3>

              {/* Items */}
              <div style={{ marginBottom: "20px" }}>
                {items.map((item) => (
                  <div key={`${item.slug}-${item.variant}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ flex: 1, minWidth: 0, paddingRight: "10px" }}>
                      <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "#fff", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                      <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{item.variant} × {item.qty}</p>
                    </div>
                    <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#C4914F", flexShrink: 0 }}>
                      PKR {(parseFloat(item.price) * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              {[
                { label: "Subtotal", value: `PKR ${subtotal.toLocaleString()}` },
                { label: "Shipping", value: shipping === 0 ? "Free" : `PKR ${shipping.toLocaleString()}` },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>{row.label}</span>
                  <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>{row.value}</span>
                </div>
              ))}

              <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "16px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "28px" }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "16px", fontWeight: 600, color: "#fff" }}>Total</span>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "18px", fontWeight: 700, color: "#C4914F" }}>
                  PKR {total.toLocaleString()}
                </span>
              </div>

              {error && (
                <div style={{ background: "rgba(220,60,60,0.1)", border: "1px solid rgba(220,60,60,0.3)", borderRadius: "6px", padding: "10px 14px", marginBottom: "16px", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "#ff6b6b" }}>
                  {error}
                </div>
              )}

              <button onClick={handleSubmit} disabled={loading} style={{
                width: "100%", padding: "15px",
                background: loading ? "rgba(196,145,79,0.4)" : "#C4914F",
                border: "none", borderRadius: "6px", color: "#fff",
                fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer", transition: "all 0.25s ease",
              }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#b07d3f"; }}
                onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = loading ? "rgba(196,145,79,0.4)" : "#C4914F"; }}
              >
                {loading ? "Processing..." : paymentMethod === "cod" ? "Place Order (COD)" : "Pay with Safepay"}
              </button>

              <Link href="/cart" style={{ display: "block", textAlign: "center", marginTop: "14px", fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
              >← Back to Cart</Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}