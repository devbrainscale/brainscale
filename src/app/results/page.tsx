"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type ChoiceKey = "A" | "B" | "C" | "D";

const TOTAL_QUESTIONS = 20;
const IQ_MIN = 85;
const IQ_MAX = 145;

// Correct answer key for the 20 questions in `/test`.
const ANSWER_KEY: ChoiceKey[] = [
  "C", // q1: 2,6,12,20,30,42
  "C", // q2: Fibonacci -> 13
  "D", // q3: circle is not polygon
  "D", // q4: fork -> eating
  "B", // q5: 3^n -> 243
  "A", // q6: blops -> naps
  "C", // q7: gaps +2,+3,+4,+5 -> +6 => V
  "C", // q8: rock -> sand (weathering)
  "C", // q9: 3x3x3, face-centers: 6*(n-2)^2 = 6
  "B", // q10: +3,-2 repeating -> 10
  "B", // q11: squares -> 49
  "A", // q12: captain -> ship
  "B", // q13: overtake 2nd -> now 2nd
  "C", // q14: squares -> 36
  "C", // q15: carrot is vegetable
  "A", // q16: N rotated 90° resembles Z-ish
  "B", // q17: password -> account
  "A", // q18: $0.05
  "C", // q19: differences double: +2,+4,+8,+16,+32 => 67
  "A", // q20: foot -> sock
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function getCategory(iq: number) {
  if (iq >= 130) return "Gifted";
  if (iq >= 120) return "Superior";
  if (iq >= 110) return "Above Average";
  if (iq >= 100) return "Average";
  return "Below Average";
}

function scoreFromCorrect(correct: number) {
  // Linear mapping: 0 -> 85, 20 -> 145 (range 60 => +3 per correct).
  const raw = IQ_MIN + correct * ((IQ_MAX - IQ_MIN) / TOTAL_QUESTIONS);
  return clamp(Math.round(raw), IQ_MIN, IQ_MAX);
}

function parseAnswers(ans: string | null) {
  if (!ans) return null;
  const cleaned = ans.trim().toUpperCase();
  if (!cleaned) return null;
  const chars = cleaned.split("").slice(0, TOTAL_QUESTIONS);
  const parsed: (ChoiceKey | null)[] = chars.map((c) => {
    if (c === "A" || c === "B" || c === "C" || c === "D") return c;
    return null;
  });
  return parsed;
}

function meterPct(iq: number) {
  return clamp(((iq - IQ_MIN) / (IQ_MAX - IQ_MIN)) * 100, 0, 100);
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const ansParam = searchParams.get("ans");

  const parsed = useMemo(() => parseAnswers(ansParam), [ansParam]);

  const correctCount = useMemo(() => {
    if (!parsed) return null;
    let c = 0;
    for (let i = 0; i < TOTAL_QUESTIONS; i += 1) {
      if (parsed[i] && parsed[i] === ANSWER_KEY[i]) c += 1;
    }
    return c;
  }, [parsed]);

  const finalIq = useMemo(() => {
    if (correctCount === null) return null;
    return scoreFromCorrect(correctCount);
  }, [correctCount]);

  const category = useMemo(() => {
    if (finalIq === null) return null;
    return getCategory(finalIq);
  }, [finalIq]);

  const [animatedIq, setAnimatedIq] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (finalIq === null) return;

    const durationMs = 900;
    const start = performance.now();
    const from = 0;
    const to = finalIq;

    const tick = (now: number) => {
      const t = clamp((now - start) / durationMs, 0, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedIq(Math.round(from + (to - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [finalIq]);

  const [copied, setCopied] = useState(false);

  const shareText = useMemo(() => {
    if (finalIq === null || category === null || correctCount === null) return "";
    return `My BrainScale IQ result: ${finalIq} (${category}) — ${correctCount}/${TOTAL_QUESTIONS} correct.`;
  }, [finalIq, category, correctCount]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // ignore
    }
  };

  const pct = finalIq === null ? 0 : meterPct(finalIq);

  const interpretation = useMemo(() => {
    if (finalIq === null || category === null) return "";
    if (category === "Below Average") {
      return "A score in this range is below the population mean (IQ 100). In standardized testing terms, it can reflect performance that benefits from more time, clearer strategy, or practice with unfamiliar problem types. Remember that a single short assessment is only one snapshot of ability.";
    }
    if (category === "Average") {
      return "A score in this range places you within one standard deviation of the population mean (IQ 100). Approximately 68% of adults score between 85 and 115 on standardized IQ measures. Day-to-day factors like sleep, stress, and pacing can meaningfully affect results.";
    }
    if (category === "Above Average") {
      return "A score in this range suggests performance above the population mean on this brief assessment. On standardized IQ measures, this range is commonly associated with strong reasoning efficiency and pattern learning. Consistency across different test formats is the best indicator of a stable ability estimate.";
    }
    if (category === "Superior") {
      return "A score in this range indicates notably strong performance relative to the population mean. On standardized IQ measures, scores here are typically well above average and often reflect high efficiency in pattern discovery and rule application. This result is best interpreted as an estimate, not a diagnosis.";
    }
    return "A score in this range is often described as exceptional on standardized IQ measures. It suggests very strong performance on reasoning and pattern-based tasks relative to the general population. For higher confidence, compare results across multiple validated assessments and testing conditions.";
  }, [finalIq, category]);

  const domains = useMemo(() => {
    if (finalIq === null) {
      return [
        { name: "Fluid Reasoning", pct: 0 },
        { name: "Working Memory", pct: 0 },
        { name: "Processing Speed", pct: 0 },
        { name: "Verbal Comprehension", pct: 0 },
      ];
    }
    const base = clamp(((finalIq - IQ_MIN) / (IQ_MAX - IQ_MIN)) * 100, 0, 100);
    return [
      { name: "Fluid Reasoning", pct: clamp(base + 6, 0, 100) },
      { name: "Working Memory", pct: clamp(base - 4, 0, 100) },
      { name: "Processing Speed", pct: clamp(base - 10, 0, 100) },
      { name: "Verbal Comprehension", pct: clamp(base + 2, 0, 100) },
    ];
  }, [finalIq]);

  return (
    <div className="min-h-dvh bg-white text-[#0f172a] font-sans">
      {/* Top bar */}
      <header className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto flex max-w-[900px] items-center justify-between px-4 py-5 sm:px-6">
          <a
            href="/"
            className="rounded-md px-1 py-1 font-serif text-base font-semibold tracking-tight text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/25"
          >
            BrainScale
          </a>

          <a
            href="/test"
            className="text-sm font-semibold text-[#1d4ed8] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/25"
          >
            Take the test again →
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
        <section className="mx-auto max-w-[800px]">
          {/* Score section */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-10">
            <div className="text-[11px] font-semibold tracking-[0.14em] text-slate-500">
              <span className="uppercase">Your results</span>
            </div>

            {finalIq === null || correctCount === null || category === null ? (
              <div className="mt-6">
                <h1 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                  No results found
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                  Your answers weren’t included in the link. Take the assessment
                  to generate your results.
                </p>
                <div className="mt-6">
                  <a
                    href="/test"
                    className="inline-flex items-center justify-center rounded-lg bg-[#1d4ed8] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/25"
                  >
                    Take the assessment →
                  </a>
                </div>
              </div>
            ) : (
              <>
                <h1 className="mt-5 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                  Your Estimated IQ Score
                </h1>

                <div className="mt-6">
                  <div className="font-serif text-6xl font-semibold tracking-tight text-[#1d4ed8] sm:text-7xl">
                    {animatedIq}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-600">
                    {category}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    {correctCount} out of {TOTAL_QUESTIONS} correct answers
                  </div>
                </div>

                {/* Gauge */}
                <div className="mt-8">
                  <div className="h-2 w-full rounded-full bg-[#e2e8f0]">
                    <div
                      className="h-2 rounded-full bg-[#1d4ed8] transition-[width] duration-300"
                      style={{ width: `${pct}%` }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-5 text-xs text-slate-500">
                    <span className="text-left">{IQ_MIN}</span>
                    <span className="text-center">100</span>
                    <span className="text-center">115</span>
                    <span className="text-center">130</span>
                    <span className="text-right">{IQ_MAX}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Interpretation + domains */}
          {finalIq !== null && correctCount !== null && category !== null ? (
            <div className="mt-6 grid gap-6">
              <div className="rounded-2xl border border-[#e2e8f0] bg-[#f9fafb] p-6 sm:p-8">
                <h2 className="font-serif text-xl font-semibold tracking-tight">
                  What This Score Means
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                  {interpretation}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {domains.map((d) => (
                  <div
                    key={d.name}
                    className="rounded-2xl border border-[#e2e8f0] bg-white p-5"
                  >
                    <div className="text-sm font-semibold text-[#0f172a]">
                      {d.name}
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-[#e2e8f0]">
                      <div
                        className="h-2 rounded-full bg-[#1d4ed8]"
                        style={{ width: `${d.pct}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      Estimated performance (illustrative)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Share section */}
          <div className="mt-10 border-t border-[#e2e8f0] pt-8">
            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-serif text-xl font-semibold tracking-tight">
                    Share Your Result
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Copy a short summary and share it anywhere.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onCopy}
                  disabled={!shareText}
                  className={[
                    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/25",
                    shareText
                      ? "border border-[#1d4ed8] bg-white text-[#1d4ed8] hover:bg-[#eff6ff]"
                      : "cursor-not-allowed border border-[#e2e8f0] bg-white text-slate-400",
                  ].join(" ")}
                >
                  {copied ? "Copied" : "Copy to clipboard"}
                </button>
              </div>
              <div className="mt-4 rounded-xl border border-[#e2e8f0] bg-white p-4 text-sm text-slate-700">
                {shareText || "Complete the test to generate share text."}
              </div>
            </div>
          </div>

          {/* Premium teaser */}
          <div className="mt-6 rounded-2xl border border-dashed border-[#e2e8f0] bg-[#f9fafb] p-6 sm:p-8">
            <div className="text-[11px] font-semibold tracking-[0.14em] text-slate-500">
              <span className="uppercase">Detailed analysis — coming soon</span>
            </div>
            <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight">
              Unlock Your Full Cognitive Profile
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              We’re building a more detailed report with explanations, domain
              breakdowns, and personalized practice recommendations.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                "Cognitive profile breakdown",
                "Question-by-question review",
                "Personalized improvement plan",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded-xl border border-[#e2e8f0] bg-white p-4 text-sm text-slate-700 opacity-70 blur-[0.6px]"
                >
                  {t}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="cursor-not-allowed rounded-lg bg-[#e2e8f0] px-5 py-2.5 text-sm font-semibold text-slate-500"
                aria-disabled="true"
              >
                Join the waitlist (coming soon)
              </button>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-10 text-center">
            <a
              href="/test"
              className="inline-flex items-center justify-center rounded-lg bg-[#1d4ed8] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/25"
            >
              Take the Assessment Again
            </a>
            <div className="mt-2 text-sm text-slate-500">
              Free • Anonymous • Results in 15 minutes
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-gray-500">Loading results...</p>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}

