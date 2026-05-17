import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — BrainScale",
  description: "How BrainScale handles your data. We minimize collection and never sell your information.",
};

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: "#FAF8F5", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>
      <header style={{ backgroundColor: "#FAF8F5", borderBottom: "1px solid #E8E5DF", padding: "0 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1916", textDecoration: "none" }}>
            Brain<span style={{ color: "#C96442" }}>Scale</span>
          </Link>
          <Link href="/test" style={{ backgroundColor: "#C96442", color: "#fff", padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Start Test
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px 96px" }}>
        <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "42px", fontWeight: 300, color: "#1A1916", marginBottom: "8px" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "13px", color: "#99958C", marginBottom: "48px" }}>Last updated: May 14, 2026</p>

        {[
          {
            title: "Overview",
            content: "BrainScale is designed with privacy as a default. We do not require registration to take the test, your test answers are never stored on our servers, and we never sell your data. This policy explains all data we collect and why.",
          },
          {
            title: "1. Data We Collect",
            content: "We collect two types of data: (a) Anonymous analytics via Google Analytics 4 (GA4) — pages visited, time on site, geographic region, device type. This data is aggregated and anonymized. (b) Email address and IQ score — only if you voluntarily submit your email on the results page to receive your free improvement plan. This data is stored in Brevo, our email marketing platform, and is used solely to send you the requested content. We do not collect your name, test answers, or any other sensitive personal information.",
          },
          {
            title: "2. Email Marketing",
            content: "If you provide your email address on the results page, you consent to receive emails from BrainScale including your results summary and cognitive improvement tips. You can unsubscribe at any time by clicking the 'Unsubscribe' link at the bottom of any email. Your email address is stored securely in Brevo and is never sold or shared with third parties.",
          },
          {
            title: "3. Cookies",
            content: "We use cookies for Google Analytics measurement only, subject to your consent. These are analytics cookies that help us understand how visitors use the site in aggregate. We do not use advertising, tracking, or profiling cookies. You can withdraw your cookie consent at any time via the cookie banner or by disabling cookies in your browser settings.",
          },
          {
            title: "4. How Your Test Works",
            content: "Your individual test answers are processed entirely in your browser and are never stored on our servers. At the end of the test, only your total number of correct answers (not the individual answers themselves) is sent to our server to calculate and sign your IQ score. This score is then displayed on your results page. We do not retain any record of your test performance.",
          },
          {
            title: "5. Third-Party Services",
            content: "We use: Google Analytics 4 (Google LLC) for anonymous usage analytics; Brevo (Sendinblue SAS) for email delivery if you subscribe. Both services process data under their respective privacy policies. We do not use advertising networks or data brokers.",
          },
          {
            title: "6. Your Rights (GDPR)",
            content: "If you are located in the European Economic Area, you have the right to: access, correct, or delete your personal data; withdraw consent to marketing emails at any time; lodge a complaint with your local data protection authority. To exercise your rights, contact us at: contact@brainscale.app. We will respond within 30 days.",
          },
          {
            title: "7. Data Controller",
            content: "The data controller for BrainScale is: BrainScale, Postfach, 2501 Biel/Bienne, Switzerland. Contact: contact@brainscale.app",
          },
          {
            title: "8. Children's Privacy",
            content: "BrainScale is not directed at children under the age of 13. We do not knowingly collect any data from children under 13. If you believe a child has used the service, please contact us and we will take appropriate action.",
          },
          {
            title: "9. Changes to This Policy",
            content: "We may update this policy from time to time. Changes will be posted on this page with an updated date. Continued use of BrainScale after changes constitutes acceptance of the updated policy.",
          },
          {
            title: "10. Contact",
            content: "For any privacy questions or concerns, contact us at: contact@brainscale.app",
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "36px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1916", marginBottom: "12px" }}>
              {section.title}
            </h2>
            <p style={{ fontSize: "15px", color: "#5C5A52", lineHeight: 1.8 }}>
              {section.content}
            </p>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "32px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <Link href="/terms" style={{ fontSize: "14px", color: "#C96442", textDecoration: "none", fontWeight: 500 }}>Terms of Service</Link>
          <Link href="/" style={{ fontSize: "14px", color: "#99958C", textDecoration: "none" }}>← Back to home</Link>
        </div>
      </main>

      <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: "1px solid #E8E5DF" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "10px", flexWrap: "wrap" }}>
          <Link href="/" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>Home</Link>
          <Link href="/blog" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>Blog</Link>
          <Link href="/test" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>IQ Test</Link>
          <Link href="/privacy" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>Privacy</Link>
          <Link href="/terms" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>Terms</Link>
        </div>
        <p style={{ fontSize: "12px", color: "#99958C" }}>© 2026 BrainScale · All rights reserved</p>
      </footer>
    </div>
  );
}