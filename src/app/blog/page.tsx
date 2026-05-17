import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "./data";

export const metadata: Metadata = {
  title: "IQ & Cognition Blog — Science-Based Guides | BrainScale",
  description:
    "Science-backed guides on IQ scores, cognitive testing, how to improve intelligence, and global IQ data. Free resources from BrainScale.",
  alternates: {
    canonical: "https://www.brainscale.app/blog",
  },
};

const categoryColors: Record<string, string> = {
  Guide: "#4F46E5",
  Science: "#0369A1",
  Training: "#059669",
  Data: "#B45309",
};

export default function BlogPage() {
  return (
    <div style={{ backgroundColor: "#F4F2EC", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>
      <style>{`
        .blog-featured:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(79,70,229,0.15); }
        .blog-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(28,27,19,0.1); }
      `}</style>

      {/* NAV */}
      <nav style={{ backgroundColor: "#F4F2EC", borderBottom: "1px solid #DDD9CF", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 600, color: "#1C1B13", textDecoration: "none" }}>
            Brain<span style={{ color: "#4F46E5" }}>Scale</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link href="/blog" style={{ fontSize: "14px", color: "#4F46E5", fontWeight: 600, textDecoration: "none" }}>Blog</Link>
            <Link href="/test" style={{ backgroundColor: "#4F46E5", color: "#fff", padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Take the test →
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "64px 24px" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: "#1C1B13", lineHeight: 1.1, marginBottom: "16px" }}>
            IQ &amp;{" "}
            <em style={{ color: "#4F46E5", fontStyle: "italic" }}>Cognition</em>
          </h1>
          <p style={{ fontSize: "18px", color: "#978F80", maxWidth: "480px", margin: "0 auto" }}>
            Science-backed guides on intelligence testing, cognitive improvement, and what the research actually says.
          </p>
        </div>

        {/* FEATURED ARTICLE */}
        <Link href={`/blog/${articles[0].slug}`} style={{ textDecoration: "none", display: "block", marginBottom: "32px" }}>
          <div className="blog-featured" style={{ backgroundColor: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: "24px", padding: "48px", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span style={{ backgroundColor: categoryColors[articles[0].category] || "#4F46E5", color: "#fff", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>
                {articles[0].category}
              </span>
              <span style={{ fontSize: "13px", color: "#978F80" }}>{articles[0].readingTime} read</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, color: "#1C1B13", marginBottom: "12px", lineHeight: 1.3 }}>
              {articles[0].title}
            </h2>
            <p style={{ fontSize: "16px", color: "#5A5849", lineHeight: 1.6, marginBottom: "24px" }}>
              {articles[0].excerpt}
            </p>
            <span style={{ color: "#4F46E5", fontWeight: 600, fontSize: "14px" }}>Read article →</span>
          </div>
        </Link>

        {/* ARTICLE GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {articles.slice(1).map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: "none" }}>
              <div className="blog-card" style={{ backgroundColor: "#fff", border: "1px solid #DDD9CF", borderRadius: "20px", padding: "28px", height: "100%", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ backgroundColor: (categoryColors[article.category] || "#4F46E5") + "18", color: categoryColors[article.category] || "#4F46E5", padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700 }}>
                    {article.category}
                  </span>
                  <span style={{ fontSize: "12px", color: "#978F80" }}>{article.readingTime}</span>
                </div>
                <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 400, color: "#1C1B13", marginBottom: "10px", lineHeight: 1.4 }}>
                  {article.title}
                </h2>
                <p style={{ fontSize: "14px", color: "#978F80", lineHeight: 1.6, marginBottom: "20px" }}>
                  {article.excerpt}
                </p>
                <span style={{ color: "#4F46E5", fontWeight: 600, fontSize: "13px" }}>Read →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "64px", padding: "48px", backgroundColor: "#fff", borderRadius: "24px", border: "1px solid #DDD9CF" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 300, color: "#1C1B13", marginBottom: "12px" }}>
            Ready to find your score?
          </h2>
          <p style={{ fontSize: "15px", color: "#978F80", marginBottom: "24px" }}>40 questions · Instant results · 100% free</p>
          <Link href="/test" style={{ backgroundColor: "#4F46E5", color: "#fff", padding: "16px 40px", borderRadius: "999px", fontSize: "15px", fontWeight: 700, textDecoration: "none", boxShadow: "0 6px 24px rgba(79,70,229,0.35)", display: "inline-block" }}>
            Start the free IQ test →
          </Link>
        </div>

      </main>

      {/* FOOTER */}
      <footer style={{ padding: "40px 24px", textAlign: "center", borderTop: "1px solid #DDD9CF" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "12px", flexWrap: "wrap" }}>
          <Link href="/" style={{ fontSize: "13px", color: "#978F80", textDecoration: "none" }}>Home</Link>
          <Link href="/blog" style={{ fontSize: "13px", color: "#978F80", textDecoration: "none" }}>Blog</Link>
          <Link href="/test" style={{ fontSize: "13px", color: "#978F80", textDecoration: "none" }}>IQ Test</Link>
          <Link href="/privacy" style={{ fontSize: "13px", color: "#978F80", textDecoration: "none" }}>Privacy</Link>
          <Link href="/terms" style={{ fontSize: "13px", color: "#978F80", textDecoration: "none" }}>Terms</Link>
          <Link href="/fr/blog" style={{ fontSize: "13px", color: "#978F80", textDecoration: "none" }}>Français</Link>
        </div>
        <p style={{ fontSize: "12px", color: "#978F80" }}>© 2026 BrainScale · All rights reserved</p>
      </footer>
    </div>
  );
}
