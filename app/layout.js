import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import SearchModal from "@/app/Components/SearchModal";

export const metadata = {
  title: {
    default: "Velyscent — Premium Fragrances",
    template: "%s — Velyscent",
  },
  description:
    "Discover Velyscent's premium collection of luxury fragrances. Elevate your spirit with our Victory Scented perfumes, crafted with the finest ingredients from around the world.",
  keywords: ["perfume", "fragrance", "luxury", "oud", "velyscent", "premium scents"],
  openGraph: {
    title: "Velyscent — Premium Fragrances",
    description: "Discover Velyscent's premium collection of luxury fragrances.",
    url: "https://velyscent-project.vercel.app",
    siteName: "Velyscent",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0A0806" }}>
        <AuthProvider>
          <SearchModal />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}