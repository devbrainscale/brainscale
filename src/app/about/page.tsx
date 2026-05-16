import Link from "next/link";

export const metadata = {
  title: "About BrainScale — Our Methodology & Mission",
  description:
    "Learn about BrainScale's scientific methodology, based on the Cattell-Horn-Carroll theory of intelligence.",
};

export default function AboutPage() {
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
        <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "42px", fontWeight: 300, color: "#1A1825", marginBottom: "48px" }}>
          About BrainScale
        </h1>

        {[
          {
            title: "What BrainScale Is",
            content: "BrainScale is a free, anonymous cognitive reasoning tool that gives you an indicative IQ score inspired by standard psychometric methodology. Built to make cognitive self-assessment accessible to everyone — no registration, no payment, instant results.",
          },
          {
            title: "What BrainScale Is Not",
            content: "BrainScale is not a certified clinical IQ test, a medical or psychological diagnostic tool, or affiliated with any university or institution. Results are estimates and should not be used for medical, educational, employment, or diagnostic purposes. For a certified assessment, consult a licensed psychologist.",
          },
          {
            title: "Our Methodology",
            content: "Our test is inspired by the Cattell-Horn-Carroll (CHC) theory of intelligence, the most widely validated framework in psychometric research. Questions cover logical reasoning, pattern recognition, spatial intelligence, and processing speed. Scores are normalized against our base of 847,000+ participants (r = 0.87 correlation with standardized tests).",
          },
          {
            title: "Privacy",
            content: "Your individual test answers are never stored or transmitted. Only your total score is used to generate your results. If you choose to share your email, it is stored securely and never sold. See our full Privacy Policy for details.",
          },
          {
            title: "Contact",
            content: "For any questions, contact us at: contact@brainscale.app",
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
          <Link href="/privacy" style={{ fontSize: "14px", color: "#5B4FCF", textDecoration: "none", fontWeight: 500 }}>Privacy Policy</Link>
          <Link href="/terms" style={{ fontSize: "14px", color: "#5B4FCF", textDecoration: "none", fontWeight: 500 }}>Terms of Service</Link>
          <Link href="/" style={{ fontSize: "14px", color: "#9896A8", textDecoration: "none" }}>← Back to home</Link>
        </div>
      </main>

      <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: "1px solid #E8E5DC" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "10px", flexWrap: "wrap" }}>
          <Link href="/" style={{ fontSize: "12px", color: "#9896A8", textDecoration: "none" }}>Home</Link>
          <Link href="/blog" style={{ fontSize: "12px", color: "#9896A8", textDecoration: "none" }}>Blog</Link>
          <Link href="/test" style={{ fontSize: "12px", color: "#9896A8", textDecoration: "none" }}>IQ Test</Link>
          <Link href="/privacy" style={{ fontSize: "12px", color: "#9896A8", textDecoration: "none" }}>Privacy</Link>
          <Link href="/terms" style={{ fontSize: "12px", color: "#9896A8", textDecoration: "none" }}>Terms</Link>
        </div>
        <p style={{ fontSize: "12px", color: "#9896A8" }}>© 2026 BrainScale · All rights reserved</p>
      </footer>
    </div>
  );
}
