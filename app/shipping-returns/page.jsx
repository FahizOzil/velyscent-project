// app/shipping-returns/page.jsx
import FooterPageLayout from "@/app/Components/FooterPageLayout";

export const metadata = { title: "Shipping & Returns — Velyscent" };

const SHIPPING_OPTIONS = [
  { method: "Standard Delivery", time: "3–5 business days", cost: "Flat rate", note: "Free on orders over $200" },
  { method: "Express Delivery", time: "1–2 business days", cost: "Calculated at checkout", note: "Available in major cities" },
  { method: "International", time: "7–14 business days", cost: "Calculated at checkout", note: "Select destinations only" },
];

export default function ShippingReturns() {
  return (
    <FooterPageLayout
      title="Shipping & Returns"
      subtitle="Everything you need to know about how we deliver and our return policy."
    >

      {/* ── SHIPPING ── */}
      <h2>Shipping</h2>

      <h3>Processing time</h3>
      <p>All orders are processed within 1–2 business days after payment confirmation. Orders placed on weekends or public holidays are processed on the next business day. You will receive an email notification with tracking details once your order has been dispatched.</p>

      {/* Shipping table */}
      <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", overflow: "hidden", marginBottom: "24px" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr", background: "rgba(196,145,79,0.08)", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {["Delivery Method", "Timeframe", "Cost", "Notes"].map((h) => (
            <span key={h} style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>
        {SHIPPING_OPTIONS.map((row, i) => (
          <div key={row.method} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr", padding: "14px 16px", borderBottom: i < SHIPPING_OPTIONS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "#C4914F" }}>{row.method}</span>
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{row.time}</span>
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{row.cost}</span>
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{row.note}</span>
          </div>
        ))}
      </div>

      <h3>Free shipping</h3>
      <p>We offer complimentary standard shipping on all orders over <strong style={{ color: "#C4914F", fontWeight: 500 }}>$200</strong>. The discount is applied automatically at checkout — no coupon code needed.</p>

      <h3>Order tracking</h3>
      <p>Once your order is dispatched, you will receive a shipping confirmation email containing your tracking number and a link to track your parcel. You can also view your order status at any time from the <a href="/orders">My Orders</a> page in your account.</p>

      <h3>Failed deliveries</h3>
      <p>If a delivery attempt is unsuccessful, the courier will typically try again on the next business day or leave a notification card with instructions. After two failed attempts, the parcel may be returned to us. Re-delivery charges may apply.</p>

      {/* ── RETURNS ── */}
      <h2>Returns & Exchanges</h2>

      <h3>Return eligibility</h3>
      <p>We accept returns within <strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>7 days of delivery</strong> under the following conditions:</p>
      <ul>
        <li>The item is unused and in its original condition</li>
        <li>The original packaging, box, and seal are intact and undamaged</li>
        <li>The item was not purchased during a final sale or clearance event</li>
        <li>Proof of purchase (order confirmation email) is provided</li>
      </ul>

      <p>For hygiene reasons, <strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>opened or used fragrances cannot be returned</strong> unless the product is faulty or damaged upon arrival.</p>

      <h3>How to return an item</h3>
      <p>To initiate a return, please email us at <a href="mailto:returns@velyscent.com">returns@velyscent.com</a> with the following:</p>
      <ul>
        <li>Your order number</li>
        <li>The item(s) you wish to return</li>
        <li>The reason for the return</li>
        <li>Photos of the item and packaging (required for damaged/faulty items)</li>
      </ul>
      <p>Our team will respond within 24 hours with return instructions and the return address. Please do not send items back without prior authorisation.</p>

      <h3>Refunds</h3>
      <p>Once we receive and inspect the returned item, we will notify you of the outcome within 2 business days. Approved refunds are processed within <strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>5–7 business days</strong> and credited to your original payment method. Please note that original shipping charges are non-refundable unless the return is due to our error.</p>

      <h3>Damaged or incorrect items</h3>
      <p>If you receive a damaged, defective, or incorrect item, please contact us at <a href="mailto:support@velyscent.com">support@velyscent.com</a> within <strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>48 hours of delivery</strong> with your order number and photos. We will arrange a replacement or full refund at no additional cost to you.</p>

      <h3>Exchanges</h3>
      <p>We currently do not offer direct exchanges. If you wish to exchange an item, please return the original (subject to our return policy) and place a new order for the desired product.</p>

      {/* Contact note */}
      <div style={{ marginTop: "40px", padding: "24px 28px", background: "rgba(196,145,79,0.05)", border: "1px solid rgba(196,145,79,0.12)", borderRadius: "10px" }}>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.7)", marginBottom: "6px" }}>Questions about your order?</p>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
          Contact our support team at <a href="mailto:support@velyscent.com">support@velyscent.com</a> or visit our <a href="/contact">Contact Us</a> page. We're happy to help.
        </p>
      </div>

    </FooterPageLayout>
  );
}