"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useSearchStore } from "@/store/searchStore";

// ─── All searchable products ──────────────────────────────────────────
// Keep in sync with productsData.js
const searchableProducts = [
  { slug: "luxurious-elixir",        name: "Luxurious Elixir",          price: "250.00", category: "Signature" },
  { slug: "luxurious-elixir-rough",  name: "Luxurious Elixir Rough",    price: "220.00", category: "Signature" },
  { slug: "the-golden-legacy",       name: "The Golden Legacy",         price: "160.00", category: "Classic" },
  { slug: "luxurious-essence",       name: "Luxurious Essence",         price: "270.00", category: "Signature" },
  { slug: "aurum-aura",              name: "Aurum Aura",                price: "190.00", category: "Exclusive" },
  { slug: "gleaming-gilt",           name: "Gleaming Gilt",             price: "210.00", category: "Classic" },
  { slug: "gilded-elixir-rough",     name: "Gilded Elixir Rough",       price: "180.00", category: "Signature" },
  { slug: "golden-luminary",         name: "Golden Luminary",           price: "230.00", category: "Exclusive" },
  { slug: "decadent-opal",           name: "Decadent Opal",             price: "260.00", category: "Luxury" },
  { slug: "gilded-elixir",           name: "Gilded Elixir",             price: "195.00", category: "Signature" },
  { slug: "glamourous-gilt",         name: "Glamourous Gilt",           price: "175.00", category: "Classic" },
  { slug: "luxury-enigma",           name: "Luxury Enigma",             price: "310.00", category: "Luxury" },
  { slug: "velyscent-noir",          name: "Velyscent Noir",            price: "290.00", category: "Exclusive" },
  { slug: "royal-oud",               name: "Royal Oud",                 price: "320.00", category: "Luxury" },
];

const RECENT_KEY = "velyscent-recent-searches";

