import Image from "next/image";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import WelcomeSection from "./Components/WelcomeSection";
import OurValuesSection from "./Components/OurValuesSection";
import BestSellingSection from "./Components/BestSellingSection";
import OurCollectionsSection from "./Components/OurCollectionsSection";
import SaleBannerSection from "./Components/SaleBannerSection";
import LatestArticlesSection from "./Components/LatestArticlesSection";
import Footer from "./Components/Footer";

export default function Home() {
  return (
     <main style={{ margin: 0, padding: 0, background: "#0A0806" }}>
      <Navbar />
      <HeroSection />
      <WelcomeSection />
      <OurValuesSection />
      <BestSellingSection />
      <OurCollectionsSection />
      <SaleBannerSection />
      <LatestArticlesSection />
      <Footer />
    </main>
  );
}
