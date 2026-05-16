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
            <div key={i} onClick={() => setSelected(i)} style={{
              aspectRatio: "1", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", cursor: "pointer", transition: "all 0.15s ease",
              backgroundColor: isCorrect ? "#5B4FCF" : isWrong ? "#F0EDE4" : isSelected ? "#5B4FCF" : "#fff",
              border: isCorrect ? "2px solid #5B4FCF" : isWrong ? "2px solid #C4A882" : isSelected ? "2px solid #5B4FCF" : "1px solid #D4D0C8",
              color: isCorrect ? "#fff" : isWrong ? "#9896A8" : isSelected ? "#fff" : "#5C5A6E",
              transform: isSelected ? "scale(1.08)" : "scale(1)",
            }}>
              {opt}
            </div>
          );
        })}
      </div>
      {selected === null && <p style={{ fontSize: "12px", color: "#9896A8", marginTop: "16px" }}>Essayez — cliquez sur une réponse</p>}
      {selected !== null && selected === correct && <p style={{ fontSize: "13px", color: "#5B4FCF", fontWeight: 600, marginTop: "16px" }}>✓ Correct — rotation cyclique.</p>}
      {selected !== null && selected !== correct && <p style={{ fontSize: "13px", color: "#9896A8", fontWeight: 500, marginTop: "16px" }}>Pas tout à fait — la réponse est ● (rotation cyclique).</p>}
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

const stats = [
  { value: "2,1M+", label: "Tests complétés" },
  { value: "40", label: "Questions calibrées" },
  { value: "r=0,87", label: "Corrélation scientifique" },
  { value: "100%", label: "Gratuit, aucun compte" },
];