// ─── Search Modal ─────────────────────────────────────────────────────
export default function SearchModal() {
  const { isOpen, closeSearch } = useSearchStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      setRecentSearches(stored);
    } catch { setRecentSearches([]); }
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Live search
  useEffect(() => {
    if (!query.trim()) { setResults([]); setActiveIndex(-1); return; }
    const q = query.toLowerCase();
    const filtered = searchableProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 8));
    setActiveIndex(-1);
  }, [query]);

  // Keyboard: Esc to close, arrow keys to navigate, Enter to go
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === "Escape") { closeSearch(); return; }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    }
    if (e.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      handleSelect(results[activeIndex]);
    }
  }, [isOpen, results, activeIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const saveRecent = (name) => {
    try {
      const existing = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      const updated = [name, ...existing.filter((r) => r !== name)].slice(0, 5);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      setRecentSearches(updated);
    } catch {}
  };

  const handleSelect = (product) => {
    saveRecent(product.name);
    closeSearch();
    setQuery("");
  };

  const clearRecent = () => {
    localStorage.removeItem(RECENT_KEY);
    setRecentSearches([]);
  };

  if (!isOpen) return null;

  const showRecent = !query.trim() && recentSearches.length > 0;
  const showEmpty = query.trim() && results.length === 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Jost:wght@300;400;500;600&display=swap');

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .search-result-item:hover,
        .search-result-item.active {
          background: rgba(196,145,79,0.08) !important;
        }
        .search-result-item:hover .result-name,
        .search-result-item.active .result-name {
          color: #C4914F !important;
        }

        .recent-chip:hover {
          background: rgba(196,145,79,0.12) !important;
          border-color: rgba(196,145,79,0.4) !important;
          color: #C4914F !important;
        }

        .search-input::placeholder { color: rgba(255,255,255,0.25); }
        .search-input:focus { outline: none; }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        onClick={closeSearch}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(5,4,3,0.85)",
          backdropFilter: "blur(6px)",
          animation: "modalFadeIn 0.2s ease forwards",
        }}
      />

      {/* ── Modal Panel ── */}
      <div style={{
        position: "fixed", top: "72px", left: "50%",
        transform: "translateX(-50%)",
        zIndex: 201,
        width: "100%", maxWidth: "640px",
        padding: "0 16px",
        animation: "slideDown 0.25s ease forwards",
      }}>
        <div style={{
          background: "#141210",
          border: "1px solid rgba(196,145,79,0.2)",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}>

          {/* Search Input */}
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "16px 20px",
            borderBottom: query || showRecent
              ? "1px solid rgba(255,255,255,0.07)"
              : "none",
          }}>
            <svg width="18" height="18" fill="none" stroke="rgba(196,145,79,0.6)"
              strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              ref={inputRef}
              className="search-input"
              type="text"
              placeholder="Search fragrances..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1, background: "none", border: "none",
                fontFamily: "'Jost', sans-serif",
                fontSize: "16px", fontWeight: 300,
                color: "#FFFFFF", letterSpacing: "0.02em",
              }}
            />

            {/* Clear query */}
            {query && (
              <button onClick={() => setQuery("")} style={{
                background: "rgba(255,255,255,0.07)",
                border: "none", borderRadius: "50%",
                width: "24px", height: "24px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "rgba(255,255,255,0.5)",
                flexShrink: 0, transition: "all 0.2s",
              }}>
                <svg width="12" height="12" fill="none" stroke="currentColor"
                  strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}

            {/* Esc hint */}
            <kbd style={{
              fontFamily: "'Jost', sans-serif", fontSize: "11px",
              color: "rgba(255,255,255,0.25)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "4px", padding: "2px 6px",
              flexShrink: 0,
            }}>
              esc
            </kbd>
          </div>

          {/* ── Recent Searches ── */}
          {showRecent && (
            <div style={{ padding: "16px 20px" }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: "12px",
              }}>
                <span style={{
                  fontFamily: "'Jost', sans-serif", fontSize: "11px",
                  fontWeight: 500, letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
                }}>
                  Recent
                </span>
                <button onClick={clearRecent} style={{
                  background: "none", border: "none",
                  fontFamily: "'Jost', sans-serif", fontSize: "11px",
                  color: "rgba(255,255,255,0.3)", cursor: "pointer",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
                >
                  Clear
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {recentSearches.map((r) => (
                  <button key={r} className="recent-chip"
                    onClick={() => setQuery(r)}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "20px", padding: "5px 14px",
                      fontFamily: "'Jost', sans-serif", fontSize: "12px",
                      color: "rgba(255,255,255,0.6)", cursor: "pointer",
                      transition: "all 0.2s",
                    }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Search Results ── */}
          {results.length > 0 && (
            <div style={{ padding: "8px 0" }}>
              <div style={{
                padding: "6px 20px 10px",
                fontFamily: "'Jost', sans-serif", fontSize: "11px",
                fontWeight: 500, letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
              }}>
                Products ({results.length})
              </div>

              {results.map((product, i) => (
                <Link
                  key={product.slug}
                  href={`/shop/${product.slug}`}
                  onClick={() => handleSelect(product)}
                  className={`search-result-item${i === activeIndex ? " active" : ""}`}
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "10px 20px", textDecoration: "none",
                    background: i === activeIndex ? "rgba(196,145,79,0.08)" : "transparent",
                    transition: "background 0.15s",
                    cursor: "pointer",
                  }}
                >
                  {/* Product image placeholder */}
                  <div style={{
                    width: "40px", height: "48px", flexShrink: 0,
                    background: "linear-gradient(160deg, #1c1814 0%, #0e0c0a 100%)",
                    borderRadius: "4px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {/*
                      Replace with:
                      <img src={product.img} alt={product.name}
                        style={{ width:'100%', height:'100%', objectFit:'contain', borderRadius:'4px' }} />
                    */}
                    <svg width="14" height="14" fill="none" stroke="rgba(196,145,79,0.35)"
                      strokeWidth="1.2" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="result-name" style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "14px", fontWeight: 400,
                      color: i === activeIndex ? "#C4914F" : "#FFFFFF",
                      transition: "color 0.15s",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {/* Highlight matching query */}
                      {highlightMatch(product.name, query)}
                    </p>
                    <p style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "11px", fontWeight: 300,
                      color: "rgba(255,255,255,0.35)",
                      marginTop: "2px",
                    }}>
                      {product.category}
                    </p>
                  </div>

                  {/* Price */}
                  <span style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "13px", fontWeight: 500,
                    color: "#C4914F", flexShrink: 0,
                  }}>
                    $ {product.price}
                  </span>

                  {/* Arrow */}
                  <svg width="14" height="14" fill="none"
                    stroke="rgba(255,255,255,0.2)" strokeWidth="2" viewBox="0 0 24 24"
                    style={{ flexShrink: 0 }}>
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              ))}

              {/* View all results */}
              {results.length >= 8 && (
                <div style={{
                  padding: "12px 20px",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}>
                  <Link href={`/shop?search=${encodeURIComponent(query)}`}
                    onClick={closeSearch}
                    style={{
                      fontFamily: "'Jost', sans-serif", fontSize: "13px",
                      color: "#C4914F", textDecoration: "none",
                      display: "flex", alignItems: "center", gap: "6px",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = "0.75"}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                  >
                    View all results for "{query}"
                    <svg width="14" height="14" fill="none" stroke="currentColor"
                      strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* ── No results ── */}
          {showEmpty && (
            <div style={{
              padding: "40px 20px", textAlign: "center",
            }}>
              <p style={{
                fontFamily: "'Jost', sans-serif", fontSize: "14px",
                color: "rgba(255,255,255,0.4)", marginBottom: "8px",
              }}>
                No results for "<span style={{ color: "#C4914F" }}>{query}</span>"
              </p>
              <p style={{
                fontFamily: "'Jost', sans-serif", fontSize: "12px",
                fontWeight: 300, color: "rgba(255,255,255,0.25)",
              }}>
                Try a different search term
              </p>
            </div>
          )}

          {/* ── Default state — no query, no recent ── */}
          {!query && !showRecent && (
            <div style={{ padding: "20px 20px 24px" }}>
              <p style={{
                fontFamily: "'Jost', sans-serif", fontSize: "11px",
                fontWeight: 500, letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
                marginBottom: "14px",
              }}>
                Popular Searches
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Oud", "Elixir", "Luxury", "Rose", "Golden"].map((term) => (
                  <button key={term} className="recent-chip"
                    onClick={() => setQuery(term)}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "20px", padding: "5px 14px",
                      fontFamily: "'Jost', sans-serif", fontSize: "12px",
                      color: "rgba(255,255,255,0.6)", cursor: "pointer",
                      transition: "all 0.2s",
                    }}>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer hint */}
          <div style={{
            padding: "10px 20px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex", gap: "16px", alignItems: "center",
          }}>
            {[
              { key: "↑↓", label: "navigate" },
              { key: "↵", label: "select" },
              { key: "esc", label: "close" },
            ].map(({ key, label }) => (
              <span key={key} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <kbd style={{
                  fontFamily: "'Jost', sans-serif", fontSize: "10px",
                  color: "rgba(255,255,255,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "3px", padding: "1px 5px",
                }}>
                  {key}
                </kbd>
                <span style={{
                  fontFamily: "'Jost', sans-serif", fontSize: "10px",
                  color: "rgba(255,255,255,0.2)",
                }}>
                  {label}
                </span>
              </span>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

// ─── Highlight matching text ──────────────────────────────────────────
function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} style={{ color: "#C4914F", fontWeight: 600 }}>{part}</span>
    ) : part
  );
}