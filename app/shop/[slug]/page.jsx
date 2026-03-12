// app/shop/[slug]/page.jsx
import { notFound } from "next/navigation";
import Navbar from "@/app/Components/Navbar";
import ProductDetailsTop from "@/app/Components/ProductDetailsTop";
import ProductDetailsContent from "@/app/Components/ProductDetailsContent";
import ProductReviews from "@/app/Components/ProductReviews";
import DiscoverMore from "@/app/Components/DiscoverMore";
import { getProductBySlug, getAllProducts } from "@/lib/productsService";

export const revalidate = 60;

// ─── Pre-generate all product slugs at build time ─────────────────────
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

// ─── Dynamic page metadata ────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found — Velyscent" };
  return {
    title: `${product.name} — Velyscent`,
    description: product.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getAllProducts(),
  ]);

  if (!product) notFound();

  // Related products — same category, exclude current
  const related = allProducts
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, 6);

  return (
    <main style={{ background: "#0A0806" }}>
      <Navbar />
      <ProductDetailsTop product={product} />
      <ProductDetailsContent product={product} />
      <ProductReviews productId={product.id} rating={product.rating} reviewCount={product.review_count} />
      <DiscoverMore products={related} />
    </main>
  );
}