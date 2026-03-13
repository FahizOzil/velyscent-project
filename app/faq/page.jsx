// app/faq/page.jsx
"use client";
import { useState } from "react";
import FooterPageLayout from "@/app/Components/FooterPageLayout";

const FAQS = [
  {
    category: "Orders & Payment",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept credit and debit cards (Visa, Mastercard) via Safepay, EasyPaisa, JazzCash, and Cash on Delivery (COD) for eligible areas.",
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: "Orders can be modified or cancelled within 2 hours of placement. Please contact us immediately at support@velyscent.com. Once an order has been dispatched, it cannot be cancelled.",
      },
      {
        q: "Is it safe to enter my card details on your website?",
        a: "Absolutely. All card payments are processed through Safepay, a PCI-DSS compliant payment gateway. We never store your card details on our servers.",
      },
      {
        q: "Will I receive an order confirmation?",
        a: "Yes, an order confirmation email is sent to your registered email address immediately after placing your order. Please check your spam folder if you don't see it.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 3–5 business days within Pakistan. Express delivery (1–2 business days) is available in major cities. International shipping timelines vary by destination.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer free standard shipping on all orders over $200. Orders below this threshold are charged a flat shipping fee.",
      },
      {
        q: "Can I track my order?",
        a: "Once your order is dispatched, you will receive a tracking number via email. You can use this to track your shipment through our courier partner's website.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to select international destinations. International shipping rates and timelines are calculated at checkout based on your location.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 7 days of delivery for unopened, unused products in their original packaging. Please visit our Shipping & Returns page for full details.",
      },
      {
        q: "How do I initiate a return?",
        a: "Email us at returns@velyscent.com with your order number and reason for return. Our team will guide you through the process within 24 hours.",
      },
      {
        q: "When will I receive my refund?",
        a: "Once we receive and inspect the returned item, refunds are processed within 5–7 business days. The amount will be credited to your original payment method.",
      },
      {
        q: "What if I receive a damaged or incorrect product?",
        a: "We sincerely apologise for any such experience. Please email us at support@velyscent.com with your order number and photos of the issue within 48 hours of delivery, and we will arrange a replacement or full refund.",
      },
    ],
  },
  {
    category: "Products & Fragrance",
    items: [
      {
        q: "Are your fragrances genuine?",
        a: "Yes, all Velyscent fragrances are 100% authentic. We source only from verified suppliers and maintain strict quality control throughout our production process.",
      },
      {
        q: "How long do your fragrances last?",
        a: "Our fragrances are long-lasting, typically 8–12 hours depending on skin type, weather, and application method. Applying to pulse points such as the wrists, neck, and behind the ears enhances longevity.",
      },
      {
        q: "How should I store my perfume?",
        a: "Store your fragrance in a cool, dry place away from direct sunlight and extreme temperatures. Avoid keeping perfumes in bathrooms due to humidity. The original box provides the best protection.",
      },
      {
        q: "Do you offer samples or testers?",
        a: "We currently do not offer samples. However, we do have a curated selection of smaller sizes (50ml) for fragrances you'd like to try before committing to a full bottle.",
      },
    ],
  },
  {
    category: "Account & Privacy",
    items: [
      {
        q: "Do I need an account to place an order?",
        a: "You can browse our catalogue without an account, but creating one is required to place an order. It also gives you access to your order history, wishlist, and faster checkout.",
      },
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the sign-in page and enter your email address. You will receive a password reset link within a few minutes.",
      },
      {
        q: "How is my personal data used?",
        a: "We use your data solely to process orders and improve your experience. We never sell your data to third parties. Please read our Privacy Policy for full details.",
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      transition: "background 0.2s",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: "16px", padding: "18px 0",
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: open ? 500 : 400, color: open ? "#C4914F" : "rgba(255,255,255,0.8)", transition: "color 0.2s", lineHeight: 1.5 }}>
          {q}
        </span>
        <span style={{ flexShrink: 0, width: "22px", height: "22px", borderRadius: "50%", border: `1px solid ${open ? "rgba(196,145,79,0.4)" : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
          <svg width="10" height="10" fill="none" stroke={open ? "#C4914F" : "rgba(255,255,255,0.5)"} strokeWidth="2" viewBox="0 0 24 24" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s" }}>
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </span>
      </button>

      {open && (
        <div style={{ paddingBottom: "18px" }}>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.9 }}>
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <FooterPageLayout
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about ordering, shipping, and our fragrances."
    >
      {FAQS.map((section) => (
        <div key={section.category} style={{ marginBottom: "40px" }}>
          <h2>{section.category}</h2>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {section.items.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      ))}

      <div style={{ marginTop: "48px", padding: "28px", background: "rgba(196,145,79,0.06)", border: "1px solid rgba(196,145,79,0.15)", borderRadius: "10px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 400, color: "rgba(255,255,255,0.6)", marginBottom: "12px" }}>
          Still have questions?
        </p>
        <a href="/contact" style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#C4914F", textDecoration: "none", padding: "9px 24px", border: "1px solid rgba(196,145,79,0.35)", borderRadius: "6px", display: "inline-block", transition: "all 0.2s" }}>
          Contact Us
        </a>
      </div>
    </FooterPageLayout>
  );
}