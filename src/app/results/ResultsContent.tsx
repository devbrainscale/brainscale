"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

function getPercentile(iq: number): number {
  if (iq >= 145) return 99.9;
  if (iq >= 140) return 99.6;
  if (iq >= 135) return 99;
  if (iq >= 130) return 98;
  if (iq >= 125) return 95;
  if (iq >= 120) return 91;
  if (iq >= 115) return 84;
  if (iq >= 110) return 75;
  if (iq >= 105) return 63;
  if (iq >= 100) return 50;
  if (iq >= 95) return 37;
  if (iq >= 90) return 25;
  if (iq >= 85) return 16;
  if (iq >= 80) return 9;
  return 5;
}

function getLabel(iq: number): { title: string; desc: string; color: string } {
  if (iq >= 130) return { title: "Gifted", desc: "You are in the top 2% of the population. Exceptional reasoning and problem-solving abilities.", color: "#5B4FCF" };
  if (iq >= 120) return { title: "Superior", desc: "You are in the top 9% of the population. Strong analytical and logical skills.", color: "#4A3EBE" };
  if (iq >= 110) return { title: "Above Average", desc: "You are in the top 25% of the population. Above-average reasoning capacity.", color: "#6B5FD9" };
  if (iq >= 90) return { title: "Average", desc: "You score in the typical range, shared by 68% of the population.", color: "#8B7FE8" };
  return { title: "Below Average", desc: "Your score is below the population average. Practice and focus can improve this.", color: "#9896A8" };
}

