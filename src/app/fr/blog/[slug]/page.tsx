import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "../data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `https://www.brainscale.app/fr/blog/${slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `https://www.brainscale.app/fr/blog/${slug}`,
      type: "article",
      locale: "fr_FR",
    },
  };
}

const categoryColors: Record<string, string> = {
  Guide: "#5B4FCF",
  Science: "#4A7EBE",
  Conseils: "#2E9E6B",
  Data: "#C47A1E",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const otherArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);
  const color = categoryColors[article.category] || "#5B4FCF";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "url": `https://www.brainscale.app/fr/blog/${article.slug}`,
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": { "@type": "Organization", "name": "BrainScale" },
    "publisher": {
      "@type": "Organization",
      "name": "BrainScale",
      "url": "https://www.brainscale.app",
    },
    "inLanguage": "fr",
    "isAccessibleForFree": true,
  };

  return (
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* NAV */}
      <nav style={{ backgroundColor: "#F7F6F2", borderBottom: "1px solid #E8E5DC", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/fr" style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 600, color: "#1A1825", textDecoration: "none" }}>
            Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
          </Link>
          <Link href="/fr/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Faire le test →
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* BREADCRUMB */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#9896A8", marginBottom: "32px" }}>
          <Link href="/fr" style={{ color: "#9896A8", textDecoration: "none" }}>Accueil</Link>
          <span>›</span>
          <Link href="/fr/blog" style={{ color: "#9896A8", textDecoration: "none" }}>Blog</Link>
          <span>›</span>
          <span style={{ color: "#1A1825" }}>{article.category}</span>
        </div>

        {/* HEADER */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <span style={{ backgroundColor: color, color: "#fff", padding: "4px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>
              {article.category}
            </span>
            <span style={{ fontSize: "13px", color: "#9896A8" }}>{article.readingTime} de lecture</span>
            <span style={{ fontSize: "13px", color: "#9896A8" }}>
              {new Date(article.publishedAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1A1825", lineHeight: 1.2, marginBottom: "20px" }}>
            {article.title}
          </h1>
          <p style={{ fontSize: "18px", color: "#5C5A6E", lineHeight: 1.7, borderLeft: `3px solid ${color}`, paddingLeft: "20px" }}>
            {article.excerpt}
          </p>
        </div>

        {/* INLINE CTA */}
        <div style={{ backgroundColor: "#EDE9FF", border: "1px solid #C4BBFF", borderRadius: "16px", padding: "20px 24px", marginBottom: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#5B4FCF", margin: 0 }}>Testez-vous maintenant</p>
            <p style={{ fontSize: "13px", color: "#5C5A6E", margin: 0 }}>Test de QI gratuit · 40 questions · Résultats instantanés</p>
          </div>
          <Link href="/fr/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "12px 24px", borderRadius: "999px", fontSize: "13px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
            Faire le test →
          </Link>
        </div>

        {/* ARTICLE CONTENT */}
        <div
          className="article-content"
          lang="fr"
          style={{ color: "#1A1825", lineHeight: 1.8, fontSize: "17px" }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* BOTTOM CTA */}
        <div style={{ backgroundColor: "#5B4FCF", borderRadius: "24px", padding: "40px", textAlign: "center", marginTop: "64px" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "26px", fontWeight: 300, color: "#fff", marginBottom: "12px" }}>
            Prêt à tester votre QI ?
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", marginBottom: "24px" }}>
            40 questions calibrées · Score instantané · 100 % gratuit
          </p>
          <Link href="/fr/test" style={{ backgroundColor: "#fff", color: "#5B4FCF", padding: "14px 36px", borderRadius: "999px", fontSize: "15px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
            Commencer le test gratuit →
          </Link>
        </div>

        {/* RELATED ARTICLES */}
        {otherArticles.length > 0 && (
          <div style={{ marginTop: "64px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "24px", fontWeight: 300, color: "#1A1825", marginBottom: "24px" }}>
              Articles connexes
            </h2>
            <div style={{ display: "grid", gap: "16px" }}>
              {otherArticles.map((a) => (
                <Link key={a.slug} href={`/fr/blog/${a.slug}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "16px", padding: "20px 24px" }}>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 500, color: "#1A1825", marginBottom: "4px" }}>{a.title}</p>
                    <p style={{ fontSize: "13px", color: "#9896A8" }}>{a.readingTime} de lecture</p>
                  </div>
                  <span style={{ color: "#5B4FCF", fontSize: "18px", flexShrink: 0 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer style={{ padding: "40px 24px", textAlign: "center", borderTop: "1px solid #E8E5DC" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "12px", flexWrap: "wrap" }}>
          <Link href="/fr" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Accueil</Link>
          <Link href="/fr/blog" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Blog</Link>
          <Link href="/fr/test" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Test QI</Link>
          <Link href="/" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>English</Link>
        </div>
        <p style={{ fontSize: "12px", color: "#9896A8" }}>© 2026 BrainScale · Tous droits réservés</p>
      </footer>

      <style>{`
        .article-content { hyphens: auto; overflow-wrap: break-word; word-break: break-word; }
        .article-content h2 { font-family: var(--font-display, serif); font-size: clamp(20px, 3.5vw, 26px); font-weight: 400; color: #1A1825; margin: 48px 0 16px; line-height: 1.3; hyphens: none; }
        .article-content h3 { font-family: var(--font-display, serif); font-size: clamp(17px, 3vw, 20px); font-weight: 400; color: #1A1825; margin: 32px 0 12px; hyphens: none; }
        .article-content p { margin-bottom: 20px; }
        .article-content ul, .article-content ol { padding-left: 24px; margin-bottom: 20px; }
        .article-content li { margin-bottom: 10px; }
        .article-content strong { color: #1A1825; font-weight: 600; }
        .article-content a { color: #5B4FCF; text-decoration: underline; }
        .article-content a:hover { opacity: 0.8; }
        .article-content table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 15px; }
        .article-content th, .article-content td { padding: 10px 14px; border: 1px solid #E8E5DC; text-align: left; }
        .article-content th { background: #F7F6F2; font-weight: 600; }
        @media (max-width: 480px) {
          .article-content { font-size: 16px; }
          .article-content h2 { font-size: 20px; margin-top: 36px; }
          .article-content h3 { font-size: 17px; }
        }
      `}</style>

    </div>
  );
}
