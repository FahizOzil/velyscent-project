"use client";

// ─── What Makes Us Unique Section ────────────────────────────────────
export default function AboutUnique() {
  const features = [
    {
      title: "Locally Inspired",
      body: "Our perfumes are meticulously crafted to reflect the cultural heritage, traditions, and landscapes of various regions. From the vibrant streets of Marrakech to the serene cherry blossom gardens of Kyoto, each fragrance tells a unique story that resonates with its origin.",
    },
    {
      title: "High-Quality Ingredients",
      body: "We believe that the key to an extraordinary scent lies in the quality of ingredients. That's why we collaborate with expert perfumers who source the finest and ethically-sourced materials from around the world. We never compromise on the quality of our products, ensuring a long-lasting and luxurious experience.",
    },
    {
      title: "Personalized Service",
      body: "We understand that choosing the perfect scent is a deeply personal experience. Our team of fragrance experts is always ready to assist you in finding a fragrance that complements your personality and style. Whether you're exploring new scents or seeking to rediscover an old favorite, we're here to guide you every step of the way.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .unique-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section style={{
        width: "100%",
        background: "#0A0806",
        padding: "80px 0 96px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            color: "#C4914F",
            textAlign: "center",
            marginBottom: "56px",
            letterSpacing: "0.01em",
            animation: "fadeUp 0.8s ease forwards",
          }}>
            What Makes Us Unique
          </h2>

          {/* ── 3-column grid ── */}
          <div className="unique-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "48px",
            marginBottom: "72px",
          }}>
            {features.map((f, i) => (
              <div key={i} style={{ animation: `fadeUp ${0.7 + i * 0.15}s ease forwards` }}>
                {/* Gold accent line */}
                <div style={{
                  width: "28px", height: "2px",
                  background: "#C4914F",
                  marginBottom: "16px",
                  borderRadius: "1px",
                }} />

                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  marginBottom: "14px",
                  letterSpacing: "0.01em",
                  lineHeight: 1.3,
                }}>
                  {f.title}
                </h3>

                <p style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.85,
                }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>

          {/* ── Closing text ── */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: "48px",
            maxWidth: "820px",
            animation: "fadeUp 1s ease forwards",
          }}>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.85,
              marginBottom: "24px",
            }}>
              Join us on this olfactory adventure as we celebrate the diverse tapestry of scents from around the world. Discover the captivating aromas that embrace the essence of local cultures and connect with the beauty of our shared humanity.
            </p>

            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.85,
              marginBottom: "24px",
            }}>
              Thank you for being a part of our journey.
            </p>

            <div>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.6,
              }}>
                With love and gratitude,
              </p>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "15px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.75)",
                marginTop: "4px",
                letterSpacing: "0.02em",
              }}>
                The Velyrascent Team
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}