export default function TermsPage() {
  return (
    <div className="min-h-dvh bg-white text-[#0f172a]">
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

      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-[11px] font-semibold tracking-[0.28em] text-[#475569]">
            <span className="uppercase">Legal</span>
          </div>
          <h1 className="mt-4 text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-[#475569]">
            Last updated: May 10, 2026
          </p>

          <div className="mt-10 divide-y divide-[#e2e8f0] border-y border-[#e2e8f0]">
            <section className="py-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                Nature of the Service
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#475569]">
                BrainScale is a free, self-administered cognitive reasoning tool
                for educational and entertainment purposes. It is NOT a
                certified psychological assessment, a medical diagnostic tool,
                or a substitute for professional evaluation.
              </p>
            </section>

            <section className="py-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                Indicative Results Only
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#475569]">
                The score you receive is an estimate based on 20 questions. It
                should not be used to make medical, academic, employment, legal,
                or clinical decisions. For a certified IQ assessment, consult a
                licensed psychologist.
              </p>
            </section>

            <section className="py-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                Who Can Use This
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#475569]">
                BrainScale is intended for adults aged 18 and over.
              </p>
            </section>

            <section className="py-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                Intellectual Property
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#475569]">
                Test questions and content are the property of BrainScale. You
                may not copy, reproduce, publish, or distribute them.
              </p>
            </section>

            <section className="py-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                No Warranties
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#475569]">
                BrainScale is provided as-is. We make no guarantees about the
                accuracy, completeness, or fitness for any purpose of the
                results.
              </p>
            </section>

            <section className="py-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                Independence
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#475569]">
                BrainScale is an independent platform. It is not affiliated with
                any university, psychological association, or certification
                body.
              </p>
            </section>

            <section className="py-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                Governing Law
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#475569]">
                These terms are governed by Swiss law. Any disputes shall be
                subject to the jurisdiction of Swiss courts.
              </p>
            </section>

            <section className="py-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                Contact
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#475569]">
                For questions about these terms, contact{" "}
                <a
                  href="mailto:brainscale@proton.me"
                  className="font-semibold text-[#1d4ed8] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/25"
                >
                  brainscale@proton.me
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

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