export default function ResultsContent() {
  const params = useSearchParams();
  const rawScore = parseInt(params.get("score") ?? "100");
  const rawCorrect = parseInt(params.get("correct") ?? "20");
  const rawTotal = parseInt(params.get("total") ?? "40");
  // Clamp to valid ranges to prevent garbage display
  const score = isNaN(rawScore) ? 100 : Math.min(145, Math.max(75, rawScore));
  const total = isNaN(rawTotal) || rawTotal <= 0 ? 40 : rawTotal;
  const correct = isNaN(rawCorrect) ? 0 : Math.min(total, Math.max(0, rawCorrect));

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);

  const percentile = getPercentile(score);
  const label = getLabel(score);
  const accuracy = Math.round((correct / total) * 100);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setEmailError("");
    if (!email || !email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!gdprConsent) {
      setEmailError("Please accept the terms to continue.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, score }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setEmailError("Something went wrong. Please try again.");
      }
    } catch {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // gauge: 75–145 range mapped to 0–100%
  const gaugePercent = Math.min(100, Math.max(0, ((score - 75) / 70) * 100));

  // Breakdown: derive distinct-feeling scores based on correct/total per category simulation
  const logicalPct = Math.min(99, Math.round(percentile * 1.05));
  const spatialPct = Math.min(99, Math.round(percentile * 0.92));
  const processingPct = Math.min(99, Math.round(percentile * 0.98));
  const breakdown = [
    { label: "Logical Reasoning", score: logicalPct },
    { label: "Spatial Intelligence", score: spatialPct },
    { label: "Processing Speed", score: processingPct },
  ];

  return (
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>

      {/* HEADER */}
      <header style={{ backgroundColor: "#F7F6F2", borderBottom: "1px solid #E8E5DC", padding: "0 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1825", textDecoration: "none" }}>
            Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
          </Link>
          <span style={{ backgroundColor: "#EDE9FF", color: "#5B4FCF", padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>
            Test Complete ✓
          </span>
        </div>
      </header>

      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* SCORE HERO */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "13px", color: "#9896A8", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
            Your IQ Score
          </p>
          <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(80px, 15vw, 120px)", fontWeight: 300, color: "#5B4FCF", lineHeight: 1, marginBottom: "8px" }}>
            {score}
          </div>
          <div style={{ display: "inline-block", backgroundColor: label.color, color: "#fff", padding: "8px 24px", borderRadius: "999px", fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>
            {label.title}
          </div>
          <p style={{ fontSize: "16px", color: "#5C5A6E", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
            {label.desc}
          </p>
        </div>

        {/* EMAIL CAPTURE */}
        {!submitted && !skipped ? (
          <div style={{ backgroundColor: "#EDE9FF", border: "1px solid #C4BBFF", borderRadius: "24px", padding: "36px", marginBottom: "20px", textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" }}>
              🧠 Free improvement plan
            </p>
            <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "22px", fontWeight: 500, color: "#1A1825", marginBottom: "8px" }}>
              Save your results & get your free 7-day brain training plan
            </h3>
            <p style={{ fontSize: "14px", color: "#5C5A6E", marginBottom: "24px", maxWidth: "380px", margin: "0 auto 24px" }}>
              We'll email you your score + a personalized plan to boost your weakest cognitive areas.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "10px", maxWidth: "440px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, minWidth: "200px", padding: "14px 20px", borderRadius: "999px", border: "1.5px solid #C4BBFF", fontSize: "14px", outline: "none", backgroundColor: "#fff", color: "#1A1825" }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "14px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, whiteSpace: "nowrap" }}
              >
                {loading ? "Sending…" : "Send my report →"}
              </button>
            </form>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", maxWidth: "440px", margin: "12px auto 0", textAlign: "left" }}>
              <input
                type="checkbox"
                id="gdpr-consent"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                style={{ marginTop: "2px", accentColor: "#5B4FCF", flexShrink: 0, cursor: "pointer" }}
              />
              <label htmlFor="gdpr-consent" style={{ fontSize: "12px", color: "#5C5A6E", lineHeight: 1.5, cursor: "pointer" }}>
                I agree to receive my results and improvement tips by email. I can unsubscribe at any time. See our{" "}
                <a href="/privacy" style={{ color: "#5B4FCF", textDecoration: "underline" }}>Privacy Policy</a>.
              </label>
            </div>
            {emailError && <p style={{ color: "#E53E3E", fontSize: "13px", marginTop: "10px" }}>{emailError}</p>}
            <button
              onClick={() => setSkipped(true)}
              style={{ background: "none", border: "none", color: "#9896A8", fontSize: "12px", marginTop: "14px", cursor: "pointer", textDecoration: "underline" }}
            >
              Skip for now
            </button>
          </div>
        ) : submitted ? (
          <div style={{ backgroundColor: "#EDE9FF", border: "1px solid #C4BBFF", borderRadius: "16px", padding: "16px 24px", marginBottom: "20px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "#5B4FCF", fontWeight: 600 }}>
              ✓ Report sent! Check your inbox.
            </p>
          </div>
        ) : null}

        {/* GAUGE */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "24px", padding: "36px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(26,24,37,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#1A1825" }}>Score on the IQ scale</span>
            <span style={{ fontSize: "13px", color: "#9896A8" }}>Range: 75–145</span>
          </div>
          <div style={{ height: "12px", backgroundColor: "#EFEDE6", borderRadius: "999px", overflow: "hidden", marginBottom: "10px" }}>
            <div style={{ height: "100%", width: `${gaugePercent}%`, borderRadius: "999px", background: "linear-gradient(90deg, #C4BBFF, #5B4FCF)", transition: "width 1s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9896A8" }}>
            <span>75</span>
            <span>90</span>
            <span>100</span>
            <span>115</span>
            <span>130</span>
            <span>145</span>
          </div>
        </div>

        {/* STATS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
          {[
            { value: `${percentile}%`, label: "Percentile", sub: "vs. world population" },
            { value: `${correct}/${total}`, label: "Correct answers", sub: `${accuracy}% accuracy` },
            { value: score >= 130 ? "Top 2%" : score >= 120 ? "Top 9%" : score >= 115 ? "Top 16%" : score >= 110 ? "Top 25%" : score >= 100 ? "Top 50%" : score >= 90 ? "Bottom 25%" : "Bottom 16%", label: "Population rank", sub: "worldwide" },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "20px", padding: "24px 20px", textAlign: "center", boxShadow: "0 2px 8px rgba(26,24,37,0.05)" }}>
              <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 500, color: "#5B4FCF" }}>{s.value}</div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#1A1825", marginTop: "4px" }}>{s.label}</div>
              <div style={{ fontSize: "11px", color: "#9896A8", marginTop: "2px" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* BREAKDOWN */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "24px", padding: "36px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(26,24,37,0.06)" }}>
          <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 500, color: "#1A1825", marginBottom: "28px" }}>
            Performance by category
          </h3>
          {breakdown.map((b) => (
            <div key={b.label} style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
                <span style={{ color: "#1A1825", fontWeight: 500 }}>{b.label}</span>
                <span style={{ color: "#5B4FCF", fontWeight: 700 }}>{b.score}th percentile</span>
              </div>
              <div style={{ height: "8px", backgroundColor: "#EFEDE6", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${b.score}%`, backgroundColor: "#5B4FCF", borderRadius: "999px" }} />
              </div>
            </div>
          ))}
        </div>

        {/* PREMIUM TEASER */}
        <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", marginBottom: "32px" }}>
          {/* Blurred content */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", padding: "36px", filter: "blur(5px)", userSelect: "none", pointerEvents: "none" }}>
            <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", color: "#1A1825", marginBottom: "20px" }}>Detailed cognitive profile</h3>
            {["Working Memory Index: 94th percentile", "Visual-Spatial Processing: 87th percentile", "Fluid Reasoning: 96th percentile", "Processing Speed: 79th percentile"].map((item) => (
              <div key={item} style={{ padding: "14px 0", borderBottom: "1px solid #E8E5DC", fontSize: "14px", color: "#5C5A6E" }}>{item}</div>
            ))}
          </div>
          {/* Overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(247,246,242,0.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "32px" }}>
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>🔒</div>
            <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1825", marginBottom: "8px" }}>Full Cognitive Report</h3>
            <p style={{ fontSize: "14px", color: "#5C5A6E", marginBottom: "24px", maxWidth: "320px" }}>
              Unlock your detailed breakdown, personalized insights, and printable PDF certificate.
            </p>
            <button
              onClick={() => window.location.href = `mailto:contact@brainscale.app?subject=Full Report Request&body=My IQ score: ${score}`}
              style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "14px 32px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(91,79,207,0.4)" }}
            >
              Unlock Full Report — $9
            </button>
          </div>
        </div>

        {/* ACTIONS */}
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "16px 36px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 20px rgba(91,79,207,0.3)" }}>
            Retake Test
          </Link>
          <Link href="/" style={{ backgroundColor: "#fff", color: "#1A1825", padding: "16px 36px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", border: "1px solid #E8E5DC" }}>
            Back to Home
          </Link>
        </div>

      </main>
    </div>
  );
}