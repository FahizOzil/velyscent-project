"use client";
import { useState } from "react";

// ─── Social Icons ─────────────────────────────────────────────────────
const TwitterIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const footerLinks = [
  {
    heading: "Categories",
    links: ["Fashion", "Jewelry", "Sports", "Electronics", "Indoor"],
  },
  {
    heading: "Shopping",
    links: ["Payments", "Delivery options", "Buyer protection"],
  },
  {
    heading: "Customer care",
    links: [
      "Help center",
      "Terms & Conditions",
      "Privacy policy",
      "Returns & refund",
      "Survey & feedback",
    ],
  },
  {
    heading: "Pages",
    links: ["About Us", "Shop", "Contact Us", "Blog"],
  },
];

const socialIcons = [
  { Icon: TwitterIcon,   label: "Twitter"   },
  { Icon: FacebookIcon,  label: "Facebook"  },
  { Icon: LinkedInIcon,  label: "LinkedIn"  },
  { Icon: InstagramIcon, label: "Instagram" },
];

// ─── Footer ───────────────────────────────────────────────────────────
export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [btnHov, setBtnHov] = useState(false);

  const handleSubmit = () => {
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .footer-link {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.2s;
          line-height: 1;
        }
        .footer-link:hover { color: #C4914F; }

        @media (max-width: 900px) {
          .footer-main { flex-direction: column !important; gap: 40px !important; }
          .footer-links-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-links-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <footer
        style={{
          width: "100%",
          background: "#0D0B09",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Main footer body */}
        <div
          style={{
            maxWidth: "1160px",
            margin: "0 auto",
            padding: "56px 48px 48px",
          }}
        >
          <div
            className="footer-main"
            style={{
              display: "flex",
              gap: "64px",
              alignItems: "flex-start",
            }}
          >
            {/* Left: Brand + newsletter + socials */}
            <div style={{ flexShrink: 0, maxWidth: "260px" }}>
              {/* Logo */}
              <a
                href="#"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#C4914F",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "20px",
                  letterSpacing: "0.02em",
                }}
              >
                Velyrascent
              </a>

              {/* Newsletter label */}
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  marginBottom: "8px",
                }}
              >
                Subscribe to Our Newsletter:
              </p>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "12.5px",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.6,
                  marginBottom: "18px",
                }}
              >
                Receive Updates on New Arrivals and Special Promotions!
              </p>

              {/* Email input + submit */}
              <div
                style={{
                  display: "flex",
                  gap: "0",
                  marginBottom: "28px",
                  height: "40px",
                }}
              >
                <input
                  type="email"
                  placeholder="Your email here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "0 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRight: "none",
                    borderRadius: "4px 0 0 4px",
                    color: "#fff",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "12px",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleSubmit}
                  onMouseEnter={() => setBtnHov(true)}
                  onMouseLeave={() => setBtnHov(false)}
                  style={{
                    padding: "0 18px",
                    background: btnHov ? "#b07d3f" : "#C4914F",
                    border: "none",
                    borderRadius: "0 4px 4px 0",
                    color: "#fff",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {submitted ? "✓ Sent!" : "Submit"}
                </button>
              </div>

              {/* Social icons */}
              <div style={{ display: "flex", gap: "10px" }}>
                {socialIcons.map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.65)",
                      transition: "all 0.2s",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(196,145,79,0.15)";
                      e.currentTarget.style.borderColor = "#C4914F";
                      e.currentTarget.style.color = "#C4914F";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                    }}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Link columns */}
            <div
              className="footer-links-grid"
              style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "32px",
              }}
            >
              {footerLinks.map((col) => (
                <div key={col.heading}>
                  <h4
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "13.5px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      marginBottom: "18px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {col.heading}
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="footer-link">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "18px 48px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "12px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.04em",
            }}
          >
            © 2025 Velyrascent Inc. All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
}