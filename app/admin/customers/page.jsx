// app/admin/customers/page.jsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// ─── Customer Orders Modal ────────────────────────────────────────────
function OrdersModal({ customer, onClose }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("orders")
        .select("id, total, status, created_at, payment_method")
        .eq("user_id", customer.id)
        .order("created_at", { ascending: false });
      setOrders(data || []);
      setLoading(false);
    }
    fetch();
  }, [customer.id]);

  const STATUS_COLORS = {
    pending:    "#C4914F", processing: "#6aadee",
    shipped:    "#3ecfa0", delivered:  "#9090ff", cancelled: "#f07070",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div style={{
        background: "#131110", border: "1px solid rgba(196,145,79,0.2)",
        borderRadius: "12px", width: "100%", maxWidth: "600px",
        maxHeight: "80vh", overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
      }}>
        {/* Header */}
        <div style={{ padding: "24px 28px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "20px", fontWeight: 600, color: "#C4914F" }}>
              {customer.full_name || customer.email}
            </h2>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{customer.email}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "20px" }}>✕</button>
        </div>

        {/* Orders list */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {loading ? (
            <div style={{ padding: "48px", textAlign: "center" }}>
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", border: "2px solid rgba(196,145,79,0.2)", borderTopColor: "#C4914F", animation: "spin 0.7s linear infinite", margin: "0 auto" }}/>
            </div>
          ) : orders.length === 0 ? (
            <div style={{ padding: "48px", textAlign: "center" }}>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.3)" }}>No orders yet.</p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {["Order ID", "Date", "Payment", "Total", "Status"].map((h) => (
                    <th key={h} style={{ padding: "12px 20px", fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "13px 20px", fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td style={{ padding: "13px 20px", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                      {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td style={{ padding: "13px 20px", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", textTransform: "capitalize" }}>
                      {order.payment_method || "—"}
                    </td>
                    <td style={{ padding: "13px 20px", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#C4914F" }}>
                      ${parseFloat(order.total || 0).toFixed(2)}
                    </td>
                    <td style={{ padding: "13px 20px" }}>
                      <span style={{
                        background: `${STATUS_COLORS[order.status]}22`,
                        color: STATUS_COLORS[order.status] || "rgba(255,255,255,0.5)",
                        fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500,
                        padding: "3px 10px", borderRadius: "20px", textTransform: "capitalize",
                      }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
            {orders.length} order{orders.length !== 1 ? "s" : ""} · Total spent: <span style={{ color: "#C4914F" }}>${orders.reduce((s, o) => s + parseFloat(o.total || 0), 0).toFixed(2)}</span>
          </p>
          <button onClick={onClose} style={{
            padding: "8px 20px", background: "transparent",
            border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px",
            fontFamily: "'Jost',sans-serif", fontSize: "12px",
            color: "rgba(255,255,255,0.5)", cursor: "pointer",
          }}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────
export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [selected, setSelected]   = useState(null); // customer for orders modal
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => { fetchCustomers(); }, []);

  async function fetchCustomers() {
    setLoading(true);

    // Get all users via service role (profiles table)
    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!profiles) { setLoading(false); return; }

    // Get order counts per user in one query
    const { data: orderCounts } = await supabase
      .from("orders")
      .select("user_id");

    const countMap = (orderCounts || []).reduce((acc, o) => {
      acc[o.user_id] = (acc[o.user_id] || 0) + 1;
      return acc;
    }, {});

    const enriched = profiles.map((p) => ({
      ...p,
      order_count: countMap[p.id] || 0,
    }));

    setCustomers(enriched);
    setLoading(false);
  }

  // Toggle admin role via Supabase auth admin API (needs service key)
  // For now we update the profiles table role column
  const toggleAdmin = async (customer) => {
    setTogglingId(customer.id);
    const newRole = customer.role === "admin" ? "customer" : "admin";
    await supabase.from("profiles").update({ role: newRole }).eq("id", customer.id);
    setCustomers((prev) => prev.map((c) => c.id === customer.id ? { ...c, role: newRole } : c));
    setTogglingId(null);
  };

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return !q
      || (c.full_name || "").toLowerCase().includes(q)
      || (c.email || "").toLowerCase().includes(q);
  });

  const totalRevenue = customers.reduce((s, c) => s + (c.total_spent || 0), 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Jost:wght@300;400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:focus { outline: none; border-color: rgba(196,145,79,0.4) !important; }
        .cust-row:hover { background: rgba(196,145,79,0.03) !important; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "28px", fontWeight: 600, color: "#C4914F", marginBottom: "4px" }}>Customers</h1>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{customers.length} registered users</p>
        </div>
        <button onClick={fetchCustomers} style={{
          display: "flex", alignItems: "center", gap: "6px", padding: "9px 16px",
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "6px", fontFamily: "'Jost',sans-serif",
          fontSize: "12px", color: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(196,145,79,0.35)"; e.currentTarget.style.color = "#C4914F"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
          Refresh
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Total Customers", value: customers.length },
          { label: "Customers with Orders", value: customers.filter((c) => c.order_count > 0).length },
          { label: "Admin Users", value: customers.filter((c) => c.role === "admin").length },
        ].map((s) => (
          <div key={s.label} style={{ background: "#131110", border: "1px solid rgba(196,145,79,0.1)", borderRadius: "8px", padding: "18px 20px" }}>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{s.label}</p>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "28px", fontWeight: 600, color: "#C4914F" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", maxWidth: "360px", marginBottom: "24px" }}>
        <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" viewBox="0 0 24 24" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} style={{
          width: "100%", padding: "9px 12px 9px 34px",
          background: "#131110", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "6px", fontFamily: "'Jost',sans-serif",
          fontSize: "13px", color: "#FFFFFF",
        }}/>
      </div>

      {/* Table */}
      <div style={{ background: "#131110", border: "1px solid rgba(196,145,79,0.12)", borderRadius: "10px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid rgba(196,145,79,0.2)", borderTopColor: "#C4914F", animation: "spin 0.7s linear infinite", margin: "0 auto" }}/>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.3)" }}>No customers found.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {["Customer", "Email", "Joined", "Orders", "Role", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "12px 20px", fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer) => (
                  <tr key={customer.id} className="cust-row" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.15s" }}>

                    {/* Avatar + Name */}
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                          background: "linear-gradient(135deg, rgba(196,145,79,0.3), rgba(196,145,79,0.1))",
                          border: "1px solid rgba(196,145,79,0.2)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 600, color: "#C4914F",
                        }}>
                          {(customer.full_name || customer.email || "?")[0].toUpperCase()}
                        </div>
                        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 500, color: "#FFFFFF" }}>
                          {customer.full_name || "—"}
                        </p>
                      </div>
                    </td>

                    {/* Email */}
                    <td style={{ padding: "14px 20px", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                      {customer.email || "—"}
                    </td>

                    {/* Joined */}
                    <td style={{ padding: "14px 20px", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
                      {customer.created_at
                        ? new Date(customer.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : "—"}
                    </td>

                    {/* Order count */}
                    <td style={{ padding: "14px 20px" }}>
                      <button onClick={() => setSelected(customer)} style={{
                        background: customer.order_count > 0 ? "rgba(196,145,79,0.1)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${customer.order_count > 0 ? "rgba(196,145,79,0.3)" : "rgba(255,255,255,0.08)"}`,
                        borderRadius: "20px", padding: "3px 12px", cursor: "pointer",
                        fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: 500,
                        color: customer.order_count > 0 ? "#C4914F" : "rgba(255,255,255,0.35)",
                        transition: "all 0.2s",
                      }}>
                        {customer.order_count} order{customer.order_count !== 1 ? "s" : ""}
                      </button>
                    </td>

                    {/* Role badge */}
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{
                        background: customer.role === "admin" ? "rgba(160,80,255,0.15)" : "rgba(255,255,255,0.05)",
                        color: customer.role === "admin" ? "#d4a0ff" : "rgba(255,255,255,0.35)",
                        fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500,
                        padding: "3px 10px", borderRadius: "20px", textTransform: "capitalize",
                      }}>
                        {customer.role || "customer"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {/* View Orders */}
                        <button onClick={() => setSelected(customer)} style={{
                          padding: "5px 12px", background: "transparent",
                          border: "1px solid rgba(255,255,255,0.1)", borderRadius: "5px",
                          fontFamily: "'Jost',sans-serif", fontSize: "11px",
                          color: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s",
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(196,145,79,0.4)"; e.currentTarget.style.color = "#C4914F"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                        >Orders</button>

                        {/* Toggle admin */}
                        <button
                          onClick={() => toggleAdmin(customer)}
                          disabled={togglingId === customer.id}
                          style={{
                            padding: "5px 12px", background: "transparent",
                            border: `1px solid ${customer.role === "admin" ? "rgba(160,80,255,0.3)" : "rgba(255,255,255,0.1)"}`,
                            borderRadius: "5px", fontFamily: "'Jost',sans-serif", fontSize: "11px",
                            color: customer.role === "admin" ? "#d4a0ff" : "rgba(255,255,255,0.5)",
                            cursor: togglingId === customer.id ? "not-allowed" : "pointer", transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => { if (togglingId !== customer.id) { e.currentTarget.style.borderColor = "rgba(160,80,255,0.5)"; e.currentTarget.style.color = "#d4a0ff"; } }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = customer.role === "admin" ? "rgba(160,80,255,0.3)" : "rgba(255,255,255,0.1)"; e.currentTarget.style.color = customer.role === "admin" ? "#d4a0ff" : "rgba(255,255,255,0.5)"; }}
                        >
                          {togglingId === customer.id ? "..." : customer.role === "admin" ? "Remove Admin" : "Make Admin"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Orders modal */}
      {selected && <OrdersModal customer={selected} onClose={() => setSelected(null)}/>}
    </>
  );
}