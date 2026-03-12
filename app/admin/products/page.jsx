// app/admin/products/page.jsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const EMPTY_FORM = {
  name: "", slug: "", price: "", category: "",
  description: "", variants: '[{"id":1,"volume":"50ml"},{"id":2,"volume":"100ml"}]',
  rating: "5.0", review_count: "0", in_stock: true, featured: false,
};

const CATEGORIES = ["Signature", "Classic", "Exclusive", "Luxury"];

// ─── Auto-generate slug from name ────────────────────────────────────
function toSlug(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ─── Product Form Modal ───────────────────────────────────────────────
function ProductModal({ product, onClose, onSaved }) {
  const isEdit = !!product?.id;
  const [form, setForm] = useState(isEdit ? {
    ...product,
    variants: JSON.stringify(product.variants || []),
  } : EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleNameChange = (val) => {
    set("name", val);
    if (!isEdit) set("slug", toSlug(val));
  };

  const handleSave = async () => {
    if (!form.name || !form.slug || !form.price) { setError("Name, slug and price are required."); return; }
    setSaving(true); setError("");
    let variants;
    try { variants = JSON.parse(form.variants); } catch { setError("Variants must be valid JSON."); setSaving(false); return; }

    const payload = {
      name: form.name, slug: form.slug,
      price: parseFloat(form.price),
      category: form.category, description: form.description,
      variants, rating: parseFloat(form.rating) || 5.0,
      review_count: parseInt(form.review_count) || 0,
      in_stock: form.in_stock, featured: form.featured,
    };

    let err;
    if (isEdit) {
      ({ error: err } = await supabase.from("products").update(payload).eq("id", product.id));
    } else {
      ({ error: err } = await supabase.from("products").insert([payload]));
    }

    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved();
  };

  const inputStyle = {
    width: "100%", padding: "9px 12px",
    background: "#0e0c0a", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "6px", fontFamily: "'Jost',sans-serif",
    fontSize: "13px", color: "#FFFFFF",
  };

  const labelStyle = {
    fontFamily: "'Jost',sans-serif", fontSize: "11px",
    fontWeight: 500, color: "rgba(255,255,255,0.45)",
    letterSpacing: "0.08em", textTransform: "uppercase",
    display: "block", marginBottom: "6px",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div style={{
        background: "#131110", border: "1px solid rgba(196,145,79,0.2)",
        borderRadius: "12px", width: "100%", maxWidth: "580px",
        maxHeight: "90vh", overflowY: "auto", padding: "32px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "22px", fontWeight: 600, color: "#C4914F" }}>
            {isEdit ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "20px" }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* Name */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Name *</label>
            <input style={inputStyle} value={form.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Royal Oud"/>
          </div>

          {/* Slug */}
          <div>
            <label style={labelStyle}>Slug *</label>
            <input style={inputStyle} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="royal-oud"/>
          </div>

          {/* Price */}
          <div>
            <label style={labelStyle}>Price (USD) *</label>
            <input style={inputStyle} type="number" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="320"/>
          </div>

          {/* Category */}
          <div>
            <label style={labelStyle}>Category</label>
            <select style={{ ...inputStyle, appearance: "none" }} value={form.category} onChange={(e) => set("category", e.target.value)}>
              <option value="">— Select —</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label style={labelStyle}>Rating</label>
            <input style={inputStyle} type="number" min="1" max="5" step="0.1" value={form.rating} onChange={(e) => set("rating", e.target.value)}/>
          </div>

          {/* Description */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Description</label>
            <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="A rich woody fragrance..."/>
          </div>

          {/* Variants JSON */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Variants (JSON)</label>
            <textarea style={{ ...inputStyle, minHeight: "60px", fontFamily: "monospace", fontSize: "12px", resize: "vertical" }} value={form.variants} onChange={(e) => set("variants", e.target.value)}/>
          </div>

          {/* Toggles */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={form.in_stock} onChange={(e) => set("in_stock", e.target.checked)} style={{ accentColor: "#C4914F", width: "16px", height: "16px" }}/>
              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>In Stock</span>
            </label>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} style={{ accentColor: "#C4914F", width: "16px", height: "16px" }}/>
              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>Featured (homepage)</span>
            </label>
          </div>
        </div>

        {error && (
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "#f07070", marginTop: "16px", background: "rgba(220,60,60,0.1)", padding: "8px 12px", borderRadius: "5px" }}>
            {error}
          </p>
        )}

        <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "11px",
            background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px", fontFamily: "'Jost',sans-serif",
            fontSize: "13px", color: "rgba(255,255,255,0.5)", cursor: "pointer",
          }}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={{
            flex: 2, padding: "11px",
            background: saving ? "rgba(196,145,79,0.4)" : "#C4914F",
            border: "none", borderRadius: "6px",
            fontFamily: "'Jost',sans-serif", fontSize: "13px",
            fontWeight: 600, color: "#fff", cursor: saving ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}>
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete confirm modal ─────────────────────────────────────────────
function DeleteModal({ product, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const confirm = async () => {
    setDeleting(true);
    await supabase.from("products").delete().eq("id", product.id);
    onDeleted(product.id);
  };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div style={{ background: "#131110", border: "1px solid rgba(220,60,60,0.3)", borderRadius: "12px", padding: "32px", maxWidth: "400px", width: "100%", textAlign: "center" }}>
        <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "20px", color: "#FFFFFF", marginBottom: "10px" }}>Delete Product?</p>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "24px" }}>
          "<span style={{ color: "#C4914F" }}>{product.name}</span>" will be permanently deleted.
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>Cancel</button>
          <button onClick={confirm} disabled={deleting} style={{ flex: 1, padding: "10px", background: deleting ? "rgba(220,60,60,0.4)" : "rgba(220,60,60,0.8)", border: "none", borderRadius: "6px", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 600, color: "#fff", cursor: deleting ? "not-allowed" : "pointer" }}>
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────
export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [modal, setModal]       = useState(null); // null | { type: "add"|"edit"|"delete", product? }

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: true });
    setProducts(data || []);
    setLoading(false);
  }

  const toggleFeatured = async (product) => {
    const updated = { ...product, featured: !product.featured };
    setProducts((prev) => prev.map((p) => p.id === product.id ? updated : p));
    await supabase.from("products").update({ featured: !product.featured }).eq("id", product.id);
  };

  const toggleStock = async (product) => {
    const updated = { ...product, in_stock: !product.in_stock };
    setProducts((prev) => prev.map((p) => p.id === product.id ? updated : p));
    await supabase.from("products").update({ in_stock: !product.in_stock }).eq("id", product.id);
  };

  const handleSaved = () => { setModal(null); fetchProducts(); };
  const handleDeleted = (id) => { setProducts((prev) => prev.filter((p) => p.id !== id)); setModal(null); };

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || (p.category || "").toLowerCase().includes(q);
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Jost:wght@300;400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder,textarea::placeholder { color: rgba(255,255,255,0.2); }
        input:focus,textarea:focus,select:focus { outline: none; border-color: rgba(196,145,79,0.4) !important; }
        select option { background: #1a1714; }
        .prod-row:hover { background: rgba(196,145,79,0.03) !important; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "28px", fontWeight: 600, color: "#C4914F", marginBottom: "4px" }}>Products</h1>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{products.length} products in catalogue</p>
        </div>
        <button onClick={() => setModal({ type: "add" })} style={{
          display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px",
          background: "rgba(196,145,79,0.1)", border: "1px solid rgba(196,145,79,0.35)",
          borderRadius: "6px", fontFamily: "'Jost',sans-serif",
          fontSize: "13px", fontWeight: 500, color: "#C4914F", cursor: "pointer",
          transition: "all 0.2s",
        }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Product
        </button>
      </div>

      {/* Search */}
      <div style={{ position: "relative", maxWidth: "360px", marginBottom: "24px" }}>
        <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" viewBox="0 0 24 24" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" placeholder="Search by name or category..." value={search} onChange={(e) => setSearch(e.target.value)} style={{
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
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {["Product", "Category", "Price", "Rating", "Featured", "Stock", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="prod-row" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.15s" }}>
                    {/* Name + slug */}
                    <td style={{ padding: "14px 16px" }}>
                      <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 500, color: "#FFFFFF", marginBottom: "2px" }}>{product.name}</p>
                      <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{product.slug}</p>
                    </td>

                    {/* Category */}
                    <td style={{ padding: "14px 16px", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                      {product.category || "—"}
                    </td>

                    {/* Price */}
                    <td style={{ padding: "14px 16px", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#C4914F" }}>
                      ${parseFloat(product.price).toFixed(2)}
                    </td>

                    {/* Rating */}
                    <td style={{ padding: "14px 16px", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                      ★ {parseFloat(product.rating || 5).toFixed(1)}
                    </td>

                    {/* Featured toggle */}
                    <td style={{ padding: "14px 16px" }}>
                      <button onClick={() => toggleFeatured(product)} style={{
                        background: product.featured ? "rgba(196,145,79,0.15)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${product.featured ? "rgba(196,145,79,0.4)" : "rgba(255,255,255,0.1)"}`,
                        borderRadius: "20px", padding: "3px 10px",
                        fontFamily: "'Jost',sans-serif", fontSize: "11px",
                        color: product.featured ? "#C4914F" : "rgba(255,255,255,0.4)",
                        cursor: "pointer", transition: "all 0.2s",
                      }}>
                        {product.featured ? "★ Yes" : "No"}
                      </button>
                    </td>

                    {/* Stock toggle */}
                    <td style={{ padding: "14px 16px" }}>
                      <button onClick={() => toggleStock(product)} style={{
                        background: product.in_stock ? "rgba(29,158,117,0.12)" : "rgba(220,60,60,0.12)",
                        border: `1px solid ${product.in_stock ? "rgba(29,158,117,0.35)" : "rgba(220,60,60,0.35)"}`,
                        borderRadius: "20px", padding: "3px 10px",
                        fontFamily: "'Jost',sans-serif", fontSize: "11px",
                        color: product.in_stock ? "#3ecfa0" : "#f07070",
                        cursor: "pointer", transition: "all 0.2s",
                      }}>
                        {product.in_stock ? "In Stock" : "Out"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => setModal({ type: "edit", product })} style={{
                          padding: "5px 12px", background: "transparent",
                          border: "1px solid rgba(255,255,255,0.1)", borderRadius: "5px",
                          fontFamily: "'Jost',sans-serif", fontSize: "11px",
                          color: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s",
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(196,145,79,0.4)"; e.currentTarget.style.color = "#C4914F"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                        >Edit</button>
                        <button onClick={() => setModal({ type: "delete", product })} style={{
                          padding: "5px 12px", background: "transparent",
                          border: "1px solid rgba(255,255,255,0.1)", borderRadius: "5px",
                          fontFamily: "'Jost',sans-serif", fontSize: "11px",
                          color: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s",
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(220,60,60,0.4)"; e.currentTarget.style.color = "#f07070"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                        >Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {modal?.type === "add"    && <ProductModal product={null}         onClose={() => setModal(null)} onSaved={handleSaved}/>}
      {modal?.type === "edit"   && <ProductModal product={modal.product} onClose={() => setModal(null)} onSaved={handleSaved}/>}
      {modal?.type === "delete" && <DeleteModal  product={modal.product} onClose={() => setModal(null)} onDeleted={handleDeleted}/>}
    </>
  );
}