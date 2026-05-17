"use client";

import { useState } from "react";
import Link from "next/link";

function SampleQuestion() {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = 1;
  const opts = ["▲", "●", "■", "◆"];

  return (
    <div style={{ backgroundColor: "#EFEDE6", border: "1px solid #E8E5DC", borderRadius: "24px", padding: "40px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", maxWidth: "240px", margin: "0 auto 28px" }}>
        {["▲", "●", "■", "●", "■", "▲", "■", "▲", "?"].map((s, i) => (
          <div key={i} style={{
            aspectRatio: "1", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", fontWeight: "bold",
            backgroundColor: s === "?" ? "#EDE9FF" : "#fff",
            border: s === "?" ? "2px dashed #5B4FCF" : "1px solid #E8E5DC",
            color: s === "?" ? "#5B4FCF" : "#5C5A6E",
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
                backgroundColor: isCorrect ? "#5B4FCF" : isWrong ? "#F0EDE4" : isSelected ? "#5B4FCF" : "#fff",
                border: isCorrect ? "2px solid #5B4FCF" : isWrong ? "2px solid #C4A882" : isSelected ? "2px solid #5B4FCF" : "1px solid #D4D0C8",
                color: isCorrect ? "#fff" : isWrong ? "#9896A8" : isSelected ? "#fff" : "#5C5A6E",
                transform: isSelected ? "scale(1.08)" : "scale(1)",
              }}
            >
              {opt}
            </div>
          );
        })}
      </div>

      {selected === null && (
        <p style={{ fontSize: "12px", color: "#9896A8", marginTop: "16px" }}>Try it — click an answer</p>
      )}
      {selected !== null && selected === correct && (
        <p style={{ fontSize: "13px", color: "#5B4FCF", fontWeight: 600, marginTop: "16px" }}>✓ Correct — cyclic rotation pattern.</p>
      )}
      {selected !== null && selected !== correct && (
        <p style={{ fontSize: "13px", color: "#9896A8", fontWeight: 500, marginTop: "16px" }}>Not quite — the answer is ● (cyclic rotation).</p>
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

  return (
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "#F7F6F2", borderBottom: "1px solid #E8E5DC", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.03em", color: "#1A1825" }}>
            Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/blog" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none", letterSpacing: "0.01em" }}>Blog</Link>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "13px", color: "#5B4FCF", fontWeight: 600 }}>EN</span>
              <span style={{ fontSize: "11px", color: "#D4D0C8" }}>·</span>
              <Link href="/fr" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>FR</Link>
            </div>
            <Link href="/test" style={{ backgroundColor: "#1A1825", color: "#F7F6F2", padding: "10px 22px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em" }}>
              Start Test
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO — asymmetric 2-column */}
      <section style={{ padding: "88px 24px 64px" }}>
        <div className="bs-hero-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>

          {/* LEFT — text */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#EDE9FF", color: "#5B4FCF", padding: "6px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "28px", whiteSpace: "nowrap", textTransform: "uppercase" as const }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#5B4FCF", flexShrink: 0, display: "inline-block" }} />
              Validated · 40 Questions · Instant Results
            </div>

            <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(36px, 4.5vw, 62px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.025em", color: "#1A1825", marginBottom: "22px" }}>
              Discover your{" "}
              <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>IQ score</em>
              {" "}in 40 minutes
            </h1>

            <p style={{ fontSize: "17px", color: "#5C5A6E", lineHeight: 1.75, marginBottom: "36px", maxWidth: "420px" }}>
              A rigorous psychometric test, completely free, measuring your logical, spatial, and analytical reasoning.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "14px 30px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em", boxShadow: "0 4px 20px rgba(91,79,207,0.30)" }}>
                Test My IQ — Free
              </Link>
              <a href="#how-it-works" style={{ color: "#5C5A6E", padding: "14px 26px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, textDecoration: "none", border: "1px solid #D4D0C8" }}>
                How it works →
              </a>
            </div>

            {/* Stats — 3-column grid, never wraps */}
            <div className="bs-hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", marginTop: "44px", paddingTop: "28px", borderTop: "1px solid #E8E5DC" }}>
              {[
                { value: "847,000+", label: "tests completed" },
                { value: "4.8 / 5", label: "satisfaction" },
                { value: "r = 0.87", label: "reliability" },
              ].map((s, i) => (
                <div key={s.label} style={{ paddingRight: i < 2 ? "16px" : "0", borderRight: i < 2 ? "1px solid #E8E5DC" : "none", paddingLeft: i > 0 ? "16px" : "0" }}>
                  <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1825", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "11px", color: "#9896A8", marginTop: "5px", letterSpacing: "0.02em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — result preview card (hidden on mobile) */}
          <div className="bs-hero-card" style={{ backgroundColor: "#EFEDE6", border: "1px solid #E8E5DC", borderRadius: "24px", padding: "36px 32px" }}>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#fff", color: "#9896A8", padding: "5px 12px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "24px", border: "1px solid #E8E5DC", textTransform: "uppercase" as const }}>
              Sample result
            </div>

            <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "88px", fontWeight: 300, color: "#1A1825", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "10px" }}>
              127
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <span style={{ display: "inline-block", backgroundColor: "#5B4FCF", color: "#fff", padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.02em" }}>Superior</span>
              <span style={{ fontSize: "12px", color: "#9896A8" }}>Top 9% worldwide</span>
            </div>

            {[
              { label: "Logical Reasoning",    pct: 88 },
              { label: "Spatial Intelligence", pct: 74 },
              { label: "Processing Speed",      pct: 91 },
            ].map((bar) => (
              <div key={bar.label} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9896A8", marginBottom: "7px" }}>
                  <span>{bar.label}</span>
                  <span>{bar.pct}th pct.</span>
                </div>
                <div style={{ height: "3px", borderRadius: "999px", backgroundColor: "#D4D0C8", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${bar.pct}%`, backgroundColor: "#5B4FCF", borderRadius: "999px" }} />
                </div>
              </div>
            ))}

            <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px solid #E8E5DC", fontSize: "10px", color: "#B8B4A8", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
              Example · your actual result will vary
            </div>
          </div>
        </div>

        <style>{`
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
          .bs-footer-grid { grid-template-columns: 1fr auto; gap: 48px; }
          @media (max-width: 540px) {
            .bs-footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          }
        `}</style>
      </section>

      {/* BELL CURVE */}
      <section style={{ padding: "0 24px 64px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", backgroundColor: "#EFEDE6", borderRadius: "24px", padding: "48px 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "22px", fontWeight: 300, letterSpacing: "-0.015em", color: "#1A1825", marginBottom: "6px" }}>
            IQ Distribution Worldwide
          </h2>
          <p style={{ fontSize: "13px", color: "#9896A8", marginBottom: "32px", letterSpacing: "0.01em" }}>World average: 100 · Standard deviation: 15</p>

          <svg viewBox="0 0 600 190" style={{ width: "100%", display: "block", overflow: "visible" }}>
            <path d="M 20,165 Q 90,163 140,148 Q 195,130 235,85 Q 241,71 248,70 L 248,165 Z" fill="rgba(91,79,207,0.06)" />
            <path d="M 248,165 L 248,70 Q 265,48 300,28 Q 335,48 350,70 L 350,165 Z" fill="rgba(91,79,207,0.15)" />
            <path d="M 350,165 L 350,70 Q 377,90 401,118 L 401,165 Z" fill="rgba(91,79,207,0.32)" />
            <path d="M 401,165 L 401,118 Q 428,137 452,145 L 452,165 Z" fill="rgba(91,79,207,0.52)" />
            <path d="M 452,165 L 452,145 Q 510,163 580,165 Z" fill="rgba(91,79,207,0.72)" />
            <line x1="248" y1="70"  x2="248" y2="165" stroke="rgba(91,79,207,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="350" y1="70"  x2="350" y2="165" stroke="rgba(91,79,207,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="401" y1="118" x2="401" y2="165" stroke="rgba(91,79,207,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="452" y1="145" x2="452" y2="165" stroke="rgba(91,79,207,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <path d="M 20,165 Q 90,163 140,148 Q 195,130 235,85 Q 265,48 300,28 Q 335,48 365,85 Q 405,130 460,148 Q 510,163 580,165" fill="none" stroke="#5B4FCF" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            <line x1="20" y1="165" x2="580" y2="165" stroke="#D4D0C8" strokeWidth="1" />
            <line x1="300" y1="28" x2="300" y2="165" stroke="#5B4FCF" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.28" />
            <text x="248" y="184" textAnchor="middle" fontSize="10" fill="#9896A8">90</text>
            <text x="300" y="184" textAnchor="middle" fontSize="12" fill="#5B4FCF" fontWeight="500">100</text>
            <text x="350" y="184" textAnchor="middle" fontSize="10" fill="#9896A8">110</text>
            <text x="401" y="184" textAnchor="middle" fontSize="10" fill="#9896A8">120</text>
            <text x="452" y="184" textAnchor="middle" fontSize="10" fill="#9896A8">130</text>
          </svg>

          <div className="bs-bell-legend" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "5px", marginTop: "20px" }}>
            {[
              { range: "< 90",    label: "Below Avg",  pct: "25%", bg: "rgba(91,79,207,0.06)", text: "#9896A8", sub: "#B0AEC0" },
              { range: "90–109",  label: "Average",    pct: "50%", bg: "rgba(91,79,207,0.15)", text: "#5B4FCF", sub: "#5C5A6E" },
              { range: "110–119", label: "Above Avg",  pct: "16%", bg: "rgba(91,79,207,0.32)", text: "#3D2FA8", sub: "#4A3EBE" },
              { range: "120–129", label: "Superior",   pct: "7%",  bg: "rgba(91,79,207,0.52)", text: "#fff",    sub: "rgba(255,255,255,0.78)" },
              { range: "≥ 130",   label: "Gifted",     pct: "2%",  bg: "rgba(91,79,207,0.72)", text: "#fff",    sub: "rgba(255,255,255,0.78)" },
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
      <section id="how-it-works" style={{ padding: "96px 24px" }}>
        <div className="bs-method-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", alignItems: "start", gap: "80px" }}>

          {/* Left — editorial label + intro */}
          <div style={{ paddingTop: "8px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#5B4FCF", textTransform: "uppercase" as const, marginBottom: "18px" }}>
              Methodology
            </div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#1A1825", marginBottom: "20px" }}>
              A <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>scientific</em> methodology
            </h2>
            <p style={{ fontSize: "16px", color: "#5C5A6E", lineHeight: 1.75, maxWidth: "280px" }}>
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
                borderTop: "1px solid #E8E5DC",
                borderBottom: i === 2 ? "1px solid #E8E5DC" : "none",
                display: "grid",
                gridTemplateColumns: "52px 1fr",
                gap: "20px",
                alignItems: "start",
              }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#B8B4A8", textTransform: "uppercase" as const, paddingTop: "5px" }}>{c.num}</div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, letterSpacing: "-0.015em", color: "#1A1825", marginBottom: "9px" }}>{c.title}</h3>
                  <p style={{ fontSize: "15px", color: "#5C5A6E", lineHeight: 1.7 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COGNITIVE DOMAINS — Swiss 2×2 grid, no icon glyphs, borders as structure */}
      <section style={{ padding: "96px 24px", backgroundColor: "#EFEDE6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "52px", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1825" }}>
              What the test <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>measures</em>
            </h2>
            <Link href="/test" style={{ fontSize: "14px", color: "#5B4FCF", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em", flexShrink: 0 }}>
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
                borderTop: "1px solid #D4D0C8",
                borderRight: i % 2 === 0 ? "1px solid #D4D0C8" : "none",
              }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#B8B4A8", textTransform: "uppercase" as const, marginBottom: "14px" }}>{d.num}</div>
                <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "19px", fontWeight: 500, letterSpacing: "-0.015em", color: "#1A1825", marginBottom: "10px" }}>{d.title}</h3>
                <p style={{ fontSize: "14px", color: "#5C5A6E", lineHeight: 1.7 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE QUESTION */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", backgroundColor: "#EDE9FF", color: "#5B4FCF", padding: "5px 14px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "24px", textTransform: "uppercase" as const }}>
            Sample Question
          </div>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1825", marginBottom: "40px", lineHeight: 1.2 }}>
            Which shape completes the sequence?
          </h2>
          <SampleQuestion />
        </div>
      </section>

      {/* PRIVACY — editorial 2-col, right side = trust stats (no duplicate preview) */}
      <section style={{ padding: "96px 24px", backgroundColor: "#EFEDE6" }}>
        <div className="bs-privacy-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", alignItems: "center" }}>

          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#5B4FCF", textTransform: "uppercase" as const, marginBottom: "18px" }}>Privacy</div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1825", marginBottom: "28px", lineHeight: 1.15 }}>
              Your privacy,{" "}
              <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>our priority</em>
            </h2>
            <p style={{ fontSize: "16px", color: "#5C5A6E", lineHeight: 1.75, marginBottom: "32px", maxWidth: "380px" }}>
              No account required. No data collected without consent. Your test runs entirely in your browser.
            </p>
            <Link href="/test" style={{ display: "inline-block", backgroundColor: "#1A1825", color: "#F7F6F2", padding: "14px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em" }}>
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
                borderTop: "1px solid #D4D0C8",
                borderBottom: i === 3 ? "1px solid #D4D0C8" : "none",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#5B4FCF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: "15px", color: "#1A1825", fontWeight: 500, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — border-only accordion, no card wrappers */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#5B4FCF", textTransform: "uppercase" as const, marginBottom: "16px" }}>FAQ</div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1825", lineHeight: 1.15 }}>
              Frequently asked <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>questions</em>
            </h2>
          </div>
          <div style={{ borderTop: "1px solid #E8E5DC" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid #E8E5DC" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", textAlign: "left", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", background: "none", border: "none", cursor: "pointer" }}
                >
                  <span style={{ fontSize: "15px", fontWeight: 500, color: "#1A1825", lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ color: "#5B4FCF", fontSize: "20px", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s", lineHeight: 1 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: "22px", fontSize: "15px", color: "#5C5A6E", lineHeight: 1.75 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — asymmetric: 1 featured large + 2 compact */}
      <section style={{ padding: "96px 24px", backgroundColor: "#EFEDE6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1825" }}>
              Real scores, real <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>people</em>
            </h2>
            <p style={{ fontSize: "13px", color: "#9896A8", letterSpacing: "0.01em" }}>847,000+ tests completed worldwide</p>
          </div>

          {/* Featured testimonial */}
          <div className="bs-testi-featured" style={{ display: "grid", gap: "48px", alignItems: "center", backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "20px", padding: "40px", marginBottom: "16px" }}>
            <div className="bs-testi-score-border" style={{ textAlign: "center", borderRight: "1px solid #E8E5DC", paddingRight: "48px" }}>
              <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "80px", fontWeight: 300, letterSpacing: "-0.04em", color: "#1A1825", lineHeight: 1 }}>134</div>
              <div style={{ display: "inline-block", backgroundColor: "#5B4FCF", color: "#fff", padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, marginTop: "10px" }}>Gifted</div>
              <div style={{ fontSize: "11px", color: "#9896A8", marginTop: "6px" }}>Top 2%</div>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-display, serif)", fontSize: "19px", fontWeight: 300, color: "#1A1825", lineHeight: 1.7, fontStyle: "italic", marginBottom: "24px" }}>
                &ldquo;I took an official Mensa test a year ago and scored 131. BrainScale gave me 134. Impressed by the accuracy — and it&apos;s completely free. The domain breakdown is genuinely useful.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#EDE9FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#5B4FCF", flexShrink: 0 }}>JT</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1A1825" }}>James T.</div>
                  <div style={{ fontSize: "12px", color: "#9896A8" }}>London, UK</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 compact testimonials */}
          <div className="bs-testi-pair" style={{ display: "grid", gap: "16px" }}>
            {[
              {
                score: 121, label: "Superior", labelColor: "#4A3EBE",
                text: "The questions are seriously challenging — way harder than other online tests. My score of 121 felt very realistic. Took 35 minutes, very smooth experience.",
                name: "Sophie M.", location: "Montreal, Canada", initials: "SM",
              },
              {
                score: 114, label: "Above Avg", labelColor: "#4A3EBE",
                text: "I was skeptical at first but the questions genuinely challenged me. My 114 score felt accurate — strong in logic but slower on spatial tasks, and the breakdown confirmed that.",
                name: "Aryan K.", location: "Toronto, Canada", initials: "AK",
              },
            ].map((t) => (
              <div key={t.name} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "20px", padding: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                  <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "44px", fontWeight: 300, letterSpacing: "-0.03em", color: "#1A1825", lineHeight: 1 }}>{t.score}</div>
                  <div>
                    <div style={{ display: "inline-block", backgroundColor: t.labelColor, color: "#fff", padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, marginBottom: "4px" }}>{t.label}</div>
                    <div style={{ fontSize: "11px", color: "#9896A8" }}>IQ Score</div>
                  </div>
                </div>
                <p style={{ fontSize: "14px", color: "#5C5A6E", lineHeight: 1.75, marginBottom: "18px" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#EDE9FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#5B4FCF", flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#1A1825" }}>{t.name}</div>
                    <div style={{ fontSize: "11px", color: "#9896A8" }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — elevated editorial closing */}
      <section style={{ margin: "0 24px 24px", borderRadius: "24px", backgroundColor: "#0F0E17", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(185,172,255,0.6)", textTransform: "uppercase" as const, marginBottom: "24px" }}>
            Free · 40 Questions · Instant Results
          </div>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 300, letterSpacing: "-0.03em", color: "#fff", marginBottom: "20px", lineHeight: 1.1 }}>
            Ready to discover{" "}
            <em style={{ color: "#9B8FE0", fontStyle: "italic" }}>your potential?</em>
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", marginBottom: "44px", lineHeight: 1.75 }}>
            Join 847,000+ people who have already discovered their IQ.
          </p>
          <Link href="/test" style={{ display: "inline-block", backgroundColor: "#fff", color: "#1A1825", padding: "16px 40px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em" }}>
            Start Now — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* FOOTER — structured grid */}
      <footer style={{ padding: "48px 24px" }}>
        <div className="bs-footer-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", alignItems: "start" }}>
          <div>
            <Link href="/" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, letterSpacing: "-0.03em", color: "#1A1825", textDecoration: "none", display: "inline-block", marginBottom: "10px" }}>
              Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
            </Link>
            <p style={{ fontSize: "13px", color: "#9896A8", lineHeight: 1.6 }}>Free psychometric IQ test.<br />Trusted worldwide since 2024.</p>
          </div>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/blog" style={{ fontSize: "13px", color: "#5C5A6E", textDecoration: "none" }}>Blog</Link>
              <Link href="/fr" style={{ fontSize: "13px", color: "#5C5A6E", textDecoration: "none" }}>Français</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/privacy" style={{ fontSize: "13px", color: "#5C5A6E", textDecoration: "none" }}>Privacy Policy</Link>
              <Link href="/terms" style={{ fontSize: "13px", color: "#5C5A6E", textDecoration: "none" }}>Terms of Service</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href="mailto:contact@brainscale.app" style={{ fontSize: "13px", color: "#5C5A6E", textDecoration: "none" }}>Contact</a>
              <span style={{ fontSize: "13px", color: "#B8B4A8" }}>© 2026 BrainScale</span>
            </div>
          </div>
        </div>
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