const domains = [
  { icon: "⚡", title: "Raisonnement fluide", desc: "Matrices, séquences, analogies abstraites mesurant l'intelligence brute." },
  { icon: "🧠", title: "Mémoire de travail", desc: "Capacité à retenir et manipuler des informations en temps réel." },
  { icon: "🔢", title: "Vitesse de traitement", desc: "Rapidité et précision de votre cognition sous contrainte temporelle." },
  { icon: "💬", title: "Compréhension verbale", desc: "Vocabulaire, logique du langage et raisonnement conceptuel." },
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
      <section style={{ padding: "80px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#EDE9FF", color: "#5B4FCF", padding: "6px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, marginBottom: "32px" }}>
            <span>✦</span> Test QI gratuit · 40 questions · Résultats instantanés
          </div>

          <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 300, color: "#1A1825", lineHeight: 1.1, marginBottom: "24px" }}>
            Mesurez votre{" "}
            <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>intelligence</em>
            <br />avec précision
          </h1>

          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#5C5A6E", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 40px" }}>
            Un test cognitif scientifiquement calibré, entièrement gratuit. Découvrez votre score QI, votre rang percentile et un profil détaillé de vos capacités mentales.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "64px" }}>
            <Link href="/fr/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "18px 44px", borderRadius: "999px", fontSize: "16px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 32px rgba(91,79,207,0.35)", display: "inline-block" }}>
              Commencer le test gratuit →
            </Link>
            <a href="#apercu" style={{ backgroundColor: "#fff", color: "#1A1825", padding: "18px 32px", borderRadius: "999px", fontSize: "16px", fontWeight: 500, textDecoration: "none", border: "1px solid #E8E5DC", display: "inline-block" }}>
              Voir un exemple
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1px", backgroundColor: "#E8E5DC", borderRadius: "20px", overflow: "hidden", border: "1px solid #E8E5DC" }}>
            {stats.map((s) => (
              <div key={s.label} style={{ backgroundColor: "#fff", padding: "28px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600, color: "#5B4FCF", marginBottom: "4px" }}>{s.value}</div>
                <div style={{ fontSize: "13px", color: "#9896A8" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE QUESTION */}
      <section id="apercu" style={{ padding: "64px 24px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 300, color: "#1A1825", marginBottom: "12px" }}>
            Voici à quoi ressemble{" "}
            <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>le test</em>
          </h2>
          <p style={{ fontSize: "16px", color: "#9896A8", marginBottom: "40px" }}>
            Une question par écran, une barre de progression, aucune limite de temps.
          </p>
          <SampleQuestion />
        </div>
      </section>

      {/* DOMAINS */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1A1825", textAlign: "center", marginBottom: "12px" }}>
            Ce que ce test{" "}
            <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>mesure</em>
          </h2>
          <p style={{ fontSize: "16px", color: "#9896A8", textAlign: "center", marginBottom: "48px" }}>
            40 questions réparties sur quatre domaines cognitifs clés.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {domains.map((d) => (
              <div key={d.title} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "20px", padding: "28px 24px" }}>
                <div style={{ fontSize: "28px", marginBottom: "14px" }}>{d.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "17px", fontWeight: 500, color: "#1A1825", marginBottom: "8px" }}>{d.title}</h3>
                <p style={{ fontSize: "14px", color: "#9896A8", lineHeight: 1.6 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCALE */}
      <section style={{ padding: "80px 24px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1A1825", textAlign: "center", marginBottom: "48px" }}>
            L'échelle de{" "}
            <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>référence QI</em>
          </h2>
          {[
            { range: "130+", label: "Surdoué", pct: "2%", color: "#5B4FCF" },
            { range: "120–129", label: "Supérieur", pct: "9%", color: "#6B5FD9" },
            { range: "110–119", label: "Au-dessus de la moyenne", pct: "16%", color: "#8B7FE8" },
            { range: "90–109", label: "Moyenne", pct: "50%", color: "#A89FEF" },
            { range: "80–89", label: "En dessous de la moyenne", pct: "16%", color: "#C4BEFA" },
            { range: "< 80", label: "Limite", pct: "7%", color: "#D4D0C8" },
          ].map((row) => (
            <div key={row.range} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderBottom: "1px solid #E8E5DC" }}>
              <div style={{ width: "90px", fontSize: "13px", fontWeight: 700, color: row.color, flexShrink: 0 }}>{row.range}</div>
              <div style={{ flex: 1 }}>
                <div style={{ backgroundColor: row.color + "30", borderRadius: "999px", height: "8px", width: row.pct, minWidth: "8px" }} />
              </div>
              <div style={{ fontSize: "14px", color: "#1A1825", width: "180px", textAlign: "right" }}>{row.label}</div>
              <div style={{ fontSize: "13px", color: "#9896A8", width: "36px", textAlign: "right", flexShrink: 0 }}>{row.pct}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1A1825", textAlign: "center", marginBottom: "48px" }}>
            Questions{" "}
            <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>fréquentes</em>
          </h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "16px", marginBottom: "10px", overflow: "hidden", boxShadow: openFaq === i ? "0 4px 20px rgba(26,24,37,0.08)" : "none" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", textAlign: "left", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", background: "none", border: "none", cursor: "pointer" }}
              >
                <span style={{ fontFamily: "var(--font-display, serif)", fontSize: "16px", color: "#1A1825", fontWeight: 400 }}>{faq.q}</span>
                <span style={{ color: "#5B4FCF", fontSize: "18px", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 24px 20px", fontSize: "15px", color: "#5C5A6E", lineHeight: 1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: "#1A1825", marginBottom: "16px" }}>
            Prêt à découvrir{" "}
            <em style={{ color: "#5B4FCF", fontStyle: "italic" }}>votre score ?</em>
          </h2>
          <p style={{ fontSize: "16px", color: "#9896A8", marginBottom: "32px" }}>40 questions · ~35 minutes · Résultats instantanés</p>
          <Link href="/fr/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "18px 48px", borderRadius: "999px", fontSize: "16px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 32px rgba(91,79,207,0.35)", display: "inline-block" }}>
            Commencer maintenant — c'est gratuit →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1825", marginBottom: "12px" }}>
          Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "16px", flexWrap: "wrap" }}>
          <Link href="/fr/privacy" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Confidentialité</Link>
          <Link href="/fr/terms" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>CGU</Link>
          <a href="mailto:contact@brainscale.app" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Contact</a>
          <Link href="/fr/blog" style={{ fontSize: "13px", color: "#9896A8", textDecoration: "none" }}>Blog</Link>
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
