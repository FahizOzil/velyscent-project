"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

// ─── Status Badge ─────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const styles = {
    processing: { bg: "rgba(196,145,79,0.12)", border: "rgba(196,145,79,0.3)",  color: "#C4914F"  },
    shipped:    { bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.3)",  color: "#60a5fa"  },
    delivered:  { bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.3)",   color: "#4ade80"  },
    cancelled:  { bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.3)",   color: "#f87171"  },
    pending:    { bg: "rgba(255,255,255,0.06)",  border: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" },
  };
  const s = styles[status] || styles.pending;
  return (
    <span style={{
      background: s.bg, border: `1px solid ${s.border}`,
      borderRadius: "20px", padding: "3px 12px",
      fontFamily: "'Jost',sans-serif", fontSize: "11px",
      fontWeight: 500, color: s.color,
      letterSpacing: "0.06em", textTransform: "capitalize", whiteSpace: "nowrap",
    }}>
      {status}
    </span>
  );
}

// ─── Payment Badge ────────────────────────────────────────────────────
function PaymentBadge({ method }) {
  const labels = { cod: "Cash on Delivery", card: "Credit / Debit Card", easypaisa: "EasyPaisa", jazzcash: "JazzCash" };
  return (
    <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>
      {labels[method] || method}
    </span>
  );
}

