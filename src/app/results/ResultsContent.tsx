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
  const [checkoutLoading, setCheckoutLoading] = useState<null | 'basic' | 'premium'>(null);
  const [copied, setCopied] = useState(false);

  async function handleUnlock(tier: 'basic' | 'premium') {
    setCheckoutLoading(tier);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, correct, total, email: submitted ? email : undefined, tier }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // fallback silent
    } finally {
      setCheckoutLoading(null);
    }
  }

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
        body: JSON.stringify({ email, score, lang: "en" }),
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

  function downloadScoreCard() {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d")!;
    const W = 1080, H = 1080;
    const cx = W / 2, cy = 442;
    const R = 260;

    // Helper: rounded rect path
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
    ctx.fillStyle = "#0C0B14";
    ctx.fillRect(0, 0, W, H);
    const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 440);
    bgGlow.addColorStop(0, "rgba(65,52,158,0.09)");
    bgGlow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, W, H);

    // ── Badge pill "MY IQ SCORE" ─────────────────────────────
    const badgeText = "MY IQ SCORE";
    ctx.font = "700 15px system-ui,-apple-system,sans-serif";
    const badgeW = ctx.measureText(badgeText).width + 52;
    const badgeH = 38;
    const badgeX = cx - badgeW / 2;
    const badgeY = 78;
    ctx.fillStyle = "rgba(91,79,207,0.16)";
    rr(badgeX, badgeY, badgeW, badgeH, 19);
    ctx.fill();
    ctx.strokeStyle = "rgba(91,79,207,0.50)";
    ctx.lineWidth = 1;
    rr(badgeX, badgeY, badgeW, badgeH, 19);
    ctx.stroke();
    ctx.fillStyle = "rgba(185,172,255,0.90)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(badgeText, cx, badgeY + badgeH / 2);

    // ── Gauge ─────────────────────────────────────────────────
    // Arc 148° → 32° clockwise (244° total). IQ 100 = 270° (12 o'clock).
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
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 6;
    ctx.lineCap = "butt";
    ctx.stroke();
    ctx.restore();

    // Progress
    const sp = { x: cx + R * Math.cos(toRad(ARC_START)), y: cy + R * Math.sin(toRad(ARC_START)) };
    const ep = { x: cx + R * Math.cos(scoreRad),         y: cy + R * Math.sin(scoreRad) };
    const pg = ctx.createLinearGradient(sp.x, sp.y, ep.x, ep.y);
    pg.addColorStop(0, "#2A238C");
    pg.addColorStop(1, "#7268E0");
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
      ctx.strokeStyle = maj ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)";
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
      ctx.fillStyle = "rgba(255,255,255,0.20)";
      ctx.fillText(iq.toString(), cx + (R + 42) * Math.cos(a), cy + (R + 42) * Math.sin(a));
    });

    // Score dot
    const dotX = cx + R * Math.cos(scoreRad);
    const dotY = cy + R * Math.sin(scoreRad);
    const halo = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 22);
    halo.addColorStop(0, "rgba(185,175,255,0.28)");
    halo.addColorStop(1, "rgba(185,175,255,0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(dotX, dotY, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(dotX, dotY, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    // ── Score number ─────────────────────────────────────────
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "200 160px Georgia,'Times New Roman',serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(score.toString(), cx, cy + 14);

    // ── Label pill ────────────────────────────────────────────
    const pillText = label.title.toUpperCase();
    ctx.font = "700 15px system-ui,sans-serif";
    const pillW = ctx.measureText(pillText).width + 50;
    const pillH = 36;
    const pillX = cx - pillW / 2;
    const pillY = cy + 106;
    ctx.fillStyle = "#5B4FCF";
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
    ctx.fillStyle = "rgba(255,255,255,0.42)";
    ctx.fillText(`${percentile}th percentile worldwide`, cx, percY);

    // ── Description text (word-wrapped) ───────────────────────
    ctx.font = "300 15px system-ui,sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.26)";
    const maxW = 520;
    const words = label.desc.split(" ");
    let line = "", lines: string[] = [];
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxW) { lines.push(line); line = w; }
      else line = test;
    }
    if (line) lines.push(line);
    const descY0 = percY + 34;
    lines.forEach((l, i) => ctx.fillText(l, cx, descY0 + i * 24));

    // ── Decorative dots ───────────────────────────────────────
    const dotsY = descY0 + lines.length * 24 + 28;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(cx - 110 + i * 55, dotsY, 3, 0, Math.PI * 2);
      ctx.fillStyle = i === 2 ? "rgba(91,79,207,0.9)" : "rgba(91,79,207,0.30)";
      ctx.fill();
    }

    // ── Divider ───────────────────────────────────────────────
    const divY = dotsY + 44;
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 180, divY);
    ctx.lineTo(cx + 180, divY);
    ctx.stroke();

    // ── Branding ──────────────────────────────────────────────
    const brandY = divY + 60;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    // Flanking lines
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx - 160, brandY - 12); ctx.lineTo(cx - 80, brandY - 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 80,  brandY - 12); ctx.lineTo(cx + 160, brandY - 12); ctx.stroke();
    ctx.font = "600 28px Georgia,'Times New Roman',serif";
    ctx.fillStyle = "rgba(255,255,255,0.80)";
    ctx.fillText("BrainScale", cx, brandY);
    ctx.font = "400 13px system-ui,sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fillText("brainscale.app", cx, brandY + 28);

    // ── Download ──────────────────────────────────────────────
    const link = document.createElement("a");
    link.download = `brainscale-iq-${score}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function copyLink() {
    navigator.clipboard.writeText(`https://www.brainscale.app/test`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)", paddingBottom: "88px" }}>

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
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <p style={{ fontSize: "13px", color: "#9896A8", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
            Your IQ Score
          </p>
          <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(80px, 15vw, 120px)", fontWeight: 300, color: "#5B4FCF", lineHeight: 1, marginBottom: "8px" }}>
            {score}
          </div>
          <div style={{ display: "inline-block", backgroundColor: label.color, color: "#fff", padding: "8px 24px", borderRadius: "999px", fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>
            {label.title}
          </div>
          <p style={{ fontSize: "16px", color: "#5C5A6E", maxWidth: "480px", margin: "0 auto 28px", lineHeight: 1.6 }}>
            {label.desc}
          </p>

          {/* SHARE — visible right after score */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "20px", padding: "24px", marginTop: "8px" }}>
            <p style={{ fontSize: "12px", color: "#9896A8", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>
              Challenge your friends
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={downloadScoreCard}
                style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#5B4FCF", color: "#fff", padding: "12px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(91,79,207,0.35)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download score card
              </button>
              <a href={`https://twitter.com/intent/tweet?text=I%20just%20scored%20${score}%20on%20the%20BrainScale%20IQ%20test%20%F0%9F%A7%A0%20Can%20you%20beat%20me%3F&url=https%3A%2F%2Fwww.brainscale.app%2Ftest`} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#000", color: "#fff", padding: "12px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X
              </a>
              <a href={`https://wa.me/?text=I%20just%20scored%20${score}%20on%20BrainScale%27s%20free%20IQ%20test%21%20Can%20you%20beat%20me%3F%20%F0%9F%A7%A0%20https%3A%2F%2Fwww.brainscale.app%2Ftest`} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#25D366", color: "#fff", padding: "12px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <button onClick={copyLink}
                style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: copied ? "#EDE9FF" : "#F7F6F2", color: copied ? "#5B4FCF" : "#1A1825", padding: "12px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, border: `1px solid ${copied ? "#C4BBFF" : "#E8E5DC"}`, cursor: "pointer", transition: "all 0.2s" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </div>
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
              We&apos;ll email you your score + a personalized plan to boost your weakest cognitive areas.
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
          {/* Overlay — two-tier pricing */}
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(247,246,242,0.93)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", backdropFilter: "blur(2px)" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "#5B4FCF", textTransform: "uppercase", marginBottom: "6px" }}>Unlock Your Full Results</p>
            <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 500, color: "#1A1825", marginBottom: "20px", textAlign: "center" }}>
              Get your complete 8-page cognitive report
            </h3>
            <div style={{ display: "flex", gap: "12px", width: "100%", maxWidth: "500px", flexWrap: "wrap", justifyContent: "center" }}>
              {/* ESSENTIAL */}
              <div style={{ flex: "1 1 178px", backgroundColor: "#fff", border: "1.5px solid #E8E5DC", borderRadius: "16px", padding: "20px 16px", textAlign: "center" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#9896A8", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Essential</p>
                <p style={{ fontFamily: "var(--font-display, serif)", fontSize: "30px", fontWeight: 600, color: "#1A1825", marginBottom: "14px" }}>$14.99</p>
                <div style={{ fontSize: "12px", color: "#5C5A6E", lineHeight: 1.9, marginBottom: "16px", textAlign: "left" }}>
                  <div>✓ 8-page PDF report</div>
                  <div>✓ Cognitive certificate</div>
                  <div>✓ Instant email delivery</div>
                </div>
                <button onClick={() => handleUnlock('basic')} disabled={checkoutLoading !== null}
                  style={{ width: "100%", backgroundColor: "#F0EEF8", color: "#5B4FCF", padding: "11px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 700, border: "1.5px solid #C4BBFF", cursor: checkoutLoading !== null ? "not-allowed" : "pointer", opacity: checkoutLoading === 'basic' ? 0.6 : 1 }}>
                  {checkoutLoading === 'basic' ? "Redirecting…" : "Get Essential"}
                </button>
              </div>
              {/* PREMIUM */}
              <div style={{ flex: "1 1 178px", backgroundColor: "#5B4FCF", border: "2px solid #5B4FCF", borderRadius: "16px", padding: "20px 16px", textAlign: "center", position: "relative" }}>
                <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#FBBF24", color: "#1A1825", fontSize: "11px", fontWeight: 800, padding: "4px 14px", borderRadius: "999px", whiteSpace: "nowrap", letterSpacing: "0.5px" }}>
                  ⭐ MOST POPULAR
                </div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Premium</p>
                <p style={{ fontFamily: "var(--font-display, serif)", fontSize: "30px", fontWeight: 600, color: "#fff", marginBottom: "14px" }}>$24.99</p>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.82)", lineHeight: 1.9, marginBottom: "16px", textAlign: "left" }}>
                  <div>✓ 8-page PDF report</div>
                  <div>✓ Cognitive certificate</div>
                  <div>✓ Instant email delivery</div>
                  <div style={{ color: "#C4BBFF", fontWeight: 600 }}>✓ 30-day training protocol</div>
                  <div style={{ color: "#C4BBFF", fontWeight: 600 }}>✓ LinkedIn profile badge</div>
                </div>
                <button onClick={() => handleUnlock('premium')} disabled={checkoutLoading !== null}
                  style={{ width: "100%", backgroundColor: "#fff", color: "#5B4FCF", padding: "11px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 700, border: "none", cursor: checkoutLoading !== null ? "not-allowed" : "pointer", opacity: checkoutLoading === 'premium' ? 0.6 : 1, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
                  {checkoutLoading === 'premium' ? "Redirecting…" : "Get Premium →"}
                </button>
              </div>
            </div>
            <p style={{ fontSize: "11px", color: "#9896A8", marginTop: "14px" }}>
              🔒 Secure payment · Instant delivery
            </p>
          </div>
        </div>

        {/* SHARE — viral acquisition engine */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "20px", padding: "28px 32px", marginBottom: "20px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#9896A8", marginBottom: "16px", fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase" }}>
            Challenge your friends
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {/* Twitter / X */}
            <a
              href={`https://twitter.com/intent/tweet?text=I%20just%20scored%20${score}%20on%20the%20BrainScale%20IQ%20test%20%F0%9F%A7%A0%20Can%20you%20beat%20me%3F&url=https%3A%2F%2Fwww.brainscale.app%2Ftest`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#000", color: "#fff", padding: "12px 20px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Share on X
            </a>
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.brainscale.app%2Ftest`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#1877F2", color: "#fff", padding: "12px 20px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=I%20just%20scored%20${score}%20on%20BrainScale%27s%20free%20IQ%20test%21%20Can%20you%20beat%20me%3F%20%F0%9F%A7%A0%20https%3A%2F%2Fwww.brainscale.app%2Ftest`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#25D366", color: "#fff", padding: "12px 20px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            {/* Copy link */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://www.brainscale.app/test`);
              }}
              style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#F7F6F2", color: "#1A1825", padding: "12px 20px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, border: "1px solid #E8E5DC", cursor: "pointer" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy link
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

      {/* STICKY BOTTOM CTA — two tiers */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(247,246,242,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid #E8E5DC", padding: "12px 20px", zIndex: 100, boxShadow: "0 -4px 24px rgba(26,24,37,0.08)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "13px", color: "#5C5A6E", fontWeight: 500, whiteSpace: "nowrap" }}>
            🔒 <strong style={{ color: "#1A1825" }}>Unlock your full report</strong>
          </span>
          <button onClick={() => handleUnlock('basic')} disabled={checkoutLoading !== null}
            style={{ backgroundColor: "#F0EEF8", color: "#5B4FCF", padding: "12px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, border: "1.5px solid #C4BBFF", cursor: checkoutLoading !== null ? "not-allowed" : "pointer", whiteSpace: "nowrap", opacity: checkoutLoading === 'basic' ? 0.6 : 1, transition: "all 0.15s ease" }}>
            {checkoutLoading === 'basic' ? "…" : "Essential — $14.99"}
          </button>
          <button onClick={() => handleUnlock('premium')} disabled={checkoutLoading !== null}
            style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "12px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, border: "none", cursor: checkoutLoading !== null ? "not-allowed" : "pointer", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(91,79,207,0.4)", opacity: checkoutLoading === 'premium' ? 0.6 : 1, transition: "all 0.15s ease" }}>
            {checkoutLoading === 'premium' ? "…" : "Premium ⭐ — $24.99"}
          </button>
        </div>
      </div>
    </div>
  );
}