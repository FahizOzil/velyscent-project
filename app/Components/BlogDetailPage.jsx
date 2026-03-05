"use client";

// ─── Blog Post Data ───────────────────────────────────────────────────
const blogPosts = {
  "art-of-curating-luxury-collection": {
    title: "The Art of Curating a Luxury Perfume Collection: A Symphony of Scents and Stories",
    date: "January 5, 2023",
    category: "Perfume Collections",
    // heroImg: "/images/blog/luxury-collection-hero.jpg",
    intro: `Welcome, fragrance aficionados, to an exquisite journey into the captivating world of luxury perfume collections. A symphony of scents awaits as we delve into the art of curating a fragrance collection that reflects your essence, evokes cherished memories, and embraces the finest olfactory masterpieces. Just as a maestro conducts an orchestra, we invite you to become the conductor of your very own perfume symphony.`,

    // ── Content blocks — each block is type: "heading" | "text" | "side-image" | "inline-image" | "subheading"
    blocks: [
      { type: "heading",    text: "The Perfume Collection: A Personal Overture" },
      { type: "text",       text: "A perfume collection is more than an assortment of fragrances; it is a reflection of your personality, your life's chapters, and the emotions that define you. As you embark on this aromatic voyage, consider what scents resonate with your soul, whisking you away to cherished moments and uncharted dreams. Each fragrance in your collection will tell a unique story, narrated by the notes that gracefully dance upon your skin." },

      // side-image block: image LEFT, two sub-sections RIGHT
      {
        type: "side-image",
        // img: "/images/blog/signature-scent-side.jpg",
        subSections: [
          {
            title: "The Overture: Discovering Your Signature Scent",
            body: "The journey to curating a luxury perfume collection begins with finding your signature scent—the one that feels like an olfactory extension of your being. Take time to explore different fragrance families, from opulent florals to mysterious orientals, to discover the notes that harmonize perfectly with your skin chemistry. This will be the foundation upon which you build your enchanting symphony of scents.",
          },
          {
            title: "Commemorating Milestones",
            body: "Just as the notes of a melody create beautiful harmonies, certain fragrances can encapsulate significant moments in your life. Whether it's a celebration of love, a momentous achievement, or a cherished memory with a loved one, select perfumes that become olfactory milestones. With each spritz, you'll be transported back in time, reliving the emotions that weave your life's narrative.",
          },
        ],
      },

      { type: "heading",    text: "Exploring the Fragrance Palette" },
      { type: "text",       text: "As you continue composing your collection, it's essential to explore a diverse fragrance palette. Include scents that embody contrasting moods and evoke emotions ranging from serenity to exuberance. From the freshness of citrusy top notes to the warm embrace of rich base notes, each perfume adds a unique hue to your olfactory canvas." },

      { type: "heading",    text: "Embracing Niche Gems" },
      { type: "text",       text: "Just as a symphony benefits from unique instruments, your collection can be enriched by the discovery of niche perfumes and artisanal creations. Venture beyond the mainstream, and explore the creations of master perfumers who pour their heart and soul into crafting distinctive scents. These hidden gems add an air of exclusivity to your olfactory repertoire." },

      // inline-image block: text LEFT, image RIGHT
      {
        type: "inline-image",
        // img: "/images/blog/perfume-art-form.jpg",
        subSections: [
          {
            title: "Perfume as an Art Form",
            body: "Perfume is not merely a product; it is an art form that captivates the senses and transcends time. Take a moment to appreciate the artistry behind each perfume, the skill of the perfumer in blending notes, and the emotions they convey through fragrance. Embrace the poetry in each bottle, and your collection will become an ode to the beauty of scent.",
          },
        ],
      },

      { type: "heading",    text: "Displaying Your Symphony of Scents" },
      { type: "text",       text: "The grand finale of your perfume symphony lies in the elegant presentation of your collection. A tastefully curated display showcases the artistry of perfume bottles, transforming your collection into an aesthetic marvel. Whether nestled on a vintage vanity or arranged in a custom-made perfume cabinet, your fragrant ensemble becomes an exquisite visual and olfactory experience." },
    ],

    closing: {
      body: "Dear perfume connoisseurs, may this guide inspire you to embark on a journey of curating a luxury perfume collection that harmonizes with your soul. As you add each new perfume to your symphony, you'll find that your collection becomes more than an assemblage of scents—it becomes a masterpiece of memories, emotions, and the art of perfumery.",
      sign: "Happy curating!",
      author: "Kiara Smith",
    },

    prev: { slug: "finding-your-signature-scent",     title: "Previous Post" },
    next: { slug: "decoding-fragrance-notes",          title: "Next Post" },
  },
  // ── add more slugs here ──
};

