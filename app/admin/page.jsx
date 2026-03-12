// app/admin/page.jsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const STATUS_COLORS = {
  pending:    { bg: "rgba(196,145,79,0.15)",  text: "#C4914F"  },
  processing: { bg: "rgba(59,139,212,0.15)",  text: "#6aadee"  },
  shipped:    { bg: "rgba(29,158,117,0.15)",  text: "#3ecfa0"  },
  delivered:  { bg: "rgba(100,100,255,0.15)", text: "#9090ff"  },
  cancelled:  { bg: "rgba(220,60,60,0.15)",   text: "#f07070"  },
};

function StatCard({ label, value, sub, color = "#C4914F", loading }) {
  return (
    <div style={{
      background: "#131110", border: "1px solid rgba(196,145,79,0.12)",
      borderRadius: "10px", padding: "24px",
    }}>
      <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>{label}</p>
      {loading ? (
        <div style={{ width: "60px", height: "28px", background: "rgba(255,255,255,0.06)", borderRadius: "4px" }}/>
      ) : (
        <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "32px", fontWeight: 600, color, lineHeight: 1 }}>{value}</p>
      )}
      {sub && <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "6px" }}>{sub}</p>}
    </div>
  );
}

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || { bg: "rgba(255,255,255,0.08)", text: "rgba(255,255,255,0.5)" };
  return (
    <span style={{
      background: c.bg, color: c.text,
      fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500,
      padding: "3px 10px", borderRadius: "20px", textTransform: "capitalize",
    }}>
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, customers: 0, products: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [ordersRes, customersRes, productsRes] = await Promise.all([
      supabase.from("orders").select("id, total, status, created_at, user_id"),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("products").select("id", { count: "exact", head: true }),
    ]);

    const orders = ordersRes.data || [];
    const revenue = orders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);

    setStats({
      orders: orders.length,
      revenue: revenue.toFixed(2),
      customers: customersRes.count || 0,
      products: productsRes.count || 0,
    });

    // Recent 8 orders
    const { data: recent } = await supabase
      .from("orders")
      .select("id, total, status, created_at, payment_method")
      .order("created_at", { ascending: false })
      .limit(8);

    setRecentOrders(recent || []);
    setLoading(false);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Jost:wght@300;400;500;600&display=swap');
        .order-row:hover { background: rgba(196,145,79,0.05) !important; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "28px", fontWeight: 600, color: "#C4914F", marginBottom: "4px" }}>Dashboard</h1>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "40px" }}>
        <StatCard label="Total Orders"    value={stats.orders}             sub="All time"        loading={loading}/>
        <StatCard label="Total Revenue"   value={`$${stats.revenue}`}      sub="All time"        loading={loading} color="#3ecfa0"/>
        <StatCard label="Customers"       value={stats.customers}          sub="Registered"      loading={loading} color="#6aadee"/>
        <StatCard label="Products"        value={stats.products}           sub="In catalogue"    loading={loading} color="#d4a0ff"/>
      </div>

      {/* Quick links */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "40px" }}>
        {[
          { href: "/admin/products", label: "+ Add Product",  color: "#C4914F" },
          { href: "/admin/orders",   label: "View All Orders", color: "rgba(255,255,255,0.6)" },
          { href: "/admin/customers",label: "View Customers",  color: "rgba(255,255,255,0.6)" },
        ].map((btn) => (
          <Link key={btn.href} href={btn.href} style={{
            padding: "9px 20px",
            background: btn.color === "#C4914F" ? "rgba(196,145,79,0.1)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${btn.color === "#C4914F" ? "rgba(196,145,79,0.35)" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "6px", textDecoration: "none",
            fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500,
            color: btn.color, transition: "all 0.2s",
          }}>
            {btn.label}
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div style={{ background: "#131110", border: "1px solid rgba(196,145,79,0.12)", borderRadius: "10px", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontFamily: "'Jost',sans-serif", fontSize: "15px", fontWeight: 500, color: "#FFFFFF" }}>Recent Orders</h2>
          <Link href="/admin/orders" style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "#C4914F", textDecoration: "none" }}>View all →</Link>
        </div>

        {loading ? (
          <div style={{ padding: "48px", textAlign: "center" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid rgba(196,145,79,0.2)", borderTopColor: "#C4914F", animation: "spin 0.7s linear infinite", margin: "0 auto" }}/>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : recentOrders.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.3)" }}>No orders yet.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Order ID", "Date", "Payment", "Total", "Status"].map((h) => (
                  <th key={h} style={{ padding: "12px 24px", fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="order-row" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.15s" }}>
                  <td style={{ padding: "14px 24px", fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
                    #{order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td style={{ padding: "14px 24px", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                    {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td style={{ padding: "14px 24px", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", textTransform: "capitalize" }}>
                    {order.payment_method || "—"}
                  </td>
                  <td style={{ padding: "14px 24px", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#C4914F" }}>
                    ${parseFloat(order.total || 0).toFixed(2)}
                  </td>
                  <td style={{ padding: "14px 24px" }}>
                    <StatusBadge status={order.status}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}