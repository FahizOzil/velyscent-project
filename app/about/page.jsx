import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import AboutHero from "@/app/Components/AboutHero";
import AboutStory from "../Components/AboutStory";
import AboutUnique from "../Components/AboutUnique";

export default function AboutPage() {
  return (
    <main style={{ margin: 0, padding: 0, background: "#0A0806" }}>
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutUnique />
      <Footer />
    </main>
  );
}