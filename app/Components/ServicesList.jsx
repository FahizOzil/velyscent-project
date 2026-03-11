"use client";

// ─── All 6 Services ───────────────────────────────────────────────────
const services = [
  {
    number: "01.",
    title: "Personal Fragrance Consultations",
    body: "Choosing the right fragrance can be a deeply personal experience. Our team of knowledgeable fragrance experts is here to guide you through this process. Whether you're looking for a signature scent, a gift for a loved one, or need assistance in exploring new fragrance families, our consultants will take the time to understand your preferences and suggest the perfect matches.",
    imageLeft: false,
    // img: "/images/services/consultation.jpg",
  },
  {
    number: "02.",
    title: "Custom Fragrance Creation",
    body: "Experience the art of bespoke perfumery with our custom fragrance creation service. Work closely with our skilled perfumers to craft a scent that is uniquely yours. From selecting individual notes to blending them into a harmonious symphony, we'll help you bring your fragrance vision to life. Whether it's a special occasion, a gift for someone dear, or simply a way to indulge in luxury, a custom-created perfume is an unforgettable experience.",
    imageLeft: true,
    // img: "/images/services/custom-creation.jpg",
  },
  {
    number: "03.",
    title: "Scented Gift Selection",
    body: "Looking for a meaningful gift that leaves a lasting impression? Our scented gift selection service is designed to help you find the perfect fragrance gift for any occasion. Whether it's a birthday, anniversary, or a gesture of appreciation, our experts will assist you in choosing a fragrance that perfectly conveys your sentiments and makes the recipient feel cherished.",
    imageLeft: false,
    // img: "/images/services/gift-selection.jpg",
  },
  {
    number: "04.",
    title: "Fragrance Events and Workshops",
    body: "Join us for fragrance-centric events and workshops that celebrate the art of perfumery. Immerse yourself in the captivating world of scents, learn from experts, and discover the nuances of different fragrance families. These events are perfect for fragrance enthusiasts and novices alike, providing a unique opportunity to expand your olfactory knowledge.",
    imageLeft: true,
    // img: "/images/services/workshops.jpg",
  },
  {
    number: "05.",
    title: "Eco-friendly Initiatives",
    body: "At Velyrascent, we are committed to sustainability and eco-conscious practices. As part of our services, we offer guidance on selecting environmentally friendly and cruelty-free fragrances. We partner with brands that share our values and are dedicated to making a positive impact on the planet.",
    imageLeft: false,
    // img: "/images/services/eco-friendly.jpg",
  },
  {
    number: "06.",
    title: "Online Shopping Convenience",
    body: "Explore our carefully curated collection of perfumes from the comfort of your home. Our user-friendly website offers a seamless online shopping experience, complete with detailed product descriptions and customer reviews. You can also reach out to our customer support team for any assistance during your shopping journey.",
    imageLeft: true,
    // img: "/images/services/online-shopping.jpg",
  },
];

// ─── Service Item ─────────────────────────────────────────────────────
function ServiceItem({ service }) {
  const { number, title, body, imageLeft } = service;

  const textCol = (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "40px 0",
    }}>
      <span style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(28px, 4vw, 42px)",
        fontWeight: 700,
        color: "#C4914F",
        lineHeight: 1,
        marginBottom: "20px",
        letterSpacing: "0.02em",
      }}>
        {number}
      </span>

      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(18px, 2.2vw, 24px)",
        fontWeight: 600,
        color: "#FFFFFF",
        marginBottom: "20px",
        letterSpacing: "0.01em",
        lineHeight: 1.3,
      }}>
        {title}
      </h3>

      <div style={{
        width: "36px", height: "1px",
        background: "linear-gradient(to right, #C4914F, transparent)",
        marginBottom: "20px",
      }} />

      <p style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: "13.5px",
        fontWeight: 300,
        color: "rgba(255,255,255,0.55)",
        lineHeight: 1.85,
        maxWidth: "420px",
      }}>
        {body}
      </p>
    </div>
  );

  const imageCol = (
    <div style={{
      position: "relative",
      width: "100%",
      aspectRatio: "4 / 3",
      borderRadius: "8px",
      overflow: "hidden",
      background: "linear-gradient(160deg, #1c1814 0%, #0e0c0a 100%)",
    }}>
      {/*
        Replace placeholder with:
        <img
          src={service.img}
          alt={title}
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}
        />
      */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        border: "2px dashed rgba(196,145,79,0.18)",
        gap: "10px",
      }}>
        <svg width="36" height="36" fill="none" stroke="rgba(196,145,79,0.3)"
          strokeWidth="1.2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span style={{
          fontFamily: "'Jost', sans-serif", fontSize: "10px",
          letterSpacing: "0.18em", color: "rgba(196,145,79,0.3)",
          textTransform: "uppercase", textAlign: "center", padding: "0 20px",
        }}>
          Service {number} Image
        </span>
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 60%, rgba(196,145,79,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
    </div>
  );

  return (
    <div className="service-row" style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "64px",
      alignItems: "center",
      marginBottom: "80px",
    }}>
      {imageLeft ? <>{imageCol}{textCol}</> : <>{textCol}{imageCol}</>}
    </div>
  );
}

// ─── Services List Section ────────────────────────────────────────────
export default function ServicesList() {
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
          .service-row {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>

      <section style={{
        width: "100%",
        background: "#0A0806",
        padding: "72px 0 0",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

          {/* All 6 service items */}
          {services.map((service, i) => (
            <ServiceItem key={i} service={service} />
          ))}

          {/* ── Closing text ── */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "56px 0 80px",
            maxWidth: "820px",
          }}>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.85,
              marginBottom: "22px",
            }}>
              At Velyrascent, our passion for perfumery drives us to go above and beyond to serve you better. We invite you to experience our exceptional services and indulge in the world of luxurious scents. Let us be your trusted fragrance destination, where your olfactory dreams come to life.
            </p>

            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.85,
              marginBottom: "22px",
            }}>
              If you have any questions or need assistance, please do not hesitate to reach out to our friendly team. We're here to make your fragrance exploration a truly memorable one.
            </p>

            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "15px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.02em",
            }}>
              Your Velyrascent Team
            </p>
          </div>

        </div>
      </section>
    </>
  );
}