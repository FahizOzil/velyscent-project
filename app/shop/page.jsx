// app/shop/page.jsx
import Navbar from "@/app/Components/Navbar";
import ShopProductsSection from "@/app/Components/ShopProductsSection";
import { getAllProducts, getCategories } from "@/lib/productsService";

export const revalidate = 60; // ISR — refresh every 60 seconds

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <main style={{ background: "#0A0806" }}>
      <Navbar />
      <ShopProductsSection products={products} categories={categories} />
    </main>
  );
}