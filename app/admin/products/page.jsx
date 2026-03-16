// app/admin/products/page.jsx
"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";


const EMPTY_FORM = {
  name: "", slug: "", price: "", category: "",
  description: "", variants: '[{"id":1,"volume":"50ml"},{"id":2,"volume":"100ml"}]',
  rating: "5.0", review_count: "0", in_stock: true, featured: false,
  images: [],
};

const CATEGORIES = ["Signature", "Classic", "Exclusive", "Luxury"];

function toSlug(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ─── Image Uploader ───────────────────────────────────────────────────
function ImageUploader({ images, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver]   = useState(false);

  const uploadFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) return null;
    const ext  = file.name.split(".").pop();
    const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) { console.error(error); return null; }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleFiles = async (files) => {
    if (!files?.length) return;
    setUploading(true);
    const urls = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file);
      if (url) urls.push(url);
    }
    onChange([...images, ...urls]);
    setUploading(false);
  };

  const removeImage = async (url) => {
    // Extract path from URL and delete from storage
    try {
      const path = url.split("/product-images/")[1];
      if (path) await supabase.storage.from("product-images").remove([path]);
    } catch (e) { /* ignore */ }
    onChange(images.filter((u) => u !== url));
  };

  return (
    <div>
      {/* Existing images */}
      {images.length > 0 && (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
          {images.map((url, i) => (
            <div key={url} style={{ position: "relative", width: "80px", height: "80px", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(196,145,79,0.2)" }}>
              <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {/* Remove btn */}
              <button onClick={() => removeImage(url)} style={{
                position: "absolute", top: "3px", right: "3px",
                width: "18px", height: "18px", borderRadius: "50%",
                background: "rgba(0,0,0,0.75)", border: "none",
                color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "10px", lineHeight: 1,
              }}>✕</button>
              {i === 0 && (
                <span style={{
                  position: "absolute", bottom: "3px", left: "3px",
                  background: "rgba(196,145,79,0.9)", borderRadius: "3px",
                  fontFamily: "'Jost',sans-serif", fontSize: "8px",
                  fontWeight: 600, color: "#fff", padding: "1px 5px",
                  letterSpacing: "0.05em",
                }}>MAIN</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        style={{
          border: `2px dashed ${dragOver ? "rgba(196,145,79,0.6)" : "rgba(196,145,79,0.2)"}`,
          borderRadius: "8px", padding: "20px",
          background: dragOver ? "rgba(196,145,79,0.06)" : "rgba(196,145,79,0.02)",
          cursor: uploading ? "not-allowed" : "pointer",
          textAlign: "center", transition: "all 0.2s",
        }}
      >
        {uploading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(196,145,79,0.2)", borderTopColor: "#C4914F", animation: "spin 0.7s linear infinite" }} />
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Uploading...</span>
          </div>
        ) : (
          <>
            <svg width="24" height="24" fill="none" stroke="rgba(196,145,79,0.5)" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginBottom: "8px" }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>
              Click to upload or drag & drop
            </p>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
              PNG, JPG, WEBP — first image is the main product image
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef} type="file"
        accept="image/*" multiple
        style={{ display: "none" }}
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

// ─── Product Form Modal ───────────────────────────────────────────────
function ProductModal({ product, onClose, onSaved }) {
  const isEdit = !!product?.id;
  const [form, setForm] = useState(isEdit ? {
    ...product,
    variants: JSON.stringify(product.variants || []),
    images: product.images || [],
  } : EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

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
      images: form.images,
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
        borderRadius: "12px", width: "100%", maxWidth: "600px",
        maxHeight: "92vh", overflowY: "auto", padding: "32px",
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

          {/* ── Image Upload ── */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ ...labelStyle, marginBottom: "10px" }}>
              Product Images
              {form.images.length > 0 && (
                <span style={{ marginLeft: "8px", color: "rgba(196,145,79,0.6)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                  ({form.images.length} uploaded)
                </span>
              )}
            </label>
            <ImageUploader
              images={form.images}
              onChange={(imgs) => set("images", imgs)}
            />
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
            flex: 1, padding: "11px", background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px",
            fontFamily: "'Jost',sans-serif", fontSize: "13px",
            color: "rgba(255,255,255,0.5)", cursor: "pointer",
          }}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={{
            flex: 2, padding: "11px",
            background: saving ? "rgba(196,145,79,0.4)" : "#C4914F",
            border: "none", borderRadius: "6px",
            fontFamily: "'Jost',sans-serif", fontSize: "13px",
            fontWeight: 600, color: "#fff",
            cursor: saving ? "not-allowed" : "pointer", transition: "background 0.2s",
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
    // Also delete images from storage
    if (product.images?.length) {
      const paths = product.images.map((url) => url.split("/product-images/")[1]).filter(Boolean);
      if (paths.length) await supabase.storage.from("product-images").remove(paths);
    }
    await supabase.from("products").delete().eq("id", product.id);
    onDeleted(product.id);
  };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div style={{ background: "#131110", border: "1px solid rgba(220,60,60,0.3)", borderRadius: "12px", padding: "32px", maxWidth: "400px", width: "100%", textAlign: "center" }}>
        <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "20px", color: "#FFFFFF", marginBottom: "10px" }}>Delete Product?</p>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "24px" }}>
          "<span style={{ color: "#C4914F" }}>{product.name}</span>" and all its images will be permanently deleted.
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
  const [modal, setModal]       = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: true });
    setProducts(data || []);
    setLoading(false);
  }

  const toggleFeatured = async (product) => {
    setProducts((prev) => prev.map((p) => p.id === product.id ? { ...p, featured: !p.featured } : p));
    await supabase.from("products").update({ featured: !product.featured }).eq("id", product.id);
  };

  const toggleStock = async (product) => {
    setProducts((prev) => prev.map((p) => p.id === product.id ? { ...p, in_stock: !p.in_stock } : p));
    await supabase.from("products").update({ in_stock: !product.in_stock }).eq("id", product.id);
  };

  const handleSaved   = () => { setModal(null); fetchProducts(); };
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
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        input:focus, textarea:focus, select:focus { outline: none; border-color: rgba(196,145,79,0.4) !important; }
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
          fontSize: "13px", fontWeight: 500, color: "#C4914F", cursor: "pointer", transition: "all 0.2s",
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
                  {["Product", "Category", "Price", "Rating", "Images", "Featured", "Stock", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="prod-row" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.15s" }}>

                    {/* Name + slug */}
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {/* Thumbnail */}
                        <div style={{ width: "36px", height: "36px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, background: "#0e0c0a", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                          ) : (
                            <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" viewBox="0 0 24 24">
                              <rect x="3" y="3" width="18" height="18" rx="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <path d="m21 15-5-5L5 21"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 500, color: "#FFFFFF", marginBottom: "2px" }}>{product.name}</p>
                          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{product.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: "14px 16px", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{product.category || "—"}</td>

                    {/* Price */}
                    <td style={{ padding: "14px 16px", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#C4914F" }}>${parseFloat(product.price).toFixed(2)}</td>

                    {/* Rating */}
                    <td style={{ padding: "14px 16px", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>★ {parseFloat(product.rating || 5).toFixed(1)}</td>

                    {/* Image count */}
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        fontFamily: "'Jost',sans-serif", fontSize: "12px",
                        color: product.images?.length ? "#3ecfa0" : "rgba(255,255,255,0.25)",
                      }}>
                        {product.images?.length || 0} photo{product.images?.length !== 1 ? "s" : ""}
                      </span>
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
                        <button onClick={() => setModal({ type: "edit", product })} style={{ padding: "5px 12px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "5px", fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(196,145,79,0.4)"; e.currentTarget.style.color = "#C4914F"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                        >Edit</button>
                        <button onClick={() => setModal({ type: "delete", product })} style={{ padding: "5px 12px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "5px", fontFamily: "'Jost',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s" }}
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
      {modal?.type === "add"    && <ProductModal product={null}          onClose={() => setModal(null)} onSaved={handleSaved}/>}
      {modal?.type === "edit"   && <ProductModal product={modal.product}  onClose={() => setModal(null)} onSaved={handleSaved}/>}
      {modal?.type === "delete" && <DeleteModal  product={modal.product}  onClose={() => setModal(null)} onDeleted={handleDeleted}/>}
    </>
  );
}