import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — BrainScale",
  description: "How BrainScale handles your data. We minimize collection and never sell your information.",
};

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>
      <header style={{ backgroundColor: "#F7F6F2", borderBottom: "1px solid #E8E5DC", padding: "0 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1825", textDecoration: "none" }}>
            Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
          </Link>
          <Link href="/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Start Test
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px 96px" }}>
        <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "42px", fontWeight: 300, color: "#1A1825", marginBottom: "8px" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "13px", color: "#9896A8", marginBottom: "48px" }}>Last updated: May 10, 2026</p>

        {[
          {
            title: "Overview",
            content: "BrainScale is designed with privacy as a default. We do not require registration, we do not sell your data, and your test answers are never stored on our servers. This policy explains the limited data we do collect and why.",
          },
          {
            title: "1. Data We Collect",
            content: "We collect anonymous usage analytics via Google Analytics 4 (GA4). This includes: pages visited, time spent on the site, general geographic region (country/city level), device type and browser. This data is aggregated and anonymized — it cannot be used to identify you personally. We do not collect: your name, email address, IP address (IP anonymization is enabled), test answers, or any sensitive personal information.",
          },
          {
            title: "2. Cookies",
            content: "We use cookies solely for Google Analytics measurement. These are analytics cookies that help us understand how visitors use the site in aggregate. We do not use advertising, tracking, or profiling cookies. You can disable cookies in your browser settings at any time without affecting your ability to use BrainScale.",
          },
          {
            title: "3. How Your Test Works",
            content: "Your answers during the test are processed entirely in your browser (client-side). They are not transmitted to or stored on our servers. Your IQ score is calculated locally and passed via URL parameters to the results page. Once you close the results page, no record of your score is retained by us.",
          },
          {
            title: "4. Third-Party Services",
            content: "We use Google Analytics 4, operated by Google LLC. Google may process data in accordance with their own privacy policy (https://policies.google.com/privacy). We do not use any other third-party analytics, advertising networks, or data brokers.",
          },
          {
            title: "5. Your Rights (GDPR)",
            content: "If you are located in the European Economic Area, you have the right to access, correct, or delete any personal data we hold about you. Since we collect only anonymized analytics data, there is generally no personal data to access or delete. For any privacy-related request, contact us at: contact@brainscale.app",
          },
          {
            title: "6. Children's Privacy",
            content: "BrainScale is not directed at children under the age of 13. We do not knowingly collect any data from children under 13. If you believe a child has used the service, please contact us and we will take appropriate action.",
          },
          {
            title: "7. Changes to This Policy",
            content: "We may update this policy from time to time. Changes will be posted on this page with an updated date. Continued use of BrainScale after changes constitutes acceptance of the updated policy.",
          },
          {
            title: "8. Contact",
            content: "For any privacy questions or concerns, contact us at: contact@brainscale.app",
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "36px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1825", marginBottom: "12px" }}>
              {section.title}
            </h2>
            <p style={{ fontSize: "15px", color: "#5C5A6E", lineHeight: 1.8 }}>
              {section.content}
            </p>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #E8E5DC", paddingTop: "32px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <Link href="/terms" style={{ fontSize: "14px", color: "#5B4FCF", textDecoration: "none", fontWeight: 500 }}>Terms of Service</Link>
          <Link href="/" style={{ fontSize: "14px", color: "#9896A8", textDecoration: "none" }}>← Back to home</Link>
        </div>
      </main>
    </div>
  );
}