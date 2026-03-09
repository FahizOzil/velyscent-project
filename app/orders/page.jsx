import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import OrdersPage from "@/app/Components/OrdersPage";

export default function Orders() {
  return (
    <main style={{ background: "#0A0806" }}>
      <Navbar />
      <OrdersPage />
      <Footer />
    </main>
  );
}