import Image from "next/image";
import Navbar from "@/app/Components/Navbar";

import Footer from "@/app/Components/Footer";
import ShopProductsSection from "../Components/ShopProductsSection";
import ShopOfferBanner from "../Components/ShopOfferBanner";
import ShopOfferBannerGold from "../Components/ShopOfferBannerGold";

export default function Shop() {
  return (
     <main style={{ margin: 0, padding: 0, background: "#0A0806" }}>
      <Navbar />
      <ShopProductsSection />
      <ShopOfferBanner />
      <ShopOfferBannerGold />
      <Footer />
    </main>
  );
}