// ─── Helpers ──────────────────────────────────────────────────────────
function ImgPlaceholder({ label, style = {} }) {
  return (
    <div style={{
      background: "linear-gradient(160deg, #1c1814 0%, #0e0c0a 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      border: "2px dashed rgba(196,145,79,0.18)",
      gap: "8px", borderRadius: "8px", overflow: "hidden",
      position: "relative", ...style,
    }}>
      {/* Replace inner content with: <img src={...} style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
      <svg width="28" height="28" fill="none" stroke="rgba(196,145,79,0.3)" strokeWidth="1.2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
      </svg>
      <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "9px", letterSpacing: "0.18em", color: "rgba(196,145,79,0.3)", textTransform: "uppercase", textAlign: "center", padding: "0 12px" }}>
        {label}
      </span>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 60%, rgba(196,145,79,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
    </div>
  );
}

function GoldDivider() {
  return <div style={{ width: "36px", height: "1px", background: "linear-gradient(to right, #C4914F, transparent)", margin: "14px 0 18px" }} />;
}

// ─── Blog Detail Page ─────────────────────────────────────────────────
export default function BlogDetailPage({ slug }) {
  const post = blogPosts[slug] || blogPosts["art-of-curating-luxury-collection"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .social-icon:hover { opacity: 0.75 !important; transform: scale(1.1) !important; }
        @media (max-width: 720px) {
          .side-grid { grid-template-columns: 1fr !important; }
          .inline-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section style={{ width: "100%", background: "#0A0806", padding: "92px 0 96px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 40px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "32px", flexWrap: "wrap" }}>
            {["Home", "Blog", post.title].map((crumb, i, arr) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <a href={i === 0 ? "/" : i === 1 ? "/blog" : "#"} style={{
                  fontFamily: "'Jost',sans-serif", fontSize: "12px",
                  color: i === arr.length - 1 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.35)",
                  textDecoration: "none", transition: "color 0.2s",
                  maxWidth: i === arr.length - 1 ? "340px" : "auto",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                  onMouseLeave={(e) => e.currentTarget.style.color = i === arr.length - 1 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.35)"}
                >
                  {crumb}
                </a>
                {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>/</span>}
              </span>
            ))}
          </div>

          {/* Date + Category */}
          <div style={{ textAlign: "center", marginBottom: "24px", animation: "fadeUp 0.7s ease forwards" }}>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.45)", marginBottom: "4px" }}>{post.date}</p>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 400, color: "rgba(255,255,255,0.45)" }}>{post.category}</p>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 700,
            color: "#FFFFFF", textAlign: "center", lineHeight: 1.25,
            marginBottom: "40px", letterSpacing: "0.01em",
            animation: "fadeUp 0.8s ease forwards",
          }}>
            {post.title}
          </h1>

          {/* Hero Image */}
          <ImgPlaceholder label="Hero Article Image" style={{ width: "100%", aspectRatio: "16/9", marginBottom: "40px" }} />

          {/* Intro */}
          <p style={{
            fontFamily: "'Jost',sans-serif", fontSize: "14.5px", fontWeight: 300,
            color: "rgba(255,255,255,0.62)", lineHeight: 1.85, marginBottom: "48px",
          }}>
            {post.intro}
          </p>

          {/* Content Blocks */}
          {post.blocks.map((block, i) => {
            if (block.type === "heading") return (
              <h2 key={i} style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: "clamp(17px,2.2vw,21px)", fontWeight: 600,
                color: "#FFFFFF", marginBottom: "16px", marginTop: i > 0 ? "8px" : 0,
                letterSpacing: "0.01em",
              }}>
                {block.text}
              </h2>
            );

            if (block.type === "text") return (
              <p key={i} style={{
                fontFamily: "'Jost',sans-serif", fontSize: "13.5px", fontWeight: 300,
                color: "rgba(255,255,255,0.58)", lineHeight: 1.85, marginBottom: "32px",
              }}>
                {block.text}
              </p>
            );

            if (block.type === "side-image") return (
              <div key={i} className="side-grid" style={{
                display: "grid", gridTemplateColumns: "260px 1fr",
                gap: "32px", alignItems: "start", marginBottom: "40px",
              }}>
                {/* Left: image */}
                <ImgPlaceholder label="Side Image" style={{ aspectRatio: "3/4" }} />
                {/* Right: subsections */}
                <div>
                  {block.subSections.map((sub, si) => (
                    <div key={si} style={{ marginBottom: si < block.subSections.length - 1 ? "28px" : 0 }}>
                      <h3 style={{
                        fontFamily: "'Playfair Display',Georgia,serif",
                        fontSize: "16px", fontWeight: 600,
                        color: "#FFFFFF", marginBottom: "10px", lineHeight: 1.4,
                      }}>
                        {sub.title}
                      </h3>
                      <p style={{
                        fontFamily: "'Jost',sans-serif", fontSize: "13.5px", fontWeight: 300,
                        color: "rgba(255,255,255,0.58)", lineHeight: 1.85,
                      }}>
                        {sub.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );

            if (block.type === "inline-image") return (
              <div key={i} className="inline-grid" style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "36px", alignItems: "start", marginBottom: "40px",
              }}>
                {/* Left: text */}
                <div>
                  {block.subSections.map((sub, si) => (
                    <div key={si}>
                      <h3 style={{
                        fontFamily: "'Playfair Display',Georgia,serif",
                        fontSize: "17px", fontWeight: 600,
                        color: "#FFFFFF", marginBottom: "12px", lineHeight: 1.4,
                      }}>
                        {sub.title}
                      </h3>
                      <GoldDivider />
                      <p style={{
                        fontFamily: "'Jost',sans-serif", fontSize: "13.5px", fontWeight: 300,
                        color: "rgba(255,255,255,0.58)", lineHeight: 1.85,
                      }}>
                        {sub.body}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Right: image */}
                <ImgPlaceholder label="Inline Image" style={{ aspectRatio: "4/3" }} />
              </div>
            );

            return null;
          })}

          {/* Closing */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: "40px", marginTop: "16px", marginBottom: "48px",
          }}>
            <p style={{
              fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 300,
              color: "rgba(255,255,255,0.58)", lineHeight: 1.85, marginBottom: "22px",
            }}>
              {post.closing.body}
            </p>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.55)", marginBottom: "4px" }}>
              {post.closing.sign}
            </p>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>
              {post.closing.author}
            </p>
          </div>

          {/* Share */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{
              fontFamily: "'Jost',sans-serif", fontSize: "12px",
              fontWeight: 500, letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "14px",
            }}>
              Share On
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              {/* Twitter/X */}
              <a href="#" className="social-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "#1DA1F2", transition: "all 0.2s", textDecoration: "none" }}>
                <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="social-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "#1877F2", transition: "all 0.2s", textDecoration: "none" }}>
                <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="social-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "#0A66C2", transition: "all 0.2s", textDecoration: "none" }}>
                <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: "28px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            {/* Previous */}
            {post.prev ? (
              <a href={`/blog/${post.prev.slug}`} style={{
                display: "flex", alignItems: "center", gap: "8px",
                fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 400,
                color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Previous Post
              </a>
            ) : <div />}

            {/* Next */}
            {post.next ? (
              <a href={`/blog/${post.next.slug}`} style={{
                display: "flex", alignItems: "center", gap: "8px",
                fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 400,
                color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#C4914F"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
              >
                Next Post
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
            ) : <div />}
          </div>

        </div>
      </section>
    </>
  );
}