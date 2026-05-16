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
    alternates: { canonical: `https://www.brainscale.app/blog/${slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `https://www.brainscale.app/blog/${slug}`,
      type: "article",
      locale: "en_US",
    },
  };
}

const categoryColors: Record<string, string> = {
  Guide: "#4F46E5",
  Science: "#0369A1",
  Training: "#059669",
  Data: "#B45309",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const otherArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);
  const color = categoryColors[article.category] || "#4F46E5";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "url": `https://www.brainscale.app/blog/${article.slug}`,
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": { "@type": "Organization", "name": "BrainScale" },
    "publisher": {
      "@type": "Organization",
      "name": "BrainScale",
      "url": "https://www.brainscale.app",
    },
    "inLanguage": "en",
    "isAccessibleForFree": true,
  };

  return (
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* NAV */}
      <nav style={{ backgroundColor: "#F7F6F2", borderBottom: "1px solid #E8E5DC", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 600, color: "#1A1825", textDecoration: "none" }}>
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

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* BREADCRUMB */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#9896A8", marginBottom: "32px" }}>
          <Link href="/" style={{ color: "#9896A8", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href="/blog" style={{ color: "#9896A8", textDecoration: "none" }}>Blog</Link>
          <span>›</span>
          <span style={{ color: "#1A1825" }}>{article.category}</span>
        </div>

        {/* HEADER */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <span style={{ backgroundColor: color, color: "#fff", padding: "4px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>
              {article.category}
            </span>
            <span style={{ fontSize: "13px", color: "#9896A8" }}>{article.readingTime} read</span>
            <span style={{ fontSize: "13px", color: "#9896A8" }}>
              {new Date(article.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
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
        <div style={{ backgroundColor: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: "16px", padding: "20px 24px", marginBottom: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#4F46E5", margin: 0 }}>Find your IQ score</p>
            <p style={{ fontSize: "13px", color: "#5C5A6E", margin: 0 }}>Free IQ test · 40 questions · Instant results</p>
          </div>
          <Link href="/test" style={{ backgroundColor: "#4F46E5", color: "#fff", padding: "12px 24px", borderRadius: "999px", fontSize: "13px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
            Take the test →
          </Link>
        </div>

        {/* ARTICLE CONTENT */}
        <div
          className="article-content"
          style={{ color: "#1A1825", lineHeight: 1.8, fontSize: "17px" }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* BOTTOM CTA */}
        <div style={{ backgroundColor: "#4F46E5", borderRadius: "24px", padding: "40px", textAlign: "center", marginTop: "64px" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "26px", fontWeight: 300, color: "#fff", marginBottom: "12px" }}>
            Ready to test your IQ?
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", marginBottom: "24px" }}>
            40 calibrated questions · Instant score · 100% free
          </p>
          <Link href="/test" style={{ backgroundColor: "#fff", color: "#4F46E5", padding: "14px 36px", borderRadius: "999px", fontSize: "15px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
            Start the free IQ test →
          </Link>
        </div>

        {/* RELATED ARTICLES */}
        {otherArticles.length > 0 && (
          <div style={{ marginTop: "64px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "24px", fontWeight: 300, color: "#1A1825", marginBottom: "24px" }}>
              Related articles
            </h2>
            <div style={{ display: "grid", gap: "16px" }}>
              {otherArticles.map((a) => (
                <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "16px", padding: "20px 24px" }}>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 500, color: "#1A1825", marginBottom: "4px" }}>{a.title}</p>
                    <p style={{ fontSize: "13px", color: "#9896A8" }}>{a.readingTime} read</p>
                  </div>
                  <span style={{ color: "#4F46E5", fontSize: "18px", flexShrink: 0 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer style={{ padding: "40px 24px", textAlign: "center", borderTop: "1px solid #E8E5DC" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "12px", flexWrap: "wrap" }}>
          <Link href="/" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Home</Link>
          <Link href="/blog" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Blog</Link>
          <Link href="/test" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>IQ Test</Link>
          <Link href="/privacy" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Privacy</Link>
          <Link href="/terms" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Terms</Link>
          <Link href="/fr/blog" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Français</Link>
        </div>
        <p style={{ fontSize: "12px", color: "#9896A8" }}>© 2026 BrainScale · All rights reserved</p>
      </footer>

      <style>{`
        .article-content { overflow-wrap: break-word; word-break: break-word; }
        .article-content h2 { font-family: var(--font-display, serif); font-size: clamp(20px, 3.5vw, 26px); font-weight: 400; color: #1A1825; margin: 48px 0 16px; line-height: 1.3; }
        .article-content h3 { font-family: var(--font-display, serif); font-size: clamp(17px, 3vw, 20px); font-weight: 400; color: #1A1825; margin: 32px 0 12px; }
        .article-content p { margin-bottom: 20px; }
        .article-content ul, .article-content ol { padding-left: 24px; margin-bottom: 20px; }
        .article-content li { margin-bottom: 10px; }
        .article-content strong { color: #1A1825; font-weight: 600; }
        .article-content a { color: #4F46E5; text-decoration: underline; }
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
