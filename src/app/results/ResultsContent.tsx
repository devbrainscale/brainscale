"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type ChoiceKey = "A" | "B" | "C" | "D";

const TOTAL_QUESTIONS = 20;
const IQ_MIN = 85;
const IQ_MAX = 145;

const ANSWER_KEY: ChoiceKey[] = [
  "C", "C", "D", "D", "B", "A", "C", "C", "C", "B",
  "B", "A", "B", "C", "C", "A", "B", "A", "C", "A",
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
  const raw = IQ_MIN + correct * ((IQ_MAX - IQ_MIN) / TOTAL_QUESTIONS);
  return clamp(Math.round(raw), IQ_MIN, IQ_MAX);
}

function parseAnswers(ans: string | null) {
  if (!ans) return null;
  const cleaned = ans.trim().toUpperCase();
  if (!cleaned) return null;
  const chars = cleaned.split("").slice(0, TOTAL_QUESTIONS);
  return chars.map((c) => {
    if (c === "A" || c === "B" || c === "C" || c === "D") return c as ChoiceKey;
    return null;
  });
}

function meterPct(iq: number) {
  return clamp(((iq - IQ_MIN) / (IQ_MAX - IQ_MIN)) * 100, 0, 100);
}

export function ResultsContent() {
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
    const to = finalIq;
    const tick = (now: number) => {
      const t = clamp((now - start) / durationMs, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedIq(Math.round(to * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [finalIq]);

  const [copied, setCopied] = useState(false);

  const shareText = useMemo(() => {
    if (finalIq === null || category === null || correctCount === null) return "";
    return `My BrainScale IQ result: ${finalIq} (${category}) — ${correctCount}/${TOTAL_QUESTIONS} correct. https://www.brainscale.app`;
  }, [finalIq, category, correctCount]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch { /* ignore */ }
  };

  const pct = finalIq === null ? 0 : meterPct(finalIq);

  return (
    <div className="min-h-dvh bg-white text-[#0f172a]">
      {/* NAVBAR */}
      <header className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          
            href="/"
            className="inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/40"
            aria-label="BrainScale home"
          >
            <span className="h-3.5 w-3.5 rounded-full border border-[#e2e8f0] bg-white" />
            <span className="font-serif text-base font-semibold tracking-tight text-[#0f172a]">
              BrainScale
            </span>
          </a>
          
            href="/test"
            className="inline-flex items-center justify-center border border-[#1d4ed8] bg-[#1d4ed8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/40"
          >
            Take the test again
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-12">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-7">
            <div className="border border-[#e2e8f0] bg-white p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 border border-[#e2e8f0] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#475569]">
                IQ Test Results · BrainScale
              </div>

              {finalIq === null || correctCount === null || category === null ? (
                <div className="mt-6">
                  <h1 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                    No results found
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-[#475569] sm:text-base">
                    Your answers weren't included in the link. Take the test to generate your results.
                  </p>
                  <div className="mt-6">
                    
                      href="/test"
                      className="inline-flex items-center justify-center border border-[#1d4ed8] bg-[#1d4ed8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]/90"
                    >
                      Start Free Test →
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="mt-6 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                    Your estimated IQ score
                  </h1>

                  <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
                    <div className="text-6xl font-black tracking-tight text-[#1d4ed8] sm:text-7xl">
                      {animatedIq}
                    </div>
                    <div className="pb-2">
                      <div className="text-sm font-semibold text-[#0f172a]">{category}</div>
                      <div className="text-xs text-[#475569]">
                        {correctCount} out of {TOTAL_QUESTIONS} correct
                      </div>
                    </div>
                  </div>

                  {/* Gauge */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between text-xs text-[#94a3b8]">
                      <span>{IQ_MIN}</span>
                      <span>{IQ_MAX}</span>
                    </div>
                    <div className="relative mt-2 h-2 w-full bg-[#e2e8f0]">
                      <div
                        className="absolute top-0 left-0 h-2 bg-[#1d4ed8] transition-[width] duration-700"
                        style={{ width: `${pct}%` }}
                      />
                      <div
                        className="absolute top-1/2 h-5 w-1 -translate-y-1/2 bg-[#0f172a]"
                        style={{ left: `calc(${pct}% - 2px)` }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-sm text-[#475569]">
                      This score is computed from your correct answers on a 20-question assessment.
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Share */}
            <div className="mt-4 border border-[#e2e8f0] bg-white p-6 sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-serif text-lg font-semibold tracking-tight">
                    Share your result
                  </h2>
                  <p className="mt-1 text-sm text-[#475569]">
                    Copy a short summary and share it anywhere.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onCopy}
                  disabled={!shareText}
                  className={[
                    "mt-3 inline-flex items-center justify-center border px-5 py-2.5 text-sm font-semibold transition sm:mt-0",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/40",
                    shareText
                      ? "border-[#1d4ed8] bg-[#1d4ed8] text-white hover:bg-[#1d4ed8]/90"
                      : "cursor-not-allowed border-[#e2e8f0] bg-[#f8fafc] text-[#94a3b8]",
                  ].join(" ")}
                >
                  {copied ? "Copied ✓" : "Copy to clipboard"}
                </button>
              </div>
              <div className="mt-4 border border-[#e2e8f0] bg-[#f9fafb] p-4 text-sm text-[#475569]">
                {shareText || "Complete the test to generate share text."}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Premium teaser */}
          <div className="lg:col-span-5">
            <div className="border border-[#e2e8f0] bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-lg font-semibold tracking-tight">
                  See detailed analysis
                </h2>
                <div className="inline-flex items-center border border-[#e2e8f0] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#475569]">
                  Premium
                </div>
              </div>

              <p className="mt-2 text-sm text-[#475569]">
                Unlock deep insights about your performance — strengths, weaknesses, and personalized practice recommendations.
              </p>

              <div className="relative mt-6 overflow-hidden border border-[#e2e8f0]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />

                <div className="p-5 opacity-60 blur-[1.5px]">
                  <div className="grid gap-4">
                    <div className="border border-[#e2e8f0] p-4">
                      <div className="text-xs text-[#94a3b8]">Cognitive profile</div>
                      <div className="mt-2 text-sm font-semibold text-[#0f172a]">
                        Pattern recognition · Working memory · Speed
                      </div>
                      <div className="mt-3 h-1.5 w-full bg-[#e2e8f0]">
                        <div className="h-1.5 w-[78%] bg-[#1d4ed8]" />
                      </div>
                    </div>

                    <div className="border border-[#e2e8f0] p-4">
                      <div className="text-xs text-[#94a3b8]">Question review</div>
                      <div className="mt-2 text-sm font-semibold text-[#0f172a]">
                        See explanations for every item
                      </div>
                      <div className="mt-3 grid grid-cols-5 gap-2">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i} className="h-1.5 bg-[#e2e8f0]" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="border border-[#e2e8f0] bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-[#0f172a]">Locked</div>
                        <div className="mt-1 text-xs text-[#475569]">
                          Upgrade to view full analysis and explanations.
                        </div>
                      </div>
                      <button
                        type="button"
                        className="cursor-not-allowed border border-[#e2e8f0] bg-[#f9fafb] px-4 py-2 text-xs font-semibold text-[#94a3b8]"
                        aria-disabled="true"
                      >
                        Coming soon
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                
                  href="/test"
                  className="inline-flex w-full items-center justify-center border border-[#1d4ed8] bg-[#1d4ed8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/40"
                >
                  Take the test again →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-10 border-t border-[#e2e8f0] pt-8 text-sm text-[#475569]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>© 2026 BrainScale</div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms" },
                { href: "mailto:contact@brainscale.app", label: "Contact" },
              ].map((l) => (
                
                  key={l.href}
                  href={l.href}
                  className="transition hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/30"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}