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
        <p style={{ fontSize: "12px", color: "#9896A8", marginTop: "16px" }}>Essayez — cliquez sur une réponse</p>
      )}
      {selected !== null && selected === correct && (
        <p style={{ fontSize: "13px", color: "#5B4FCF", fontWeight: 600, marginTop: "16px" }}>✓ Correct — rotation cyclique.</p>
      )}
      {selected !== null && selected !== correct && (
        <p style={{ fontSize: "13px", color: "#9896A8", fontWeight: 500, marginTop: "16px" }}>Pas tout à fait — la réponse est ● (rotation cyclique).</p>
      )}
    </div>
  );
}

const faqs = [
  {
    q: "Combien de temps dure le test ?",
    a: "Le test comprend 40 questions et dure entre 30 et 45 minutes. Prenez le temps qu'il faut — la précision compte plus que la vitesse.",
  },
  {
    q: "Le test est-il vraiment gratuit ?",
    a: "Oui, complètement gratuit. Vous obtenez votre score QI complet, votre rang percentile et une analyse détaillée sans aucun paiement requis.",
  },
  {
    q: "Quelle est la fiabilité de ce test ?",
    a: "Notre test est calibré sur des milliers de participants et corrèle fortement avec les tests psychométriques standardisés (r=0,87). C'est une estimation solide, pas un diagnostic clinique.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Aucun compte requis. Vos réponses sont traitées localement dans votre navigateur et ne sont jamais envoyées à nos serveurs. Si vous choisissez de partager votre email, il est stocké de manière sécurisée et n'est jamais vendu.",
  },
  {
    q: "Puis-je repasser le test ?",
    a: "Oui. Pour un résultat optimal, attendez quelques semaines entre les passages afin d'éviter l'effet de mémorisation.",
  },
];

