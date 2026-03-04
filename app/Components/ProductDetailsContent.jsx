"use client";

// ─── Product Details Content Section ─────────────────────────────────
export default function ProductDetailsContent({ slug }) {

  // ── Per-product content — add new slugs here as needed ──
  const content = {
    "luxurious-elixir": {
      productDetails: `Step into a world of unparalleled opulence with Luxurious Elixir, an exquisite fragrance that weaves an enchanting symphony of gold and luxury. This gilded elixir is a celebration of sophistication, crafted with the finest essences and imbued with the allure of precious golden hues. From the first spritz to the lingering dry-down, Luxurious Elixir promises an intoxicating experience that embodies the essence of lavish indulgence.`,
      sections: [
        {
          title: "The Golden Overture",
          body: `Luxurious Elixir opens with a grand flourish of radiant citrus and sun-kissed fruits, reminiscent of golden rays caressing your senses. The opulent heart unfolds with a bouquet of velvety roses and rare blooms, their essence radiating with the allure of gilded petals. As the fragrance settles, a sumptuous blend of warm amber, creamy vanilla, and smooth sandalwood evokes a sense of ultimate luxury and refinement.`,
        },
        {
          title: "The Heart of Elegance",
          body: `Luxurious Elixir is the embodiment of elegance, drawing you into a world where glamour and prestige unite. With every spritz, the fragrance weaves a tapestry of glistening gold around you, enhancing your allure and capturing the admiration of those around.`,
        },
        {
          title: "The Ultimate Expression of Luxury",
          body: `Luxurious Elixir makes an extraordinary gift, an expression of your discerning taste and admiration for the extraordinary. Delight your loved ones with this lavish elixir, a symbol of admiration and adoration.`,
        },
      ],
      keyNotes: {
        top:   { label: "Citrus Accord, Sun-kissed Fruits",  /* img: "/images/notes/citrus.jpg" */ },
        heart: { label: "Golden Roses, Rare Blooms",         /* img: "/images/notes/roses.jpg" */ },
        base:  { label: "Amber, Vanilla, Sandalwood",        /* img: "/images/notes/amber.jpg" */ },
      },
    },
    // ── add more slugs here ──
  };

  const data = content[slug] || content["luxurious-elixir"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .notes-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section style={{
        width: "100%",
        background: "#0A0806",
        padding: "56px 0 80px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

          {/* ── Product Details ── */}
          <div style={{ marginBottom: "64px", animation: "fadeUp 0.8s ease forwards" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(20px, 2.2vw, 26px)",
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: "20px",
              letterSpacing: "0.01em",
            }}>
              Product Details
            </h2>
            <div style={{
              width: "40px", height: "1px",
              background: "linear-gradient(to right, #C4914F, transparent)",
              marginBottom: "20px",
            }} />
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.85,
              maxWidth: "760px",
            }}>
              {data.productDetails}
            </p>
          </div>

          {/* ── Story Sections ── */}
          {data.sections.map((sec, i) => (
            <div key={i} style={{ marginBottom: "56px" }}>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(18px, 2vw, 22px)",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "20px",
                letterSpacing: "0.01em",
              }}>
                {sec.title}
              </h3>
              <div style={{
                width: "32px", height: "1px",
                background: "linear-gradient(to right, #C4914F, transparent)",
                marginBottom: "18px",
              }} />
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.85,
                maxWidth: "760px",
              }}>
                {sec.body}
              </p>

              {/* Key Notes — insert after first section */}
              {i === 0 && (
                <div style={{ marginTop: "48px" }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(18px, 2vw, 22px)",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "32px",
                    letterSpacing: "0.01em",
                  }}>
                    Key Notes
                  </h3>

                  <div className="notes-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "32px",
                  }}>
                    {[
                      { type: "Top Note",   ...data.keyNotes.top   },
                      { type: "Heart Note", ...data.keyNotes.heart },
                      { type: "Base Note",  ...data.keyNotes.base  },
                    ].map((note) => (
                      <div key={note.type} style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "12px",
                        textAlign: "center",
                      }}>
                        {/* Note type label */}
                        <p style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "rgba(255,255,255,0.75)",
                          letterSpacing: "0.04em",
                        }}>
                          {note.type}
                        </p>

                        {/* Note ingredient label */}
                        <p style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "13px",
                          fontWeight: 300,
                          color: "rgba(255,255,255,0.45)",
                          letterSpacing: "0.02em",
                          marginBottom: "8px",
                        }}>
                          {note.label}
                        </p>

                        {/* Circular image */}
                        <div style={{
                          width: "140px",
                          height: "140px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          border: "1px solid rgba(196,145,79,0.25)",
                          background: "linear-gradient(160deg, #1c1916 0%, #0e0c0a 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                        }}>
                          {/*
                            Replace with:
                            <img
                              src={note.img}
                              alt={note.label}
                              style={{ width:'100%', height:'100%', objectFit:'cover' }}
                            />
                          */}
                          <div style={{
                            display: "flex", flexDirection: "column",
                            alignItems: "center", gap: "6px",
                          }}>
                            <svg width="24" height="24" fill="none"
                              stroke="rgba(196,145,79,0.35)" strokeWidth="1.2" viewBox="0 0 24 24">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <path d="m21 15-5-5L5 21" />
                            </svg>
                            <span style={{
                              fontFamily: "'Jost', sans-serif",
                              fontSize: "8px",
                              letterSpacing: "0.15em",
                              color: "rgba(196,145,79,0.3)",
                              textTransform: "uppercase",
                            }}>
                              Note Image
                            </span>
                          </div>

                          {/* Gold glow */}
                          <div style={{
                            position: "absolute", inset: 0,
                            background: "radial-gradient(circle at 50% 60%, rgba(196,145,79,0.07) 0%, transparent 70%)",
                            pointerEvents: "none",
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

        </div>
      </section>
    </>
  );
}