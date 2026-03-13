// app/Components/FooterPageLayout.jsx
import Link from "next/link";
import Navbar from "@/app/Components/Navbar";

export default function FooterPageLayout({ title, subtitle, children }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .footer-prose p  { font-family: 'Jost',sans-serif; font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.58); line-height: 1.9; margin-bottom: 16px; }
        .footer-prose h2 { font-family: 'Playfair Display',Georgia,serif; font-size: 20px; font-weight: 600; color: #C4914F; margin: 40px 0 14px; }
        .footer-prose h3 { font-family: 'Jost',sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.85); margin: 24px 0 8px; letter-spacing: 0.02em; }
        .footer-prose ul { padding-left: 20px; margin-bottom: 16px; }
        .footer-prose ul li { font-family: 'Jost',sans-serif; font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.58); line-height: 1.9; }
        .footer-prose a { color: #C4914F; text-decoration: underline; text-underline-offset: 3px; }
        .footer-prose a:hover { color: #d4a870; }
        .divider { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 8px 0 32px; }
        .back-link { font-family: 'Jost',sans-serif; font-size: 13px; color: rgba(255,255,255,0.4); text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: color 0.2s; }
        .back-link:hover { color: #C4914F; }
      `}</style>

      <main style={{ background: "#0A0806", minHeight: "100vh" }}>
        <Navbar />

        {/* Hero */}
        <div style={{ paddingTop: "120px", paddingBottom: "56px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", color: "rgba(196,145,79,0.6)", textTransform: "uppercase", marginBottom: "14px" }}>
            Velyscent
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 600, color: "#FFFFFF", marginBottom: "14px", letterSpacing: "0.01em" }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.4)", maxWidth: "480px", margin: "0 auto" }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 40px 100px" }}>
          <div className="footer-prose">{children}</div>

          {/* Back link */}
          <div style={{ marginTop: "56px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <Link href="/" className="back-link">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}