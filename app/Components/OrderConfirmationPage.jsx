"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function OrderConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("id");
  const method = params.get("method");
  const [dots, setDots] = useState(".");

  // Animate dots
  useEffect(() => {
    const t = setInterval(() => setDots((d) => d.length >= 3 ? "." : d + "."), 500);
    return () => clearInterval(t);
  }, []);

  const isCOD = method === "cod";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes circlePulse {
          0%   { transform: scale(0.8); opacity: 0; }
          60%  { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#0A0806",
        display: "flex", alignItems: "center",
        justifyContent: "center", padding: "40px 20px",
      }}>
        <div style={{
          maxWidth: "520px", width: "100%",
          textAlign: "center",
          animation: "fadeUp 0.8s ease forwards",
        }}>

          {/* Success icon */}
          <div style={{
            width: "96px", height: "96px", margin: "0 auto 32px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(196,145,79,0.2), rgba(196,145,79,0.05))",
            border: "2px solid rgba(196,145,79,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "circlePulse 0.7s ease forwards",
          }}>
            <svg width="44" height="44" fill="none" stroke="#C4914F"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              viewBox="0 0 24 24">
              <polyline
                points="20 6 9 17 4 12"
                style={{
                  strokeDasharray: 100,
                  strokeDashoffset: 0,
                  animation: "checkDraw 0.5s ease 0.3s both",
                }}
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700,
            color: "#FFFFFF", marginBottom: "12px",
          }}>
            {isCOD ? "Order Placed!" : "Payment Successful!"}
          </h1>

          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "15px", fontWeight: 300,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7, marginBottom: "32px",
          }}>
            {isCOD
              ? "Your order has been placed successfully. Our team will contact you shortly to confirm delivery."
              : "Your payment was processed successfully. You will receive a confirmation email shortly."}
          </p>

          {/* Order ID */}
          {orderId && (
            <div style={{
              background: "rgba(196,145,79,0.07)",
              border: "1px solid rgba(196,145,79,0.2)",
              borderRadius: "8px", padding: "16px 24px",
              marginBottom: "32px", display: "inline-block",
            }}>
              <p style={{
                fontFamily: "'Jost', sans-serif", fontSize: "11px",
                fontWeight: 500, letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.4)", textTransform: "uppercase",
                marginBottom: "6px",
              }}>
                Order ID
              </p>
              <p style={{
                fontFamily: "'Jost', sans-serif", fontSize: "13px",
                fontWeight: 500, color: "#C4914F",
                letterSpacing: "0.04em",
              }}>
                {orderId}
              </p>
            </div>
          )}

          {/* COD info boxes */}
          {isCOD && (
            <div style={{
              display: "flex", flexDirection: "column", gap: "12px",
              marginBottom: "36px", textAlign: "left",
            }}>
              {[
                { icon: "📦", title: "Processing", desc: "Your order is being prepared for dispatch." },
                { icon: "🚚", title: "Delivery", desc: "Estimated delivery within 3–5 business days." },
                { icon: "💵", title: "Payment", desc: "Pay in cash when your order arrives at your door." },
              ].map((item) => (
                <div key={item.title} style={{
                  display: "flex", alignItems: "flex-start", gap: "14px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "8px", padding: "14px 16px",
                }}>
                  <span style={{ fontSize: "20px", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{
                      fontFamily: "'Jost', sans-serif", fontSize: "13px",
                      fontWeight: 500, color: "#fff", marginBottom: "3px",
                    }}>
                      {item.title}
                    </p>
                    <p style={{
                      fontFamily: "'Jost', sans-serif", fontSize: "12px",
                      fontWeight: 300, color: "rgba(255,255,255,0.45)",
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/shop" style={{
              padding: "13px 28px",
              background: "#C4914F", borderRadius: "6px",
              color: "#fff", fontFamily: "'Jost', sans-serif",
              fontSize: "13px", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              textDecoration: "none", transition: "all 0.25s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#b07d3f"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#C4914F"}
            >
              Continue Shopping
            </Link>
            <Link href="/orders" style={{
              padding: "13px 28px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "6px", color: "rgba(255,255,255,0.65)",
              fontFamily: "'Jost', sans-serif", fontSize: "13px",
              fontWeight: 500, letterSpacing: "0.06em",
              textTransform: "uppercase", textDecoration: "none",
              transition: "all 0.25s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C4914F"; e.currentTarget.style.color = "#C4914F"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
            >
              My Orders
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: "100vh", background: "#0A0806",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <p style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.4)" }}>
          Loading...
        </p>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}