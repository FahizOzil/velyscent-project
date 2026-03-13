"use client";
// app/contact/page.jsx
import FooterPageLayout from "@/app/Components/FooterPageLayout";

const INFO = [
  {
    icon: `<svg width="22" height="22" fill="none" stroke="#C4914F" stroke-width="1.6" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    label: "Email",
    value: "support@velyscent.com",
    href: "mailto:support@velyscent.com",
    note: "We reply within 24 hours",
  },
  {
    icon: `<svg width="22" height="22" fill="none" stroke="#C4914F" stroke-width="1.6" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    label: "WhatsApp",
    value: "+92 300 000 0000",
    href: "https://wa.me/923000000000",
    note: "Mon – Sat, 10am – 7pm PKT",
  },
  {
    icon: `<svg width="22" height="22" fill="none" stroke="#C4914F" stroke-width="1.6" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    label: "Instagram",
    value: "@velyscent",
    href: "https://instagram.com/velyscent",
    note: "DMs open for enquiries",
  },
  {
    icon: `<svg width="22" height="22" fill="none" stroke="#C4914F" stroke-width="1.6" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    label: "Location",
    value: "Karachi, Pakistan",
    href: null,
    note: "Online store — no walk-ins",
  },
];

export default function Contact() {
  return (
    <>
      <style>{`
        .contact-card { transition: border-color 0.2s; }
        .contact-card:hover { border-color: rgba(196,145,79,0.3) !important; }
        .contact-link { transition: color 0.2s; color: #FFFFFF !important; text-decoration: none; font-family: 'Jost',sans-serif; font-size: 16px; font-weight: 500; display: block; margin-bottom: 6px; }
        .contact-link:hover { color: #C4914F !important; }
      `}</style>

      <FooterPageLayout
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out through any of the channels below."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "48px" }}>
          {INFO.map((item) => (
            <div key={item.label} className="contact-card" style={{
              background: "#131110", border: "1px solid rgba(196,145,79,0.12)",
              borderRadius: "10px", padding: "28px 24px",
            }}>
              <div
                style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(196,145,79,0.08)", border: "1px solid rgba(196,145,79,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}
                dangerouslySetInnerHTML={{ __html: item.icon }}
              />
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>
                {item.label}
              </p>
              {item.href ? (
                <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="contact-link">
                  {item.value}
                </a>
              ) : (
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "16px", fontWeight: 500, color: "#FFFFFF", marginBottom: "6px" }}>
                  {item.value}
                </p>
              )}
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.35)" }}>
                {item.note}
              </p>
            </div>
          ))}
        </div>

        <div style={{ padding: "24px 28px", background: "rgba(196,145,79,0.05)", border: "1px solid rgba(196,145,79,0.12)", borderRadius: "10px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <svg width="18" height="18" fill="none" stroke="#C4914F" strokeWidth="1.8" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: "1px" }}>
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <div>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.75)", marginBottom: "4px" }}>Our Response Times</p>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
              Email enquiries are answered within 24 hours on business days. WhatsApp responses are typically within a few hours during business hours (Mon–Sat, 10am–7pm PKT). For urgent order issues, WhatsApp is the fastest way to reach us.
            </p>
          </div>
        </div>
      </FooterPageLayout>
    </>
  );
}