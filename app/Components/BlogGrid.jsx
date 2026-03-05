"use client";
import { useState } from "react";

// ─── Blog Articles Data ───────────────────────────────────────────────
const allArticles = [
  {
    id: 1,
    slug: "finding-your-signature-scent",
    title: "Finding Your Signature Scent: A Guide to Perfume Personalities",
    excerpt: "Embark on a journey of self-discovery as we delve into the concept of perfume personalities. From bold and adventurous to elegant and timeless, there's a fragrance that perfectly complements your essence. Let us help you find your signature scent, a fragrant expression of your unique style.",
    category: "Guides",
    // img: "/images/blog/signature-scent.jpg",
  },
  {
    id: 2,
    slug: "art-of-curating-luxury-collection",
    title: "The Art of Curating a Luxury Perfume Collection: A Symphony of Scents and Stories",
    excerpt: "A luxury perfume collection is not just an assortment of fragrances; it is a reflection of one's taste, personality, and experiences. Each bottle holds a unique olfactory journey, crafted with the finest ingredients and artistic mastery.",
    category: "Collections",
    // img: "/images/blog/luxury-collection.jpg",
  },
  {
    id: 3,
    slug: "decoding-fragrance-notes",
    title: "Decoding Fragrance Notes: Unraveling the Symphony of Scents",
    excerpt: "Ever wondered how perfumers compose their masterpieces? Unravel the mystery behind fragrance notes — top, middle, and base — and learn how each layer contributes to the overall olfactory experience of a perfume. Get ready to appreciate your favorite scents on a whole new level.",
    category: "Education",
    // img: "/images/blog/fragrance-notes.jpg",
  },
  {
    id: 4,
    slug: "soothing-symphony-lavender",
    title: "The Soothing Symphony of Lavender Perfumes: Unlocking the Secrets of a Fragrant Elixir",
    excerpt: "Lavender, with its enchanting aroma and rich history, has been cherished for centuries as a symbol of relaxation, healing, and timeless beauty. In the world of perfumery, lavender plays a key role in creating captivating fragrances loved by many.",
    category: "Ingredients",
    // img: "/images/blog/lavender.jpg",
  },
  {
    id: 5,
    slug: "journey-through-time-perfumery-history",
    title: "A Journey Through Time: Unearthing Perfumery's Rich History",
    excerpt: "In our blog collection, we invite you to embark on a journey through time, where we explore the fascinating history of perfumery. From ancient civilizations to modern-day masterpieces, we unravel the tales of how scents have adorned humanity throughout the ages.",
    category: "History",
    // img: "/images/blog/history.jpg",
  },
  {
    id: 6,
    slug: "timeless-elegance-rose-perfumes",
    title: "The Timeless Elegance of Rose Perfumes: Unveiling the Queen of Flowers in Fragrance",
    excerpt: "Rose, often referred to as the \"Queen of Flowers,\" has held a special place in human culture and history for centuries. Beyond its captivating beauty, this iconic bloom has also inspired perfumers to create some of the most timeless and exquisite fragrances in the world.",
    category: "Ingredients",
    // img: "/images/blog/rose.jpg",
  },
  {
    id: 7,
    slug: "oud-liquid-gold-perfumery",
    title: "Oud: The Liquid Gold of Perfumery and Its Ancient Origins",
    excerpt: "Oud, also known as agarwood, is one of the most prized and expensive raw materials in the world of perfumery. Its rich, deep, and complex scent has been treasured for centuries across cultures and civilizations.",
    category: "Ingredients",
    // img: "/images/blog/oud.jpg",
  },
  {
    id: 8,
    slug: "science-behind-fragrance",
    title: "The Science Behind Fragrance: How Perfumers Craft the Perfect Scent",
    excerpt: "Creating a fine fragrance is both an art and a science. Master perfumers, known as 'noses', spend years honing their craft to blend top, heart, and base notes into a harmonious olfactory experience.",
    category: "Education",
    // img: "/images/blog/science.jpg",
  },
  {
    id: 9,
    slug: "gifting-perfect-perfume",
    title: "The Art of Gifting the Perfect Perfume: A Thoughtful Guide",
    excerpt: "Giving a perfume as a gift is one of the most intimate and meaningful gestures you can make. It says you know someone deeply — their tastes, moods, and the invisible essence they carry with them.",
    category: "Guides",
    // img: "/images/blog/gifting.jpg",
  },
];

