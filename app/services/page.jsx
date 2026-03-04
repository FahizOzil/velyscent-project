import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import ServicesHero from "@/app/Components/ServicesHero";
import ServicesList from "../Components/ServicesList";

export default function ServicesPage() {
  return (
    <main style={{ margin: 0, padding: 0, background: "#0A0806" }}>
      <Navbar />
      <ServicesHero />
      <ServicesList />
      <Footer />
    </main>
  );
}