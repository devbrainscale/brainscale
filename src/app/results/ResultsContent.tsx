"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { trackFbq } from "@/lib/fbq";

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
  if (iq >= 130) return { title: "Gifted", desc: "I am in the top 2% of the population.\nExceptional reasoning and problem-solving abilities.", color: "#C96442" };
  if (iq >= 120) return { title: "Superior", desc: "I am in the top 9% of the population.\nStrong analytical and logical skills.", color: "#B5572F" };
  if (iq >= 110) return { title: "Above Average", desc: "I am in the top 25% of the population.\nAbove-average reasoning capacity.", color: "#C96442" };
  if (iq >= 90) return { title: "Average", desc: "My score is in the typical range,\nshared by 68% of the population.", color: "#D4835E" };
  return { title: "Below Average", desc: "My score is below the population average.\nPractice and focus can improve this.", color: "#99958C" };
}

export default function ResultsContent() {
  const params = useSearchParams();
  const rawScore = parseInt(params.get("score") ?? "100");
  const rawCorrect = parseInt(params.get("correct") ?? "20");
  const rawTotal = parseInt(params.get("total") ?? "40");
  const score = isNaN(rawScore) ? 100 : Math.min(145, Math.max(75, rawScore));
  const total = isNaN(rawTotal) || rawTotal <= 0 ? 40 : rawTotal;
  const correct = isNaN(rawCorrect) ? 0 : Math.min(total, Math.max(0, rawCorrect));

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<null | 'basic' | 'premium'>(null);
  const [copied, setCopied] = useState(false);

  // Fire ViewContent once when results page loads
  useEffect(() => {
    trackFbq('track', 'ViewContent', {
      content_name: 'IQ Score Results',
      content_category: 'Results',
      value: score,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUnlock(tier: 'basic' | 'premium') {
    // Fire InitiateCheckout before redirecting to Stripe
    trackFbq('track', 'InitiateCheckout', {
      content_name: tier === 'premium' ? 'Cognitive Report — Premium' : 'Cognitive Report — Essential',
      value: tier === 'premium' ? 24.99 : 14.99,
      currency: 'USD',
    });
    setCheckoutLoading(tier);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, correct, total, email: submitted ? email : undefined, tier }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      // silent fallback
    } finally {
      setCheckoutLoading(null);
    }
  }

  const percentile = getPercentile(score);
  const label = getLabel(score);
  const accuracy = Math.round((correct / total) * 100);
  const gaugePercent = Math.min(100, Math.max(0, ((score - 75) / 70) * 100));

  const logicalPct = Math.min(99, Math.round(percentile * 1.05));
  const spatialPct = Math.min(99, Math.round(percentile * 0.92));
  const processingPct = Math.min(99, Math.round(percentile * 0.98));
  const breakdown = [
    { label: "Logical Reasoning", score: logicalPct },
    { label: "Spatial Intelligence", score: spatialPct },
    { label: "Processing Speed", score: processingPct },
  ];

  function downloadScoreCard() {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d")!;
    const W = 1080, H = 1080;
    const cx = W / 2, cy = 442;
    const R = 260;

    function rr(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    // ── Background ──────────────────────────────────────────
    ctx.fillStyle = "#FAF8F5";
    ctx.fillRect(0, 0, W, H);
    const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 440);
    bgGlow.addColorStop(0, "rgba(201,100,66,0.05)");
    bgGlow.addColorStop(1, "rgba(201,100,66,0)");
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, W, H);

    // ── Badge pill "MY IQ SCORE" ─────────────────────────────
    const badgeText = "MY IQ SCORE";
    ctx.font = "700 15px system-ui,-apple-system,sans-serif";
    const badgeW = ctx.measureText(badgeText).width + 52;
    const badgeH = 38;
    const badgeX = cx - badgeW / 2;
    const badgeY = 78;
    ctx.fillStyle = "rgba(201,100,66,0.16)";
    rr(badgeX, badgeY, badgeW, badgeH, 19);
    ctx.fill();
    ctx.strokeStyle = "rgba(201,100,66,0.50)";
    ctx.lineWidth = 1;
    rr(badgeX, badgeY, badgeW, badgeH, 19);
    ctx.stroke();
    ctx.fillStyle = "#C96442";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(badgeText, cx, badgeY + badgeH / 2);

    // ── Gauge ─────────────────────────────────────────────────
    const toRad = (d: number) => d * Math.PI / 180;
    const IQ_MIN = 70, IQ_MAX = 130;
    const ARC_START = 148, ARC_SPAN = 244;
    const clamped = Math.max(IQ_MIN, Math.min(IQ_MAX, score));
    const scoreDeg = ARC_START + ((clamped - IQ_MIN) / (IQ_MAX - IQ_MIN)) * ARC_SPAN;
    const scoreRad = toRad(scoreDeg);

    // Track
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, toRad(ARC_START), toRad(32), false);
    ctx.strokeStyle = "rgba(26,25,22,0.08)";
    ctx.lineWidth = 6;
    ctx.lineCap = "butt";
    ctx.stroke();
    ctx.restore();

    // Progress
    const sp = { x: cx + R * Math.cos(toRad(ARC_START)), y: cy + R * Math.sin(toRad(ARC_START)) };
    const ep = { x: cx + R * Math.cos(scoreRad),         y: cy + R * Math.sin(scoreRad) };
    const pg = ctx.createLinearGradient(sp.x, sp.y, ep.x, ep.y);
    pg.addColorStop(0, "#7A3218");
    pg.addColorStop(1, "#C96442");
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, toRad(ARC_START), scoreRad, false);
    ctx.strokeStyle = pg;
    ctx.lineWidth = 6;
    ctx.lineCap = "butt";
    ctx.stroke();
    ctx.restore();

    // Ticks
    const majors = [70, 80, 90, 100, 110, 120, 130];
    [...majors, 75, 85, 95, 105, 115, 125].forEach(iq => {
      const a = toRad(ARC_START + ((iq - IQ_MIN) / (IQ_MAX - IQ_MIN)) * ARC_SPAN);
      const maj = majors.includes(iq);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx + (R - (maj ? 9 : 5)) * Math.cos(a), cy + (R - (maj ? 9 : 5)) * Math.sin(a));
      ctx.lineTo(cx + (R + (maj ? 15 : 8)) * Math.cos(a), cy + (R + (maj ? 15 : 8)) * Math.sin(a));
      ctx.strokeStyle = maj ? "rgba(26,25,22,0.18)" : "rgba(26,25,22,0.07)";
      ctx.lineWidth = maj ? 1.5 : 1;
      ctx.stroke();
      ctx.restore();
    });

    // Scale labels
    ctx.font = "400 14px system-ui,sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    [70, 85, 100, 115, 130].forEach(iq => {
      const a = toRad(ARC_START + ((iq - IQ_MIN) / (IQ_MAX - IQ_MIN)) * ARC_SPAN);
      ctx.fillStyle = "rgba(26,25,22,0.28)";
      ctx.fillText(iq.toString(), cx + (R + 42) * Math.cos(a), cy + (R + 42) * Math.sin(a));
    });

    // Score dot
    const dotX = cx + R * Math.cos(scoreRad);
    const dotY = cy + R * Math.sin(scoreRad);
    const halo = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 22);
    halo.addColorStop(0, "rgba(201,100,66,0.28)");
    halo.addColorStop(1, "rgba(201,100,66,0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(dotX, dotY, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(dotX, dotY, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#C96442";
    ctx.fill();

    // ── Score number ─────────────────────────────────────────
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "200 160px Georgia,'Times New Roman',serif";
    ctx.fillStyle = "#1A1916";
    ctx.fillText(score.toString(), cx, cy + 14);

    // ── Label pill ────────────────────────────────────────────
    const pillText = label.title.toUpperCase();
    ctx.font = "700 15px system-ui,sans-serif";
    const pillW = ctx.measureText(pillText).width + 50;
    const pillH = 36;
    const pillX = cx - pillW / 2;
    const pillY = cy + 106;
    ctx.fillStyle = "#C96442";
    rr(pillX, pillY, pillW, pillH, 18);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(pillText, cx, pillY + pillH / 2);

    // ── Percentile ────────────────────────────────────────────
    const percY = cy + R + 68;
    ctx.textBaseline = "alphabetic";
    ctx.font = "300 17px system-ui,sans-serif";
    ctx.fillStyle = "#5C5A52";
    ctx.fillText(`${percentile}th percentile worldwide`, cx, percY);

    // ── Description text (word-wrapped, \n-aware) ─────────────
    ctx.font = "300 15px system-ui,sans-serif";
    ctx.fillStyle = "#AAA69E";
    const maxW = 500;
    const lines: string[] = [];
    for (const segment of label.desc.split("\n")) {
      const segWords = segment.split(" ");
      let segLine = "";
      for (const w of segWords) {
        const test = segLine ? segLine + " " + w : w;
        if (ctx.measureText(test).width > maxW) { lines.push(segLine); segLine = w; }
        else segLine = test;
      }
      if (segLine) lines.push(segLine);
    }
    const descY0 = percY + 34;
    lines.forEach((l, i) => ctx.fillText(l, cx, descY0 + i * 24));

    // ── Decorative dots ───────────────────────────────────────
    const dotsY = descY0 + lines.length * 24 + 28;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(cx - 110 + i * 55, dotsY, 3, 0, Math.PI * 2);
      ctx.fillStyle = i === 2 ? "rgba(201,100,66,0.9)" : "rgba(201,100,66,0.30)";
      ctx.fill();
    }

    // ── Divider ───────────────────────────────────────────────
    const divY = dotsY + 44;
    ctx.strokeStyle = "rgba(26,25,22,0.07)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 180, divY);
    ctx.lineTo(cx + 180, divY);
    ctx.stroke();

    // ── Branding ──────────────────────────────────────────────
    const brandY = divY + 60;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.strokeStyle = "rgba(26,25,22,0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx - 160, brandY - 12); ctx.lineTo(cx - 80, brandY - 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 80,  brandY - 12); ctx.lineTo(cx + 160, brandY - 12); ctx.stroke();
    ctx.font = "600 28px Georgia,'Times New Roman',serif";
    ctx.fillStyle = "#1A1916";
    ctx.fillText("BrainScale", cx, brandY);
    ctx.font = "400 13px system-ui,sans-serif";
    ctx.fillStyle = "#AAA69E";
    ctx.fillText("brainscale.app", cx, brandY + 28);

    // ── Download ──────────────────────────────────────────────
    const link = document.createElement("a");
    link.download = `brainscale-iq-${score}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function copyLink() {
    navigator.clipboard.writeText("https://www.brainscale.app/test");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

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
        body: JSON.stringify({ email, score, lang: "en" }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else setEmailError("Something went wrong. Please try again.");
    } catch {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#FAF8F5", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)", paddingBottom: "88px" }}>

      {/* HEADER */}
      <header style={{ backgroundColor: "#FAF8F5", borderBottom: "1px solid #E8E5DF", padding: "0 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, letterSpacing: "-0.03em", color: "#1A1916", textDecoration: "none" }}>
            Brain<span style={{ color: "#C96442" }}>Scale</span>
          </Link>
          <span style={{ backgroundColor: "#FBF0EB", color: "#C96442", padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>
            Test Complete ✓
          </span>
        </div>
      </header>

      <main style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* SCORE REVEAL — label-first, breaks hero-metric template */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: label.color, color: "#fff", padding: "8px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.3px", marginBottom: "20px" }}>
            {label.title}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "20px", marginBottom: "16px", flexWrap: "wrap" }}>
            <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(80px, 15vw, 116px)", fontWeight: 300, letterSpacing: "-0.04em", color: "#1A1916", lineHeight: 1 }}>
              {score}
            </div>
            <div style={{ paddingBottom: "10px" }}>
              <div style={{ fontSize: "15px", color: label.color, fontWeight: 600 }}>{percentile}th percentile</div>
              <div style={{ fontSize: "13px", color: "#99958C" }}>worldwide</div>
            </div>
          </div>
          <p style={{ fontSize: "15px", color: "#5C5A52", maxWidth: "420px", lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {label.desc}
          </p>
        </div>

        {/* SHARE */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
          <p style={{ fontSize: "11px", color: "#99958C", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px", textAlign: "center" }}>
            Challenge your friends
          </p>
          <button onClick={downloadScoreCard}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", backgroundColor: "#C96442", color: "#fff", padding: "14px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer", marginBottom: "10px" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download my score card
          </button>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            <a href={`https://twitter.com/intent/tweet?text=I%20just%20scored%20${score}%20on%20BrainScale%27s%20IQ%20test.%20Can%20you%20beat%20me%3F&url=https%3A%2F%2Fwww.brainscale.app%2Ftest`} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", backgroundColor: "#000", color: "#fff", padding: "11px 8px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X
            </a>
            <a href={`https://wa.me/?text=I%20just%20scored%20${score}%20on%20BrainScale%27s%20IQ%20test.%20Can%20you%20beat%20me%3F%20https%3A%2F%2Fwww.brainscale.app%2Ftest`} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", backgroundColor: "#25D366", color: "#fff", padding: "11px 8px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <button onClick={copyLink}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", backgroundColor: copied ? "#FBF0EB" : "#FAF8F5", color: copied ? "#C96442" : "#1A1916", padding: "11px 8px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, border: `1px solid ${copied ? "#E8C4B4" : "#E8E5DF"}`, cursor: "pointer", transition: "all 0.15s" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* EMAIL CAPTURE */}
        {!submitted && !skipped ? (
          <div style={{ backgroundColor: "#FBF0EB", border: "1px solid #E8C4B4", borderRadius: "16px", padding: "32px", marginBottom: "20px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: "#C96442", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px" }}>
              Free improvement plan
            </p>
            <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1916", marginBottom: "8px", lineHeight: 1.4 }}>
              Get your personalized progress plan
            </h3>
            <p style={{ fontSize: "14px", color: "#5C5A52", marginBottom: "24px", maxWidth: "360px", margin: "0 auto 24px", lineHeight: 1.6 }}>
              Score + 7-day plan to strengthen your weakest cognitive areas.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "10px", maxWidth: "440px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                style={{ flex: 1, minWidth: "200px", padding: "13px 18px", borderRadius: "8px", border: "1.5px solid #E8C4B4", fontSize: "14px", outline: "none", backgroundColor: "#fff", color: "#1A1916" }} />
              <button type="submit" disabled={loading}
                style={{ backgroundColor: "#C96442", color: "#fff", padding: "13px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, whiteSpace: "nowrap" }}>
                {loading ? "Sending…" : "Send →"}
              </button>
            </form>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", maxWidth: "440px", margin: "12px auto 0", textAlign: "left" }}>
              <input type="checkbox" id="gdpr-en" checked={gdprConsent} onChange={(e) => setGdprConsent(e.target.checked)} style={{ marginTop: "2px", accentColor: "#C96442", flexShrink: 0, cursor: "pointer" }} />
              <label htmlFor="gdpr-en" style={{ fontSize: "12px", color: "#5C5A52", lineHeight: 1.5, cursor: "pointer" }}>
                I agree to receive my results by email. Unsubscribe at any time.{" "}
                <a href="/privacy" style={{ color: "#C96442", textDecoration: "underline" }}>Privacy Policy</a>.
              </label>
            </div>
            {emailError && <p style={{ color: "#E53E3E", fontSize: "13px", marginTop: "10px" }}>{emailError}</p>}
            <button onClick={() => setSkipped(true)} style={{ background: "none", border: "none", color: "#99958C", fontSize: "13px", marginTop: "8px", cursor: "pointer", textDecoration: "underline", padding: "10px 16px", display: "inline-block" }}>
              Skip
            </button>
          </div>
        ) : submitted ? (
          <div style={{ backgroundColor: "#FBF0EB", border: "1px solid #E8C4B4", borderRadius: "12px", padding: "16px 24px", marginBottom: "20px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "#C96442", fontWeight: 600 }}>Report sent — check your inbox.</p>
          </div>
        ) : null}

        {/* GAUGE */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "16px", padding: "28px 32px", marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1A1916" }}>Position on the IQ scale</span>
            <span style={{ fontSize: "12px", color: "#99958C" }}>75 – 145</span>
          </div>
          <div style={{ height: "8px", backgroundColor: "#F0EDE6", borderRadius: "999px", overflow: "hidden", marginBottom: "10px" }}>
            <div style={{ height: "100%", width: `${gaugePercent}%`, borderRadius: "999px", background: "linear-gradient(90deg, #E8C4B4, #C96442)", transition: "width 1s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#AAA69E" }}>
            <span>75</span><span>90</span><span>100</span><span>115</span><span>130</span><span>145</span>
          </div>
        </div>

        {/* STATS STRIP — differentiated, not identical cards */}
        <div style={{ display: "flex", borderRadius: "12px", border: "1px solid #E8E5DF", backgroundColor: "#fff", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ flex: "1.5", padding: "20px 20px", borderRight: "1px solid #E8E5DF", backgroundColor: "#FBF0EB" }}>
            <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "30px", fontWeight: 500, color: "#C96442", lineHeight: 1 }}>{percentile}%</div>
            <div style={{ fontSize: "12px", color: "#C96442", fontWeight: 600, marginTop: "5px" }}>Percentile</div>
            <div style={{ fontSize: "11px", color: "#99958C", marginTop: "2px" }}>worldwide</div>
          </div>
          <div style={{ flex: "1", padding: "20px 14px", borderRight: "1px solid #E8E5DF" }}>
            <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "22px", fontWeight: 500, color: "#1A1916", lineHeight: 1 }}>{correct}/{total}</div>
            <div style={{ fontSize: "12px", color: "#1A1916", fontWeight: 600, marginTop: "5px" }}>Correct</div>
            <div style={{ fontSize: "11px", color: "#99958C", marginTop: "2px" }}>{accuracy}%</div>
          </div>
          <div style={{ flex: "1", padding: "20px 14px" }}>
            <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1916", lineHeight: 1.1 }}>
              {score >= 130 ? "Top 2%" : score >= 120 ? "Top 9%" : score >= 115 ? "Top 16%" : score >= 110 ? "Top 25%" : score >= 100 ? "Top 50%" : score >= 90 ? "Bot. 25%" : "Bot. 16%"}
            </div>
            <div style={{ fontSize: "12px", color: "#1A1916", fontWeight: 600, marginTop: "5px" }}>World rank</div>
          </div>
        </div>

        {/* BREAKDOWN */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "16px", padding: "28px 32px", marginBottom: "16px" }}>
          <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "17px", fontWeight: 500, color: "#1A1916", marginBottom: "24px" }}>Performance by category</h3>
          {breakdown.map((b) => (
            <div key={b.label} style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px" }}>
                <span style={{ color: "#1A1916", fontWeight: 500 }}>{b.label}</span>
                <span style={{ color: "#C96442", fontWeight: 600 }}>{b.score}th percentile</span>
              </div>
              <div style={{ height: "6px", backgroundColor: "#F0EDE6", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${b.score}%`, backgroundColor: "#C96442", borderRadius: "999px" }} />
              </div>
            </div>
          ))}
        </div>

        {/* IQ SCORE SEO LINK */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <Link href={`/iq-score/${score}`} style={{ fontSize: "13px", color: "#C96442", textDecoration: "none", fontWeight: 600 }}>
            Learn more about IQ {score} — percentile, classification & meaning →
          </Link>
        </div>

        {/* PREMIUM TEASER */}
        <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", marginBottom: "28px" }}>
          <div className="bs-blur-bg" style={{ backgroundColor: "#fff", border: "1px solid #E8E5DF", padding: "32px", opacity: 0.12, userSelect: "none", pointerEvents: "none" }} aria-hidden="true">
            <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "17px", color: "#1A1916", marginBottom: "16px" }}>Detailed cognitive profile</h3>
            {["Working Memory Index: 94th percentile", "Visual-Spatial Processing: 87th percentile", "Fluid Reasoning: 96th percentile", "Processing Speed: 79th percentile", "Sustained Attention: 88th percentile"].map((item) => (
              <div key={item} style={{ padding: "12px 0", borderBottom: "1px solid #E8E5DF", fontSize: "13px", color: "#5C5A52" }}>{item}</div>
            ))}
          </div>
          <div className="bs-overlay" style={{ position: "absolute", inset: 0, backgroundColor: "#FAF8F5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "28px 24px", overflowY: "auto" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#C96442", textTransform: "uppercase", marginBottom: "8px" }}>Unlock your results</p>
            <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "17px", fontWeight: 500, color: "#1A1916", marginBottom: "24px", textAlign: "center", lineHeight: 1.4 }}>
              Complete cognitive report — 8 pages
            </h3>
            <div style={{ display: "flex", gap: "12px", width: "100%", maxWidth: "480px", flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ flex: "1 1 170px", backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "12px", padding: "20px 16px", textAlign: "center" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#99958C", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" }}>Essential</p>
                <p style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 600, color: "#1A1916", marginBottom: "16px" }}>$14.99</p>
                <div style={{ fontSize: "12px", color: "#5C5A52", lineHeight: 2, marginBottom: "16px", textAlign: "left" }}>
                  <div>✓ 8-page PDF report</div>
                  <div>✓ Cognitive certificate</div>
                  <div>✓ Instant delivery</div>
                </div>
                <button onClick={() => handleUnlock('basic')} disabled={checkoutLoading !== null}
                  style={{ width: "100%", backgroundColor: "#FBF0EB", color: "#C96442", padding: "11px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, border: "1.5px solid #E8C4B4", cursor: checkoutLoading !== null ? "not-allowed" : "pointer", opacity: checkoutLoading === 'basic' ? 0.6 : 1 }}>
                  {checkoutLoading === 'basic' ? "Redirecting…" : "Get Essential"}
                </button>
              </div>
              <div style={{ flex: "1 1 170px", backgroundColor: "#C96442", borderRadius: "12px", padding: "20px 16px", textAlign: "center", position: "relative" }}>
                <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#1A1916", color: "#fff", fontSize: "10px", fontWeight: 800, padding: "4px 12px", borderRadius: "999px", whiteSpace: "nowrap", letterSpacing: "0.5px" }}>
                  MOST POPULAR
                </div>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" }}>Premium</p>
                <p style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 600, color: "#fff", marginBottom: "16px" }}>$24.99</p>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.82)", lineHeight: 2, marginBottom: "16px", textAlign: "left" }}>
                  <div>✓ 8-page PDF report</div>
                  <div>✓ Cognitive certificate</div>
                  <div>✓ Instant delivery</div>
                  <div style={{ color: "#E8C4B4" }}>✓ 30-day training protocol</div>
                  <div style={{ color: "#E8C4B4" }}>✓ LinkedIn badge</div>
                </div>
                <button onClick={() => handleUnlock('premium')} disabled={checkoutLoading !== null}
                  style={{ width: "100%", backgroundColor: "#fff", color: "#C96442", padding: "11px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, border: "none", cursor: checkoutLoading !== null ? "not-allowed" : "pointer", opacity: checkoutLoading === 'premium' ? 0.6 : 1 }}>
                  {checkoutLoading === 'premium' ? "Redirecting…" : "Get Premium →"}
                </button>
              </div>
            </div>
            <p style={{ fontSize: "11px", color: "#99958C", marginTop: "14px" }}>Secure payment · Instant delivery</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", paddingTop: "4px" }}>
          <Link href="/test" style={{ backgroundColor: "#C96442", color: "#fff", padding: "14px 32px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Retake the test
          </Link>
          <Link href="/" style={{ backgroundColor: "#fff", color: "#5C5A52", padding: "14px 32px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, textDecoration: "none", border: "1px solid #E8E5DF" }}>
            Home
          </Link>
        </div>

      </main>

      {/* STICKY BOTTOM CTA */}
      <style>{`
        .bs-blur-bg { min-height: 420px; }
        .bs-overlay { justify-content: center !important; }
        @media (max-width: 540px) {
          .bs-blur-bg { min-height: 860px; }
          .bs-overlay { justify-content: flex-start !important; padding-top: 32px !important; }
        }
        .bs-sticky { display:flex; align-items:center; justify-content:center; gap:10px; max-width:680px; margin:0 auto; }
        .bs-sticky-label { font-size:13px; color:#5C5A52; font-weight:500; white-space:nowrap; }
        .bs-btn-basic { background:#FBF0EB; color:#C96442; padding:12px 20px; border-radius:999px; font-size:13px; font-weight:700; border:1.5px solid #E8C4B4; white-space:nowrap; cursor:pointer; transition:all .15s; }
        .bs-btn-premium { background:#C96442; color:#fff; padding:12px 20px; border-radius:999px; font-size:13px; font-weight:700; border:none; white-space:nowrap; cursor:pointer; box-shadow:0 4px 16px rgba(201,100,66,0.4); transition:all .15s; }
        @media (max-width:480px) {
          .bs-sticky { flex-wrap:nowrap; }
          .bs-sticky-label { display:none; }
          .bs-btn-basic, .bs-btn-premium { flex:1; text-align:center; font-size:12px; padding:12px 10px; }
        }
      `}</style>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#FAF8F5", borderTop: "1px solid #E8E5DF", padding: "12px 16px", zIndex: 100 }}>
        <div className="bs-sticky">
          <span className="bs-sticky-label"><strong style={{ color: "#1A1916" }}>Unlock your report</strong></span>
          <button onClick={() => handleUnlock('basic')} disabled={checkoutLoading !== null} className="bs-btn-basic"
            style={{ opacity: checkoutLoading === 'basic' ? 0.6 : 1 }}>
            {checkoutLoading === 'basic' ? "…" : "Essential — $14.99"}
          </button>
          <button onClick={() => handleUnlock('premium')} disabled={checkoutLoading !== null} className="bs-btn-premium"
            style={{ opacity: checkoutLoading === 'premium' ? 0.6 : 1 }}>
            {checkoutLoading === 'premium' ? "…" : "Premium — $24.99"}
          </button>
        </div>
      </div>
    </div>
  );
}
