// app/privacy-policy/page.jsx
import FooterPageLayout from "@/app/Components/FooterPageLayout";

export const metadata = { title: "Privacy Policy — Velyscent" };

export default function PrivacyPolicy() {
  return (
    <FooterPageLayout
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information."
    >
      <p>Last updated: March 2025</p>
      <hr className="divider"/>

      <p>At Velyscent, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.</p>

      <h2>Information We Collect</h2>

      <h3>Information you provide directly</h3>
      <p>When you create an account, place an order, or contact us, we may collect:</p>
      <ul>
        <li>Full name and email address</li>
        <li>Shipping and billing address</li>
        <li>Phone number</li>
        <li>Payment information (processed securely via Safepay — we never store card details)</li>
      </ul>

      <h3>Information collected automatically</h3>
      <p>When you browse our site, we automatically collect certain information including your IP address, browser type, pages visited, and time spent on pages. This helps us improve your experience.</p>

      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Process and fulfill your orders</li>
        <li>Send order confirmations and shipping updates</li>
        <li>Respond to your inquiries and provide customer support</li>
        <li>Improve our website and product offerings</li>
        <li>Send promotional communications (only with your consent)</li>
      </ul>

      <h2>Sharing Your Information</h2>
      <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only with trusted service providers who assist in operating our website and fulfilling orders — such as shipping carriers and payment processors — under strict confidentiality agreements.</p>

      <h2>Data Security</h2>
      <p>We implement industry-standard security measures to protect your personal information. All sensitive data is encrypted during transmission using SSL technology. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

      <h2>Cookies</h2>
      <p>We use cookies to enhance your browsing experience, remember your preferences, and analyse site traffic. You can choose to disable cookies through your browser settings, though this may affect certain features of our website.</p>

      <h2>Your Rights</h2>
      <p>You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us at <a href="mailto:privacy@velyscent.com">privacy@velyscent.com</a>. We will respond to your request within 30 days.</p>

      <h2>Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date. Your continued use of our website after any changes constitutes your acceptance of the revised policy.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@velyscent.com">privacy@velyscent.com</a>.</p>
    </FooterPageLayout>
  );
}