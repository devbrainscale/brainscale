"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

export default function ResultsPage() {
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

  return (
    <div className="min-h-dvh bg-[#0a0f1e] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#3b82f6]/18 blur-3xl" />
        <div className="absolute top-32 right-[-180px] h-[560px] w-[560px] rounded-full bg-[#8b5cf6]/16 blur-3xl" />
        <div className="absolute bottom-[-260px] left-[-200px] h-[560px] w-[560px] rounded-full bg-[#3b82f6]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(59,130,246,0.10),transparent_55%),radial-gradient(900px_600px_at_90%_35%,rgba(139,92,246,0.10),transparent_60%)]" />
      </div>

      <header className="border-b border-white/10 bg-[#0a0f1e]/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-semibold tracking-tight text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
          >
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
              BS
            </span>
            BrainScale
          </a>

          <a
            href="/test"
            className="inline-flex items-center justify-center rounded-full bg-[#3b82f6] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_18px_40px_-18px_rgba(59,130,246,0.75)] transition hover:bg-[#3b82f6]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
          >
            Take the test again
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0f1e]/40 px-3 py-1 text-xs font-semibold text-white/75">
                IQ Test Results
                <span className="text-white/40">•</span>
                BrainScale
              </div>

              {finalIq === null || correctCount === null || category === null ? (
                <div className="mt-6">
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    No results found
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base">
                    Your answers weren’t included in the link. Take the test to
                    generate your results.
                  </p>
                  <div className="mt-6">
                    <a
                      href="/test"
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_26px_60px_-30px_rgba(59,130,246,0.75)] transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
                    >
                      Start Free Test <span className="ml-2">→</span>
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="mt-6 text-balance text-3xl font-black tracking-tight sm:text-4xl">
                    Your estimated IQ score
                  </h1>

                  <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
                    <div className="text-6xl font-black tracking-tight sm:text-7xl">
                      <span className="bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent">
                        {animatedIq}
                      </span>
                    </div>
                    <div className="pb-2">
                      <div className="text-sm font-semibold text-white/85">
                        {category}
                      </div>
                      <div className="text-xs text-white/55">
                        {correctCount} out of {TOTAL_QUESTIONS} correct
                      </div>
                    </div>
                  </div>

                  {/* Gauge */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>{IQ_MIN}</span>
                      <span>{IQ_MAX}</span>
                    </div>
                    <div className="mt-2 relative h-3 w-full rounded-full bg-white/10">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#3b82f6] opacity-70" />
                      <div
                        className="absolute top-1/2 h-7 w-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_10px_30px_-16px_rgba(255,255,255,0.8)]"
                        style={{ left: `calc(${pct}% - 3px)` }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-sm text-white/65">
                      This score is computed from your correct answers on a
                      20-question assessment.
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Share */}
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">
                    Share your result
                  </h2>
                  <p className="mt-1 text-sm text-white/65">
                    Copy a short summary and share it anywhere.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onCopy}
                  disabled={!shareText}
                  className={[
                    "mt-3 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition sm:mt-0",
                    shareText
                      ? "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white hover:opacity-95"
                      : "cursor-not-allowed bg-white/10 text-white/50",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]",
                  ].join(" ")}
                >
                  {copied ? "Copied" : "Copy to clipboard"}
                </button>
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-[#0a0f1e]/35 p-4 text-sm text-white/75">
                {shareText || "Complete the test to generate share text."}
              </div>
            </div>
          </div>

          {/* Premium teaser */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold tracking-tight">
                  See detailed analysis
                </h2>
                <div className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/70 ring-1 ring-white/10">
                  Premium
                </div>
              </div>

              <p className="mt-2 text-sm text-white/65">
                Unlock deep insights about your performance—strengths,
                weaknesses, and personalized practice recommendations.
              </p>

              <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1e]/35">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1e]/70" />
                <div className="pointer-events-none absolute inset-0 backdrop-blur-sm" />

                <div className="p-5 opacity-80 blur-[1.5px]">
                  <div className="grid gap-4">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs text-white/60">Cognitive profile</div>
                      <div className="mt-2 text-sm font-semibold">
                        Pattern recognition • Working memory • Speed
                      </div>
                      <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                        <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]" />
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs text-white/60">Question review</div>
                      <div className="mt-2 text-sm font-semibold">
                        See explanations for every item
                      </div>
                      <div className="mt-3 grid grid-cols-5 gap-2">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-2 rounded-full bg-white/10"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs text-white/60">Training plan</div>
                      <div className="mt-2 text-sm font-semibold">
                        7-day personalized practice
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
                        <span className="h-2 w-2 rounded-full bg-[#3b82f6]" />
                        Daily drills
                        <span className="text-white/35">•</span>
                        Adaptive difficulty
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="rounded-2xl border border-white/10 bg-[#0a0f1e]/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">Locked</div>
                        <div className="mt-1 text-xs text-white/60">
                          Upgrade to view full analysis and explanations.
                        </div>
                      </div>
                      <button
                        type="button"
                        className="cursor-not-allowed rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/60 ring-1 ring-white/10"
                        aria-disabled="true"
                      >
                        Coming soon
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="/test"
                  className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_26px_60px_-30px_rgba(59,130,246,0.75)] transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
                >
                  Take the test again <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-10 border-t border-white/10 pt-8 text-sm text-white/55">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>© 2026 BrainScale</div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href="/privacy"
                className="rounded transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="rounded transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
              >
                Terms
              </a>
              <a
                href="/contact"
                className="rounded transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

