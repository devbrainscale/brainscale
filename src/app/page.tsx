"use client";

import { useState } from "react";
import Link from "next/link";

function SampleQuestion() {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = 1; // ● is the correct answer (index 1)
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
          <span style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 600, color: "#1A1825" }}>
            Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/blog" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Blog</Link>
            <span style={{ fontSize: "13px", color: "#5B4FCF", fontWeight: 600 }}>EN</span>
            <span style={{ fontSize: "13px", color: "#D4D0C8" }}>|</span>
            <Link href="/fr" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>FR</Link>
            <Link href="/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Start Test
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#EDE9FF", color: "#5B4FCF", padding: "8px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, marginBottom: "32px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#5B4FCF", display: "inline-block" }} />
            Validated Test · 40 Questions · Instant Results
          </div>

          <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 300, lineHeight: 1.15, color: "#1A1825", marginBottom: "24px" }}>
            Discover your{" "}
            <em style={{ color: "#5B4FCF", fontStyle: "italic", whiteSpace: "nowrap" }}>IQ score</em>
            <br />in 40 minutes
          </h1>

          <p style={{ fontSize: "18px", color: "#5C5A6E", lineHeight: 1.7, marginBottom: "40px", maxWidth: "520px", margin: "0 auto 40px" }}>
            A rigorous psychometric test — completely free — measuring your logical, spatial, and analytical reasoning.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "16px 36px", borderRadius: "999px", fontSize: "16px", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 24px rgba(91,79,207,0.35)" }}>
              Test My IQ — Free
            </Link>
            <a href="#how-it-works" style={{ color: "#5C5A6E", padding: "16px 32px", borderRadius: "999px", fontSize: "16px", fontWeight: 500, textDecoration: "none", border: "1px solid #D4D0C8" }}>
              How it works →
            </a>
          </div>

          <div className="bs-stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "64px", paddingTop: "40px", borderTop: "1px solid #E8E5DC" }}>
            {[
              { value: "847,000+", label: "Tests completed" },
              { value: "4.8 / 5", label: "Satisfaction" },
              { value: "r = 0.87", label: "Reliability correlation" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div className="bs-stat-value" style={{ fontFamily: "var(--font-display, serif)", fontSize: "32px", fontWeight: 600, color: "#5B4FCF" }}>{s.value}</div>
                <div className="bs-stat-label" style={{ fontSize: "13px", color: "#9896A8", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 500px) {
              .bs-stat-value { font-size: 22px !important; }
              .bs-stat-label { font-size: 11px !important; }
              .bs-stats-row { gap: 8px !important; }
            }
            @media (max-width: 420px) {
              .bs-bell-legend { gap: 3px !important; }
              .bs-bell-range { font-size: 9px !important; }
              .bs-bell-label { font-size: 8px !important; }
              .bs-bell-pct   { font-size: 13px !important; }
            }
          `}</style>
        </div>
      </section>

      {/* BELL CURVE */}
      <section style={{ padding: "16px 24px 48px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", backgroundColor: "#EFEDE6", borderRadius: "24px", padding: "48px 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "24px", fontWeight: 300, color: "#1A1825", marginBottom: "6px" }}>
            IQ Distribution Worldwide
          </h2>
          <p style={{ fontSize: "13px", color: "#9896A8", marginBottom: "32px" }}>World average: 100 · Standard deviation: 15</p>

          {/* Bell curve with colored zones + inline % labels */}
          <svg viewBox="0 0 600 190" style={{ width: "100%", display: "block", overflow: "visible" }}>
            {/* 5 zones — Wechsler classification */}
            <path d="M 20,165 Q 90,163 140,148 Q 195,130 235,85 Q 241,71 248,70 L 248,165 Z" fill="rgba(91,79,207,0.06)" />
            <path d="M 248,165 L 248,70 Q 265,48 300,28 Q 335,48 350,70 L 350,165 Z" fill="rgba(91,79,207,0.15)" />
            <path d="M 350,165 L 350,70 Q 377,90 401,118 L 401,165 Z" fill="rgba(91,79,207,0.32)" />
            <path d="M 401,165 L 401,118 Q 428,137 452,145 L 452,165 Z" fill="rgba(91,79,207,0.52)" />
            <path d="M 452,165 L 452,145 Q 510,163 580,165 Z" fill="rgba(91,79,207,0.72)" />
            {/* Separators */}
            <line x1="248" y1="70"  x2="248" y2="165" stroke="rgba(91,79,207,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="350" y1="70"  x2="350" y2="165" stroke="rgba(91,79,207,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="401" y1="118" x2="401" y2="165" stroke="rgba(91,79,207,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="452" y1="145" x2="452" y2="165" stroke="rgba(91,79,207,0.15)" strokeWidth="1" strokeDasharray="3,3" />
            {/* Curve */}
            <path d="M 20,165 Q 90,163 140,148 Q 195,130 235,85 Q 265,48 300,28 Q 335,48 365,85 Q 405,130 460,148 Q 510,163 580,165" fill="none" stroke="#5B4FCF" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            <line x1="20" y1="165" x2="580" y2="165" stroke="#D4D0C8" strokeWidth="1" />
            <line x1="300" y1="28" x2="300" y2="165" stroke="#5B4FCF" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.28" />
            {/* % labels — positioned where each zone has vertical space */}
            <text x="120" y="158" textAnchor="middle" fontSize="12" fontWeight="700" fill="#9896A8">25%</text>
            <text x="299" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5B4FCF">50%</text>
            <text x="375" y="142" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3D2FA8">16%</text>
            <text x="426" y="152" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">7%</text>
            <text x="516" y="152" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">2%</text>
            {/* Axis: 90 · 100 · 110 · 120 · 130 */}
            <text x="248" y="184" textAnchor="middle" fontSize="10" fill="#9896A8">90</text>
            <text x="300" y="184" textAnchor="middle" fontSize="12" fill="#5B4FCF" fontWeight="500">100</text>
            <text x="350" y="184" textAnchor="middle" fontSize="10" fill="#9896A8">110</text>
            <text x="401" y="184" textAnchor="middle" fontSize="10" fill="#9896A8">120</text>
            <text x="452" y="184" textAnchor="middle" fontSize="10" fill="#9896A8">130</text>
          </svg>

          {/* 5-zone legend — uniform cards, single row */}
          <div className="bs-bell-legend" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "5px", marginTop: "20px" }}>
            {[
              { range: "< 90",    label: "Below Avg",  pct: "25%", bg: "rgba(91,79,207,0.06)", text: "#9896A8", sub: "#B0AEC0" },
              { range: "90–109",  label: "Average",    pct: "50%", bg: "rgba(91,79,207,0.15)", text: "#5B4FCF", sub: "#5C5A6E" },
              { range: "110–119", label: "Above Avg",  pct: "16%", bg: "rgba(91,79,207,0.32)", text: "#3D2FA8", sub: "#4A3EBE" },
              { range: "120–129", label: "Superior",   pct: "7%",  bg: "rgba(91,79,207,0.52)", text: "#fff",    sub: "rgba(255,255,255,0.78)" },
              { range: "≥ 130",   label: "Gifted",     pct: "2%",  bg: "rgba(91,79,207,0.72)", text: "#fff",    sub: "rgba(255,255,255,0.78)" },
            ].map((z) => (
              <div key={z.range} style={{ backgroundColor: z.bg, borderRadius: "10px", padding: "12px 4px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", minHeight: "72px" }}>
                <div className="bs-bell-range" style={{ fontSize: "10px", fontWeight: 500, color: z.text, lineHeight: 1.2 }}>{z.range}</div>
                <div className="bs-bell-label" style={{ fontSize: "9px", fontWeight: 400, color: z.sub, lineHeight: 1.3 }}>{z.label}</div>
                <div className="bs-bell-pct" style={{ fontSize: "15px", fontWeight: 600, color: z.text }}>{z.pct}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1A1825", marginBottom: "12px" }}>
              A <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>scientific</em> methodology
            </h2>
            <p style={{ fontSize: "17px", color: "#5C5A6E" }}>Every question is designed and validated by psychometricians.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { num: "01", title: "Matrix Reasoning", desc: "Identify visual patterns and complete logical sequences — the core of fluid IQ measurement." },
              { num: "02", title: "Analytical Logic", desc: "Deduction problems, number series, and verbal analogies to assess crystallized reasoning." },
              { num: "03", title: "Calibrated Score", desc: "Your result is normalized against our base of 847,000+ participants for a precise comparison." },
            ].map((c) => (
              <div key={c.num} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "20px", padding: "36px 32px", boxShadow: "0 2px 12px rgba(26,24,37,0.06)" }}>
                <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "3px", color: "#5B4FCF", marginBottom: "16px" }}>{c.num}</div>
                <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1825", marginBottom: "12px" }}>{c.title}</h3>
                <p style={{ fontSize: "14px", color: "#5C5A6E", lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COGNITIVE DOMAINS */}
      <section style={{ padding: "72px 24px", backgroundColor: "#EFEDE6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1A1825", textAlign: "center", marginBottom: "48px" }}>
            What the test <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>measures</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {[
              { icon: "◈", title: "Logical Reasoning", desc: "Deduction & inference" },
              { icon: "◉", title: "Spatial Intelligence", desc: "Mental rotation, patterns" },
              { icon: "◇", title: "Working Memory", desc: "Retention & manipulation" },
              { icon: "◎", title: "Processing Speed", desc: "Cognitive quickness" },
            ].map((d) => (
              <div key={d.title} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "20px", padding: "32px 24px", textAlign: "center", boxShadow: "0 2px 12px rgba(26,24,37,0.06)" }}>
                <div style={{ fontSize: "32px", color: "#5B4FCF", marginBottom: "16px" }}>{d.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "16px", fontWeight: 600, color: "#1A1825", marginBottom: "8px" }}>{d.title}</h3>
                <p style={{ fontSize: "13px", color: "#9896A8" }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE QUESTION */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", backgroundColor: "#EDE9FF", color: "#5B4FCF", padding: "6px 16px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", marginBottom: "24px" }}>
            SAMPLE QUESTION
          </div>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 300, color: "#1A1825", marginBottom: "40px" }}>
            Which shape completes the sequence?
          </h2>

          <SampleQuestion />
        </div>
      </section>

      {/* PRIVACY */}
      <section style={{ padding: "72px 24px", backgroundColor: "#EFEDE6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1A1825", marginBottom: "32px" }}>
              Your privacy,{" "}
              <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>our priority</em>
            </h2>
            {["No account required to take the test", "No data collected without your consent", "Results never sold to third parties", "100% client-side test processing"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "18px" }}>
                <span style={{ color: "#5B4FCF", fontSize: "18px", lineHeight: 1.4 }}>✓</span>
                <span style={{ fontSize: "15px", color: "#5C5A6E", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "24px", padding: "40px", boxShadow: "0 4px 24px rgba(26,24,37,0.08)" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "72px", fontWeight: 300, color: "#5B4FCF", lineHeight: 1 }}>127</div>
              <div style={{ fontSize: "13px", color: "#9896A8", marginTop: "6px" }}>IQ Score — example</div>
            </div>
            {[
              { label: "Logical Reasoning", pct: 88 },
              { label: "Spatial Intelligence", pct: 75 },
              { label: "Processing Speed", pct: 91 },
            ].map((bar) => (
              <div key={bar.label} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9896A8", marginBottom: "6px" }}>
                  <span>{bar.label}</span>
                  <span>{bar.pct}th percentile</span>
                </div>
                <div style={{ height: "6px", borderRadius: "999px", backgroundColor: "#EFEDE6", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: "999px", backgroundColor: "#5B4FCF", width: `${bar.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1A1825", textAlign: "center", marginBottom: "48px" }}>
            Frequently asked <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>questions</em>
          </h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "16px", marginBottom: "10px", overflow: "hidden", boxShadow: openFaq === i ? "0 4px 20px rgba(26,24,37,0.08)" : "none" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", textAlign: "left", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", background: "none", border: "none", cursor: "pointer" }}
              >
                <span style={{ fontSize: "15px", fontWeight: 500, color: "#1A1825" }}>{faq.q}</span>
                <span style={{ color: "#5B4FCF", fontSize: "22px", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 24px 20px", fontSize: "14px", color: "#5C5A6E", lineHeight: 1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1A1825", marginBottom: "12px" }}>
              Real scores, real <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>people</em>
            </h2>
            <p style={{ fontSize: "16px", color: "#9896A8" }}>847,000+ tests completed · Trusted worldwide</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {[
              {
                name: "James T.",
                location: "London, UK",
                score: 134,
                label: "Gifted",
                labelColor: "#5B4FCF",
                text: "I took an official Mensa test a year ago and scored 131. BrainScale gave me 134. Impressed by the accuracy — and it's completely free. The domain breakdown is genuinely useful.",
                initials: "JT",
              },
              {
                name: "Sophie M.",
                location: "Montreal, Canada",
                score: 121,
                label: "Superior",
                labelColor: "#4A3EBE",
                text: "The questions are seriously challenging — way harder than other online tests. My score of 121 felt very realistic. Took 35 minutes, very smooth experience.",
                initials: "SM",
              },
              {
                name: "Aryan K.",
                location: "Toronto, Canada",
                score: 136,
                label: "Gifted",
                labelColor: "#5B4FCF",
                text: "Used the premium report for a job application requiring cognitive assessment. The PDF looks professional and the breakdown by domain is detailed enough to be credible.",
                initials: "AK",
              },
            ].map((t) => (
              <div key={t.name} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "20px", overflow: "hidden", boxShadow: "0 2px 16px rgba(26,24,37,0.06)", display: "flex", flexDirection: "column" }}>
                {/* Score header — mirrors /results page */}
                <div style={{ padding: "28px 28px 20px", borderBottom: "1px solid #E8E5DC", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "52px", fontWeight: 300, color: "#5B4FCF", lineHeight: 1 }}>
                    {t.score}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-block", backgroundColor: t.labelColor, color: "#fff", padding: "5px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "6px" }}>
                      {t.label}
                    </div>
                    <div style={{ fontSize: "11px", color: "#9896A8", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>IQ Score</div>
                  </div>
                </div>
                {/* Quote */}
                <div style={{ padding: "20px 28px", flex: 1 }}>
                  <p style={{ fontSize: "14px", color: "#5C5A6E", lineHeight: 1.75, margin: 0 }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                {/* Author */}
                <div style={{ padding: "16px 28px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#EDE9FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#5B4FCF", flexShrink: 0 }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#1A1825" }}>{t.name}</div>
                    <div style={{ fontSize: "12px", color: "#9896A8" }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ margin: "0 24px 24px", borderRadius: "28px", backgroundColor: "#0F0E17", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 300, color: "#fff", marginBottom: "20px", lineHeight: 1.2 }}>
            Ready to discover <em style={{ color: "#9B8FE0", fontStyle: "italic" }}>your potential?</em>
          </h2>
          <p style={{ fontSize: "17px", color: "#9896A8", marginBottom: "40px", lineHeight: 1.7 }}>
            Join 847,000+ people who have already discovered their IQ.<br />Free, fast, no sign-up.
          </p>
          <Link href="/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "18px 44px", borderRadius: "999px", fontSize: "16px", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 32px rgba(91,79,207,0.5)" }}>
            Start Now — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 24px", textAlign: "center" }}>
        <Link href="/" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1825", textDecoration: "none", display: "inline-block", marginBottom: "12px" }}>
          Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
        </Link>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "16px", flexWrap: "wrap" }}>
          <Link href="/blog" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Blog</Link>
          <Link href="/privacy" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Terms of Service</Link>
          <a href="mailto:contact@brainscale.app" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Contact</a>
        </div>
        <p style={{ fontSize: "12px", color: "#9896A8" }}>
          © 2026 BrainScale · Free psychometric test · Contact: contact@brainscale.app
        </p>
      </footer>

      {/* FAQ Schema.org — rich snippets Google */}
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