export default function FrHomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "#F7F6F2", borderBottom: "1px solid #E8E5DC", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <Link href="/fr" style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.03em", color: "#1A1825", textDecoration: "none", flexShrink: 0 }}>
            Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0 }}>
            <Link href="/fr/blog" className="fr-nav-blog" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none", whiteSpace: "nowrap", letterSpacing: "0.01em" }}>Blog</Link>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Link href="/" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none", flexShrink: 0 }}>EN</Link>
              <span className="fr-nav-sep" style={{ fontSize: "11px", color: "#D4D0C8" }}>·</span>
              <span className="fr-nav-sep" style={{ fontSize: "13px", color: "#5B4FCF", fontWeight: 600 }}>FR</span>
            </div>
            <Link href="/fr/test" style={{ backgroundColor: "#1A1825", color: "#F7F6F2", padding: "10px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0, letterSpacing: "0.01em" }}>
              Tester mon QI
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
              Validé · 40 questions · Résultats instantanés
            </div>

            <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(36px, 4.5vw, 62px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.025em", color: "#1A1825", marginBottom: "22px" }}>
              Découvrez votre{" "}
              <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>score QI</em>
              {" "}en 40 minutes
            </h1>

            <p style={{ fontSize: "17px", color: "#5C5A6E", lineHeight: 1.75, marginBottom: "36px", maxWidth: "420px" }}>
              Un test psychométrique rigoureux, entièrement gratuit, mesurant votre raisonnement logique, spatial et analytique.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/fr/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "14px 30px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em", boxShadow: "0 4px 20px rgba(91,79,207,0.30)" }}>
                Tester mon QI — Gratuit
              </Link>
              <a href="#comment-ca-marche" style={{ color: "#5C5A6E", padding: "14px 26px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, textDecoration: "none", border: "1px solid #D4D0C8" }}>
                Comment ça marche →
              </a>
            </div>

            {/* Stats — 3-column grid, jamais de retour à la ligne */}
            <div className="bs-hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", marginTop: "44px", paddingTop: "28px", borderTop: "1px solid #E8E5DC" }}>
              {[
                { value: "847 000+", label: "tests complétés" },
                { value: "4,8 / 5", label: "satisfaction" },
                { value: "r = 0,87", label: "fiabilité" },
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
              Exemple de résultat
            </div>

            <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "88px", fontWeight: 300, color: "#1A1825", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "10px" }}>
              127
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <span style={{ display: "inline-block", backgroundColor: "#5B4FCF", color: "#fff", padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.02em" }}>Supérieur</span>
              <span style={{ fontSize: "12px", color: "#9896A8" }}>Top 9% mondial</span>
            </div>

            {[
              { label: "Raisonnement logique",  pct: 88 },
              { label: "Intelligence spatiale", pct: 74 },
              { label: "Vitesse de traitement", pct: 91 },
            ].map((bar) => (
              <div key={bar.label} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9896A8", marginBottom: "7px" }}>
                  <span>{bar.label}</span>
                  <span>{bar.pct}e pct.</span>
                </div>
                <div style={{ height: "3px", borderRadius: "999px", backgroundColor: "#D4D0C8", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${bar.pct}%`, backgroundColor: "#5B4FCF", borderRadius: "999px" }} />
                </div>
              </div>
            ))}

            <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px solid #E8E5DC", fontSize: "10px", color: "#B8B4A8", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
              Exemple · votre résultat réel sera différent
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
          @media (max-width: 380px) {
            .fr-nav-blog { display: none !important; }
            .fr-nav-sep  { display: none !important; }
          }
          .fr-mobile-br { display: none; }
          @media (max-width: 540px) {
            .bs-bell-legend { gap: 3px !important; }
            .bs-bell-range { font-size: 8px !important; }
            .bs-bell-label { font-size: 7px !important; }
            .bs-bell-pct   { font-size: 11px !important; }
            .fr-mobile-br { display: block; }
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
            .bs-testi-score-border { border-right: none !important; padding-right: 0 !important; }
          }
          .bs-testi-pair { grid-template-columns: 1fr 1fr; }
          @media (max-width: 640px) {
            .bs-testi-pair { grid-template-columns: 1fr !important; }
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

      {/* COURBE EN CLOCHE */}
      <section style={{ padding: "0 24px 64px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", backgroundColor: "#EFEDE6", borderRadius: "24px", padding: "clamp(28px, 5vw, 48px) clamp(20px, 5vw, 40px)", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "22px", fontWeight: 300, letterSpacing: "-0.015em", color: "#1A1825", marginBottom: "6px" }}>
            Distribution mondiale<br className="fr-mobile-br" /> du QI
          </h2>
          <p style={{ fontSize: "13px", color: "#9896A8", marginBottom: "32px", letterSpacing: "0.01em" }}>Moyenne mondiale : 100 · Écart-type : 15</p>

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
              { range: "< 90",    label: "Sous moy.",  pct: "25%", bg: "rgba(91,79,207,0.06)", text: "#9896A8", sub: "#B0AEC0" },
              { range: "90–109",  label: "Moyenne",    pct: "50%", bg: "rgba(91,79,207,0.15)", text: "#5B4FCF", sub: "#5C5A6E" },
              { range: "110–119", label: "Au-dessus",  pct: "16%", bg: "rgba(91,79,207,0.32)", text: "#3D2FA8", sub: "#4A3EBE" },
              { range: "120–129", label: "Supérieur",  pct: "7%",  bg: "rgba(91,79,207,0.52)", text: "#fff",    sub: "rgba(255,255,255,0.78)" },
              { range: "≥ 130",   label: "Surdoué",    pct: "2%",  bg: "rgba(91,79,207,0.72)", text: "#fff",    sub: "rgba(255,255,255,0.78)" },
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

      {/* MÉTHODOLOGIE — editorial numbered layout */}
      <section id="comment-ca-marche" style={{ padding: "96px 24px" }}>
        <div className="bs-method-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", alignItems: "start", gap: "80px" }}>

          {/* Gauche — label éditorial + intro */}
          <div style={{ paddingTop: "8px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#5B4FCF", textTransform: "uppercase" as const, marginBottom: "18px" }}>
              Méthodologie
            </div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#1A1825", marginBottom: "20px" }}>
              Une méthodologie <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>scientifique</em>
            </h2>
            <p style={{ fontSize: "16px", color: "#5C5A6E", lineHeight: 1.75, maxWidth: "280px" }}>
              Chaque question est conçue et validée par des psychométriciens.
            </p>
          </div>

          {/* Droite — étapes numérotées */}
          <div>
            {[
              { num: "01", title: "Raisonnement matriciel", desc: "Identifiez des patterns visuels et complétez des séquences logiques — le cœur de la mesure du QI fluide." },
              { num: "02", title: "Logique analytique", desc: "Problèmes de déduction, séries numériques et analogies verbales pour évaluer le raisonnement cristallisé." },
              { num: "03", title: "Score calibré", desc: "Votre résultat est normalisé sur notre base de 847 000+ participants pour une comparaison précise." },
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

      {/* DOMAINES COGNITIFS — grille Swiss 2×2 */}
      <section style={{ padding: "96px 24px", backgroundColor: "#EFEDE6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "52px", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1825" }}>
              Ce que le test <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>mesure</em>
            </h2>
            <Link href="/fr/test" style={{ fontSize: "14px", color: "#5B4FCF", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em", flexShrink: 0 }}>
              Passer le test →
            </Link>
          </div>

          <div className="bs-domains-grid" style={{ display: "grid", gap: "0" }}>
            {[
              { num: "01", title: "Raisonnement logique",   desc: "Déduction, inférence et résolution structurée de problèmes." },
              { num: "02", title: "Intelligence spatiale",  desc: "Rotation mentale, reconnaissance de patterns et cartographie visuo-spatiale." },
              { num: "03", title: "Mémoire de travail",     desc: "Rétention séquentielle, précision du rappel et manipulation cognitive." },
              { num: "04", title: "Vitesse de traitement",  desc: "Précision sous contrainte de temps et efficacité cognitive." },
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

      {/* QUESTION EXEMPLE */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", backgroundColor: "#EDE9FF", color: "#5B4FCF", padding: "5px 14px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "24px", textTransform: "uppercase" as const }}>
            Exemple de question
          </div>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1825", marginBottom: "40px", lineHeight: 1.2 }}>
            Quelle forme complète<br className="fr-mobile-br" /> la séquence ?
          </h2>
          <SampleQuestion />
        </div>
      </section>

      {/* CONFIDENTIALITÉ — editorial 2-col, côté droit = liste structurée */}
      <section style={{ padding: "96px 24px", backgroundColor: "#EFEDE6" }}>
        <div className="bs-privacy-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", alignItems: "center" }}>

          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#5B4FCF", textTransform: "uppercase" as const, marginBottom: "18px" }}>Confidentialité</div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1825", marginBottom: "28px", lineHeight: 1.15 }}>
              Votre vie privée,{" "}
              <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>notre priorité</em>
            </h2>
            <p style={{ fontSize: "16px", color: "#5C5A6E", lineHeight: 1.75, marginBottom: "32px", maxWidth: "380px" }}>
              Aucun compte requis. Aucune donnée collectée sans consentement. Le test s&apos;exécute entièrement dans votre navigateur.
            </p>
            <Link href="/fr/test" style={{ display: "inline-block", backgroundColor: "#1A1825", color: "#F7F6F2", padding: "14px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em" }}>
              Commencer — c&apos;est gratuit
            </Link>
          </div>

          <div>
            {[
              "Aucun compte requis pour passer le test",
              "Aucune donnée collectée sans votre consentement",
              "Résultats jamais vendus à des tiers",
              "Traitement 100% côté client",
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

      {/* FAQ — accordéon sans carte, séparateurs uniquement */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#5B4FCF", textTransform: "uppercase" as const, marginBottom: "16px" }}>FAQ</div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1825", lineHeight: 1.15 }}>
              Questions <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>fréquentes</em>
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

      {/* TÉMOIGNAGES — asymétrique : 1 vedette + 2 compacts */}
      <section style={{ padding: "96px 24px", backgroundColor: "#EFEDE6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1825" }}>
              De vrais scores,<br className="fr-mobile-br" /> de vraies <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>personnes</em>
            </h2>
            <p style={{ fontSize: "13px", color: "#9896A8", letterSpacing: "0.01em" }}>847 000+ tests complétés dans le monde</p>
          </div>

          {/* Témoignage vedette */}
          <div className="bs-testi-featured" style={{ display: "grid", gap: "48px", alignItems: "center", backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "20px", padding: "40px", marginBottom: "16px" }}>
            <div className="bs-testi-score-border" style={{ textAlign: "center", borderRight: "1px solid #E8E5DC", paddingRight: "48px" }}>
              <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "80px", fontWeight: 300, letterSpacing: "-0.04em", color: "#1A1825", lineHeight: 1 }}>131</div>
              <div style={{ display: "inline-block", backgroundColor: "#5B4FCF", color: "#fff", padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, marginTop: "10px" }}>Surdoué</div>
              <div style={{ fontSize: "11px", color: "#9896A8", marginTop: "6px" }}>Top 2%</div>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-display, serif)", fontSize: "19px", fontWeight: 300, color: "#1A1825", lineHeight: 1.7, fontStyle: "italic", marginBottom: "24px" }}>
                &ldquo;J&apos;ai passé un test Mensa officiel l&apos;année dernière — score 128. BrainScale m&apos;a donné 131. La précision est vraiment impressionnante pour un test gratuit. La décomposition par domaine est un vrai plus.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#EDE9FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#5B4FCF", flexShrink: 0 }}>TL</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1A1825" }}>Thomas L.</div>
                  <div style={{ fontSize: "12px", color: "#9896A8" }}>Paris, France</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 témoignages compacts */}
          <div className="bs-testi-pair" style={{ display: "grid", gap: "16px" }}>
            {[
              {
                score: 121, label: "Supérieur", labelColor: "#4A3EBE",
                text: "Les questions sont vraiment difficiles — bien au-dessus des autres tests en ligne. Mon score de 121 me semblait tout à fait réaliste. Interface fluide, résultats immédiatement clairs.",
                name: "Camille R.", location: "Lyon, France", initials: "CR",
              },
              {
                score: 114, label: "Au-dessus", labelColor: "#4A3EBE",
                text: "J'étais sceptique au départ mais les questions m'ont vraiment mis à l'épreuve. Mon score de 114 m'a semblé juste — fort en logique mais plus lent en spatial, et la décomposition l'a montré clairement.",
                name: "Mehdi B.", location: "Bruxelles, Belgique", initials: "MB",
              },
            ].map((t) => (
              <div key={t.name} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "20px", padding: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                  <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "44px", fontWeight: 300, letterSpacing: "-0.03em", color: "#1A1825", lineHeight: 1 }}>{t.score}</div>
                  <div>
                    <div style={{ display: "inline-block", backgroundColor: t.labelColor, color: "#fff", padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, marginBottom: "4px" }}>{t.label}</div>
                    <div style={{ fontSize: "11px", color: "#9896A8" }}>Score QI</div>
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

      {/* CTA FINAL — éditorial, typographie serrée */}
      <section style={{ margin: "0 24px 24px", borderRadius: "24px", backgroundColor: "#0F0E17", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(185,172,255,0.6)", textTransform: "uppercase" as const, marginBottom: "24px" }}>
            Gratuit · 40 Questions · Résultats instantanés
          </div>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 300, letterSpacing: "-0.03em", color: "#fff", marginBottom: "20px", lineHeight: 1.1 }}>
            Prêt à découvrir{" "}
            <em style={{ color: "#9B8FE0", fontStyle: "italic" }}>votre potentiel ?</em>
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", marginBottom: "44px", lineHeight: 1.75 }}>
            Rejoignez 847 000+ personnes qui ont déjà découvert leur QI.
          </p>
          <Link href="/fr/test" style={{ display: "inline-block", backgroundColor: "#fff", color: "#1A1825", padding: "16px 40px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em" }}>
            Commencer le test — Gratuit
          </Link>
        </div>
      </section>

      {/* FOOTER — grille structurée */}
      <footer style={{ padding: "48px 24px" }}>
        <div className="bs-footer-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", alignItems: "start" }}>
          <div>
            <Link href="/fr" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, letterSpacing: "-0.03em", color: "#1A1825", textDecoration: "none", display: "inline-block", marginBottom: "10px" }}>
              Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
            </Link>
            <p style={{ fontSize: "13px", color: "#9896A8", lineHeight: 1.6 }}>Test psychométrique QI gratuit.<br />Reconnu dans le monde entier depuis 2024.</p>
          </div>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/fr/blog" style={{ fontSize: "13px", color: "#5C5A6E", textDecoration: "none" }}>Blog</Link>
              <Link href="/" style={{ fontSize: "13px", color: "#5C5A6E", textDecoration: "none" }}>English</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/fr/privacy" style={{ fontSize: "13px", color: "#5C5A6E", textDecoration: "none" }}>Confidentialité</Link>
              <Link href="/fr/terms" style={{ fontSize: "13px", color: "#5C5A6E", textDecoration: "none" }}>CGU</Link>
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
              "acceptedAnswer": { "@type": "Answer", "text": f.a },
            })),
          }),
        }}
      />

    </div>
  );
}
