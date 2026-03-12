import { supabase } from "@/lib/supabase";

// ─── Fetch all products ───────────────────────────────────────────────
export async function getAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) { console.error("getAllProducts:", error.message); return []; }
  return data || [];
}

// ─── Fetch single product by slug ────────────────────────────────────
export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) { console.error("getProductBySlug:", error.message); return null; }
  return data;
}

// ─── Fetch featured products ──────────────────────────────────────────
export async function getFeaturedProducts(limit = 8) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .limit(limit);

  if (error) { console.error("getFeaturedProducts:", error.message); return []; }
  return data || [];
}

// ─── Fetch products by category ───────────────────────────────────────
export async function getProductsByCategory(category) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category);

  if (error) { console.error("getProductsByCategory:", error.message); return []; }
  return data || [];
}

// ─── Search products ──────────────────────────────────────────────────
export async function searchProducts(query) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${query}%,category.ilike.%${query}%,description.ilike.%${query}%`);

  if (error) { console.error("searchProducts:", error.message); return []; }
  return data || [];
}

// ─── Get all unique categories ────────────────────────────────────────
export async function getCategories() {
  const { data, error } = await supabase
    .from("products")
    .select("category");

  if (error) { console.error("getCategories:", error.message); return []; }
  const unique = [...new Set(data.map((p) => p.category).filter(Boolean))];
  return unique;
}

// ─── Admin: create product ────────────────────────────────────────────
export async function createProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();
  return { data, error };
}

// ─── Admin: update product ────────────────────────────────────────────
export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

// ─── Admin: delete product ────────────────────────────────────────────
export async function deleteProduct(id) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  return { error };
}

// ─── Admin: toggle featured ───────────────────────────────────────────
export async function toggleFeatured(id, featured) {
  const { data, error } = await supabase
    .from("products")
    .update({ featured })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

// ─── Admin: toggle in_stock ───────────────────────────────────────────
export async function toggleInStock(id, in_stock) {
  const { data, error } = await supabase
    .from("products")
    .update({ in_stock })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}