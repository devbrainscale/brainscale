"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Questions mixtes : logique pure (pas besoin de traduction) + verbales en français
const questions = [
  { id: 1, question: "Quel nombre vient ensuite dans la suite : 2, 4, 8, 16, ?", options: ["24", "32", "28", "20"], answer: 1 },
  { id: 2, question: "Si tous les chats sont des animaux, et que tous les animaux sont mortels, alors :", options: ["Certains chats ne sont pas mortels", "Tous les chats sont mortels", "Certains animaux ne sont pas des chats", "Aucune de ces réponses"], answer: 1 },
  { id: 3, question: "Quelle forme complète le motif ? △ ○ □ △ ○ ?", options: ["△", "○", "□", "◇"], answer: 2 },
  { id: 4, question: "Une horloge indique 3h15. Quel est l'angle entre l'aiguille des heures et celle des minutes ?", options: ["0°", "7,5°", "15°", "22,5°"], answer: 1 },
  { id: 5, question: "Quel nombre manque : 1, 1, 2, 3, 5, 8, ?, 21", options: ["11", "12", "13", "14"], answer: 2 },
  { id: 6, question: "Quel mot s'associe le mieux à : Rapide, Vif, Prompt ?", options: ["Lent", "Alerte", "Lourd", "Terne"], answer: 1 },
  { id: 7, question: "Complétez l'analogie : Livre est à Lire comme Fourchette est à :", options: ["Cuisine", "Manger", "Cuisiner", "Cuillère"], answer: 1 },
  { id: 8, question: "Quel nombre vient ensuite : 3, 6, 11, 18, 27, ?", options: ["36", "38", "42", "40"], answer: 1 },
  { id: 9, question: "Si 5 machines fabriquent 5 pièces en 5 minutes, combien de temps faut-il à 100 machines pour fabriquer 100 pièces ?", options: ["100 min", "50 min", "5 min", "10 min"], answer: 2 },
  { id: 10, question: "Quel mot n'appartient pas à ce groupe : Pomme, Mangue, Carotte, Banane ?", options: ["Pomme", "Mangue", "Carotte", "Banane"], answer: 2 },
  { id: 11, question: "Un père est 4 fois plus âgé que son fils. Dans 20 ans, il sera 2 fois plus âgé. Quel est l'âge actuel du fils ?", options: ["5", "10", "15", "20"], answer: 1 },
  { id: 12, question: "Quelle figure a le plus de côtés : Pentagone, Heptagone, Hexagone, Octogone ?", options: ["Pentagone", "Heptagone", "Hexagone", "Octogone"], answer: 3 },
  { id: 13, question: "Complétez la suite : Z, X, V, T, ?", options: ["S", "R", "Q", "P"], answer: 1 },
  { id: 14, question: "Quel nombre est l'intrus : 16, 25, 36, 48, 64 ?", options: ["25", "36", "48", "64"], answer: 2 },
  { id: 15, question: "Un train parcourt 60 km en 45 minutes. Quelle est sa vitesse en km/h ?", options: ["70", "75", "80", "85"], answer: 2 },
  { id: 16, question: "Combien de carrés y a-t-il dans une grille 3×3 (y compris les carrés qui se chevauchent) ?", options: ["9", "12", "14", "16"], answer: 2 },
  { id: 17, question: "Quel est le nombre suivant : 1, 4, 9, 16, 25, ?", options: ["30", "36", "40", "49"], answer: 1 },
  { id: 18, question: "Si vous pliez une feuille de papier en deux 3 fois, combien de couches obtenez-vous ?", options: ["6", "8", "9", "12"], answer: 1 },
  { id: 19, question: "Complétez : AZ, BY, CX, DW, ?", options: ["EV", "EU", "FV", "EW"], answer: 0 },
  { id: 20, question: "Qu'est-ce qui est le plus lourd : 1 kg d'or, 1 kg de plumes, ou 1 kg de fer ?", options: ["L'or", "Les plumes", "Le fer", "Ils sont tous égaux"], answer: 3 },
  { id: 21, question: "Résolvez : Si 2+3=10, 3+4=21, 4+5=36, alors 5+6=?", options: ["55", "56", "57", "60"], answer: 0 },
  { id: 22, question: "Quel nombre vient ensuite dans la série : 2, 3, 5, 7, 11, 13, ?", options: ["15", "16", "17", "18"], answer: 2 },
  { id: 23, question: "Une batte et une balle coûtent 1,10 €. La batte coûte 1 € de plus que la balle. Combien coûte la balle ?", options: ["0,10 €", "0,05 €", "0,15 €", "0,20 €"], answer: 1 },
  { id: 24, question: "Quel nombre manque : 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], answer: 1 },
  { id: 25, question: "Lequel n'appartient pas à ce groupe : Jupiter, Saturne, Terre, Lune ?", options: ["Jupiter", "Saturne", "Terre", "Lune"], answer: 3 },
  { id: 26, question: "En comptant de 1 à 100, combien de fois le chiffre 7 apparaît-il ?", options: ["10", "11", "20", "21"], answer: 2 },
  { id: 27, question: "Complétez : 1, 2, 4, 7, 11, 16, ?", options: ["20", "21", "22", "23"], answer: 2 },
  { id: 28, question: "Un magasin réduit un article de 200 € de 20 %, puis l'augmente de 20 %. Prix final ?", options: ["200 €", "192 €", "184 €", "196 €"], answer: 1 },
  { id: 29, question: "Quelle figure a le moins d'axes de symétrie : Carré, Rectangle, Triangle équilatéral, Cercle ?", options: ["Carré", "Rectangle", "Triangle équilatéral", "Cercle"], answer: 1 },
  { id: 30, question: "Quel est le nombre suivant : 100, 50, 25, 12,5, ?", options: ["5", "6", "6,25", "7"], answer: 2 },
  { id: 31, question: "Deux coureurs partent du même point. L'un court à 8 km/h, l'autre à 12 km/h. Après 3 heures, quelle distance les sépare ?", options: ["10 km", "12 km", "15 km", "20 km"], answer: 1 },
  { id: 32, question: "Quel nombre vient ensuite : 1, 3, 6, 10, 15, 21, ?", options: ["25", "27", "28", "30"], answer: 2 },
  { id: 33, question: "Lequel n'est pas un nombre premier : 13, 17, 19, 21 ?", options: ["13", "17", "19", "21"], answer: 3 },
  { id: 34, question: "Si toutes les roses sont des fleurs et que certaines fleurs se fanent rapidement, alors :", options: ["Toutes les roses se fanent vite", "Certaines roses peuvent se faner vite", "Aucune rose ne se fane vite", "Toutes les fleurs sont des roses"], answer: 1 },
  { id: 35, question: "Complétez l'analogie : Piano est à Musique comme Pinceau est à :", options: ["Toile", "Art", "Peinture", "Tableau"], answer: 3 },
  { id: 36, question: "Quel est 15 % de 240 ?", options: ["32", "36", "38", "42"], answer: 1 },
  { id: 37, question: "Un palindrome se lit pareil dans les deux sens. Lequel est un palindrome : LEVEL, RADAR, CIVIC, les trois ?", options: ["LEVEL seulement", "RADAR seulement", "CIVIC seulement", "Les trois"], answer: 3 },
  { id: 38, question: "Complétez la suite : 1, 8, 27, 64, ?", options: ["100", "121", "125", "128"], answer: 2 },
  { id: 39, question: "Quelle forme complète le motif : ■ ▲ ● ■ ▲ ?", options: ["■", "▲", "●", "◆"], answer: 2 },
  { id: 40, question: "Combien de faces a un dodécaèdre ?", options: ["8", "10", "12", "20"], answer: 2 },
];

function calculateIQ(correct: number): number {
  const pct = correct / questions.length;
  if (pct >= 0.96) return 145;
  if (pct >= 0.92) return 140;
  if (pct >= 0.88) return 135;
  if (pct >= 0.84) return 130;
  if (pct >= 0.76) return 125;
  if (pct >= 0.68) return 120;
  if (pct >= 0.60) return 115;
  if (pct >= 0.52) return 110;
  if (pct >= 0.44) return 105;
  if (pct >= 0.36) return 100;
  if (pct >= 0.28) return 95;
  if (pct >= 0.20) return 90;
  if (pct >= 0.14) return 85;
  if (pct >= 0.08) return 80;
  return 75;
}

export default function FrTestPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitting, setSubmitting] = useState(false);

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  async function handleNext() {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      const correct = newAnswers.filter((a, i) => a === questions[i].answer).length;
      const total = questions.length;
      setSubmitting(true);
      try {
        const res = await fetch('/api/sign-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correct, total }),
        });
        if (res.ok) {
          const data = await res.json();
          router.push(`/fr/results?score=${data.score}&correct=${data.correct}&total=${data.total}&sig=${data.sig}`);
        } else {
          const iq = calculateIQ(correct);
          router.push(`/fr/results?score=${iq}&correct=${correct}&total=${total}`);
        }
      } catch {
        const iq = calculateIQ(correct);
        router.push(`/fr/results?score=${iq}&correct=${correct}&total=${total}`);
      }
    }
  }

  return (
    <div style={{ backgroundColor: "#FAF8F5", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>
      <header style={{ backgroundColor: "#FAF8F5", borderBottom: "1px solid #E8E5DF", padding: "0 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/fr" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1916", textDecoration: "none" }}>
            Brain<span style={{ color: "#C96442" }}>Scale</span>
          </Link>
          <span style={{ fontSize: "13px", color: "#99958C", fontWeight: 500 }}>
            Question {current + 1} sur {questions.length}
          </span>
        </div>
      </header>

      <div style={{ height: "3px", backgroundColor: "#E8E5DF" }}>
        <div style={{ height: "100%", backgroundColor: "#C96442", width: `${progress}%`, transition: "width 0.4s ease" }} />
      </div>

      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <div style={{ backgroundColor: "#FBF0EB", color: "#C96442", padding: "4px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, letterSpacing: "1px" }}>
            Q{current + 1}
          </div>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#E8E5DF" }} />
          <span style={{ fontSize: "12px", color: "#99958C" }}>{Math.round(progress)}% complété</span>
        </div>

        <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, color: "#1A1916", lineHeight: 1.4, marginBottom: "40px" }}>
          {q.question}
        </h2>

        <div style={{ display: "grid", gap: "12px", marginBottom: "40px" }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                width: "100%", textAlign: "left", padding: "20px 24px", borderRadius: "16px",
                border: selected === i ? "2px solid #C96442" : "1px solid #E8E5DF",
                backgroundColor: selected === i ? "#FBF0EB" : "#fff",
                color: selected === i ? "#A84A28" : "#1A1916",
                fontSize: "15px", fontWeight: selected === i ? 600 : 400,
                cursor: "pointer", display: "flex", alignItems: "center", gap: "16px",
                transition: "all 0.15s ease",
                boxShadow: selected === i ? "0 0 0 1px #C96442" : "0 1px 4px rgba(26,25,22,0.05)",
              }}
            >
              <span style={{
                width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: 700, flexShrink: 0,
                backgroundColor: selected === i ? "#C96442" : "#FAF8F5",
                color: selected === i ? "#fff" : "#99958C",
                border: selected === i ? "none" : "1px solid #E8E5DF",
              }}>
                {["A", "B", "C", "D"][i]}
              </span>
              {opt}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleNext}
            disabled={selected === null || submitting}
            style={{
              backgroundColor: selected !== null && !submitting ? "#C96442" : "#D5D0C7",
              color: "#fff", padding: "16px 40px", borderRadius: "999px", fontSize: "15px", fontWeight: 600,
              border: "none", cursor: selected !== null && !submitting ? "pointer" : "not-allowed",
              transition: "all 0.15s ease",
              boxShadow: selected !== null && !submitting ? "0 4px 20px rgba(201,100,66,0.35)" : "none",
            }}
          >
            {submitting ? "Calcul en cours…" : current + 1 === questions.length ? "Voir mes résultats →" : "Question suivante →"}
          </button>
        </div>

        {/* PROGRESS SEGMENTS — 10 blocs de 4 questions */}
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginTop: "40px" }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const segStart = i * 4;
            const segEnd = (i + 1) * 4;
            const isDone = current >= segEnd;
            const isActive = current >= segStart && current < segEnd;
            return (
              <div key={i} style={{
                height: "4px",
                flex: 1,
                maxWidth: "48px",
                borderRadius: "2px",
                backgroundColor: isDone ? "#C96442" : isActive ? "#D4835E" : "#D5D0C7",
                opacity: isDone ? 0.65 : 1,
                transition: "all 0.3s ease",
              }} />
            );
          })}
        </div>
        <p style={{ textAlign: "center", fontSize: "11px", color: "#99958C", marginTop: "10px", letterSpacing: "0.5px" }}>
          {current + 1} / {questions.length}
        </p>
      </main>
    </div>
  );
}
