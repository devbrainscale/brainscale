export default function Home() {
  return (
    <div className="min-h-dvh bg-white text-[#0f172a]">
      {/* SECTION 1 — NAVBAR */}
      <header className="border-b border-[#e2e8f0] bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <a
            href="/"
            className="inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label="BrainScale home"
          >
            <span className="h-3.5 w-3.5 rounded-full border border-[#e2e8f0] bg-white" />
            <span className="font-serif text-base font-semibold tracking-tight text-[#0f172a]">
              BrainScale
            </span>
          </a>

          <div className="hidden items-center gap-7 sm:flex">
            {[
              { href: "/science", label: "The Science" },
              { href: "/about", label: "About" },
              { href: "/test", label: "Sample Test" },
              { href: "/results", label: "Results" },
              { href: "/faq", label: "FAQ" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#475569] transition hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="/test"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1d4ed8] transition hover:text-[#1d4ed8]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Start Assessment <span aria-hidden="true">→</span>
          </a>
        </nav>
      </header>

      {/* SECTION 2 — HERO */}
      <main>
        <section className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-[11px] font-semibold tracking-[0.28em] text-[#1d4ed8]">
              <span className="uppercase">Cognitive Assessment Platform</span>
            </div>

            <h1 className="mt-5 text-balance font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
              Know Your Mind.
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-pretty text-base leading-8 text-[#475569] sm:text-lg">
              A free cognitive reasoning assessment inspired by established
              cognitive science methodology and IQ-style question formats. No
              account. No payment. Instant results.
            </p>

            <div className="mt-5 flex justify-center">
              <span className="inline-flex items-center border border-[#e2e8f0] bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#475569]">
                <span className="uppercase">
                  Indicative assessment — not a clinical diagnosis
                </span>
              </span>
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="/test"
                className="inline-flex items-center justify-center border border-[#1d4ed8] bg-[#1d4ed8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Begin Assessment <span className="ml-2" aria-hidden="true">→</span>
              </a>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm text-[#475569] sm:flex-row">
              <span>20 Questions</span>
              <span className="hidden h-4 w-px bg-[#e2e8f0] sm:block" />
              <span>~15 Minutes</span>
              <span className="hidden h-4 w-px bg-[#e2e8f0] sm:block" />
              <span>Instant Report</span>
            </div>

            <div className="mt-10 h-px w-full bg-[#e2e8f0]" />
          </div>

          {/* Scientific bell curve */}
          <div className="mx-auto mt-12 max-w-6xl">
            <div className="overflow-hidden border border-[#e2e8f0] bg-white">
              <svg
                viewBox="0 0 1200 380"
                className="h-auto w-full"
                role="img"
                aria-label="Normal distribution graph with IQ zones and population mean"
              >
                {/* Plot area */}
                <rect x="0" y="0" width="1200" height="380" fill="#ffffff" />

                {/* Axes */}
                <line x1="80" y1="300" x2="1120" y2="300" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="80" y1="60" x2="80" y2="300" stroke="#e2e8f0" strokeWidth="2" />

                {/* Zone fills (subtle) */}
                <g>
                  <rect x="80" y="60" width="208" height="240" fill="#0f172a" opacity="0.06" />
                  <rect x="288" y="60" width="240" height="240" fill="#1d4ed8" opacity="0.07" />
                  <rect x="528" y="60" width="240" height="240" fill="#1d4ed8" opacity="0.12" />
                  <rect x="768" y="60" width="240" height="240" fill="#1d4ed8" opacity="0.16" />
                  <rect x="1008" y="60" width="112" height="240" fill="#0f172a" opacity="0.10" />
                </g>

                {/* Zone dividers */}
                {[80, 288, 528, 768, 1008, 1120].map((x) => (
                  <line key={x} x1={x} y1="60" x2={x} y2="300" stroke="#e2e8f0" strokeWidth="2" />
                ))}

                {/* Gaussian curve */}
                <path
                  d="M80 300
                     C 160 300, 210 292, 260 274
                     C 340 245, 410 160, 600 96
                     C 790 160, 860 245, 940 274
                     C 990 292, 1040 300, 1120 300"
                  fill="none"
                  stroke="#1d4ed8"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Population mean at 100 (dashed) */}
                <line
                  x1="528"
                  y1="60"
                  x2="528"
                  y2="300"
                  stroke="#0f172a"
                  strokeOpacity="0.55"
                  strokeWidth="2"
                  strokeDasharray="7 7"
                />
                <g>
                  <rect x="454" y="68" width="148" height="26" fill="#ffffff" />
                  <text
                    x="528"
                    y="88"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#0f172a"
                    fillOpacity="0.75"
                    fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
                  >
                    Population Mean
                  </text>
                </g>

                {/* X-axis ticks and labels */}
                {[
                  { x: 80, label: "70" },
                  { x: 288, label: "85" },
                  { x: 528, label: "100" },
                  { x: 768, label: "115" },
                  { x: 1008, label: "130" },
                  { x: 1120, label: "145" },
                ].map((t) => (
                  <g key={t.label}>
                    <line x1={t.x} y1="300" x2={t.x} y2="312" stroke="#94a3b8" strokeOpacity="0.55" strokeWidth="2" />
                    <text
                      x={t.x}
                      y="336"
                      textAnchor={t.x === 80 ? "start" : t.x === 1120 ? "end" : "middle"}
                      fontSize="12"
                      fill="#475569"
                      fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
                    >
                      {t.label}
                    </text>
                  </g>
                ))}

                {/* Zone labels */}
                {[
                  { x: 184, label: "Below Average" },
                  { x: 408, label: "Average" },
                  { x: 648, label: "High Average" },
                  { x: 888, label: "Superior" },
                  { x: 1064, label: "Gifted" },
                ].map((z) => (
                  <text
                    key={z.label}
                    x={z.x}
                    y="366"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#0f172a"
                    fillOpacity="0.72"
                    fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
                  >
                    {z.label}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3 — SCIENTIFIC CREDIBILITY */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-[11px] font-semibold tracking-[0.28em] text-[#475569]">
              <span className="uppercase">Methodology</span>
            </div>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Built on a Century of Intelligence Research
            </h2>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Cattell-Horn-Carroll Theory",
                body: "The CHC model is the most empirically supported framework in cognitive psychology, used by clinical psychologists worldwide.",
              },
              {
                title: "Wechsler-Inspired Design",
                body: "Our question architecture follows principles established in the WAIS-IV — the gold standard in professional intelligence assessment.",
              },
              {
                title: "Compared Against a Reference Population",
                body: "Your score is reported on an interpretable IQ-style scale and compared against a reference population for context. BrainScale is an indicative tool — not a certified clinical instrument.",
              },
            ].map((c) => (
              <div key={c.title} className="pt-6 border-t border-[#e2e8f0]">
                <div className="font-serif text-lg font-semibold tracking-tight">
                  {c.title}
                </div>
                <p className="mt-3 text-sm leading-7 text-[#475569]">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4 — WHAT WE MEASURE */}
        <section className="bg-[#f9fafb] border-y border-[#e2e8f0]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-[11px] font-semibold tracking-[0.28em] text-[#475569]">
                <span className="uppercase">Cognitive Domains</span>
              </div>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Four Abilities. One Complete Picture.
              </h2>
              <p className="mt-4 text-base leading-8 text-[#475569]">
                Unlike single-score IQ tests, BrainScale measures the distinct
                cognitive systems that together form general intelligence.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  n: "01",
                  title: "Fluid Reasoning",
                  body: "Abstract problem-solving and logical pattern recognition, independent of learned knowledge.",
                },
                {
                  n: "02",
                  title: "Working Memory",
                  body: "Capacity to hold and manipulate information in real time — a strong predictor of academic performance.",
                },
                {
                  n: "03",
                  title: "Processing Speed",
                  body: "Mental efficiency: how quickly and accurately you process and respond to new information.",
                },
                {
                  n: "04",
                  title: "Verbal Comprehension",
                  body: "Language-based reasoning, vocabulary depth, and crystallized knowledge acquisition.",
                },
              ].map((d) => (
                <div key={d.title} className="border border-[#e2e8f0] bg-white p-6">
                  <div className="text-3xl font-light tracking-tight text-[#e2e8f0]">
                    {d.n}
                  </div>
                  <div className="mt-4 font-serif text-lg font-semibold tracking-tight">
                    {d.title}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#475569]">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — IQ SCORE DISTRIBUTION */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <div className="text-[11px] font-semibold tracking-[0.28em] text-[#475569]">
                <span className="uppercase">Score Interpretation</span>
              </div>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Where Does the Population Fall?
              </h2>
              <p className="mt-4 text-base leading-8 text-[#475569]">
                IQ scores follow a normal distribution with a mean of 100 and
                standard deviation of 15. Approximately 68% of the population
                scores between 85 and 115. BrainScale uses this same scale,
                and provides an indicative estimate for self-discovery — not a
                clinical diagnosis.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="border border-[#e2e8f0] bg-white p-6 sm:p-8">
                <svg
                  viewBox="0 0 860 300"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Horizontal bar chart of IQ category distribution"
                >
                  <rect x="0" y="0" width="860" height="300" fill="#ffffff" />
                  <line x1="20" y1="24" x2="840" y2="24" stroke="#e2e8f0" strokeWidth="2" />

                  {[
                    { y: 60, label: "130+ Gifted", pct: "2.2%", w: 26, fill: "#93c5fd" },
                    { y: 102, label: "120–129 Superior", pct: "6.7%", w: 78, fill: "#60a5fa" },
                    { y: 144, label: "110–119 High Average", pct: "16.1%", w: 188, fill: "#3b82f6" },
                    { y: 186, label: "90–109 Average", pct: "50.0%", w: 584, fill: "#1d4ed8" },
                    { y: 228, label: "80–89 Low Average", pct: "16.1%", w: 188, fill: "#3b82f6" },
                    { y: 270, label: "<80 Below Average", pct: "9.0%", w: 105, fill: "#60a5fa" },
                  ].map((r) => (
                    <g key={r.label}>
                      <text
                        x="20"
                        y={r.y}
                        fontSize="13"
                        fill="#0f172a"
                        fillOpacity="0.85"
                        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
                      >
                        {r.label}
                      </text>
                      <rect
                        x="320"
                        y={r.y - 14}
                        width={r.w}
                        height="16"
                        fill={r.fill}
                        opacity="0.95"
                      />
                      <text
                        x={320 + r.w + 12}
                        y={r.y}
                        fontSize="13"
                        fill="#475569"
                        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
                      >
                        {r.pct}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — SAMPLE QUESTION */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-[11px] font-semibold tracking-[0.28em] text-[#475569]">
              <span className="uppercase">Sample Item</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              What to Expect
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              Each question is carefully calibrated to measure a specific
              cognitive ability. Here is one example from our fluid reasoning
              module.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl border border-[#e2e8f0] bg-white p-6 sm:p-8">
            <div className="font-serif text-xl font-semibold tracking-tight">
              Which number completes the series: 2, 6, 12, 20, 30, ?
            </div>

            <div className="mt-6 space-y-2">
              <div className="border border-[#e2e8f0] px-4 py-3 text-sm font-medium text-[#0f172a]">
                A) 40
              </div>

              {[
                { label: "B) 42" },
                { label: "C) 44" },
                { label: "D) 48" },
              ].map((o) => (
                <div
                  key={o.label}
                  className="relative overflow-hidden border border-[#e2e8f0] px-4 py-3 text-sm font-medium text-[#0f172a]"
                >
                  <div className="blur-[2px] select-none">{o.label}</div>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-3">
                    <span className="inline-flex items-center gap-2 border border-[#e2e8f0] bg-white px-2 py-1 text-[11px] font-semibold text-[#475569]">
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                        <path
                          d="M8 11V8a4 4 0 118 0v3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M7 11h10v10H7V11z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Locked
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm leading-7 text-[#475569]">
              The full assessment contains 20 calibrated items across all four
              cognitive domains.
            </div>

            <div className="mt-5">
              <a
                href="/test"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1d4ed8] transition hover:text-[#1d4ed8]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Take the full assessment <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 7 — PROCESS */}
        <section className="bg-[#f9fafb] border-y border-[#e2e8f0]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-[11px] font-semibold tracking-[0.28em] text-[#475569]">
                <span className="uppercase">How it works</span>
              </div>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Simple. Private. Rigorous.
              </h2>
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {[
                {
                  n: "01",
                  title: "Complete the Assessment",
                  body: "Answer 20 questions at your own pace. No time pressure.",
                },
                {
                  n: "02",
                  title: "Instant Scoring",
                  body: "Your answers are converted into an indicative score on an interpretable, IQ-style scale and compared against a reference population.",
                },
                {
                  n: "03",
                  title: "Receive Your Report",
                  body: "An indicative score estimate with a high-level cognitive domain breakdown. No login required.",
                },
              ].map((s) => (
                <div key={s.n} className="border-t border-[#e2e8f0] pt-6">
                  <div className="text-4xl font-extralight tracking-tight text-[#94a3b8]">
                    {s.n}
                  </div>
                  <div className="mt-3 font-serif text-lg font-semibold tracking-tight">
                    {s.title}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#475569]">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 — PRIVACY / TRUST */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="text-[11px] font-semibold tracking-[0.28em] text-[#475569]">
                <span className="uppercase">Privacy</span>
              </div>
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Completely Anonymous
              </h2>
              <p className="mt-4 text-base leading-8 text-[#475569]">
                BrainScale collects no personal data. No account, no email, no
                tracking cookies. Your results exist only in your browser
                session. We cannot identify you.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="text-[11px] font-semibold tracking-[0.28em] text-[#475569]">
                <span className="uppercase">Independence</span>
              </div>
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                No Upsells. No Tricks.
              </h2>
              <p className="mt-4 text-base leading-8 text-[#475569]">
                The full assessment and complete results are free. We do not ask
                for payment before showing results, require email to unlock
                scores, or sell your data to third parties.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9 — TESTIMONIALS */}
        <section className="bg-[#f9fafb] border-y border-[#e2e8f0]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-[11px] font-semibold tracking-[0.28em] text-[#475569]">
                <span className="uppercase">Illustrative examples</span>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  quote:
                    "A short reasoning assessment can be a useful baseline — especially if you repeat it under similar conditions and look for consistency over time.",
                  who: "Example scenario (not a user testimonial)",
                },
                {
                  quote:
                    "Treat the number as an indicator, not a diagnosis. Small online tests have higher uncertainty than supervised clinical instruments.",
                  who: "Example scenario (not a user testimonial)",
                },
                {
                  quote:
                    "If you need a certified IQ assessment for academic, medical, or legal reasons, consult a licensed psychologist for a validated multi-hour evaluation.",
                  who: "Example scenario (not a user testimonial)",
                },
              ].map((t) => (
                <div key={t.who} className="border border-[#e2e8f0] bg-white p-6">
                  <p className="font-serif text-base italic leading-7 text-[#0f172a]">
                    “{t.quote}”
                  </p>
                  <div className="mt-5 text-sm font-medium text-[#475569]">
                    — {t.who}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10 — FAQ */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-10 divide-y divide-[#e2e8f0] border-y border-[#e2e8f0]">
              {[
                {
                  q: "How accurate is BrainScale compared to a professional assessment?",
                  a: "BrainScale provides an evidence-informed estimate on the same interpretive scale (mean 100, SD 15). A clinician-administered instrument (e.g., WAIS) remains the gold standard because it includes controlled administration, supervision, and broader subtest coverage.",
                },
                {
                  q: "How is the IQ score calculated?",
                  a: "Your raw performance is converted to an estimate on a standardized IQ scale and compared against a reference population. The goal is interpretability and consistency: the same scale, updated norms, and clear ranges.",
                },
                {
                  q: "What is IQ, and how should I interpret BrainScale’s score?",
                  a: "IQ is typically reported on a standardized scale (mean 100, SD 15) and is intended to summarize performance across multiple cognitive tasks. Important: BrainScale provides an indicative score based on 20 questions. A full clinical IQ assessment requires several hours with a certified psychologist.",
                },
                {
                  q: "Is my data private?",
                  a: "Yes. BrainScale is designed to run without accounts or identity collection. Results are presented instantly and are intended to remain within your browser session.",
                },
                {
                  q: "Can I retake the test?",
                  a: "Yes. You can retake the assessment at any time. For the most meaningful comparison, retake under similar conditions and allow some time between attempts.",
                },
                {
                  q: "What is the Cattell-Horn-Carroll theory?",
                  a: "CHC is a widely supported framework describing intelligence as a hierarchy of abilities, including broad domains (like fluid reasoning and working memory) that together contribute to general cognitive performance.",
                },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-medium text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                    <span>{item.q}</span>
                    <span className="ml-auto text-[#475569] transition group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="mt-3 text-sm leading-7 text-[#475569]">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11 — FINAL CTA */}
        <section className="bg-[#0f172a] text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Understand Your Cognitive Profile.
              </h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">
                Free. Anonymous. Takes 15 minutes.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="/test"
                  className="inline-flex items-center justify-center border border-white bg-white px-7 py-3.5 text-sm font-semibold text-[#0f172a] transition hover:bg-white/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
                >
                  Start Assessment <span className="ml-2" aria-hidden="true">→</span>
                </a>
              </div>
              <div className="mt-6 text-sm text-white/70">
                No registration. No payment. Results in under 15 minutes.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* SECTION 12 — FOOTER */}
      <footer className="border-t border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="h-3.5 w-3.5 rounded-full border border-[#e2e8f0] bg-white" />
              <span className="font-serif text-sm font-semibold tracking-tight text-[#0f172a]">
                BrainScale
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-[#475569]">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms" },
                { href: "/about", label: "About" },
                { href: "mailto:brainscale@proton.me", label: "Contact" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="transition hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="hidden sm:block" />
          </div>

          <div className="mt-8 text-sm leading-7 text-[#475569]">
            © 2026 BrainScale — Independent cognitive assessment platform.
            BrainScale is not affiliated with any academic institution. CHC
            Theory references are to published scientific literature.
          </div>
        </div>
      </footer>
    </div>
  );
}
