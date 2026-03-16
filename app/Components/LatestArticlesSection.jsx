"use client";
import { useState, useEffect } from "react";

const articles = [
  {
    id: 1,
    title: "The Soothing Symphony of Lavender Perfumes: Unlocking the Secrets of a Fragrant Elixir",
    excerpt: "Lavender, with its enchanting aroma and rich history, has been cherished for centuries as a symbol of relaxation, healing, and timeless beauty. In the world of perfumery, lavender plays a key role in creating captivating fragrances loved by many.",
    slug: "lavender-perfumes",
  },
  {
    id: 2,
    title: "The Art of Curating a Luxury Perfume Collection: A Symphony of Scents and Stories",
    excerpt: "A luxury perfume collection is not just an assortment of fragrances; it is a reflection of one's taste, personality, and experiences. Each bottle holds a unique olfactory journey, crafted with the finest ingredients and artistic mastery.",
    slug: "luxury-perfume-collection",
  },
  {
    id: 3,
    title: "The Timeless Elegance of Rose Perfumes: Unveiling the Queen of Flowers in Fragrance",
    excerpt: 'Rose, often referred to as the "Queen of Flowers," has held a special place in human culture and history for centuries. Beyond its captivating beauty, this iconic bloom has also inspired perfumers to create some of the most timeless and exquisite fragrances.',
    slug: "rose-perfumes",
  },
  {
    id: 4,
    title: "Oud: The Liquid Gold of Perfumery and Its Ancient Origins",
    excerpt: "Oud, also known as agarwood, is one of the most prized and expensive raw materials in the world of perfumery. Its rich, deep, and complex scent has been treasured for centuries across cultures.",
    slug: "oud-perfumery",
  },
  {
    id: 5,
    title: "The Science Behind Fragrance: How Perfumers Craft the Perfect Scent",
    excerpt: "Creating a fine fragrance is both an art and a science. Master perfumers, known as 'noses', spend years honing their craft to blend top, heart, and base notes into a harmonious olfactory experience.",
    slug: "science-of-fragrance",
  },
];

// ─── Article Card ─────────────────────────────────────────────────────
function ArticleCard({ article }) {
  const [hovered, setHovered] = useState(false);
  const [btnHov, setBtnHov]   = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column",
        background: "#0D0B09", borderRadius: "8px",
        overflow: "hidden",
        border: hovered ? "1px solid rgba(196,145,79,0.3)" : "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.3s ease",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.5)" : "0 4px 16px rgba(0,0,0,0.25)",
      }}
    >
      {/* Image */}
      <div style={{
        position: "relative", width: "100%", aspectRatio: "4/3",
        overflow: "hidden", background: "#141210", flexShrink: 0,
      }}>
        {/*
          Replace placeholder with:
          <img src={article.img} alt={article.title}
            style={{ width:"100%",height:"100%",objectFit:"cover",
              transition:"transform 0.5s ease", transform: hovered?"scale(1.06)":"scale(1)" }} />
        */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          border: "2px dashed rgba(196,145,79,0.2)", gap: "8px",
          transition: "transform 0.5s ease",
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}>
          <svg width="32" height="32" fill="none" stroke="rgba(196,145,79,0.35)" strokeWidth="1.2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "10px", letterSpacing: "0.15em", color: "rgba(196,145,79,0.35)", textTransform: "uppercase" }}>
            Article Image
          </span>
        </div>

        {/* Gold top bar on hover */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: "linear-gradient(to right, transparent, #C4914F, transparent)",
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease", zIndex: 2,
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: "24px 22px 28px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h3 style={{
          fontFamily: "'Playfair Display',Georgia,serif",
          fontSize: "clamp(14px,1.3vw,15.5px)", fontWeight: 600,
          color: "#FFFFFF", lineHeight: 1.5,
          marginBottom: "12px", letterSpacing: "0.01em",
        }}>
          {article.title}
        </h3>

        <p style={{
          fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 300,
          color: "rgba(255,255,255,0.55)", lineHeight: 1.75,
          marginBottom: "24px", flexGrow: 1,
        }}>
          {article.excerpt}
        </p>

        <div>
          <a href={`/blog/${article.slug}`}
            onMouseEnter={() => setBtnHov(true)}
            onMouseLeave={() => setBtnHov(false)}
            style={{
              display: "inline-block", padding: "10px 22px",
              border: btnHov ? "1px solid #C4914F" : "1px solid rgba(255,255,255,0.2)",
              borderRadius: "4px", fontFamily: "'Jost',sans-serif",
              fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em",
              color: btnHov ? "#C4914F" : "rgba(255,255,255,0.75)",
              textDecoration: "none",
              background: btnHov ? "rgba(196,145,79,0.08)" : "transparent",
              transition: "all 0.25s ease",
            }}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Arrow Button ─────────────────────────────────────────────────────
function ArrowBtn({ direction, onClick, disabled }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: "absolute", top: "38%", transform: "translateY(-50%)",
        [direction === "left" ? "left" : "right"]: "-16px", zIndex: 10,
        width: "36px", height: "36px", borderRadius: "50%",
        border: disabled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(196,145,79,0.4)",
        background: hov && !disabled ? "rgba(196,145,79,0.15)" : "rgba(10,8,6,0.85)",
        color: disabled ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s", backdropFilter: "blur(8px)",
      }}
    >
      {direction === "left"
        ? <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
        : <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
      }
    </button>
  );
}

// ─── Latest Articles Section ──────────────────────────────────────────
export default function LatestArticlesSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Responsive card count
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w <= 480)       setVisibleCount(1);
      else if (w <= 768)  setVisibleCount(2);
      else                setVisibleCount(3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, articles.length - visibleCount);

  // Clamp startIndex on resize
  useEffect(() => {
    if (startIndex > maxIndex) setStartIndex(maxIndex);
  }, [maxIndex, startIndex]);

  const prev = () => setStartIndex((i) => Math.max(0, i - 1));
  const next = () => setStartIndex((i) => Math.min(maxIndex, i + 1));
  const shown = articles.slice(startIndex, startIndex + visibleCount);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <section style={{ width: "100%", background: "#0A0806", padding: "clamp(48px,7vw,80px) 0 clamp(56px,8vw,96px)" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 clamp(20px,5vw,48px)" }}>

          <h2 style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "clamp(24px,3vw,40px)", fontWeight: 600,
            color: "#C4914F", textAlign: "center",
            marginBottom: "clamp(28px,4vw,48px)",
            letterSpacing: "0.01em", animation: "fadeUp 0.8s ease forwards",
          }}>
            Latest Articles
          </h2>

          {/* Slider */}
          <div style={{ position: "relative", padding: "0 8px" }}>
            <ArrowBtn direction="left"  onClick={prev} disabled={startIndex === 0} />

            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
              gap: "clamp(10px,1.5vw,16px)",
              overflow: "hidden",
            }}>
              {shown.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <ArrowBtn direction="right" onClick={next} disabled={startIndex >= maxIndex} />
          </div>

          {/* Dots */}
          {maxIndex > 0 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "clamp(24px,3vw,40px)" }}>
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button key={i} onClick={() => setStartIndex(i)} style={{
                  width: i === startIndex ? "24px" : "8px", height: "8px",
                  borderRadius: "4px",
                  background: i === startIndex ? "#C4914F" : "rgba(255,255,255,0.2)",
                  border: "none", cursor: "pointer",
                  transition: "all 0.3s ease", padding: 0,
                }} />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}