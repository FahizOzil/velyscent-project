"use client";
import { useState } from "react";

// ─── Reviews Data ─────────────────────────────────────────────────────
const allReviews = [
  {
    id: 1,
    name: "Jack Smith",
    date: "June 03, 2023",
    rating: 5,
    text: "Very lovely fragrance. Would recommend to individuals looking for a combination of sweetness and elegance in perfume. I like floral perfume, and this one is lovely. it's not overpowering. Nice, pleasant scent. I am happy with purchase.",
    // avatar: "/images/avatars/jack.jpg",
    avatarColor: "#E8724A",
    initials: "JS",
  },
  {
    id: 2,
    name: "Ashley",
    date: "January 05, 2023",
    rating: 5,
    text: "I like floral perfume, and this one is lovely. it's not overpowering. Nice, pleasant scent. I am happy with purchase.",
    // avatar: "/images/avatars/ashley.jpg",
    avatarColor: "#4A9E8E",
    initials: "A",
  },
  {
    id: 3,
    name: "Lauri Jess",
    date: "October 05, 2022",
    rating: 5,
    text: "I tried a sample and fell in love with this fragrance so I had to buy my first bottle. This fragrance is my treat for me. It helps to create a good mood. During a stressful day really nice to stop a few moments and revisit the scent from my wrists. I really love the fact that it doesn't take the air out of the room. Some scents are so overbearing but not this on. Try it you just might really love it.",
    // avatar: "/images/avatars/lauri.jpg",
    avatarColor: "#8B5E3C",
    initials: "LJ",
  },
  {
    id: 4,
    name: "Maria Chen",
    date: "August 12, 2022",
    rating: 5,
    text: "Absolutely stunning fragrance. The longevity is incredible — I can still smell it on my clothes the next day. It's sophisticated yet approachable. Perfect for any occasion.",
    avatarColor: "#5B7FA6",
    initials: "MC",
  },
  {
    id: 5,
    name: "David R.",
    date: "May 20, 2022",
    rating: 4,
    text: "Beautiful scent, very luxurious. Bought this as a gift and the recipient absolutely loved it. The bottle is gorgeous too — looks amazing on a dresser.",
    avatarColor: "#7A6E9E",
    initials: "DR",
  },
  {
    id: 6,
    name: "Sophie L.",
    date: "March 08, 2022",
    rating: 5,
    text: "This is my signature scent now. I've received so many compliments wearing this. It's warm, golden, and truly luxurious. Worth every penny.",
    avatarColor: "#C4914F",
    initials: "SL",
  },
];

