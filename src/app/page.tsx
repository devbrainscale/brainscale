export default function Home() {
  return (
    <div className="min-h-dvh bg-[#0a0f1e] text-white">
      {/* Subtle background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#3b82f6]/20 blur-3xl" />
        <div className="absolute top-28 right-[-160px] h-[520px] w-[520px] rounded-full bg-[#8b5cf6]/18 blur-3xl" />
        <div className="absolute bottom-[-220px] left-[-160px] h-[520px] w-[520px] rounded-full bg-[#3b82f6]/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_10%,rgba(59,130,246,0.10),transparent_55%),radial-gradient(900px_600px_at_90%_35%,rgba(139,92,246,0.10),transparent_60%),radial-gradient(900px_600px_at_10%_80%,rgba(59,130,246,0.08),transparent_55%)]" />
      </div>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0f1e]/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
            aria-label="BrainScale home"
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#3b82f6]/30 to-[#8b5cf6]/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative text-sm font-semibold tracking-tight text-white">
                BS
              </span>
            </span>
            <span className="text-lg font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                BrainScale
              </span>
            </span>
          </a>

          <a
            href="/test"
            className="inline-flex items-center justify-center rounded-full bg-[#3b82f6] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_18px_40px_-18px_rgba(59,130,246,0.75)] transition hover:bg-[#3b82f6]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
          >
            Start Test
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        {/* Hero */}
        <section className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#3b82f6]" />
              Free IQ & cognitive tests
              <span className="text-white/40">•</span>
              Instant results
            </div>

            <h1 className="mt-6 text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block">Discover Your True Intelligence</span>
              <span className="mt-3 block bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent">
                In minutes, not months.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-white/75 sm:text-lg">
              Take our scientifically-designed IQ test — free, instant results,
              no registration required
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/test"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_26px_60px_-30px_rgba(59,130,246,0.85)] transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
              >
                Start Free Test <span className="ml-2">→</span>
              </a>
              <div className="text-sm text-white/60">
                No account. No tracking. Just your results.
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-[#3b82f6]"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2l3 7 7 .5-5.5 4.6 1.8 7.4L12 18l-6.3 3.5 1.8-7.4L2 9.5 9 9l3-7z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold">50,000+ tests taken</div>
                  <div className="text-xs text-white/60">Trusted globally</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-[#8b5cf6]"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 12l1.8 1.8L15 10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold">Validated by experts</div>
                  <div className="text-xs text-white/60">Designed for reliability</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-[#3b82f6]"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2a7 7 0 00-7 7v4a5 5 0 0010 0V9a3 3 0 00-6 0v4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 21h8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold">100% free & anonymous</div>
                  <div className="text-xs text-white/60">Privacy-first by default</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel / visual */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <div className="absolute inset-0 bg-[radial-gradient(700px_300px_at_40%_20%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(700px_300px_at_60%_80%,rgba(139,92,246,0.14),transparent_60%)]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/85">
                    Today’s snapshot
                  </div>
                  <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60 ring-1 ring-white/10">
                    Live
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-[#0a0f1e]/40 p-4">
                    <div className="text-xs text-white/60">Average time</div>
                    <div className="mt-2 text-2xl font-bold tracking-tight">
                      11m
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                      <div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#0a0f1e]/40 p-4">
                    <div className="text-xs text-white/60">Completion rate</div>
                    <div className="mt-2 text-2xl font-bold tracking-tight">
                      93%
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                      <div className="h-2 w-[93%] rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6]" />
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-[#0a0f1e]/40 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">Your strengths</div>
                    <div className="text-xs text-white/60">Sample preview</div>
                  </div>
                  <div className="mt-3 space-y-3">
                    {[
                      { label: "Pattern recognition", value: 86, color: "from-[#3b82f6] to-[#8b5cf6]" },
                      { label: "Working memory", value: 78, color: "from-[#8b5cf6] to-[#3b82f6]" },
                      { label: "Processing speed", value: 72, color: "from-[#3b82f6] to-[#3b82f6]" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/70">{item.label}</span>
                          <span className="font-medium text-white/70">
                            {item.value}%
                          </span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/65">
                    Results are generated instantly after you finish—no signup required.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-14 sm:mt-16 lg:mt-20">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Choose your test
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              Three short, focused assessments designed to measure core cognitive
              abilities—fast, fair, and easy to complete.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <a
              href="/test/iq"
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#3b82f6]/25 blur-3xl" />
              </div>
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center rounded-full bg-[#3b82f6]/15 px-3 py-1 text-xs font-semibold text-[#3b82f6] ring-1 ring-[#3b82f6]/25">
                      Most popular
                    </div>
                    <h3 className="mt-3 text-lg font-bold tracking-tight">
                      Certified IQ Test
                    </h3>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5 text-white/80"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 2h8v3h3v17H5V5h3V2z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 12h6M9 16h6M9 8h6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/70">
                  A balanced, comprehensive IQ assessment optimized for clarity
                  and consistency.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-[#0a0f1e]/40 px-3 py-1 text-xs text-white/70">
                    15 min
                  </span>
                  <span className="rounded-full border border-white/10 bg-[#0a0f1e]/40 px-3 py-1 text-xs text-white/70">
                    40 questions
                  </span>
                  <span className="rounded-full border border-white/10 bg-[#0a0f1e]/40 px-3 py-1 text-xs text-white/70">
                    Instant score
                  </span>
                </div>

                <div className="mt-7 inline-flex items-center text-sm font-semibold text-white">
                  Start <span className="ml-2 text-white/60">→</span>
                </div>
              </div>
            </a>

            <a
              href="/test/memory-logic"
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#8b5cf6]/22 blur-3xl" />
              </div>
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center rounded-full bg-[#8b5cf6]/15 px-3 py-1 text-xs font-semibold text-[#8b5cf6] ring-1 ring-[#8b5cf6]/25">
                      Cognitive skills
                    </div>
                    <h3 className="mt-3 text-lg font-bold tracking-tight">
                      Memory &amp; Logic
                    </h3>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5 text-white/80"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 7a4 4 0 118 0v1h1a2 2 0 012 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2v-9a2 2 0 012-2h1V7z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 12h4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/70">
                  A fast set of challenges to evaluate recall, reasoning, and
                  structured thinking.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-[#0a0f1e]/40 px-3 py-1 text-xs text-white/70">
                    10 min
                  </span>
                  <span className="rounded-full border border-white/10 bg-[#0a0f1e]/40 px-3 py-1 text-xs text-white/70">
                    Logic puzzles
                  </span>
                  <span className="rounded-full border border-white/10 bg-[#0a0f1e]/40 px-3 py-1 text-xs text-white/70">
                    Memory drills
                  </span>
                </div>

                <div className="mt-7 inline-flex items-center text-sm font-semibold text-white">
                  Start <span className="ml-2 text-white/60">→</span>
                </div>
              </div>
            </a>

            <a
              href="/test/processing-speed"
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#3b82f6]/20 blur-3xl" />
              </div>
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/75 ring-1 ring-white/10">
                      Quick &amp; focused
                    </div>
                    <h3 className="mt-3 text-lg font-bold tracking-tight">
                      Processing Speed
                    </h3>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5 text-white/80"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 22a9 9 0 119-9"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 7v5l4 2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 12h-3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/70">
                  Timed tasks designed to measure how quickly you recognize,
                  compare, and decide.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-[#0a0f1e]/40 px-3 py-1 text-xs text-white/70">
                    8 min
                  </span>
                  <span className="rounded-full border border-white/10 bg-[#0a0f1e]/40 px-3 py-1 text-xs text-white/70">
                    Timed rounds
                  </span>
                  <span className="rounded-full border border-white/10 bg-[#0a0f1e]/40 px-3 py-1 text-xs text-white/70">
                    Focus metrics
                  </span>
                </div>

                <div className="mt-7 inline-flex items-center text-sm font-semibold text-white">
                  Start <span className="ml-2 text-white/60">→</span>
                </div>
              </div>
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>© 2026 BrainScale</div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="/privacy"
              className="transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e] rounded"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e] rounded"
            >
              Terms
            </a>
            <a
              href="/contact"
              className="transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e] rounded"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
