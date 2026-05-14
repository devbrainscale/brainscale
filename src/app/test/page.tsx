"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  { id: 1, question: "Which number comes next in the sequence: 2, 4, 8, 16, ?", options: ["24", "32", "28", "20"], answer: 1 },
  { id: 2, question: "If all Bloops are Razzies, and all Razzies are Lazzies, then all Bloops are definitely:", options: ["Not Lazzies", "Lazzies", "Not Razzies", "None of these"], answer: 1 },
  { id: 3, question: "Which shape completes the pattern? △ ○ □ △ ○ ?", options: ["△", "○", "□", "◇"], answer: 2 },
  { id: 4, question: "A clock shows 3:15. What is the angle between the hour and minute hands?", options: ["0°", "7.5°", "15°", "22.5°"], answer: 1 },
  { id: 5, question: "Which number is missing: 1, 1, 2, 3, 5, 8, ?, 21", options: ["11", "12", "13", "14"], answer: 2 },
  { id: 6, question: "If you rearrange 'CIFAIPC', you get the name of a:", options: ["City", "Animal", "Ocean", "Country"], answer: 2 },
  { id: 7, question: "Complete the analogy: Book is to Reading as Fork is to:", options: ["Kitchen", "Eating", "Cooking", "Spoon"], answer: 1 },
  { id: 8, question: "What comes next: 3, 6, 11, 18, 27, ?", options: ["36", "38", "42", "40"], answer: 1 },
  { id: 9, question: "If it takes 5 machines 5 minutes to make 5 widgets, how long does it take 100 machines to make 100 widgets?", options: ["100 min", "50 min", "5 min", "10 min"], answer: 2 },
  { id: 10, question: "Which word does not belong: Apple, Mango, Carrot, Banana", options: ["Apple", "Mango", "Carrot", "Banana"], answer: 2 },
  { id: 11, question: "A father is 4 times as old as his son. In 20 years, he'll be twice as old. How old is the son now?", options: ["5", "10", "15", "20"], answer: 1 },
  { id: 12, question: "Which figure has the most sides: Pentagon, Heptagon, Hexagon, Octagon?", options: ["Pentagon", "Heptagon", "Hexagon", "Octagon"], answer: 3 },
  { id: 13, question: "Complete the sequence: Z, X, V, T, ?", options: ["S", "R", "Q", "P"], answer: 1 },
  { id: 14, question: "If ROAD is coded as 5231, how is DOOR coded?", options: ["1225", "2335", "1335", "2235"], answer: 0 },
  { id: 15, question: "Which number is the odd one out: 16, 25, 36, 48, 64?", options: ["25", "36", "48", "64"], answer: 2 },
  { id: 16, question: "A train travels 60 km in 45 minutes. What is its speed in km/h?", options: ["70", "75", "80", "85"], answer: 2 },
  { id: 17, question: "How many squares are in a 3×3 grid (including overlapping squares)?", options: ["9", "12", "14", "16"], answer: 2 },
  { id: 18, question: "What is the next number: 1, 4, 9, 16, 25, ?", options: ["30", "36", "40", "49"], answer: 1 },
  { id: 19, question: "If you fold a piece of paper in half 3 times, how many layers are there?", options: ["6", "8", "9", "12"], answer: 1 },
  { id: 20, question: "Complete: AZ, BY, CX, DW, ?", options: ["EV", "EU", "FV", "EW"], answer: 0 },
  { id: 21, question: "Which is heaviest: 1kg of gold, 1kg of feathers, or 1kg of iron?", options: ["Gold", "Feathers", "Iron", "All equal"], answer: 3 },
  { id: 22, question: "Solve: If 2+3=10, 3+4=21, 4+5=36, then 5+6=?", options: ["55", "56", "57", "60"], answer: 0 },
  { id: 23, question: "Which comes next in the series: 2, 3, 5, 7, 11, 13, ?", options: ["15", "16", "17", "18"], answer: 2 },
  { id: 24, question: "A bat and a ball cost $1.10. The bat costs $1 more than the ball. How much is the ball?", options: ["$0.10", "$0.05", "$0.15", "$0.20"], answer: 1 },
  { id: 25, question: "If you have a 3-liter and a 5-liter jug, how do you measure exactly 4 liters?", options: ["Fill 5L, pour into 3L, empty 3L, pour remainder", "Fill 3L twice into 5L", "Both A and B work", "It's impossible"], answer: 2 },
  { id: 26, question: "What is the missing number: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], answer: 1 },
  { id: 27, question: "Which does NOT belong in this group: Jupiter, Saturn, Earth, Moon?", options: ["Jupiter", "Saturn", "Earth", "Moon"], answer: 3 },
  { id: 28, question: "If you count from 1 to 100, how many times does the digit 7 appear?", options: ["10", "11", "20", "21"], answer: 2 },
  { id: 29, question: "Complete: 1, 2, 4, 7, 11, 16, ?", options: ["20", "21", "22", "23"], answer: 2 },
  { id: 30, question: "A store reduces a $200 item by 20%, then increases it by 20%. Final price?", options: ["$200", "$192", "$184", "$196"], answer: 1 },
  { id: 31, question: "Which shape has the fewest lines of symmetry: Square, Rectangle, Equilateral Triangle, Circle?", options: ["Square", "Rectangle", "Equilateral Triangle", "Circle"], answer: 1 },
  { id: 32, question: "What comes next in the sequence: 100, 50, 25, 12.5, ?", options: ["5", "6", "6.25", "7"], answer: 2 },
  { id: 33, question: "Two runners start at the same point. One runs at 8km/h, the other at 12km/h. After 3 hours, how far apart are they?", options: ["10km", "12km", "15km", "20km"], answer: 1 },
  { id: 34, question: "What comes next: 1, 3, 6, 10, 15, 21, ?", options: ["25", "27", "28", "30"], answer: 2 },
  { id: 35, question: "Which is not a prime number: 13, 17, 19, 21?", options: ["13", "17", "19", "21"], answer: 3 },
  { id: 36, question: "If all roses are flowers and some flowers fade quickly, then:", options: ["All roses fade quickly", "Some roses may fade quickly", "No roses fade quickly", "All flowers are roses"], answer: 1 },
  { id: 37, question: "A palindrome reads the same forwards and backwards. Which is a palindrome: LEVEL, RADAR, CIVIC, All of them?", options: ["LEVEL only", "RADAR only", "CIVIC only", "All of them"], answer: 3 },
  { id: 38, question: "What is 15% of 240?", options: ["32", "36", "38", "42"], answer: 1 },
  { id: 39, question: "Complete the analogy: Piano is to Music as Brush is to:", options: ["Canvas", "Art", "Paint", "Painting"], answer: 3 },
  { id: 40, question: "How many faces does a dodecahedron have?", options: ["8", "10", "12", "20"], answer: 2 },
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

export default function TestPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitting, setSubmitting] = useState(false);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  function handleSelect(i: number) {
    setSelected(i);
  }

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
          router.push(`/results?score=${data.score}&correct=${data.correct}&total=${data.total}&sig=${data.sig}`);
        } else {
          // Fallback: use local calculation if API fails
          const iq = calculateIQ(correct);
          router.push(`/results?score=${iq}&correct=${correct}&total=${total}`);
        }
      } catch {
        const iq = calculateIQ(correct);
        router.push(`/results?score=${iq}&correct=${correct}&total=${total}`);
      }
    }
  }

  return (
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>

      {/* HEADER */}
      <header style={{ backgroundColor: "#F7F6F2", borderBottom: "1px solid #E8E5DC", padding: "0 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1825" }}>
            Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
          </span>
          <span style={{ fontSize: "13px", color: "#9896A8", fontWeight: 500 }}>
            Question {current + 1} of {questions.length}
          </span>
        </div>
      </header>

      {/* PROGRESS BAR */}
      <div style={{ height: "3px", backgroundColor: "#E8E5DC" }}>
        <div style={{ height: "100%", backgroundColor: "#5B4FCF", width: `${progress}%`, transition: "width 0.4s ease" }} />
      </div>

      {/* QUESTION CARD */}
      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 24px" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <div style={{ backgroundColor: "#EDE9FF", color: "#5B4FCF", padding: "4px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, letterSpacing: "1px" }}>
            Q{current + 1}
          </div>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#E8E5DC" }} />
          <span style={{ fontSize: "12px", color: "#9896A8" }}>{Math.round(progress)}% complete</span>
        </div>

        <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, color: "#1A1825", lineHeight: 1.4, marginBottom: "40px" }}>
          {q.question}
        </h2>

        <div style={{ display: "grid", gap: "12px", marginBottom: "40px" }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "20px 24px",
                borderRadius: "16px",
                border: selected === i ? "2px solid #5B4FCF" : "1px solid #E8E5DC",
                backgroundColor: selected === i ? "#EDE9FF" : "#fff",
                color: selected === i ? "#3D2FA8" : "#1A1825",
                fontSize: "15px",
                fontWeight: selected === i ? 600 : 400,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                transition: "all 0.15s ease",
                boxShadow: selected === i ? "0 0 0 1px #5B4FCF" : "0 1px 4px rgba(26,24,37,0.05)",
              }}
            >
              <span style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 700,
                flexShrink: 0,
                backgroundColor: selected === i ? "#5B4FCF" : "#F7F6F2",
                color: selected === i ? "#fff" : "#9896A8",
                border: selected === i ? "none" : "1px solid #E8E5DC",
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
              backgroundColor: selected !== null && !submitting ? "#5B4FCF" : "#D4D0C8",
              color: "#fff",
              padding: "16px 40px",
              borderRadius: "999px",
              fontSize: "15px",
              fontWeight: 600,
              border: "none",
              cursor: selected !== null && !submitting ? "pointer" : "not-allowed",
              transition: "all 0.15s ease",
              boxShadow: selected !== null && !submitting ? "0 4px 20px rgba(91,79,207,0.35)" : "none",
            }}
          >
            {submitting ? "Calculating…" : current + 1 === questions.length ? "See My Results →" : "Next Question →"}
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "48px", flexWrap: "wrap" }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "999px",
              backgroundColor: i < current ? "#5B4FCF" : i === current ? "#5B4FCF" : "#D4D0C8",
              opacity: i < current ? 0.5 : 1,
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </main>
    </div>
  );
}