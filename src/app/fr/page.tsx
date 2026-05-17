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
        <p style={{ fontSize: "12px", color: "#99958C", marginTop: "16px" }}>Essayez — cliquez sur une réponse</p>
      )}
      {selected !== null && selected === correct && (
        <p style={{ fontSize: "13px", color: "#C96442", fontWeight: 600, marginTop: "16px" }}>✓ Correct — rotation cyclique.</p>
      )}
      {selected !== null && selected !== correct && (
        <p style={{ fontSize: "13px", color: "#99958C", fontWeight: 500, marginTop: "16px" }}>Pas tout à fait — la réponse est ● (rotation cyclique).</p>
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ backgroundColor: "#FAF8F5", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "#FAF8F5", borderBottom: "1px solid #E8E5DF", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/fr" style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.03em", color: "#1A1916", textDecoration: "none" }}>
            Brain<span style={{ color: "#C96442" }}>Scale</span>
          </Link>
          {/* Desktop links */}
          <div className="bs-nav-links" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link href="/fr/blog" style={{ fontSize: "14px", color: "#5C5A52", textDecoration: "none" }}>Blog</Link>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Link href="/" style={{ fontSize: "14px", color: "#5C5A52", textDecoration: "none" }}>EN</Link>
              <span style={{ fontSize: "11px", color: "#D5D0C7" }}>·</span>
              <span style={{ fontSize: "14px", color: "#C96442", fontWeight: 600 }}>FR</span>
            </div>
            <Link href="/fr/test" style={{ backgroundColor: "#1A1916", color: "#FAF8F5", padding: "10px 22px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
              Tester mon QI
            </Link>
          </div>
          {/* Mobile burger */}
          <button
            className="bs-burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
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
            <Link href="/fr" onClick={() => setMenuOpen(false)} style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.03em", color: "#1A1916", textDecoration: "none" }}>
              Brain<span style={{ color: "#C96442" }}>Scale</span>
            </Link>
            <button onClick={() => setMenuOpen(false)} aria-label="Fermer" style={{ background: "none", border: "none", cursor: "pointer", color: "#1A1916", padding: "8px" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {[
              { href: "/fr/test",    label: "Tester mon QI — Gratuit", accent: true },
              { href: "/fr/blog",    label: "Blog",                    accent: false },
              { href: "/",           label: "English",                 accent: false },
              { href: "/fr/privacy", label: "Confidentialité",         accent: false },
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
              href="/fr/test"
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", textAlign: "center", backgroundColor: "#1A1916", color: "#FAF8F5", padding: "16px 24px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}
            >
              Tester mon QI — C&apos;est gratuit
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
              Validé · 40 questions · Résultats instantanés
            </div>

            <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(44px, 5.5vw, 72px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#1A1916", marginBottom: "24px" }}>
              Découvrez votre{" "}
              <em style={{ color: "#C96442", fontStyle: "italic" }}>score QI</em>
              {" "}en 40 minutes
            </h1>

            <p style={{ fontSize: "17px", color: "#5C5A52", lineHeight: 1.78, marginBottom: "40px", maxWidth: "400px" }}>
              Un test psychométrique rigoureux, entièrement gratuit, mesurant votre raisonnement logique, spatial et analytique.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/fr/test" style={{ backgroundColor: "#C96442", color: "#fff", padding: "14px 30px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em", boxShadow: "0 4px 20px rgba(201,100,66,0.30)" }}>
                Tester mon QI — Gratuit
              </Link>
              <a href="#comment-ca-marche" style={{ color: "#5C5A52", padding: "14px 26px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, textDecoration: "none", border: "1px solid #D5D0C7" }}>
                Comment ça marche →
              </a>
            </div>

            {/* Stats — 3-column grid, jamais de retour à la ligne */}
            <div className="bs-hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", marginTop: "44px", paddingTop: "28px", borderTop: "1px solid #E8E5DF" }}>
              {[
                { value: "847 000+", label: "tests complétés" },
                { value: "4,8 / 5", label: "satisfaction" },
                { value: "r = 0,87", label: "fiabilité" },
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
              Exemple de résultat
            </div>

            <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "88px", fontWeight: 300, color: "#1A1916", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "10px" }}>
              127
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <span style={{ display: "inline-block", backgroundColor: "#C96442", color: "#fff", padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.02em" }}>Supérieur</span>
              <span style={{ fontSize: "12px", color: "#99958C" }}>Top 9% mondial</span>
            </div>

            {[
              { label: "Raisonnement logique",  pct: 88 },
              { label: "Intelligence spatiale", pct: 74 },
              { label: "Vitesse de traitement", pct: 91 },
            ].map((bar) => (
              <div key={bar.label} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#99958C", marginBottom: "7px" }}>
                  <span>{bar.label}</span>
                  <span>{bar.pct}e pct.</span>
                </div>
                <div style={{ height: "3px", borderRadius: "999px", backgroundColor: "#D5D0C7", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${bar.pct}%`, backgroundColor: "#C96442", borderRadius: "999px" }} />
                </div>
              </div>
            ))}

            <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px solid #E8E5DF", fontSize: "10px", color: "#AAA69E", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
              Exemple · votre résultat réel sera différent
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
        `}</style>
      </section>

      {/* COURBE EN CLOCHE */}
      <section style={{ padding: "0 24px 64px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", backgroundColor: "#F0EDE6", borderRadius: "24px", padding: "clamp(28px, 5vw, 48px) clamp(20px, 5vw, 40px)", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "22px", fontWeight: 300, letterSpacing: "-0.015em", color: "#1A1916", marginBottom: "6px" }}>
            Distribution mondiale<br className="fr-mobile-br" /> du QI
          </h2>
          <p style={{ fontSize: "13px", color: "#99958C", marginBottom: "32px", letterSpacing: "0.01em" }}>Moyenne mondiale : 100 · Écart-type : 15</p>

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
              { range: "< 90",    label: "Sous moy.",  pct: "25%", bg: "rgba(201,100,66,0.06)", text: "#99958C", sub: "#B0AEC0" },
              { range: "90–109",  label: "Moyenne",    pct: "50%", bg: "rgba(201,100,66,0.15)", text: "#C96442", sub: "#5C5A52" },
              { range: "110–119", label: "Au-dessus",  pct: "16%", bg: "rgba(201,100,66,0.32)", text: "#A84A28", sub: "#B5572F" },
              { range: "120–129", label: "Supérieur",  pct: "7%",  bg: "rgba(201,100,66,0.52)", text: "#fff",    sub: "rgba(255,255,255,0.78)" },
              { range: "≥ 130",   label: "Surdoué",    pct: "2%",  bg: "rgba(201,100,66,0.72)", text: "#fff",    sub: "rgba(255,255,255,0.78)" },
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
      <section id="comment-ca-marche" style={{ padding: "108px 24px" }}>
        <div className="bs-method-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", alignItems: "start", gap: "80px" }}>

          {/* Gauche — label éditorial + intro */}
          <div style={{ paddingTop: "8px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#C96442", textTransform: "uppercase" as const, marginBottom: "18px" }}>
              Méthodologie
            </div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#1A1916", marginBottom: "20px" }}>
              Une méthodologie <em style={{ color: "#C96442", fontStyle: "italic" }}>scientifique</em>
            </h2>
            <p style={{ fontSize: "16px", color: "#5C5A52", lineHeight: 1.75, maxWidth: "280px" }}>
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

      {/* DOMAINES COGNITIFS — grille Swiss 2×2 */}
      <section style={{ padding: "108px 24px", backgroundColor: "#F0EDE6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "52px", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1916" }}>
              Ce que le test <em style={{ color: "#C96442", fontStyle: "italic" }}>mesure</em>
            </h2>
            <Link href="/fr/test" style={{ fontSize: "14px", color: "#C96442", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em", flexShrink: 0 }}>
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

      {/* QUESTION EXEMPLE */}
      <section style={{ padding: "108px 24px" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", backgroundColor: "#FBF0EB", color: "#C96442", padding: "5px 14px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "24px", textTransform: "uppercase" as const }}>
            Exemple de question
          </div>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1916", marginBottom: "40px", lineHeight: 1.2 }}>
            Quelle forme complète<br className="fr-mobile-br" /> la séquence ?
          </h2>
          <SampleQuestion />
        </div>
      </section>

      {/* CONFIDENTIALITÉ — editorial 2-col, côté droit = liste structurée */}
      <section style={{ padding: "108px 24px", backgroundColor: "#F0EDE6" }}>
        <div className="bs-privacy-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", alignItems: "center" }}>

          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#C96442", textTransform: "uppercase" as const, marginBottom: "18px" }}>Confidentialité</div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1916", marginBottom: "28px", lineHeight: 1.15 }}>
              Votre vie privée,{" "}
              <em style={{ color: "#C96442", fontStyle: "italic" }}>notre priorité</em>
            </h2>
            <p style={{ fontSize: "16px", color: "#5C5A52", lineHeight: 1.75, marginBottom: "32px", maxWidth: "380px" }}>
              Aucun compte requis. Aucune donnée collectée sans consentement. Le test s&apos;exécute entièrement dans votre navigateur.
            </p>
            <Link href="/fr/test" style={{ display: "inline-block", backgroundColor: "#1A1916", color: "#FAF8F5", padding: "14px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em" }}>
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

      {/* FAQ — accordéon sans carte, séparateurs uniquement */}
      <section style={{ padding: "108px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#C96442", textTransform: "uppercase" as const, marginBottom: "16px" }}>FAQ</div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1916", lineHeight: 1.15 }}>
              Questions <em style={{ color: "#C96442", fontStyle: "italic" }}>fréquentes</em>
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

      {/* TÉMOIGNAGES — asymétrique : 1 vedette + 2 compacts */}
      <section style={{ padding: "108px 24px", backgroundColor: "#F0EDE6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1916" }}>
              De vrais scores,<br className="fr-mobile-br" /> de vraies <em style={{ color: "#C96442", fontStyle: "italic" }}>personnes</em>
            </h2>
            <p style={{ fontSize: "13px", color: "#99958C", letterSpacing: "0.01em" }}>847 000+ tests complétés dans le monde</p>
          </div>

          {/* Témoignage vedette */}
          <div className="bs-testi-featured" style={{ display: "grid", gap: "48px", alignItems: "center", backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "20px", padding: "40px", marginBottom: "16px" }}>
            <div className="bs-testi-score-border" style={{ textAlign: "center", borderRight: "1px solid #E8E5DF", paddingRight: "48px" }}>
              <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "80px", fontWeight: 300, letterSpacing: "-0.04em", color: "#1A1916", lineHeight: 1 }}>131</div>
              <div style={{ display: "inline-block", backgroundColor: "#C96442", color: "#fff", padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, marginTop: "10px" }}>Surdoué</div>
              <div style={{ fontSize: "11px", color: "#99958C", marginTop: "6px" }}>Top 2%</div>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-display, serif)", fontSize: "19px", fontWeight: 300, color: "#1A1916", lineHeight: 1.7, fontStyle: "italic", marginBottom: "24px" }}>
                &ldquo;J&apos;ai passé un test Mensa officiel l&apos;année dernière — score 128. BrainScale m&apos;a donné 131. La précision est vraiment impressionnante pour un test gratuit. La décomposition par domaine est un vrai plus.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#FBF0EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#C96442", flexShrink: 0 }}>TL</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1A1916" }}>Thomas L.</div>
                  <div style={{ fontSize: "12px", color: "#99958C" }}>Paris, France</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 témoignages compacts */}
          <div className="bs-testi-pair" style={{ display: "grid", gap: "16px" }}>
            {[
              {
                score: 121, label: "Supérieur", labelColor: "#B5572F",
                text: "Les questions sont vraiment difficiles — bien au-dessus des autres tests en ligne. Mon score de 121 me semblait tout à fait réaliste. Interface fluide, résultats immédiatement clairs.",
                name: "Camille R.", location: "Lyon, France", initials: "CR",
              },
              {
                score: 114, label: "Au-dessus", labelColor: "#B5572F",
                text: "J'étais sceptique au départ mais les questions m'ont vraiment mis à l'épreuve. Mon score de 114 m'a semblé juste — fort en logique mais plus lent en spatial, et la décomposition l'a montré clairement.",
                name: "Mehdi B.", location: "Bruxelles, Belgique", initials: "MB",
              },
            ].map((t) => (
              <div key={t.name} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "20px", padding: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                  <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "44px", fontWeight: 300, letterSpacing: "-0.03em", color: "#1A1916", lineHeight: 1 }}>{t.score}</div>
                  <div>
                    <div style={{ display: "inline-block", backgroundColor: t.labelColor, color: "#fff", padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, marginBottom: "4px" }}>{t.label}</div>
                    <div style={{ fontSize: "11px", color: "#99958C" }}>Score QI</div>
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

      {/* CTA FINAL — éditorial, typographie serrée */}
      <section style={{ margin: "0 24px 24px", borderRadius: "24px", backgroundColor: "#1A1916", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(220,170,140,0.65)", textTransform: "uppercase" as const, marginBottom: "24px" }}>
            Gratuit · 40 Questions · Résultats instantanés
          </div>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 300, letterSpacing: "-0.03em", color: "#fff", marginBottom: "20px", lineHeight: 1.1 }}>
            Prêt à découvrir{" "}
            <em style={{ color: "#D4835E", fontStyle: "italic" }}>votre potentiel ?</em>
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", marginBottom: "44px", lineHeight: 1.75 }}>
            Rejoignez 847 000+ personnes qui ont déjà découvert leur QI.
          </p>
          <Link href="/fr/test" style={{ display: "inline-block", backgroundColor: "#fff", color: "#1A1916", padding: "16px 40px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em" }}>
            Commencer le test — Gratuit
          </Link>
        </div>
      </section>

      {/* FOOTER — style Anthropic : colonnes + barre légale */}
      <footer style={{ borderTop: "1px solid #E8E5DF", padding: "64px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div className="bs-footer-top" style={{ display: "grid", gap: "48px", paddingBottom: "56px" }}>
            {/* Marque */}
            <div>
              <Link href="/fr" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, letterSpacing: "-0.03em", color: "#1A1916", textDecoration: "none", display: "inline-block", marginBottom: "12px" }}>
                Brain<span style={{ color: "#C96442" }}>Scale</span>
              </Link>
              <p style={{ fontSize: "13px", color: "#99958C", lineHeight: 1.65 }}>Test psychométrique QI gratuit. Reconnu dans le monde entier depuis 2024.</p>
            </div>

            {/* Test */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#AAA69E", textTransform: "uppercase" as const, marginBottom: "18px" }}>Test</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/fr/test" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>Passer le test QI</Link>
                <Link href="/fr/blog" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>Blog</Link>
                <Link href="/" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>English version</Link>
              </div>
            </div>

            {/* Société */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#AAA69E", textTransform: "uppercase" as const, marginBottom: "18px" }}>À propos</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/about" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>À propos de BrainScale</Link>
                <a href="mailto:contact@brainscale.app" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>Contact</a>
              </div>
            </div>

            {/* Légal */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#AAA69E", textTransform: "uppercase" as const, marginBottom: "18px" }}>Légal</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/fr/privacy" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>Confidentialité</Link>
                <Link href="/fr/terms" style={{ fontSize: "13px", color: "#5C5A52", textDecoration: "none" }}>Conditions d&apos;utilisation</Link>
              </div>
            </div>
          </div>

          {/* Barre légale */}
          <div style={{ borderTop: "1px solid #E8E5DF", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontSize: "12px", color: "#AAA69E" }}>© 2026 BrainScale</span>
            <div style={{ display: "flex", gap: "20px" }}>
              <Link href="/fr/privacy" style={{ fontSize: "12px", color: "#AAA69E", textDecoration: "none" }}>Confidentialité</Link>
              <Link href="/fr/terms" style={{ fontSize: "12px", color: "#AAA69E", textDecoration: "none" }}>CGU</Link>
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
              "acceptedAnswer": { "@type": "Answer", "text": f.a },
            })),
          }),
        }}
      />

    </div>
  );
}