const ratingBreakdown = [
  { stars: 5, pct: 100 },
  { stars: 4, pct: 0 },
  { stars: 3, pct: 0 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
];

const INITIAL_SHOW = 3;
const LOAD_MORE_COUNT = 3;

// ─── Stars ────────────────────────────────────────────────────────────
function Stars({ rating, size = 14 }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24"
          fill={s <= rating ? "#C4914F" : "rgba(196,145,79,0.2)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────
function Avatar({ review }) {
  return (
    <div style={{
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      background: review.avatarColor,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>
      {/*
        Replace with:
        <img src={review.avatar} alt={review.name}
          style={{ width:'100%', height:'100%', objectFit:'cover' }} />
      */}
      <span style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        color: "#fff",
        letterSpacing: "0.02em",
      }}>
        {review.initials}
      </span>
    </div>
  );
}

// ─── Reviews Section ──────────────────────────────────────────────────
export default function ProductReviews({ totalReviews = 90, overallRating = 5 }) {
  const [shown, setShown] = useState(INITIAL_SHOW);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const visibleReviews = allReviews.slice(0, shown);
  const hasMore = shown < allReviews.length;

  const handleLoadMore = () => {
    setShown((s) => Math.min(s + LOAD_MORE_COUNT, allReviews.length));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .review-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 12px 14px;
          color: #fff;
          fontFamily: "'Jost', sans-serif";
          fontSize: 13px;
          outline: none;
          transition: border-color 0.2s;
          resize: vertical;
        }
        .review-input:focus { border-color: rgba(196,145,79,0.5); }
        .review-input::placeholder { color: rgba(255,255,255,0.25); }

        @media (max-width: 680px) {
          .rating-summary { flex-direction: column !important; gap: 32px !important; }
        }
      `}</style>

      <section
        id="reviews"
        style={{
          width: "100%",
          background: "#0A0806",
          padding: "64px 0 96px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(26px, 3vw, 38px)",
            fontWeight: 600,
            color: "#C4914F",
            textAlign: "center",
            marginBottom: "48px",
            letterSpacing: "0.01em",
          }}>
            Reviews
          </h2>

          {/* ── Rating Summary ── */}
          <div className="rating-summary" style={{
            display: "flex",
            gap: "64px",
            alignItems: "center",
            marginBottom: "56px",
            paddingBottom: "40px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}>

            {/* Left: breakdown bars */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
              {ratingBreakdown.map(({ stars, pct }) => (
                <div key={stars} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.45)",
                    width: "42px",
                    flexShrink: 0,
                  }}>
                    {stars} stars
                  </span>
                  <div style={{
                    flex: 1,
                    height: "6px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: pct > 0
                        ? "linear-gradient(to right, #C4914F, #e0a860)"
                        : "transparent",
                      borderRadius: "3px",
                      transition: "width 0.6s ease",
                    }} />
                  </div>
                  <span style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.35)",
                    width: "28px",
                    textAlign: "right",
                    flexShrink: 0,
                  }}>
                    {pct}%
                  </span>
                </div>
              ))}
            </div>

            {/* Right: overall score */}
            <div style={{ flexShrink: 0, textAlign: "left" }}>
              <Stars rating={overallRating} size={22} />
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#FFFFFF",
                margin: "10px 0 6px",
              }}>
                {overallRating} out of 5
              </p>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.45)",
                marginBottom: "16px",
              }}>
                99% of reviewers recommend this product
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <span style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                }}>
                  {totalReviews} reviews
                </span>
                <button
                  onClick={() => setShowForm(!showForm)}
                  style={{
                    display: "flex", alignItems: "center", gap: "5px",
                    background: "none", border: "none",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "13px",
                    color: "#C4914F",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = "0.75"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                >
                  + Add a Review
                </button>
              </div>
            </div>
          </div>

          {/* ── Add Review Form ── */}
          {showForm && (
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(196,145,79,0.2)",
              borderRadius: "10px",
              padding: "28px",
              marginBottom: "40px",
              animation: "fadeUp 0.35s ease forwards",
            }}>
              <h4 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "16px",
                color: "#fff",
                marginBottom: "20px",
              }}>
                Write a Review
              </h4>

              {submitted ? (
                <p style={{
                  fontFamily: "'Jost', sans-serif", fontSize: "14px",
                  color: "#C4914F", textAlign: "center", padding: "16px 0",
                }}>
                  ✓ Thank you for your review!
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <input
                    className="review-input"
                    placeholder="Your name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    style={{
                      width: "100%", background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px",
                      padding: "11px 14px", color: "#fff",
                      fontFamily: "'Jost', sans-serif", fontSize: "13px", outline: "none",
                    }}
                  />
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                      Rating:
                    </span>
                    {[1,2,3,4,5].map((s) => (
                      <button key={s} onClick={() => setNewReview({ ...newReview, rating: s })}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: "2px" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24"
                          fill={s <= newReview.rating ? "#C4914F" : "rgba(196,145,79,0.2)"}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <textarea
                    className="review-input"
                    placeholder="Share your experience..."
                    rows={4}
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    style={{
                      width: "100%", background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px",
                      padding: "11px 14px", color: "#fff",
                      fontFamily: "'Jost', sans-serif", fontSize: "13px",
                      outline: "none", resize: "vertical",
                    }}
                  />
                  <button
                    onClick={() => { if (newReview.name && newReview.text) setSubmitted(true); }}
                    style={{
                      alignSelf: "flex-start",
                      padding: "11px 28px",
                      background: "#C4914F", border: "none", borderRadius: "4px",
                      color: "#fff", fontFamily: "'Jost', sans-serif",
                      fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em",
                      textTransform: "uppercase", cursor: "pointer",
                    }}
                  >
                    Submit Review
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Individual Reviews ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {visibleReviews.map((review, i) => (
              <div
                key={review.id}
                style={{
                  padding: "32px 0",
                  borderBottom: i < visibleReviews.length - 1
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "none",
                  animation: "fadeUp 0.5s ease forwards",
                }}
              >
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <Avatar review={review} />
                  <div style={{ flex: 1 }}>
                    <Stars rating={review.rating} size={14} />
                    <p style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.75,
                      margin: "12px 0 14px",
                    }}>
                      {review.text}
                    </p>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                      <span style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.6)",
                      }}>
                        {review.name}
                      </span>
                      <span style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "12px",
                        fontWeight: 300,
                        color: "rgba(255,255,255,0.35)",
                      }}>
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Load More ── */}
          {hasMore && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
              <button
                onClick={handleLoadMore}
                style={{
                  padding: "13px 40px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "4px",
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#C4914F";
                  e.currentTarget.style.color = "#C4914F";
                  e.currentTarget.style.background = "rgba(196,145,79,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                  e.currentTarget.style.background = "transparent";
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