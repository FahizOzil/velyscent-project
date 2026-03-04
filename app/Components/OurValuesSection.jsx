"use client";

// ─── Our Values Section ───────────────────────────────────────────────
export default function OurValuesSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .values-grid { grid-template-columns: 1fr !important; }
          .values-image { min-height: 300px !important; }
        }
      `}</style>

      {/* ── PART 2: Our Values ── */}
      <section
        style={{
          width: "100%",
          background: "#0D0B09",
        }}
      >
        <div
          className="values-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "500px",
          }}
        >
          {/* Left: Image */}
          <div
            className="values-image"
            style={{
              position: "relative",
              minHeight: "480px",
              overflow: "hidden",
            }}
          >
            {/*
              Replace the div below with:
              <img
                src="/images/values-bottle.jpg"
                alt="Velyscent perfume bottle with botanicals"
                style={{ width:'100%', height:'100%', objectFit:'cover',
                         objectPosition:'center' }}
              />
            */}
            <div
              style={{
                width: "100%",
                height: "100%",
                minHeight: "480px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed rgba(196,145,79,0.25)",
                background: "rgba(196,145,79,0.04)",
                gap: "12px",
              }}
            >
              <svg
                width="44"
                height="44"
                fill="none"
                stroke="rgba(196,145,79,0.45)"
                strokeWidth="1.2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "rgba(196,145,79,0.4)",
                  textTransform: "uppercase",
                }}
              >
                Values Image
              </span>
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "11px",
                  color: "rgba(196,145,79,0.3)",
                  letterSpacing: "0.05em",
                }}
              >
                {/* Replace with perfume bottle + botanicals photo */}
              </span>
            </div>
          </div>

          {/* Right: Text Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "64px 56px",
              background: "#0D0B09",
              animation: "fadeUp 1s ease forwards",
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(26px, 3vw, 40px)",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "32px",
                letterSpacing: "0.01em",
                textAlign: "center",
              }}
            >
              Our Values
            </h2>

            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "14.5px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.9,
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              At Velyscent, our perfume retail store is built on a foundation
              of passion and authenticity. We believe in celebrating the
              individuality of every customer, providing a diverse collection of
              scents that resonate with their unique personality and style. Our
              dedicated team of fragrance enthusiasts is committed to creating a
              welcoming and inclusive environment, where connections are
              forged, and inspiration thrives.
            </p>

            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "14.5px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.9,
                textAlign: "center",
              }}
            >
              Embracing sustainability and continuous learning, Velyscent
              strives to be more than just a shopping destination; we are a
              community that inspires and empowers individuals on their
              fragrance journey.
            </p>

            {/* Subtle gold divider accent */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "36px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, #C4914F, transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}