// ─── Order Card ───────────────────────────────────────────────────────
function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(order.created_at).toLocaleDateString("en-PK", {
    year: "numeric", month: "short", day: "numeric",
  });

  return (
    <div style={{
      background: "#111009", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "10px", overflow: "hidden", transition: "border-color 0.2s",
    }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(196,145,79,0.2)"}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
    >
      {/* Header row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 24px", flexWrap: "wrap", gap: "12px", cursor: "pointer",
      }} onClick={() => setExpanded(!expanded)}>

        {/* Order ID */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Order ID</span>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#C4914F", letterSpacing: "0.04em" }}>#{order.id.slice(0, 8).toUpperCase()}</span>
        </div>

        {/* Date */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Date</span>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{date}</span>
        </div>

        {/* Payment */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Payment</span>
          <PaymentBadge method={order.payment_method} />
        </div>

        {/* Status */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "center" }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Status</span>
          <StatusBadge status={order.order_status} />
        </div>

        {/* Total */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Total</span>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "16px", fontWeight: 600, color: "#C4914F" }}>
            PKR {parseFloat(order.total).toLocaleString()}
          </span>
        </div>

        {/* Arrow */}
        <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" viewBox="0 0 24 24"
          style={{ transition: "transform 0.25s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* Expanded */}
      {expanded && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "20px 24px" }}>

          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "14px" }}>
            Items Ordered
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            {order.items?.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
                  {/* Image */}
                  <div style={{
                    width: "44px", height: "54px", flexShrink: 0,
                    background: "linear-gradient(160deg, #1c1814 0%, #0e0c0a 100%)",
                    borderRadius: "4px", border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "hidden",
                  }}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }}/>
                    ) : (
                      <svg width="14" height="14" fill="none" stroke="rgba(196,145,79,0.3)" strokeWidth="1.2" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="m21 15-5-5L5 21"/>
                      </svg>
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <Link href={`/shop/${item.slug}`} style={{
                      fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 400,
                      color: "#FFFFFF", textDecoration: "none", display: "block",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      transition: "color 0.2s",
                    }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "#FFFFFF"}
                    >{item.name}</Link>
                    <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>
                      {item.variant} × {item.qty}
                    </span>
                  </div>
                </div>
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#C4914F", flexShrink: 0 }}>
                  PKR {(parseFloat(item.price) * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Shipping address */}
          {order.shipping_address && (
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", padding: "14px 16px", marginBottom: "16px" }}>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "8px" }}>
                Delivery Address
              </p>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                {order.customer_name}<br />
                {order.shipping_address.address}<br />
                {order.shipping_address.city}{order.shipping_address.province ? `, ${order.shipping_address.province}` : ""}{order.shipping_address.postalCode ? ` ${order.shipping_address.postalCode}` : ""}
              </p>
            </div>
          )}

          {/* Price breakdown */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "14px 0 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { label: "Subtotal", value: `PKR ${parseFloat(order.subtotal).toLocaleString()}` },
              { label: "Shipping", value: order.shipping === 0 ? "Free" : `PKR ${parseFloat(order.shipping).toLocaleString()}` },
            ].map((r) => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{r.label}</span>
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{r.value}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "14px", fontWeight: 600, color: "#fff" }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "15px", fontWeight: 700, color: "#C4914F" }}>
                PKR {parseFloat(order.total).toLocaleString()}
              </span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// ─── Orders Page ──────────────────────────────────────────────────────
export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("all");

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders").select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (!error) setOrders(data || []);
    setLoading(false);
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.order_status === filter);
  const filters  = ["all", "processing", "shipped", "delivered", "cancelled"];

  if (!authLoading && !user) {
    return (
      <div style={{ minHeight: "100vh", background: "#0A0806", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "40px" }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "22px", color: "rgba(255,255,255,0.5)" }}>Please sign in to view your orders</p>
        <Link href="/signin" style={{ padding: "13px 32px", background: "#C4914F", borderRadius: "6px", color: "#fff", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.08em" }}>Sign In</Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .filter-btn:hover { border-color: rgba(196,145,79,0.4) !important; color: #C4914F !important; }
      `}</style>

      <section style={{ width: "100%", background: "#0A0806", minHeight: "100vh", padding: "100px 0 96px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
            {["Home", "My Orders"].map((crumb, i, arr) => (
              <span key={crumb} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Link href={i === 0 ? "/" : "/orders"} style={{
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

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "16px", animation: "fadeUp 0.8s ease forwards" }}>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(24px,3vw,34px)", fontWeight: 600, color: "#C4914F" }}>
              My Orders
              {orders.length > 0 && (
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "15px", fontWeight: 400, color: "rgba(255,255,255,0.35)", marginLeft: "10px" }}>
                  ({orders.length})
                </span>
              )}
            </h1>

            <button onClick={fetchOrders} style={{
              background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px",
              padding: "8px 14px", fontFamily: "'Jost',sans-serif", fontSize: "12px",
              color: "rgba(255,255,255,0.4)", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(196,145,79,0.3)"; e.currentTarget.style.color = "#C4914F"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              Refresh
            </button>
          </div>

          {/* Filter tabs */}
          {orders.length > 0 && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
              {filters.map((f) => (
                <button key={f} className="filter-btn" onClick={() => setFilter(f)} style={{
                  padding: "6px 16px",
                  background: filter === f ? "rgba(196,145,79,0.1)" : "transparent",
                  border: filter === f ? "1px solid rgba(196,145,79,0.4)" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "20px", fontFamily: "'Jost',sans-serif", fontSize: "12px",
                  color: filter === f ? "#C4914F" : "rgba(255,255,255,0.4)",
                  cursor: "pointer", transition: "all 0.2s",
                  textTransform: "capitalize", letterSpacing: "0.04em",
                }}>
                  {f === "all" ? `All (${orders.length})` : f}
                </button>
              ))}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>Loading your orders...</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && orders.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <svg width="64" height="64" fill="none" stroke="rgba(196,145,79,0.3)" strokeWidth="1.2" viewBox="0 0 24 24" style={{ marginBottom: "20px" }}>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "20px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>No orders yet</p>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.25)", marginBottom: "28px" }}>Your order history will appear here</p>
              <Link href="/shop" style={{ padding: "13px 32px", background: "#C4914F", borderRadius: "6px", color: "#fff", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                Start Shopping
              </Link>
            </div>
          )}

          {/* Orders list */}
          {!loading && filtered.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {filtered.map((order) => <OrderCard key={order.id} order={order} />)}
            </div>
          )}

          {/* No filtered results */}
          {!loading && orders.length > 0 && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)" }}>No {filter} orders found.</p>
            </div>
          )}

        </div>
      </section>
    </>
  );
}