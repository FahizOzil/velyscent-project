import CartPage from "@/app/Components/CartPage";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

export default function Cart() {
  return (
    <main style={{ background: "#0A0806" }}>
      <Navbar />
      <CartPage />
      <Footer />
    </main>
  );
}