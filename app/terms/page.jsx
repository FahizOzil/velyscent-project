// app/terms/page.jsx
import FooterPageLayout from "@/app/Components/FooterPageLayout";

export const metadata = { title: "Terms & Conditions — Velyscent" };

export default function Terms() {
  return (
    <FooterPageLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using our website or placing an order."
    >
      <p>Last updated: March 2025</p>
      <hr className="divider"/>

      <p>By accessing or using the Velyscent website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.</p>

      <h2>Use of the Website</h2>
      <p>You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not misuse our website by introducing viruses or other malicious material, or attempt to gain unauthorised access to any part of our site.</p>

      <h2>Products & Pricing</h2>
      <p>We reserve the right to modify product descriptions, prices, and availability at any time without prior notice. All prices are displayed in US Dollars unless otherwise stated. We make every effort to ensure accuracy, but in the event of an error we reserve the right to cancel and refund any affected orders.</p>

      <h2>Orders & Payment</h2>
      <h3>Placing an order</h3>
      <p>When you place an order, you are making an offer to purchase the product. We reserve the right to accept or decline any order at our discretion. An order confirmation email does not constitute acceptance — acceptance occurs when your order is dispatched.</p>

      <h3>Payment</h3>
      <p>We accept payment via credit/debit card (processed through Safepay), EasyPaisa, JazzCash, and Cash on Delivery. All card transactions are encrypted and processed securely. We do not store your payment details.</p>

      <h3>Cash on Delivery</h3>
      <p>COD orders must be paid in full to the delivery agent upon receipt. Refusal to pay upon delivery may result in your account being restricted from future COD orders.</p>

      <h2>Shipping & Delivery</h2>
      <p>We aim to dispatch orders within 2–3 business days. Delivery timeframes vary by location. We are not responsible for delays caused by courier services, customs, or circumstances beyond our control. Please refer to our <a href="/shipping-returns">Shipping & Returns</a> page for full details.</p>

      <h2>Intellectual Property</h2>
      <p>All content on this website — including text, images, logos, and product descriptions — is the property of Velyscent and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or use any content without our express written permission.</p>

      <h2>Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, Velyscent shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. Our total liability in any matter shall not exceed the amount paid for the relevant order.</p>

      <h2>Governing Law</h2>
      <p>These Terms and Conditions are governed by and construed in accordance with the laws of Pakistan. Any disputes shall be subject to the exclusive jurisdiction of the courts of Karachi, Pakistan.</p>

      <h2>Changes to These Terms</h2>
      <p>We reserve the right to update these Terms at any time. Continued use of our website after changes are posted constitutes your acceptance of the revised terms.</p>

      <h2>Contact Us</h2>
      <p>For any questions regarding these Terms and Conditions, please contact us at <a href="mailto:support@velyscent.com">support@velyscent.com</a>.</p>
    </FooterPageLayout>
  );
}