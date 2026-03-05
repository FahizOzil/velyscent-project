import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import BlogDetailPage from "@/app/Components/BlogDetailPage";

export default async function BlogPost({ params }) {
  const { slug } = await params;
  return (
    <main style={{ margin: 0, padding: 0, background: "#0A0806" }}>
      <Navbar />
      <BlogDetailPage slug={slug} />
      <Footer />
    </main>
  );
}

