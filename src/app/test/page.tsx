"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ChoiceKey = "A" | "B" | "C" | "D";

type Question = {
  id: string;
  category:
    | "Logical sequence"
    | "Pattern recognition"
    | "Analogy"
    | "Spatial reasoning"
    | "Numerical series";
  prompt: string;
  choices: { key: ChoiceKey; text: string }[];
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    category: "Numerical series",
    prompt: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
    choices: [
      { key: "A", text: "40" },
      { key: "B", text: "41" },
      { key: "C", text: "42" },
      { key: "D", text: "44" },
    ],
  },
  {
    id: "q2",
    category: "Logical sequence",
    prompt: "Which number completes the pattern? 1, 1, 2, 3, 5, 8, ?",
    choices: [
      { key: "A", text: "11" },
      { key: "B", text: "12" },
      { key: "C", text: "13" },
      { key: "D", text: "15" },
    ],
  },
  {
    id: "q3",
    category: "Pattern recognition",
    prompt:
      "Choose the option that does NOT belong: Triangle, Square, Pentagon, Circle",
    choices: [
      { key: "A", text: "Triangle" },
      { key: "B", text: "Square" },
      { key: "C", text: "Pentagon" },
      { key: "D", text: "Circle" },
    ],
  },
  {
    id: "q4",
    category: "Analogy",
    prompt: "Book is to Reading as Fork is to:",
    choices: [
      { key: "A", text: "Drawing" },
      { key: "B", text: "Writing" },
      { key: "C", text: "Stirring" },
      { key: "D", text: "Eating" },
    ],
  },
  {
    id: "q5",
    category: "Numerical series",
    prompt: "Find the next number: 3, 9, 27, 81, ?",
    choices: [
      { key: "A", text: "162" },
      { key: "B", text: "243" },
      { key: "C", text: "324" },
      { key: "D", text: "729" },
    ],
  },
  {
    id: "q6",
    category: "Logical sequence",
    prompt: "If ALL BLOPS are RIBS and ALL RIBS are NAPS, then ALL BLOPS are:",
    choices: [
      { key: "A", text: "NAPS" },
      { key: "B", text: "BLOPS" },
      { key: "C", text: "RIBS" },
      { key: "D", text: "None of these" },
    ],
  },
  {
    id: "q7",
    category: "Pattern recognition",
    prompt:
      "Which letter comes next in the sequence? A, C, F, J, O, ?",
    choices: [
      { key: "A", text: "T" },
      { key: "B", text: "U" },
      { key: "C", text: "V" },
      { key: "D", text: "W" },
    ],
  },
  {
    id: "q8",
    category: "Analogy",
    prompt: "Ice is to Water as Rock is to:",
    choices: [
      { key: "A", text: "Lava" },
      { key: "B", text: "Stone" },
      { key: "C", text: "Sand" },
      { key: "D", text: "Metal" },
    ],
  },
  {
    id: "q9",
    category: "Spatial reasoning",
    prompt:
      "A cube is painted on all six faces and then cut into 27 equal smaller cubes. How many small cubes have paint on exactly one face?",
    choices: [
      { key: "A", text: "6" },
      { key: "B", text: "8" },
      { key: "C", text: "12" },
      { key: "D", text: "18" },
    ],
  },
  {
    id: "q10",
    category: "Numerical series",
    prompt: "Find the missing number: 7, 10, 8, 11, 9, 12, ?",
    choices: [
      { key: "A", text: "9" },
      { key: "B", text: "10" },
      { key: "C", text: "11" },
      { key: "D", text: "13" },
    ],
  },
  {
    id: "q11",
    category: "Pattern recognition",
    prompt:
      "Which option completes the series? 4, 9, 16, 25, 36, ?",
    choices: [
      { key: "A", text: "45" },
      { key: "B", text: "49" },
      { key: "C", text: "51" },
      { key: "D", text: "64" },
    ],
  },
  {
    id: "q12",
    category: "Analogy",
    prompt: "Pilot is to Airplane as Captain is to:",
    choices: [
      { key: "A", text: "Ship" },
      { key: "B", text: "Car" },
      { key: "C", text: "Bicycle" },
      { key: "D", text: "Train" },
    ],
  },
  {
    id: "q13",
    category: "Logical sequence",
    prompt:
      "In a race, you overtake the person in 2nd place. What position are you in now?",
    choices: [
      { key: "A", text: "1st" },
      { key: "B", text: "2nd" },
      { key: "C", text: "3rd" },
      { key: "D", text: "4th" },
    ],
  },
  {
    id: "q14",
    category: "Numerical series",
    prompt: "Find the next number: 1, 4, 9, 16, 25, ?",
    choices: [
      { key: "A", text: "30" },
      { key: "B", text: "32" },
      { key: "C", text: "36" },
      { key: "D", text: "49" },
    ],
  },
  {
    id: "q15",
    category: "Pattern recognition",
    prompt:
      "Which word is the odd one out? Apple, Banana, Carrot, Mango",
    choices: [
      { key: "A", text: "Apple" },
      { key: "B", text: "Banana" },
      { key: "C", text: "Carrot" },
      { key: "D", text: "Mango" },
    ],
  },
  {
    id: "q16",
    category: "Spatial reasoning",
    prompt:
      "If you rotate the letter 'N' 90° clockwise, it most closely resembles:",
    choices: [
      { key: "A", text: "Z" },
      { key: "B", text: "S" },
      { key: "C", text: "H" },
      { key: "D", text: "It stays the same" },
    ],
  },
  {
    id: "q17",
    category: "Analogy",
    prompt: "Key is to Lock as Password is to:",
    choices: [
      { key: "A", text: "Door" },
      { key: "B", text: "Account" },
      { key: "C", text: "Computer" },
      { key: "D", text: "Internet" },
    ],
  },
  {
    id: "q18",
    category: "Logical sequence",
    prompt:
      "A bat and a ball cost $1.10 total. The bat costs $1.00 more than the ball. How much does the ball cost?",
    choices: [
      { key: "A", text: "$0.05" },
      { key: "B", text: "$0.10" },
      { key: "C", text: "$0.15" },
      { key: "D", text: "$0.20" },
    ],
  },
  {
    id: "q19",
    category: "Numerical series",
    prompt: "Find the next number: 5, 7, 11, 19, 35, ?",
    choices: [
      { key: "A", text: "51" },
      { key: "B", text: "67" },
      { key: "C", text: "69" },
      { key: "D", text: "71" },
    ],
  },
  {
    id: "q20",
    category: "Pattern recognition",
    prompt:
      "Which pair best completes the analogy? Hand : Glove :: Foot : ?",
    choices: [
      { key: "A", text: "Sock" },
      { key: "B", text: "Shoe" },
      { key: "C", text: "Boot" },
      { key: "D", text: "Lace" },
    ],
  },
];

