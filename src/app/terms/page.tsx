import Link from "next/link";

export const metadata = {
  title: "Terms of Service — BrainScale",
  description: "Terms and conditions for using BrainScale's free cognitive assessment test.",
};

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: "#F4F2EC", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>
      <header style={{ backgroundColor: "#F4F2EC", borderBottom: "1px solid #DDD9CF", padding: "0 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1C1B13", textDecoration: "none" }}>
            Brain<span style={{ color: "#3B35B5" }}>Scale</span>
          </Link>
          <Link href="/test" style={{ backgroundColor: "#3B35B5", color: "#fff", padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Start Test
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px 96px" }}>
        <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "42px", fontWeight: 300, color: "#1C1B13", marginBottom: "8px" }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: "13px", color: "#978F80", marginBottom: "48px" }}>Last updated: May 14, 2026</p>

        {[
          {
            title: "1. Acceptance of Terms",
            content: "By accessing or using BrainScale (brainscale.app), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service. We reserve the right to update these terms at any time. Continued use of the site after changes constitutes acceptance.",
          },
          {
            title: "2. Description of Service",
            content: "BrainScale provides a free online cognitive assessment test designed to estimate your IQ score based on logical, spatial, and analytical reasoning questions. The service is provided for informational and entertainment purposes only.",
          },
          {
            title: "3. Not a Clinical Assessment",
            content: "The BrainScale test is not a certified clinical psychometric evaluation. Results are estimates based on performance on our question set and should not be used for medical, educational, employment, or diagnostic purposes. For a certified IQ assessment, please consult a licensed psychologist. BrainScale makes no warranties about the accuracy, completeness, or suitability of the results for any particular purpose.",
          },
          {
            title: "4. Eligibility",
            content: "You must be at least 13 years old to use BrainScale. By using the service, you represent that you meet this age requirement. If you are under 18, you should review these terms with a parent or guardian.",
          },
          {
            title: "5. Acceptable Use",
            content: "You agree not to: attempt to reverse-engineer, copy, or reproduce the test questions or scoring algorithm; use automated tools, bots, or scripts to access the service; use the service in any way that could harm, disable, or impair it; misrepresent your BrainScale score as a certified IQ result; or use the service for any unlawful purpose.",
          },
          {
            title: "6. Intellectual Property",
            content: "All content on BrainScale — including but not limited to test questions, design, text, graphics, and code — is the property of BrainScale and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.",
          },
          {
            title: "7. Disclaimer of Warranties",
            content: "BrainScale is provided 'as is' and 'as available' without any warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy or reliability of any results produced by the service.",
          },
          {
            title: "8. Limitation of Liability",
            content: "To the fullest extent permitted by law, BrainScale and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service, including but not limited to reliance on test results, loss of data, or loss of profits.",
          },
          {
            title: "9. Third-Party Links",
            content: "BrainScale may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of those sites. Links do not constitute endorsement.",
          },
          {
            title: "10. Governing Law",
            content: "These terms are governed by the laws of Switzerland, without regard to conflict of law principles. Any disputes arising from these terms or your use of BrainScale shall be subject to the exclusive jurisdiction of the courts of Switzerland.",
          },
          {
            title: "11. Contact",
            content: "For any questions about these Terms of Service, contact us at: contact@brainscale.app",
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "36px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1C1B13", marginBottom: "12px" }}>
              {section.title}
            </h2>
            <p style={{ fontSize: "15px", color: "#5A5849", lineHeight: 1.8 }}>
              {section.content}
            </p>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #DDD9CF", paddingTop: "32px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <Link href="/privacy" style={{ fontSize: "14px", color: "#3B35B5", textDecoration: "none", fontWeight: 500 }}>Privacy Policy</Link>
          <Link href="/" style={{ fontSize: "14px", color: "#978F80", textDecoration: "none" }}>← Back to home</Link>
        </div>
      </main>

      <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: "1px solid #DDD9CF" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "10px", flexWrap: "wrap" }}>
          <Link href="/" style={{ fontSize: "12px", color: "#978F80", textDecoration: "none" }}>Home</Link>
          <Link href="/blog" style={{ fontSize: "12px", color: "#978F80", textDecoration: "none" }}>Blog</Link>
          <Link href="/test" style={{ fontSize: "12px", color: "#978F80", textDecoration: "none" }}>IQ Test</Link>
          <Link href="/privacy" style={{ fontSize: "12px", color: "#978F80", textDecoration: "none" }}>Privacy</Link>
          <Link href="/terms" style={{ fontSize: "12px", color: "#978F80", textDecoration: "none" }}>Terms</Link>
        </div>
        <p style={{ fontSize: "12px", color: "#978F80" }}>© 2026 BrainScale · All rights reserved</p>
      </footer>
    </div>
  );
}