"use client";

import { useState } from "react";
import Link from "next/link";

function SampleQuestion() {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = 1;
  const opts = ["▲", "●", "■", "◆"];

  return (
    <div style={{ backgroundColor: "#F0EDE6", border: "1px solid #E8E5DF", borderRadius: "24px", padding: "40px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", maxWidth: "240px", margin: "0 auto 28px" }}>
        {["▲", "●", "■", "●", "■", "▲", "■", "▲", "?"].map((s, i) => (
          <div key={i} style={{
            aspectRatio: "1", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", fontWeight: "bold",
            backgroundColor: s === "?" ? "#FBF0EB" : "#fff",
            border: s === "?" ? "2px dashed #C96442" : "1px solid #E8E5DF",
            color: s === "?" ? "#C96442" : "#5C5A52",
          }}>
            {s}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", maxWidth: "240px", margin: "0 auto" }}>
        {opts.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = selected !== null && i === correct;
          const isWrong = isSelected && i !== correct;
          return (
            <div
              key={i}
              onClick={() => setSelected(i)}
              style={{
                aspectRatio: "1", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px", cursor: "pointer", transition: "all 0.15s ease",
                backgroundColor: isCorrect ? "#C96442" : isWrong ? "#F0EDE6" : isSelected ? "#C96442" : "#fff",
                border: isCorrect ? "2px solid #C96442" : isWrong ? "2px solid #D4A882" : isSelected ? "2px solid #C96442" : "1px solid #D5D0C7",
                color: isCorrect ? "#fff" : isWrong ? "#99958C" : isSelected ? "#fff" : "#5C5A52",
                transform: isSelected ? "scale(1.08)" : "scale(1)",
              }}
            >
              {opt}
            </div>
          );
        })}
      </div>

      {selected === null && (
        <p style={{ fontSize: "12px", color: "#99958C", marginTop: "16px" }}>Try it — click an answer</p>
      )}
      {selected !== null && selected === correct && (
        <p style={{ fontSize: "13px", color: "#C96442", fontWeight: 600, marginTop: "16px" }}>✓ Correct — cyclic rotation pattern.</p>
      )}
      {selected !== null && selected !== correct && (
        <p style={{ fontSize: "13px", color: "#99958C", fontWeight: 500, marginTop: "16px" }}>Not quite — the answer is ● (cyclic rotation).</p>
      )}
    </div>
  );
}

const faqs = [
  {
    q: "How long does the test take?",
    a: "The test includes 40 questions and takes between 30 and 45 minutes. Take your time — accuracy matters more than speed.",
  },
  {
    q: "Is the test really free?",
    a: "Yes, completely free. You get your full IQ score, percentile rank, and detailed analysis with no payment required.",
  },
  {
    q: "How accurate is this test?",
    a: "Our test is calibrated on thousands of participants and correlates strongly with standardized psychometric tests (r=0.87). It's a solid estimate, not a clinical diagnosis.",
  },
  {
    q: "Is my data protected?",
    a: "No account required. Your test answers are processed locally in your browser and never sent to our servers. If you choose to share your email, it is stored securely and never sold to third parties.",
  },
  {
    q: "Can I retake the test?",
    a: "Yes. For the most accurate result, wait a few weeks between attempts to avoid the memorization effect.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ backgroundColor: "#FAF8F5", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "#FAF8F5", borderBottom: "1px solid #E8E5DF", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.03em", color: "#1A1916", textDecoration: "none" }}>
            Brain<span style={{ color: "#C96442" }}>Scale</span>
          </Link>
          {/* Desktop links */}
          <div className="bs-nav-links" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link href="/blog" style={{ fontSize: "14px", color: "#5C5A52", textDecoration: "none" }}>Blog</Link>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "14px", color: "#C96442", fontWeight: 600 }}>EN</span>
              <span style={{ fontSize: "11px", color: "#D5D0C7" }}>·</span>
              <Link href="/fr" style={{ fontSize: "14px", color: "#5C5A52", textDecoration: "none" }}>FR</Link>
            </div>
            <Link href="/test" style={{ backgroundColor: "#1A1916", color: "#FAF8F5", padding: "10px 22px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
              Start Test
            </Link>
          </div>
          {/* Mobile burger */}
          <button
            className="bs-burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{ display: "none", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", background: "none", border: "none", cursor: "pointer", padding: 0, color: "#1A1916" }}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <line x1="0" y1="1"  x2="22" y2="1"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="0" y1="8"  x2="22" y2="8"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "#FAF8F5", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #E8E5DF", flexShrink: 0 }}>
            <Link href="/" onClick={() => setMenuOpen(false)} style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.03em", color: "#1A1916", textDecoration: "none" }}>
              Brain<span style={{ color: "#C96442" }}>Scale</span>
            </Link>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{ background: "none", border: "none", cursor: "pointer", color: "#1A1916", padding: "8px" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {[
              { href: "/test",    label: "Start Test — Free", accent: true },
              { href: "/blog",    label: "Blog",              accent: false },
              { href: "/fr",      label: "Français",          accent: false },
              { href: "/privacy", label: "Privacy",           accent: false },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "20px 24px",
                  fontSize: item.accent ? "20px" : "17px",
                  fontWeight: item.accent ? 600 : 400,
                  color: item.accent ? "#C96442" : "#1A1916",
                  textDecoration: "none",
                  borderBottom: "1px solid #E8E5DF",
                  fontFamily: item.accent ? "var(--font-display, serif)" : "inherit",
                  letterSpacing: item.accent ? "-0.01em" : "0",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div style={{ padding: "24px", borderTop: "1px solid #E8E5DF", flexShrink: 0 }}>
            <Link
              href="/test"
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", textAlign: "center", backgroundColor: "#1A1916", color: "#FAF8F5", padding: "16px 24px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}
            >
              Start IQ Test — It&apos;s Free
            </Link>
          </div>
        </div>
      )}

      {/* HERO — asymmetric 2-column */}
      <section style={{ padding: "108px 24px 80px" }}>
        <div className="bs-hero-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>

          {/* LEFT — text */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#FBF0EB", color: "#C96442", padding: "6px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "28px", whiteSpace: "nowrap", textTransform: "uppercase" as const }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#C96442", flexShrink: 0, display: "inline-block" }} />
              Validated · 40 Questions · Instant Results
            </div>

            <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(44px, 5.5vw, 72px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#1A1916", marginBottom: "24px" }}>
              Discover your{" "}
              <em style={{ color: "#C96442", fontStyle: "italic" }}>IQ score</em>
              {" "}in 40 minutes
            </h1>

            <p style={{ fontSize: "17px", color: "#5C5A52", lineHeight: 1.78, marginBottom: "40px", maxWidth: "400px" }}>
              A rigorous psychometric test, completely free, measuring your logical, spatial, and analytical reasoning.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/test" style={{ backgroundColor: "#C96442", color: "#fff", padding: "14px 30px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em", boxShadow: "0 4px 20px rgba(201,100,66,0.30)" }}>
                Test My IQ — Free
              </Link>
              <a href="#how-it-works" style={{ color: "#5C5A52", padding: "14px 26px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, textDecoration: "none", border: "1px solid #D5D0C7" }}>
                How it works →
              </a>
            </div>

            {/* Stats — 3-column grid, never wraps */}
            <div className="bs-hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", marginTop: "44px", paddingTop: "28px", borderTop: "1px solid #E8E5DF" }}>
              {[
                { value: "847,000+", label: "tests completed" },
                { value: "4.8 / 5", label: "satisfaction" },
                { value: "r = 0.87", label: "reliability" },
              ].map((s, i) => (
                <div key={s.label} style={{ paddingRight: i < 2 ? "16px" : "0", borderRight: i < 2 ? "1px solid #E8E5DF" : "none", paddingLeft: i > 0 ? "16px" : "0" }}>
                  <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1916", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "11px", color: "#99958C", marginTop: "5px", letterSpacing: "0.02em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — result preview card (hidden on mobile) */}
          <div className="bs-hero-card" style={{ backgroundColor: "#F0EDE6", border: "1px solid #E8E5DF", borderRadius: "24px", padding: "36px 32px" }}>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#fff", color: "#99958C", padding: "5px 12px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "24px", border: "1px solid #E8E5DF", textTransform: "uppercase" as const }}>
              Sample result
            </div>

            <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "88px", fontWeight: 300, color: "#1A1916", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "10px" }}>
              127
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <span style={{ display: "inline-block", backgroundColor: "#C96442", color: "#fff", padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.02em" }}>Superior</span>
              <span style={{ fontSize: "12px", color: "#99958C" }}>Top 9% worldwide</span>
            </div>

            {[
              { label: "Logical Reasoning",    pct: 88 },
              { label: "Spatial Intelligence", pct: 74 },
              { label: "Processing Speed",      pct: 91 },
            ].map((bar) => (
              <div key={bar.label} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#99958C", marginBottom: "7px" }}>
                  <span>{bar.label}</span>
                  <span>{bar.pct}th pct.</span>
                </div>
                <div style={{ height: "3px", borderRadius: "999px", backgroundColor: "#D5D0C7", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${bar.pct}%`, backgroundColor: "#C96442", borderRadius: "999px" }} />
                </div>
              </div>
            ))}

            <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px solid #E8E5DF", fontSize: "10px", color: "#AAA69E", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
              Example · your actual result will vary
            </div>
          </div>
        </div>

        <style>{`
          /* Nav responsive */
          .bs-nav-links { display: flex; }
          .bs-burger    { display: none !important; }
          @media (max-width: 768px) {
            .bs-nav-links { display: none !important; }
            .bs-burger    { display: flex !important; }
          }
          /* Hero */
          .bs-hero-grid { grid-template-columns: 1fr 1fr; }
          .bs-hero-card { display: block; }
          @media (max-width: 768px) {
            .bs-hero-grid { grid-template-columns: 1fr !important; }
            .bs-hero-card { display: none !important; }
          }
          .en-mobile-br { display: none; }
          @media (max-width: 540px) {
            .bs-bell-legend { gap: 3px !important; }
            .bs-bell-range { font-size: 8px !important; }
            .bs-bell-label { font-size: 7px !important; }
            .bs-bell-pct   { font-size: 11px !important; }
            .en-mobile-br { display: block; }
          }
          .bs-method-grid { grid-template-columns: 320px 1fr; }
          @media (max-width: 860px) {
            .bs-method-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
          .bs-privacy-grid { grid-template-columns: 1fr 1fr; gap: 80px; }
          @media (max-width: 768px) {
            .bs-privacy-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
          .bs-testi-featured { grid-template-columns: 180px 1fr; }
          @media (max-width: 640px) {
            .bs-testi-featured { grid-template-columns: 1fr !important; gap: 20px !important; }
          }
          .bs-testi-pair { grid-template-columns: 1fr 1fr; }
          @media (max-width: 640px) {
            .bs-testi-pair { grid-template-columns: 1fr !important; }
            .bs-testi-score-border { border-right: none !important; padding-right: 0 !important; }
          }
          .bs-domains-grid { grid-template-columns: repeat(2, 1fr); }
          @media (max-width: 480px) {
            .bs-domains-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* BELL CURVE */}
      <section style={{ padding: "0 24px 64px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", backgroundColor: "#F0EDE6", borderRadius: "24px", padding: "48px 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "22px", fontWeight: 300, letterSpacing: "-0.015em", color: "#1A1916", marginBottom: "6px" }}>
            IQ Distribution Worldwide
          </h2>
          <p style={{ fontSize: "13px", color: "#99958C", marginBottom: "32px", letterSpacing: "0.01em" }}>World average: 100 · Standard deviation: 15</p>

          <svg viewBox="0 0 600 190" style={{ width: "100%", display: "block", overflow: "visible" }}>
            <path d="M 20,165 Q 90,163 140,148 Q 195,130 235,85 Q 241,71 248,70 L 248,165 Z" fill="rgba(201,100,66,0.06)" />
            <path d="M 248,165 L 248,70 Q 265,48 300,28 Q 335,48 350,70 L 350,165 Z" fill="rgba(201,100,66,0.15)" />
            <path d="M 350,165 L 350,70 Q 377,90 401,118 L 401,165 Z" fill="rgba(201,100,66,0.32)" />
            <path d="M 401,165 L 401,118 Q 428,137 452,145 L 452,165 Z" fill="rgba(201,100,66,0.52)" />
            <path d="M 452,165 L 452,145 Q 510,163 580,165 Z" fill="rgba(201,100,66,0.72)" />
            <line x1="248" y1="70"  x2="248" y2="165" stroke="rgba(201,100,66,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="350" y1="70"  x2="350" y2="165" stroke="rgba(201,100,66,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="401" y1="118" x2="401" y2="165" stroke="rgba(201,100,66,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="452" y1="145" x2="452" y2="165" stroke="rgba(201,100,66,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <path d="M 20,165 Q 90,163 140,148 Q 195,130 235,85 Q 265,48 300,28 Q 335,48 365,85 Q 405,130 460,148 Q 510,163 580,165" fill="none" stroke="#C96442" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            <line x1="20" y1="165" x2="580" y2="165" stroke="#D5D0C7" strokeWidth="1" />
            <line x1="300" y1="28" x2="300" y2="165" stroke="#C96442" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.28" />
            <text x="248" y="184" textAnchor="middle" fontSize="10" fill="#99958C">90</text>
            <text x="300" y="184" textAnchor="middle" fontSize="12" fill="#C96442" fontWeight="500">100</text>
            <text x="350" y="184" textAnchor="middle" fontSize="10" fill="#99958C">110</text>
            <text x="401" y="184" textAnchor="middle" fontSize="10" fill="#99958C">120</text>
            <text x="452" y="184" textAnchor="middle" fontSize="10" fill="#99958C">130</text>
          </svg>

          <div className="bs-bell-legend" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "5px", marginTop: "20px" }}>
            {[
              { range: "< 90",    label: "Below Avg",  pct: "25%", bg: "rgba(201,100,66,0.06)", text: "#99958C", sub: "#B0AEC0" },
              { range: "90–109",  label: "Average",    pct: "50%", bg: "rgba(201,100,66,0.15)", text: "#C96442", sub: "#5C5A52" },
              { range: "110–119", label: "Above Avg",  pct: "16%", bg: "rgba(201,100,66,0.32)", text: "#A84A28", sub: "#B5572F" },
              { range: "120–129", label: "Superior",   pct: "7%",  bg: "rgba(201,100,66,0.52)", text: "#fff",    sub: "rgba(255,255,255,0.78)" },
              { range: "≥ 130",   label: "Gifted",     pct: "2%",  bg: "rgba(201,100,66,0.72)", text: "#fff",    sub: "rgba(255,255,255,0.78)" },
            ].map((z) => (
              <div key={z.range} style={{ backgroundColor: z.bg, borderRadius: "10px", padding: "12px 4px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", minHeight: "72px" }}>
                <div className="bs-bell-range" style={{ fontSize: "10px", fontWeight: 400, color: z.text, lineHeight: 1.2 }}>{z.range}</div>
                <div className="bs-bell-label" style={{ fontSize: "9px", fontWeight: 300, color: z.sub, lineHeight: 1.3 }}>{z.label}</div>
                <div className="bs-bell-pct" style={{ fontSize: "15px", fontWeight: 500, color: z.text }}>{z.pct}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — editorial numbered layout, not 3 equal cards */}
      <section id="how-it-works" style={{ padding: "108px 24px" }}>
        <div className="bs-method-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", alignItems: "start", gap: "80px" }}>

          {/* Left — editorial label + intro */}
          <div style={{ paddingTop: "8px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#C96442", textTransform: "uppercase" as const, marginBottom: "18px" }}>
              Methodology
            </div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#1A1916", marginBottom: "20px" }}>
              A <em style={{ color: "#C96442", fontStyle: "italic" }}>scientific</em> methodology
            </h2>
            <p style={{ fontSize: "16px", color: "#5C5A52", lineHeight: 1.75, maxWidth: "280px" }}>
              Every question is designed and validated by psychometricians.
            </p>
          </div>

          {/* Right — numbered steps as editorial list */}
          <div>
            {[
              { num: "01", title: "Matrix Reasoning", desc: "Identify visual patterns and complete logical sequences — the core of fluid IQ measurement." },
              { num: "02", title: "Analytical Logic", desc: "Deduction problems, number series, and verbal analogies to assess crystallized reasoning." },
              { num: "03", title: "Calibrated Score", desc: "Your result is normalized against our base of 847,000+ participants for a precise comparison." },
            ].map((c, i) => (
              <div key={c.num} style={{
                paddingTop: "28px",
                paddingBottom: "28px",
                borderTop: "1px solid #E8E5DF",
                borderBottom: i === 2 ? "1px solid #E8E5DF" : "none",
                display: "grid",
                gridTemplateColumns: "52px 1fr",
                gap: "20px",
                alignItems: "start",
              }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#AAA69E", textTransform: "uppercase" as const, paddingTop: "5px" }}>{c.num}</div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, letterSpacing: "-0.015em", color: "#1A1916", marginBottom: "9px" }}>{c.title}</h3>
                  <p style={{ fontSize: "15px", color: "#5C5A52", lineHeight: 1.7 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COGNITIVE DOMAINS — Swiss 2×2 grid, no icon glyphs, borders as structure */}
      <section style={{ padding: "108px 24px", backgroundColor: "#F0EDE6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "52px", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1916" }}>
              What the test <em style={{ color: "#C96442", fontStyle: "italic" }}>measures</em>
            </h2>
            <Link href="/test" style={{ fontSize: "14px", color: "#C96442", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em", flexShrink: 0 }}>
              Take the test →
            </Link>
          </div>

          <div className="bs-domains-grid" style={{ display: "grid", gap: "0" }}>
            {[
              { num: "01", title: "Logical Reasoning",    desc: "Deduction, inference, and structured problem-solving under constraint." },
              { num: "02", title: "Spatial Intelligence", desc: "Mental rotation, pattern recognition, and visual-spatial mapping." },
              { num: "03", title: "Working Memory",       desc: "Sequential retention, recall accuracy, and cognitive manipulation." },
              { num: "04", title: "Processing Speed",     desc: "Response precision under time pressure and cognitive efficiency." },
            ].map((d, i) => (
              <div key={d.title} style={{
                padding: "32px",
                borderTop: "1px solid #D5D0C7",
                borderRight: i % 2 === 0 ? "1px solid #D5D0C7" : "none",
              }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#AAA69E", textTransform: "uppercase" as const, marginBottom: "14px" }}>{d.num}</div>
                <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "19px", fontWeight: 500, letterSpacing: "-0.015em", color: "#1A1916", marginBottom: "10px" }}>{d.title}</h3>
                <p style={{ fontSize: "14px", color: "#5C5A52", lineHeight: 1.7 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE QUESTION */}
      <section style={{ padding: "108px 24px" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", backgroundColor: "#FBF0EB", color: "#C96442", padding: "5px 14px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "24px", textTransform: "uppercase" as const }}>
            Sample Question
          </div>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1916", marginBottom: "40px", lineHeight: 1.2 }}>
            Which shape completes the sequence?
          </h2>
          <SampleQuestion />
        </div>
      </section>

      {/* PRIVACY — editorial 2-col, right side = trust stats (no duplicate preview) */}
      <section style={{ padding: "108px 24px", backgroundColor: "#F0EDE6" }}>
        <div className="bs-privacy-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", alignItems: "center" }}>

          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#C96442", textTransform: "uppercase" as const, marginBottom: "18px" }}>Privacy</div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1916", marginBottom: "28px", lineHeight: 1.15 }}>
              Your privacy,{" "}
              <em style={{ color: "#C96442", fontStyle: "italic" }}>our priority</em>
            </h2>
            <p style={{ fontSize: "16px", color: "#5C5A52", lineHeight: 1.75, marginBottom: "32px", maxWidth: "380px" }}>
              No account required. No data collected without consent. Your test runs entirely in your browser.
            </p>
            <Link href="/test" style={{ display: "inline-block", backgroundColor: "#1A1916", color: "#FAF8F5", padding: "14px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em" }}>
              Start test — it&apos;s free
            </Link>
          </div>

          <div>
            {[
              "No account required to take the test",
              "No data collected without your consent",
              "Results never sold to third parties",
              "100% client-side test processing",
            ].map((item, i) => (
              <div key={item} style={{
                paddingTop: "20px",
                paddingBottom: "20px",
                borderTop: "1px solid #D5D0C7",
                borderBottom: i === 3 ? "1px solid #D5D0C7" : "none",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#C96442", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: "15px", color: "#1A1916", fontWeight: 500, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — border-only accordion, no card wrappers */}
      <section style={{ padding: "108px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#C96442", textTransform: "uppercase" as const, marginBottom: "16px" }}>FAQ</div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1916", lineHeight: 1.15 }}>
              Frequently asked <em style={{ color: "#C96442", fontStyle: "italic" }}>questions</em>
            </h2>
          </div>
          <div style={{ borderTop: "1px solid #E8E5DF" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid #E8E5DF" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", textAlign: "left", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", background: "none", border: "none", cursor: "pointer" }}
                >
                  <span style={{ fontSize: "15px", fontWeight: 500, color: "#1A1916", lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ color: "#C96442", fontSize: "20px", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s", lineHeight: 1 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: "22px", fontSize: "15px", color: "#5C5A52", lineHeight: 1.75 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — asymmetric: 1 featured large + 2 compact */}
      <section style={{ padding: "108px 24px", backgroundColor: "#F0EDE6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1916" }}>
              Real scores, real <em style={{ color: "#C96442", fontStyle: "italic" }}>people</em>
            </h2>
            <p style={{ fontSize: "13px", color: "#99958C", letterSpacing: "0.01em" }}>847,000+ tests completed worldwide</p>
          </div>

          {/* Featured testimonial */}
          <div className="bs-testi-featured" style={{ display: "grid", gap: "48px", alignItems: "center", backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "20px", padding: "40px", marginBottom: "16px" }}>
            <div className="bs-testi-score-border" style={{ textAlign: "center", borderRight: "1px solid #E8E5DF", paddingRight: "48px" }}>
              <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "80px", fontWeight: 300, letterSpacing: "-0.04em", color: "#1A1916", lineHeight: 1 }}>134</div>
              <div style={{ display: "inline-block", backgroundColor: "#C96442", color: "#fff", padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, marginTop: "10px" }}>Gifted</div>
              <div style={{ fontSize: "11px", color: "#99958C", marginTop: "6px" }}>Top 2%</div>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-display, serif)", fontSize: "19px", fontWeight: 300, color: "#1A1916", lineHeight: 1.7, fontStyle: "italic", marginBottom: "24px" }}>
                &ldquo;I took an official Mensa test a year ago and scored 131. BrainScale gave me 134. Impressed by the accuracy — and it&apos;s completely free. The domain breakdown is genuinely useful.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#FBF0EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#C96442", flexShrink: 0 }}>JT</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1A1916" }}>James T.</div>
                  <div style={{ fontSize: "12px", color: "#99958C" }}>London, UK</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 compact testimonials */}
          <div className="bs-testi-pair" style={{ display: "grid", gap: "16px" }}>
            {[
              {
                score: 121, label: "Superior", labelColor: "#B5572F",
                text: "The questions are seriously challenging — way harder than other online tests. My score of 121 felt very realistic. Took 35 minutes, very smooth experience.",
                name: "Sophie M.", location: "Montreal, Canada", initials: "SM",
              },
              {
                score: 114, label: "Above Avg", labelColor: "#B5572F",
                text: "I was skeptical at first but the questions genuinely challenged me. My 114 score felt accurate — strong in logic but slower on spatial tasks, and the breakdown confirmed that.",
                name: "Aryan K.", location: "Toronto, Canada", initials: "AK",
              },
            ].map((t) => (
              <div key={t.name} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "20px", padding: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                  <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "44px", fontWeight: 300, letterSpacing: "-0.03em", color: "#1A1916", lineHeight: 1 }}>{t.score}</div>
                  <div>
                    <div style={{ display: "inline-block", backgroundColor: t.labelColor, color: "#fff", padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, marginBottom: "4px" }}>{t.label}</div>
                    <div style={{ fontSize: "11px", color: "#99958C" }}>IQ Score</div>
                  </div>
                </div>
                <p style={{ fontSize: "14px", color: "#5C5A52", lineHeight: 1.75, marginBottom: "18px" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#FBF0EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#C96442", flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#1A1916" }}>{t.name}</div>
                    <div style={{ fontSize: "11px", color: "#99958C" }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — elevated editorial closing */}
      <section style={{ margin: "0 24px 24px", borderRadius: "24px", backgroundColor: "#1A1916", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(220,170,140,0.65)", textTransform: "uppercase" as const, marginBottom: "24px" }}>
            Free · 40 Questions · Instant Results
          </div>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 300, letterSpacing: "-0.03em", color: "#fff", marginBottom: "20px", lineHeight: 1.1 }}>
            Ready to discover{" "}
            <em style={{ color: "#D4835E", fontStyle: "italic" }}>your potential?</em>
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", marginBottom: "44px", lineHeight: 1.75 }}>
            Join 847,000+ people who have already discovered their IQ.
          </p>
          <Link href="/test" style={{ display: "inline-block", backgroundColor: "#fff", color: "#1A1916", padding: "16px 40px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em" }}>
            Start Now — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* FOOTER — Anthropic-style: columns + thin legal row */}
      <footer style={{ borderTop: "1px solid #E8E5DF", padding: "64px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Top: wordmark + 3 link columns */}
          <div className="bs-footer-top" style={{ display: "grid", gridTemplateColumns: "220px 1fr 1fr 1fr", gap: "48px", paddingBottom: "56px" }}>

            {/* Brand */}
            <div>
              <Link href="/" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, letterSpacing: "-0.03em", color: "#1A1916", textDecoration: "none", display: "inline-block", marginBottom: "12px" }}>
                Brain<span style={{ color: "#C96442" }}>Scale</span>
              </Link>
              <p style={{ fontSize: "13px", color: "#99958C", lineHeight: 1.65 }}>Free psychometric IQ test. Trusted worldwide since 2024.</p>
            </div>

            {/* Test */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#AAA69E", textTransform: "uppercase", marginBottom: "18px" }}>Test</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/test" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>Take the IQ Test</Link>
                <Link href="/blog" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>Blog</Link>
                <Link href="/fr" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>Version Française</Link>
              </div>
            </div>

            {/* Company */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#AAA69E", textTransform: "uppercase", marginBottom: "18px" }}>About</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/about" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>About BrainScale</Link>
                <a href="mailto:contact@brainscale.app" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>Contact</a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#AAA69E", textTransform: "uppercase", marginBottom: "18px" }}>Legal</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/privacy" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>Privacy Policy</Link>
                <Link href="/terms" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>Terms of Service</Link>
              </div>
            </div>
          </div>

          {/* Bottom legal row */}
          <div style={{ borderTop: "1px solid #E8E5DF", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontSize: "12px", color: "#AAA69E" }}>© 2026 BrainScale</span>
            <div style={{ display: "flex", gap: "20px" }}>
              <Link href="/privacy" style={{ fontSize: "12px", color: "#AAA69E", textDecoration: "none" }}>Privacy</Link>
              <Link href="/terms" style={{ fontSize: "12px", color: "#AAA69E", textDecoration: "none" }}>Terms</Link>
              <a href="mailto:contact@brainscale.app" style={{ fontSize: "12px", color: "#AAA69E", textDecoration: "none" }}>Contact</a>
            </div>
          </div>
        </div>

        <style>{`
          .bs-footer-top { grid-template-columns: 220px 1fr 1fr 1fr; }
          @media (max-width: 860px) {
            .bs-footer-top { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
          }
          @media (max-width: 480px) {
            .bs-footer-top { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </footer>

      {/* FAQ Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a,
              },
            })),
          }),
        }}
      />

    </div>
  );
}
