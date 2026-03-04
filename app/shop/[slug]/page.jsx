// app/shop/[slug]/page.jsx

import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import ProductDetailsTop from "@/app/Components/ProductDetailsTop";
 import ProductDetailsContent from "@/app/Components/ProductDetailsContent";
import ProductReviews from "@/app/Components/ProductReviews";
import DiscoverMore from "@/app/Components/DiscoverMore";

// ✅ Make it async and await params
export default async function ProductPage({ params }) {
  const { slug } = await params;

  return (
    <>
      <Navbar />
      <ProductDetailsTop slug={slug} />
      <ProductDetailsContent slug={slug} />
      <ProductReviews />
      <DiscoverMore />
      <Footer />
    </>
  );
}


// import ProductDetailsContent from "@/app/Components/ProductDetailsContent";

// export default async function ProductPage({ params }) {
//   const { slug } = await params;
//   return (
//     <>
//       <Navbar />
//       <ProductDetailsTop slug={slug} />
//       <ProductDetailsContent slug={slug} />  {/* ← add here */}
//       <Footer />
//     </>
//   );
// }