const INITIAL_COUNT = 6;
const LOAD_MORE = 3;
const categories = ["All", "Guides", "Collections", "Education", "Ingredients", "History"];

// ─── Article Card ─────────────────────────────────────────────────────
function ArticleCard({ article }) {
  const [hovered, setHovered] = useState(false);
  const [btnHov, setBtnHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#0D0B09",
        borderRadius: "8px",
        overflow: "hidden",
        border: hovered
          ? "1px solid rgba(196,145,79,0.3)"
          : "1px solid rgba(255,255,255,0.05)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 36px rgba(0,0,0,0.45)" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{
        width: "100%",
        aspectRatio: "16 / 10",
        background: "linear-gradient(160deg, #1c1814 0%, #0e0c0a 100%)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {/*
          Replace with:
          <img
            src={article.img}
            alt={article.title}
            style={{
              width:'100%', height:'100%', objectFit:'cover',
              transition:'transform 0.5s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "8px",
          transition: "transform 0.5s ease",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}>
          <svg width="28" height="28" fill="none" stroke="rgba(196,145,79,0.3)"
            strokeWidth="1.2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span style={{
            fontFamily: "'Jost', sans-serif", fontSize: "9px",
            letterSpacing: "0.15em", color: "rgba(196,145,79,0.3)",
            textTransform: "uppercase",
          }}>
            Article Image
          </span>
        </div>

        {/* Gold top border on hover */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: "linear-gradient(to right, transparent, #C4914F, transparent)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          zIndex: 2,
        }} />

        {/* Category badge */}
        <div style={{
          position: "absolute", top: "12px", left: "12px", zIndex: 2,
          background: "rgba(10,8,6,0.75)",
          border: "1px solid rgba(196,145,79,0.3)",
          borderRadius: "20px",
          padding: "3px 10px",
          backdropFilter: "blur(6px)",
        }}>
          <span style={{
            fontFamily: "'Jost', sans-serif", fontSize: "10px",
            fontWeight: 500, color: "#C4914F", letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: "20px 20px 24px",
        display: "flex", flexDirection: "column", flexGrow: 1,
      }}>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "15px", fontWeight: 600,
          color: "#FFFFFF", marginBottom: "12px",
          lineHeight: 1.5, letterSpacing: "0.01em",
        }}>
          {article.title}
        </h3>

        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "13px", fontWeight: 300,
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.75, marginBottom: "20px",
          flexGrow: 1,
        }}>
          {article.excerpt}
        </p>

        <a
          href={`/blog/${article.slug}`}
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
          style={{
            display: "inline-block",
            padding: "10px 22px",
            border: btnHov ? "1px solid #C4914F" : "1px solid rgba(255,255,255,0.18)",
            borderRadius: "4px",
            fontFamily: "'Jost', sans-serif",
            fontSize: "12px", fontWeight: 500,
            letterSpacing: "0.08em",
            color: btnHov ? "#C4914F" : "rgba(255,255,255,0.7)",
            textDecoration: "none",
            background: btnHov ? "rgba(196,145,79,0.07)" : "transparent",
            transition: "all 0.25s ease",
            alignSelf: "flex-start",
          }}
        >
          Read More
        </a>
      </div>
    </div>
  );
}

