import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "./data";

export const metadata: Metadata = {
  title: "Blog QI & Cognition — Guides et Analyses | BrainScale",
  description:
    "Articles sur le QI, les tests cognitifs, comment améliorer son intelligence et les données mondiales sur le quotient intellectuel. Guides scientifiques gratuits.",
  alternates: {
    canonical: "https://www.brainscale.app/fr/blog",
  },
};

const categoryColors: Record<string, string> = {
  Guide: "#5B4FCF",
  Science: "#4A7EBE",
  Conseils: "#2E9E6B",
  Data: "#C47A1E",
};

export default function FrBlogPage() {
  return (
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>
      <style>{`
        .blog-featured:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(91,79,207,0.15); }
        .blog-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(26,24,37,0.1); }
      `}</style>

      {/* NAV */}
      <nav style={{ backgroundColor: "#F7F6F2", borderBottom: "1px solid #E8E5DC", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/fr" style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 600, color: "#1A1825", textDecoration: "none" }}>
            Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link href="/fr/blog" style={{ fontSize: "14px", color: "#5B4FCF", fontWeight: 600, textDecoration: "none" }}>Blog</Link>
            <Link href="/fr/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Faire le test →
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "64px 24px" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: "#1A1825", lineHeight: 1.1, marginBottom: "16px" }}>
            Blog QI &amp;{" "}
            <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>Cognition</em>
          </h1>
          <p style={{ fontSize: "18px", color: "#9896A8", maxWidth: "480px", margin: "0 auto" }}>
            Guides scientifiques, analyses de données et conseils pratiques sur l&apos;intelligence et les capacités cognitives.
          </p>
        </div>

        {/* FEATURED ARTICLE */}
        <Link href={`/fr/blog/${articles[0].slug}`} style={{ textDecoration: "none", display: "block", marginBottom: "32px" }}>
          <div className="blog-featured" style={{ backgroundColor: "#EDE9FF", border: "1px solid #C4BBFF", borderRadius: "24px", padding: "48px", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span style={{ backgroundColor: categoryColors[articles[0].category] || "#5B4FCF", color: "#fff", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>
                {articles[0].category}
              </span>
              <span style={{ fontSize: "13px", color: "#9896A8" }}>{articles[0].readingTime} de lecture</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, color: "#1A1825", marginBottom: "12px", lineHeight: 1.3 }}>
              {articles[0].title}
            </h2>
            <p style={{ fontSize: "16px", color: "#5C5A6E", lineHeight: 1.6, marginBottom: "24px" }}>
              {articles[0].excerpt}
            </p>
            <span style={{ color: "#5B4FCF", fontWeight: 600, fontSize: "14px" }}>Lire l&apos;article →</span>
          </div>
        </Link>

        {/* ARTICLE GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {articles.slice(1).map((article) => (
            <Link key={article.slug} href={`/fr/blog/${article.slug}`} style={{ textDecoration: "none" }}>
              <div className="blog-card" style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "20px", padding: "28px", height: "100%", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ backgroundColor: (categoryColors[article.category] || "#5B4FCF") + "18", color: categoryColors[article.category] || "#5B4FCF", padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700 }}>
                    {article.category}
                  </span>
                  <span style={{ fontSize: "12px", color: "#9896A8" }}>{article.readingTime}</span>
                </div>
                <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 400, color: "#1A1825", marginBottom: "10px", lineHeight: 1.4 }}>
                  {article.title}
                </h2>
                <p style={{ fontSize: "14px", color: "#9896A8", lineHeight: 1.6, marginBottom: "20px" }}>
                  {article.excerpt}
                </p>
                <span style={{ color: "#5B4FCF", fontWeight: 600, fontSize: "13px" }}>Lire →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "64px", padding: "48px", backgroundColor: "#fff", borderRadius: "24px", border: "1px solid #E8E5DC" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 300, color: "#1A1825", marginBottom: "12px" }}>
            Prêt à connaître votre score ?
          </h2>
          <p style={{ fontSize: "15px", color: "#9896A8", marginBottom: "24px" }}>40 questions · Résultats instantanés · 100 % gratuit</p>
          <Link href="/fr/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "16px 40px", borderRadius: "999px", fontSize: "15px", fontWeight: 700, textDecoration: "none", boxShadow: "0 6px 24px rgba(91,79,207,0.35)", display: "inline-block" }}>
            Commencer le test gratuit →
          </Link>
        </div>

      </main>

      {/* FOOTER */}
      <footer style={{ padding: "40px 24px", textAlign: "center", borderTop: "1px solid #E8E5DC" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "12px", flexWrap: "wrap" }}>
          <Link href="/fr" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Accueil</Link>
          <Link href="/fr/blog" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Blog</Link>
          <Link href="/fr/test" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Test QI</Link>
          <Link href="/fr/privacy" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Confidentialité</Link>
          <Link href="/fr/terms" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Conditions</Link>
          <Link href="/blog" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>English</Link>
        </div>
        <p style={{ fontSize: "12px", color: "#9896A8" }}>© 2026 BrainScale · Tous droits réservés</p>
      </footer>
    </div>
  );
}
