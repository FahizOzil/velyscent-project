import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import BlogHero from "@/app/Components/BlogHero";
import BlogGrid from "@/app/Components/BlogGrid";

export default function BlogPage() {
  return (
    <main style={{ margin: 0, padding: 0, background: "#0A0806" }}>
      <Navbar />
      <BlogHero />
      <BlogGrid />    {/* ← add here */}
      <Footer />
    </main>
  );
}