// ─── Blog Grid Section ────────────────────────────────────────────────
export default function BlogGrid() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");
  const [shown, setShown] = useState(INITIAL_COUNT);

  const filtered = allArticles.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const visible = filtered.slice(0, shown);
  const hasMore = shown < filtered.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .blog-grid { grid-template-columns: 1fr !important; }
          .blog-toolbar { flex-direction: column !important; gap: 12px !important; }
        }
      `}</style>

      <section style={{
        width: "100%",
        background: "#0A0806",
        padding: "0 0 96px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 40px" }}>

          {/* ── Toolbar: Search + Filter + Sort ── */}
          <div className="blog-toolbar" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            padding: "32px 0 36px",
          }}>
            {/* Search */}
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              padding: "10px 16px",
              flex: "0 0 280px",
              transition: "border-color 0.2s",
            }}
              onFocus={() => {}}
            >
              <svg width="15" height="15" fill="none" stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search here"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShown(INITIAL_COUNT); }}
                style={{
                  background: "none", border: "none", outline: "none",
                  fontFamily: "'Jost', sans-serif", fontSize: "13px",
                  color: "#fff", width: "100%",
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Filter by Category */}
              <div style={{ position: "relative" }}>
                <button onClick={() => { setCategoryOpen(!categoryOpen); setSortOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    background: categoryOpen ? "rgba(196,145,79,0.1)" : "rgba(255,255,255,0.04)",
                    border: categoryOpen ? "1px solid rgba(196,145,79,0.4)" : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "6px", padding: "10px 16px",
                    color: activeCategory !== "All" ? "#C4914F" : "rgba(255,255,255,0.7)",
                    fontFamily: "'Jost', sans-serif", fontSize: "13px",
                    cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
                  }}>
                  Filter by Category
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24"
                    style={{ transform: categoryOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {categoryOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 6px)", left: 0,
                    minWidth: "180px", background: "#1a1714",
                    border: "1px solid rgba(196,145,79,0.2)", borderRadius: "6px",
                    padding: "6px 0", zIndex: 50,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
                  }}>
                    {categories.map((cat) => (
                      <button key={cat}
                        onClick={() => { setActiveCategory(cat); setCategoryOpen(false); setShown(INITIAL_COUNT); }}
                        style={{
                          display: "block", width: "100%", padding: "9px 16px",
                          background: activeCategory === cat ? "rgba(196,145,79,0.1)" : "transparent",
                          border: "none",
                          color: activeCategory === cat ? "#C4914F" : "rgba(255,255,255,0.65)",
                          fontFamily: "'Jost', sans-serif", fontSize: "13px",
                          textAlign: "left", cursor: "pointer", transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,145,79,0.08)"; e.currentTarget.style.color = "#C4914F"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = activeCategory === cat ? "rgba(196,145,79,0.1)" : "transparent"; e.currentTarget.style.color = activeCategory === cat ? "#C4914F" : "rgba(255,255,255,0.65)"; }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort by */}
              <div style={{ position: "relative" }}>
                <button onClick={() => { setSortOpen(!sortOpen); setCategoryOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    background: sortOpen ? "rgba(196,145,79,0.1)" : "rgba(255,255,255,0.04)",
                    border: sortOpen ? "1px solid rgba(196,145,79,0.4)" : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "6px", padding: "10px 16px",
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "'Jost', sans-serif", fontSize: "13px",
                    cursor: "pointer", transition: "all 0.2s",
                  }}>
                  Sort by
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24"
                    style={{ transform: sortOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {sortOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 6px)", right: 0,
                    minWidth: "160px", background: "#1a1714",
                    border: "1px solid rgba(196,145,79,0.2)", borderRadius: "6px",
                    padding: "6px 0", zIndex: 50,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
                  }}>
                    {["Latest", "Oldest", "A–Z", "Z–A"].map((opt) => (
                      <button key={opt}
                        onClick={() => { setSortBy(opt); setSortOpen(false); }}
                        style={{
                          display: "block", width: "100%", padding: "9px 16px",
                          background: sortBy === opt ? "rgba(196,145,79,0.1)" : "transparent",
                          border: "none",
                          color: sortBy === opt ? "#C4914F" : "rgba(255,255,255,0.65)",
                          fontFamily: "'Jost', sans-serif", fontSize: "13px",
                          textAlign: "left", cursor: "pointer",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,145,79,0.08)"; e.currentTarget.style.color = "#C4914F"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = sortBy === opt ? "rgba(196,145,79,0.1)" : "transparent"; e.currentTarget.style.color = sortBy === opt ? "#C4914F" : "rgba(255,255,255,0.65)"; }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Article Grid ── */}
          {visible.length > 0 ? (
            <div className="blog-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginBottom: "48px",
            }}>
              {visible.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: "center", padding: "80px 0",
              fontFamily: "'Jost', sans-serif", fontSize: "15px",
              color: "rgba(255,255,255,0.35)",
            }}>
              No articles found. Try a different search or category.
            </div>
          )}

          {/* ── Load More ── */}
          {hasMore && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
              <button
                onClick={() => setShown((s) => s + LOAD_MORE)}
                style={{
                  padding: "14px 48px",
                  background: "transparent",
                  border: "1px solid #C4914F",
                  borderRadius: "4px",
                  color: "#C4914F",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "13px", fontWeight: 500,
                  letterSpacing: "0.08em", cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(196,145,79,0.1)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Load More
              </button>
            </div>
          )}

        </div>
      </section>
    </>
  );
}