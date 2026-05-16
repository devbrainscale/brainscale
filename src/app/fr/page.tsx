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
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/fr" style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 600, color: "#1A1825", textDecoration: "none" }}>
            Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/fr/blog" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Blog</Link>
            <Link href="/" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>EN</Link>
            <span style={{ fontSize: "13px", color: "#D4D0C8" }}>|</span>
            <span style={{ fontSize: "13px", color: "#5B4FCF", fontWeight: 600 }}>FR</span>
            <Link href="/fr/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Commencer le test
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#EDE9FF", color: "#5B4FCF", padding: "8px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, marginBottom: "32px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#5B4FCF", display: "inline-block" }} />
            Test validé · 40 questions · Résultats instantanés
          </div>

          <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 300, lineHeight: 1.15, color: "#1A1825", marginBottom: "24px" }}>
            Découvrez votre{" "}
            <em style={{ color: "#5B4FCF", fontStyle: "italic", whiteSpace: "nowrap" }}>score QI</em>
            <br />en 40 minutes
          </h1>

          <p style={{ fontSize: "18px", color: "#5C5A6E", lineHeight: 1.7, marginBottom: "40px", maxWidth: "520px", margin: "0 auto 40px" }}>
            Un test psychométrique rigoureux — entièrement gratuit — mesurant votre raisonnement logique, spatial et analytique.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/fr/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "16px 36px", borderRadius: "999px", fontSize: "16px", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 24px rgba(91,79,207,0.35)" }}>
              Tester mon QI — Gratuit
            </Link>
            <a href="#comment-ca-marche" style={{ color: "#5C5A6E", padding: "16px 32px", borderRadius: "999px", fontSize: "16px", fontWeight: 500, textDecoration: "none", border: "1px solid #D4D0C8" }}>
              Comment ça marche →
            </a>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "56px", marginTop: "64px", paddingTop: "40px", borderTop: "1px solid #E8E5DC", flexWrap: "wrap" }}>
            {[
              { value: "2,1M+", label: "Tests complétés" },
              { value: "4.8 / 5", label: "Satisfaction" },
              { value: "r = 0,87", label: "Corrélation avec les tests standardisés" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "32px", fontWeight: 600, color: "#5B4FCF" }}>{s.value}</div>
                <div style={{ fontSize: "13px", color: "#9896A8", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BELL CURVE */}
      <section style={{ padding: "16px 24px 48px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", backgroundColor: "#EFEDE6", borderRadius: "24px", padding: "48px 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "24px", fontWeight: 500, color: "#1A1825", marginBottom: "6px" }}>
            Distribution mondiale du QI
          </h2>
          <p style={{ fontSize: "13px", color: "#9896A8", marginBottom: "32px" }}>Moyenne mondiale : 100 · Écart-type : 15</p>

          <svg viewBox="0 0 600 180" style={{ width: "100%", maxWidth: "480px", display: "block", margin: "0 auto 24px" }}>
            <defs>
              <linearGradient id="bg-fr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5B4FCF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#5B4FCF" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path d="M 20 165 Q 90 163 140 148 Q 195 130 235 85 Q 265 48 300 28 Q 335 48 365 85 Q 405 130 460 148 Q 510 163 580 165 Z" fill="url(#bg-fr)" stroke="#5B4FCF" strokeWidth="2.5" />
            <line x1="300" y1="28" x2="300" y2="168" stroke="#5B4FCF" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
            <text x="300" y="178" textAnchor="middle" fontSize="12" fill="#5B4FCF" fontWeight="700">100</text>
            {[{ x: 148, l: "70" }, { x: 222, l: "85" }, { x: 378, l: "115" }, { x: 452, l: "130" }].map(({ x, l }) => (
              <g key={l}>
                <line x1={x} y1="162" x2={x} y2="170" stroke="#9896A8" strokeWidth="1" />
                <text x={x} y="178" textAnchor="middle" fontSize="11" fill="#9896A8">{l}</text>
              </g>
            ))}
          </svg>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            {[
              { range: "< 85", label: "Sous la moyenne", pct: "16%" },
              { range: "85–115", label: "Moyenne", pct: "68%" },
              { range: "115–130", label: "Au-dessus", pct: "14%" },
              { range: "> 130", label: "Surdoué", pct: "2%" },
            ].map((b) => (
              <div key={b.range} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "14px", padding: "12px 18px", textAlign: "center", minWidth: "110px" }}>
                <div style={{ fontWeight: 700, color: "#5B4FCF", fontSize: "15px" }}>{b.range}</div>
                <div style={{ color: "#5C5A6E", fontSize: "13px", marginTop: "2px" }}>{b.label}</div>
                <div style={{ color: "#9896A8", fontSize: "11px" }}>{b.pct} de la pop.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="comment-ca-marche" style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1A1825", marginBottom: "12px" }}>
              Une méthodologie <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>scientifique</em>
            </h2>
            <p style={{ fontSize: "17px", color: "#5C5A6E" }}>Chaque question est conçue et validée par des psychométriciens.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { num: "01", title: "Raisonnement matriciel", desc: "Identifiez des patterns visuels et complétez des séquences logiques — le cœur de la mesure du QI fluide." },
              { num: "02", title: "Logique analytique", desc: "Problèmes de déduction, séries numériques et analogies verbales pour évaluer le raisonnement cristallisé." },
              { num: "03", title: "Score calibré", desc: "Votre résultat est normalisé sur notre base de 2,1M+ participants pour une comparaison précise." },
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
            Ce que le test <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>mesure</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {[
              { icon: "◈", title: "Raisonnement logique", desc: "Déduction & inférence" },
              { icon: "◉", title: "Intelligence spatiale", desc: "Rotation mentale, patterns" },
              { icon: "◇", title: "Mémoire de travail", desc: "Rétention & manipulation" },
              { icon: "◎", title: "Vitesse de traitement", desc: "Rapidité cognitive" },
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
            EXEMPLE DE QUESTION
          </div>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 300, color: "#1A1825", marginBottom: "40px" }}>
            Quelle forme complète la séquence ?
          </h2>
          <SampleQuestion />
        </div>
      </section>

      {/* PRIVACY */}
      <section style={{ padding: "72px 24px", backgroundColor: "#EFEDE6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1A1825", marginBottom: "32px" }}>
              Votre vie privée,{" "}
              <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>notre priorité</em>
            </h2>
            {[
              "Aucun compte requis pour passer le test",
              "Aucune donnée collectée sans votre consentement",
              "Résultats jamais vendus à des tiers",
              "Traitement 100% côté client",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "18px" }}>
                <span style={{ color: "#5B4FCF", fontSize: "18px", lineHeight: 1.4 }}>✓</span>
                <span style={{ fontSize: "15px", color: "#5C5A6E", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "24px", padding: "40px", boxShadow: "0 4px 24px rgba(26,24,37,0.08)" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "72px", fontWeight: 300, color: "#5B4FCF", lineHeight: 1 }}>127</div>
              <div style={{ fontSize: "13px", color: "#9896A8", marginTop: "6px" }}>Score QI — exemple</div>
            </div>
            {[
              { label: "Raisonnement logique", pct: 88 },
              { label: "Intelligence spatiale", pct: 75 },
              { label: "Vitesse de traitement", pct: 91 },
            ].map((bar) => (
              <div key={bar.label} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9896A8", marginBottom: "6px" }}>
                  <span>{bar.label}</span>
                  <span>{bar.pct}e percentile</span>
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
            Questions <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>fréquentes</em>
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

      {/* CTA FINAL */}
      <section style={{ margin: "0 24px 24px", borderRadius: "28px", backgroundColor: "#0F0E17", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, color: "#fff", marginBottom: "20px" }}>
            Prêt à découvrir{" "}
            <em style={{ color: "#9B8FE0", fontStyle: "italic" }}>votre potentiel ?</em>
          </h2>
          <p style={{ fontSize: "17px", color: "#9896A8", marginBottom: "40px" }}>
            Rejoignez 2,1M+ personnes qui ont déjà découvert leur QI. Gratuit, rapide, sans inscription.
          </p>
          <Link href="/fr/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "18px 44px", borderRadius: "999px", fontSize: "16px", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 32px rgba(91,79,207,0.5)" }}>
            Commencer maintenant — c&apos;est gratuit
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1825", marginBottom: "12px" }}>
          Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "16px", flexWrap: "wrap" }}>
          <Link href="/fr/blog" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Blog</Link>
          <Link href="/fr/privacy" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Confidentialité</Link>
          <Link href="/fr/terms" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>CGU</Link>
          <a href="mailto:contact@brainscale.app" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Contact</a>
          <Link href="/" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>🇬🇧 English</Link>
        </div>
        <p style={{ fontSize: "12px", color: "#9896A8" }}>© 2026 BrainScale · Test psychométrique gratuit</p>
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
