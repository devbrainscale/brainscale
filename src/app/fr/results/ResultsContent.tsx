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
  if (iq >= 130) return { title: "Surdoué", desc: "Vous faites partie du top 2 % de la population. Capacités de raisonnement et de résolution de problèmes exceptionnelles.", color: "#5B4FCF" };
  if (iq >= 120) return { title: "Supérieur", desc: "Vous faites partie du top 9 % de la population. Solides compétences analytiques et logiques.", color: "#4A3EBE" };
  if (iq >= 110) return { title: "Au-dessus de la moyenne", desc: "Vous faites partie du top 25 % de la population. Capacité de raisonnement supérieure à la moyenne.", color: "#6B5FD9" };
  if (iq >= 90) return { title: "Dans la moyenne", desc: "Votre score se situe dans la plage typique, partagée par 68 % de la population.", color: "#8B7FE8" };
  return { title: "En dessous de la moyenne", desc: "Votre score est en dessous de la moyenne. La pratique et la concentration peuvent l'améliorer.", color: "#9896A8" };
}

export default function FrResultsContent() {
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

  async function handleUnlock(tier: 'basic' | 'premium') {
    setCheckoutLoading(tier);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, correct, total, email: submitted ? email : undefined, lang: "fr", tier }),
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
    { label: "Raisonnement logique", score: logicalPct },
    { label: "Intelligence spatiale", score: spatialPct },
    { label: "Vitesse de traitement", score: processingPct },
  ];

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setEmailError("");
    if (!email || !email.includes("@")) {
      setEmailError("Veuillez entrer une adresse email valide.");
      return;
    }
    if (!gdprConsent) {
      setEmailError("Veuillez accepter les conditions pour continuer.");
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
      if (data.success) setSubmitted(true);
      else setEmailError("Une erreur s'est produite. Veuillez réessayer.");
    } catch {
      setEmailError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)", paddingBottom: "88px" }}>

      {/* HEADER */}
      <header style={{ backgroundColor: "#F7F6F2", borderBottom: "1px solid #E8E5DC", padding: "0 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/fr" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1825", textDecoration: "none" }}>
            Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
          </Link>
          <span style={{ backgroundColor: "#EDE9FF", color: "#5B4FCF", padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>
            Test complété ✓
          </span>
        </div>
      </header>

      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* SCORE HERO */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <p style={{ fontSize: "13px", color: "#9896A8", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
            Votre Score QI
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

          {/* SHARE — visible immédiatement après le score */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <p style={{ width: "100%", fontSize: "12px", color: "#9896A8", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "4px" }}>
              Défie tes amis →
            </p>
            <a href={`https://twitter.com/intent/tweet?text=Je%20viens%20de%20scorer%20${score}%20au%20test%20QI%20BrainScale%20%F0%9F%A7%A0%20Tu%20peux%20faire%20mieux%20%3F&url=https%3A%2F%2Fwww.brainscale.app%2Ffr%2Ftest`} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#000", color: "#fff", padding: "10px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.brainscale.app%2Ffr%2Ftest`} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#1877F2", color: "#fff", padding: "10px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a href={`https://wa.me/?text=Je%20viens%20de%20scorer%20${score}%20au%20test%20QI%20gratuit%20BrainScale%21%20Tu%20peux%20faire%20mieux%20%3F%20%F0%9F%A7%A0%20https%3A%2F%2Fwww.brainscale.app%2Ffr%2Ftest`} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#25D366", color: "#fff", padding: "10px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <button onClick={() => navigator.clipboard.writeText("https://www.brainscale.app/fr/test")}
              style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#F7F6F2", color: "#1A1825", padding: "10px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, border: "1px solid #E8E5DC", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copier
            </button>
          </div>
        </div>

        {/* EMAIL CAPTURE */}
        {!submitted && !skipped ? (
          <div style={{ backgroundColor: "#EDE9FF", border: "1px solid #C4BBFF", borderRadius: "24px", padding: "36px", marginBottom: "20px", textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" }}>
              🧠 Plan d&apos;amélioration gratuit
            </p>
            <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "22px", fontWeight: 500, color: "#1A1825", marginBottom: "8px" }}>
              Sauvegardez vos résultats & recevez votre plan de 7 jours gratuit
            </h3>
            <p style={{ fontSize: "14px", color: "#5C5A6E", marginBottom: "24px", maxWidth: "380px", margin: "0 auto 24px" }}>
              Nous vous enverrons votre score + un plan personnalisé pour booster vos points faibles cognitifs.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "10px", maxWidth: "440px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, minWidth: "200px", padding: "14px 20px", borderRadius: "999px", border: "1.5px solid #C4BBFF", fontSize: "14px", outline: "none", backgroundColor: "#fff", color: "#1A1825" }}
              />
              <button type="submit" disabled={loading} style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "14px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, whiteSpace: "nowrap" }}>
                {loading ? "Envoi…" : "Envoyer mon rapport →"}
              </button>
            </form>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", maxWidth: "440px", margin: "12px auto 0", textAlign: "left" }}>
              <input type="checkbox" id="gdpr-fr" checked={gdprConsent} onChange={(e) => setGdprConsent(e.target.checked)} style={{ marginTop: "2px", accentColor: "#5B4FCF", flexShrink: 0, cursor: "pointer" }} />
              <label htmlFor="gdpr-fr" style={{ fontSize: "12px", color: "#5C5A6E", lineHeight: 1.5, cursor: "pointer" }}>
                J&apos;accepte de recevoir mes résultats et des conseils par email. Je peux me désabonner à tout moment. Voir notre{" "}
                <a href="/fr/privacy" style={{ color: "#5B4FCF", textDecoration: "underline" }}>Politique de confidentialité</a>.
              </label>
            </div>
            {emailError && <p style={{ color: "#E53E3E", fontSize: "13px", marginTop: "10px" }}>{emailError}</p>}
            <button onClick={() => setSkipped(true)} style={{ background: "none", border: "none", color: "#9896A8", fontSize: "12px", marginTop: "14px", cursor: "pointer", textDecoration: "underline" }}>
              Ignorer pour l&apos;instant
            </button>
          </div>
        ) : submitted ? (
          <div style={{ backgroundColor: "#EDE9FF", border: "1px solid #C4BBFF", borderRadius: "16px", padding: "16px 24px", marginBottom: "20px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "#5B4FCF", fontWeight: 600 }}>✓ Rapport envoyé ! Vérifiez votre boîte mail.</p>
          </div>
        ) : null}

        {/* GAUGE */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "24px", padding: "36px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(26,24,37,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#1A1825" }}>Position sur l&apos;échelle QI</span>
            <span style={{ fontSize: "13px", color: "#9896A8" }}>Plage : 75–145</span>
          </div>
          <div style={{ height: "12px", backgroundColor: "#EFEDE6", borderRadius: "999px", overflow: "hidden", marginBottom: "10px" }}>
            <div style={{ height: "100%", width: `${gaugePercent}%`, borderRadius: "999px", background: "linear-gradient(90deg, #C4BBFF, #5B4FCF)", transition: "width 1s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9896A8" }}>
            <span>75</span><span>90</span><span>100</span><span>115</span><span>130</span><span>145</span>
          </div>
        </div>

        {/* STATS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
          {[
            { value: `${percentile}%`, label: "Percentile", sub: "vs. population mondiale" },
            { value: `${correct}/${total}`, label: "Bonnes réponses", sub: `${accuracy}% de précision` },
            { value: score >= 130 ? "Top 2%" : score >= 120 ? "Top 9%" : score >= 115 ? "Top 16%" : score >= 110 ? "Top 25%" : score >= 100 ? "Top 50%" : score >= 90 ? "25% inf." : "16% inf.", label: "Rang population", sub: "mondial" },
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
          <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 500, color: "#1A1825", marginBottom: "28px" }}>Performance par catégorie</h3>
          {breakdown.map((b) => (
            <div key={b.label} style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
                <span style={{ color: "#1A1825", fontWeight: 500 }}>{b.label}</span>
                <span style={{ color: "#5B4FCF", fontWeight: 700 }}>{b.score}e percentile</span>
              </div>
              <div style={{ height: "8px", backgroundColor: "#EFEDE6", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${b.score}%`, backgroundColor: "#5B4FCF", borderRadius: "999px" }} />
              </div>
            </div>
          ))}
        </div>

        {/* PREMIUM TEASER */}
        <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", marginBottom: "32px" }}>
          <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", padding: "36px", filter: "blur(5px)", userSelect: "none", pointerEvents: "none" }}>
            <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", color: "#1A1825", marginBottom: "20px" }}>Profil cognitif détaillé</h3>
            {["Mémoire de travail : 94e percentile", "Traitement visuo-spatial : 87e percentile", "Raisonnement fluide : 96e percentile", "Vitesse de traitement : 79e percentile"].map((item) => (
              <div key={item} style={{ padding: "14px 0", borderBottom: "1px solid #E8E5DC", fontSize: "14px", color: "#5C5A6E" }}>{item}</div>
            ))}
          </div>
          {/* Overlay — deux tiers */}
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(247,246,242,0.93)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", backdropFilter: "blur(2px)" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "#5B4FCF", textTransform: "uppercase", marginBottom: "6px" }}>Débloquer vos résultats</p>
            <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 500, color: "#1A1825", marginBottom: "20px", textAlign: "center" }}>
              Votre rapport cognitif complet en 8 pages
            </h3>
            <div style={{ display: "flex", gap: "12px", width: "100%", maxWidth: "500px", flexWrap: "wrap", justifyContent: "center" }}>
              {/* ESSENTIEL */}
              <div style={{ flex: "1 1 178px", backgroundColor: "#fff", border: "1.5px solid #E8E5DC", borderRadius: "16px", padding: "20px 16px", textAlign: "center" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#9896A8", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Essentiel</p>
                <p style={{ fontFamily: "var(--font-display, serif)", fontSize: "30px", fontWeight: 600, color: "#1A1825", marginBottom: "14px" }}>14,99 $</p>
                <div style={{ fontSize: "12px", color: "#5C5A6E", lineHeight: 1.9, marginBottom: "16px", textAlign: "left" }}>
                  <div>✓ Rapport PDF 8 pages</div>
                  <div>✓ Certificat cognitif</div>
                  <div>✓ Livraison instantan&eacute;e</div>
                </div>
                <button onClick={() => handleUnlock('basic')} disabled={checkoutLoading !== null}
                  style={{ width: "100%", backgroundColor: "#F0EEF8", color: "#5B4FCF", padding: "11px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 700, border: "1.5px solid #C4BBFF", cursor: checkoutLoading !== null ? "not-allowed" : "pointer", opacity: checkoutLoading === 'basic' ? 0.6 : 1 }}>
                  {checkoutLoading === 'basic' ? "Redirection…" : "Obtenir l'Essentiel"}
                </button>
              </div>
              {/* PREMIUM */}
              <div style={{ flex: "1 1 178px", backgroundColor: "#5B4FCF", border: "2px solid #5B4FCF", borderRadius: "16px", padding: "20px 16px", textAlign: "center", position: "relative" }}>
                <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#FBBF24", color: "#1A1825", fontSize: "11px", fontWeight: 800, padding: "4px 14px", borderRadius: "999px", whiteSpace: "nowrap", letterSpacing: "0.5px" }}>
                  ⭐ LE PLUS POPULAIRE
                </div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Premium</p>
                <p style={{ fontFamily: "var(--font-display, serif)", fontSize: "30px", fontWeight: 600, color: "#fff", marginBottom: "14px" }}>24,99 $</p>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.82)", lineHeight: 1.9, marginBottom: "16px", textAlign: "left" }}>
                  <div>✓ Rapport PDF 8 pages</div>
                  <div>✓ Certificat cognitif</div>
                  <div>✓ Livraison instantan&eacute;e</div>
                  <div style={{ color: "#C4BBFF", fontWeight: 600 }}>✓ Protocole 30 jours</div>
                  <div style={{ color: "#C4BBFF", fontWeight: 600 }}>✓ Badge LinkedIn</div>
                </div>
                <button onClick={() => handleUnlock('premium')} disabled={checkoutLoading !== null}
                  style={{ width: "100%", backgroundColor: "#fff", color: "#5B4FCF", padding: "11px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 700, border: "none", cursor: checkoutLoading !== null ? "not-allowed" : "pointer", opacity: checkoutLoading === 'premium' ? 0.6 : 1, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
                  {checkoutLoading === 'premium' ? "Redirection…" : "Obtenir Premium →"}
                </button>
              </div>
            </div>
            <p style={{ fontSize: "11px", color: "#9896A8", marginTop: "14px" }}>
              🔒 Paiement s&eacute;curis&eacute; · Livraison instantan&eacute;e
            </p>
          </div>
        </div>

        {/* SHARE */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "20px", padding: "28px 32px", marginBottom: "20px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#9896A8", marginBottom: "16px", fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase" }}>
            Défie tes amis
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`https://twitter.com/intent/tweet?text=Je%20viens%20de%20scorer%20${score}%20au%20test%20QI%20BrainScale%20%F0%9F%A7%A0%20Tu%20peux%20faire%20mieux%20%3F&url=https%3A%2F%2Fwww.brainscale.app%2Ffr%2Ftest`} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#000", color: "#fff", padding: "12px 20px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Partager sur X
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.brainscale.app%2Ffr%2Ftest`} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#1877F2", color: "#fff", padding: "12px 20px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a href={`https://wa.me/?text=Je%20viens%20de%20scorer%20${score}%20au%20test%20QI%20gratuit%20BrainScale%21%20Tu%20peux%20faire%20mieux%20%3F%20%F0%9F%A7%A0%20https%3A%2F%2Fwww.brainscale.app%2Ffr%2Ftest`} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#25D366", color: "#fff", padding: "12px 20px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <button onClick={() => navigator.clipboard.writeText("https://www.brainscale.app/fr/test")}
              style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#F7F6F2", color: "#1A1825", padding: "12px 20px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, border: "1px solid #E8E5DC", cursor: "pointer" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copier le lien
            </button>
          </div>
        </div>

        {/* ACTIONS */}
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/fr/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "16px 36px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 20px rgba(91,79,207,0.3)" }}>
            Refaire le test
          </Link>
          <Link href="/fr" style={{ backgroundColor: "#fff", color: "#1A1825", padding: "16px 36px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", border: "1px solid #E8E5DC" }}>
            Retour à l&apos;accueil
          </Link>
        </div>

      </main>

      {/* STICKY BOTTOM CTA — deux tiers */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(247,246,242,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid #E8E5DC", padding: "12px 20px", zIndex: 100, boxShadow: "0 -4px 24px rgba(26,24,37,0.08)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "13px", color: "#5C5A6E", fontWeight: 500, whiteSpace: "nowrap" }}>
            🔒 <strong style={{ color: "#1A1825" }}>D&eacute;bloquer votre rapport</strong>
          </span>
          <button onClick={() => handleUnlock('basic')} disabled={checkoutLoading !== null}
            style={{ backgroundColor: "#F0EEF8", color: "#5B4FCF", padding: "12px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, border: "1.5px solid #C4BBFF", cursor: checkoutLoading !== null ? "not-allowed" : "pointer", whiteSpace: "nowrap", opacity: checkoutLoading === 'basic' ? 0.6 : 1, transition: "all 0.15s ease" }}>
            {checkoutLoading === 'basic' ? "…" : "Essentiel — 14,99 $"}
          </button>
          <button onClick={() => handleUnlock('premium')} disabled={checkoutLoading !== null}
            style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "12px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, border: "none", cursor: checkoutLoading !== null ? "not-allowed" : "pointer", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(91,79,207,0.4)", opacity: checkoutLoading === 'premium' ? 0.6 : 1, transition: "all 0.15s ease" }}>
            {checkoutLoading === 'premium' ? "…" : "Premium ⭐ — 24,99 $"}
          </button>
        </div>
      </div>
    </div>
  );
}
