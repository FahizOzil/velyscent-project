import WishlistPage from "@/app/Components/WishlistPage";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

export default function Wishlist() {
  return (
    <main style={{ background: "#0A0806" }}>
      <Navbar />
      <WishlistPage />
      <Footer />
    </main>
  );
}