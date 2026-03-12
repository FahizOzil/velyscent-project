// app/admin/orders/page.jsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const STATUSES = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

const STATUS_COLORS = {
  pending:    { bg: "rgba(196,145,79,0.15)",  text: "#C4914F"  },
  processing: { bg: "rgba(59,139,212,0.15)",  text: "#6aadee"  },
  shipped:    { bg: "rgba(29,158,117,0.15)",  text: "#3ecfa0"  },
  delivered:  { bg: "rgba(100,100,255,0.15)", text: "#9090ff"  },
  cancelled:  { bg: "rgba(220,60,60,0.15)",   text: "#f07070"  },
};

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || { bg: "rgba(255,255,255,0.08)", text: "rgba(255,255,255,0.5)" };
  return (
    <span style={{ background: c.bg, color: c.text, fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px", textTransform: "capitalize" }}>
      {status}
    </span>
  );
}

function StatusDropdown({ orderId, current, onUpdated }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = async (newStatus) => {
    setSaving(true); setOpen(false);
    await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    onUpdated(orderId, newStatus);
    setSaving(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} disabled={saving} style={{
        display: "flex", alignItems: "center", gap: "6px",
        background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "5px", padding: "5px 10px", cursor: "pointer",
        fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.5)",
        transition: "all 0.2s",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(196,145,79,0.35)"; e.currentTarget.style.color = "#C4914F"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
      >
        {saving ? "Saving..." : "Change"}
        <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", right: 0, zIndex: 50,
          background: "#1a1714", border: "1px solid rgba(196,145,79,0.2)",
          borderRadius: "6px", padding: "4px 0", minWidth: "130px",
          boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
        }}>
          {STATUSES.filter(s => s !== "all" && s !== current).map((s) => (
            <button key={s} onClick={() => update(s)} style={{
              display: "block", width: "100%", padding: "8px 14px",
              background: "transparent", border: "none",
              fontFamily: "'Jost',sans-serif", fontSize: "12px", textAlign: "left",
              color: "rgba(255,255,255,0.65)", cursor: "pointer", textTransform: "capitalize",
              transition: "all 0.15s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,145,79,0.08)"; e.currentTarget.style.color = "#C4914F"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function OrderRow({ order, onUpdated }) {
  const [expanded, setExpanded] = useState(false);
  const items = order.items || [];

  return (
    <>
      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.15s" }}
        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(196,145,79,0.03)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
      >
        <td style={{ padding: "14px 20px" }}>
          <button onClick={() => setExpanded(!expanded)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.4)", transition: "color 0.2s",
          }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              style={{ transform: expanded ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s" }}>
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </td>
        <td style={{ padding: "14px 8px", fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
          #{order.id.slice(0, 8).toUpperCase()}
        </td>
        <td style={{ padding: "14px 8px", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
          {order.shipping_name || "—"}
        </td>
        <td style={{ padding: "14px 8px", fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
          {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </td>
        <td style={{ padding: "14px 8px", fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.45)", textTransform: "capitalize" }}>
          {order.payment_method || "—"}
        </td>
        <td style={{ padding: "14px 8px", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#C4914F" }}>
          ${parseFloat(order.total || 0).toFixed(2)}
        </td>
        <td style={{ padding: "14px 8px" }}>
          <StatusBadge status={order.status}/>
        </td>
        <td style={{ padding: "14px 8px 14px 12px" }}>
          <StatusDropdown orderId={order.id} current={order.status} onUpdated={onUpdated}/>
        </td>
      </tr>

      {/* Expanded: order items */}
      {expanded && (
        <tr>
          <td colSpan={8} style={{ padding: "0 20px 16px 52px", background: "rgba(196,145,79,0.03)" }}>
            <div style={{ background: "#0e0c0a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", padding: "16px", display: "flex", gap: "40px", flexWrap: "wrap" }}>
              {/* Items */}
              <div style={{ flex: 1, minWidth: "200px" }}>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Items</p>
                {items.length > 0 ? items.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
                      {item.name} <span style={{ color: "rgba(255,255,255,0.3)" }}>× {item.qty}</span>
                    </span>
                    <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "#C4914F" }}>
                      ${(parseFloat(item.price) * item.qty).toFixed(2)}
                    </span>
                  </div>
                )) : <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>No item data</p>}
              </div>

              {/* Shipping */}
              <div style={{ minWidth: "180px" }}>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Shipping</p>
                {[order.shipping_name, order.shipping_address, order.shipping_city, order.shipping_phone].filter(Boolean).map((line, i) => (
                  <p key={i} style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "2px" }}>{line}</p>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminOrders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("all");
  const [search, setSearch]   = useState("");

  useEffect(() => { fetchOrders(); }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  }

  const handleUpdated = (id, newStatus) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filtered = orders.filter((o) => {
    const matchStatus = filter === "all" || o.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || o.id.toLowerCase().includes(q) || (o.shipping_name || "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = s === "all" ? orders.length : orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Jost:wght@300;400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        .filter-tab:hover { color: #C4914F !important; }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:focus { outline: none; border-color: rgba(196,145,79,0.4) !important; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "28px", fontWeight: 600, color: "#C4914F", marginBottom: "4px" }}>Orders</h1>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{orders.length} total orders</p>
        </div>
        <button onClick={fetchOrders} style={{
          display: "flex", alignItems: "center", gap: "6px", padding: "9px 16px",
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "6px", fontFamily: "'Jost',sans-serif", fontSize: "12px",
          color: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(196,145,79,0.35)"; e.currentTarget.style.color = "#C4914F"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
          Refresh
        </button>
      </div>

      {/* Search + filter tabs */}
      <div style={{ marginBottom: "24px" }}>
        {/* Search */}
        <div style={{ position: "relative", marginBottom: "16px", maxWidth: "360px" }}>
          <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" viewBox="0 0 24 24" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Search by order ID or name..." value={search} onChange={(e) => setSearch(e.target.value)} style={{
            width: "100%", padding: "9px 12px 9px 34px",
            background: "#131110", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px", fontFamily: "'Jost',sans-serif",
            fontSize: "13px", color: "#FFFFFF",
          }}/>
        </div>

        {/* Status tabs */}
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {STATUSES.map((s) => (
            <button key={s} className="filter-tab" onClick={() => setFilter(s)} style={{
              padding: "6px 14px", borderRadius: "20px", border: "none",
              background: filter === s ? "rgba(196,145,79,0.15)" : "rgba(255,255,255,0.04)",
              color: filter === s ? "#C4914F" : "rgba(255,255,255,0.5)",
              fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: filter === s ? 500 : 400,
              cursor: "pointer", transition: "all 0.2s", textTransform: "capitalize",
            }}>
              {s} <span style={{ opacity: 0.6 }}>({counts[s]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#131110", border: "1px solid rgba(196,145,79,0.12)", borderRadius: "10px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid rgba(196,145,79,0.2)", borderTopColor: "#C4914F", animation: "spin 0.7s linear infinite", margin: "0 auto" }}/>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.3)" }}>No orders found.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <th style={{ width: "40px" }}></th>
                  {["Order ID", "Customer", "Date", "Payment", "Total", "Status", "Action"].map((h) => (
                    <th key={h} style={{ padding: "12px 8px", fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <OrderRow key={order.id} order={order} onUpdated={handleUpdated}/>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}