const TOTAL_QUESTIONS = 20;
const FADE_MS = 180;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function serializeAnswers(
  questions: Question[],
  selected: Record<string, ChoiceKey>,
) {
  return questions
    .map((q) => selected[q.id] ?? "-")
    .join("")
    .slice(0, TOTAL_QUESTIONS);
}

export default function TestPage() {
  const router = useRouter();

  const questions = useMemo(() => {
    // Defensive: ensure we always have exactly 20 questions rendered.
    return QUESTIONS.slice(0, TOTAL_QUESTIONS);
  }, []);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Record<string, ChoiceKey>>({});
  const [isFading, setIsFading] = useState(false);

  const current = questions[index];
  const selectedKey = current ? selected[current.id] : undefined;

  const progress = clamp(((index + 1) / TOTAL_QUESTIONS) * 100, 0, 100);

  const onPick = (key: ChoiceKey) => {
    if (!current) return;
    setSelected((prev) => ({ ...prev, [current.id]: key }));
  };

  const goNext = () => {
    if (!current) return;
    if (!selected[current.id]) return;

    if (index >= TOTAL_QUESTIONS - 1) {
      const ans = serializeAnswers(questions, selected);
      router.push(`/results?ans=${encodeURIComponent(ans)}`);
      return;
    }

    setIsFading(true);
    window.setTimeout(() => {
      setIndex((i) => i + 1);
      setIsFading(false);
    }, FADE_MS);
  };

  if (!current) {
    return (
      <div className="min-h-dvh bg-white text-[#0f172a]">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 text-sm text-slate-600">
            Test is unavailable.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-white text-[#0f172a] font-sans">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto flex max-w-[900px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a
            href="/"
            className="rounded-md px-1 py-1 font-serif text-base font-semibold tracking-tight text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/30"
            aria-label="Back to BrainScale"
          >
            BrainScale
          </a>

          <div className="text-center text-[11px] font-semibold tracking-[0.14em] text-slate-500">
            <span className="uppercase">Question</span>{" "}
            <span className="text-slate-600">{index + 1}</span>{" "}
            <span className="text-slate-400">of</span>{" "}
            <span className="text-slate-600">{TOTAL_QUESTIONS}</span>
          </div>

          <div
            className="h-1 w-[140px] overflow-hidden rounded-full bg-[#e2e8f0]"
            aria-hidden="true"
          >
            <div
              className="h-1 bg-[#1d4ed8] transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-[#e2e8f0]" aria-hidden="true">
          <div
            className="h-1 bg-[#1d4ed8] transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
        <div
          className={[
            "transition-opacity duration-300",
            isFading ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          {/* Question card */}
          <div className="mx-auto max-w-[680px] rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="text-[11px] font-semibold tracking-[0.14em] text-slate-500">
                <span className="uppercase">
                  {current.category.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-slate-500">Choose the best answer</div>
            </div>

            <h1 className="mt-5 text-pretty font-serif text-2xl font-semibold leading-8 tracking-tight text-[#0f172a] sm:text-3xl">
              {current.prompt}
            </h1>

            <div className="mt-7 grid gap-3">
              {current.choices.map((c) => {
                const active = selectedKey === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => onPick(c.key)}
                    className={[
                      "group flex w-full items-start gap-4 rounded-xl border px-4 py-4 text-left transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/25",
                      active
                        ? "border-[#1d4ed8] bg-[#eff6ff]"
                        : "border-[#e2e8f0] bg-white hover:border-[#1d4ed8]",
                    ].join(" ")}
                    aria-pressed={active}
                  >
                    <span
                      className={[
                        "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors",
                        active
                          ? "bg-[#1d4ed8] text-white"
                          : "bg-[#f1f5f9] text-slate-600 group-hover:bg-[#1d4ed8] group-hover:text-white",
                      ].join(" ")}
                    >
                      {c.key}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm leading-6 text-[#0f172a] sm:text-base">
                        {c.text}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mx-auto mt-6 flex max-w-[680px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-slate-500">
              Your answers are private and not stored
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={!selectedKey || isFading}
              className={[
                "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/25",
                !selectedKey || isFading
                  ? "cursor-not-allowed bg-[#e2e8f0] text-slate-500"
                  : "bg-[#1d4ed8] text-white hover:bg-[#1d4ed8]/95",
              ].join(" ")}
            >
              {index === TOTAL_QUESTIONS - 1 ? "Finish →" : "Next →"}
            </button>
          </div>

          {/* Footer tip */}
          <div className="mx-auto mt-10 max-w-[680px] text-center text-xs text-slate-500">
            Tip: Trust your instincts — don&apos;t overthink each question.
          </div>
        </div>
      </main>
    </div>
  );
}

