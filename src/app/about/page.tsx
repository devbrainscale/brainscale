export const metadata = {
  title: "About BrainScale — Our Methodology & Mission",
  description:
    "Learn about BrainScale's scientific methodology, based on the Cattell-Horn-Carroll theory of intelligence.",
};

export default function AboutPage() {
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
              { href: "/about", label: "About" },
              { href: "/test", label: "Sample Test" },
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
            <span className="uppercase">About</span>
          </div>
          <h1 className="mt-4 text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            About BrainScale
          </h1>

          <div className="mt-10 divide-y divide-[#e2e8f0] border-y border-[#e2e8f0]">
            <section className="py-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                What BrainScale Is
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#475569]">
                BrainScale is a free, anonymous cognitive reasoning tool that
                gives you an indicative score inspired by IQ test methodology.
                Built to make cognitive self-assessment accessible to everyone.
              </p>
            </section>

            <section className="py-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                What BrainScale Is Not
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[#475569]">
                <li>• A certified clinical IQ test.</li>
                <li>• A medical or psychological diagnostic tool.</li>
                <li>• Affiliated with any university or institution.</li>
              </ul>
            </section>

            <section className="py-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                Contact Us
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#475569]">
                <a
                  href="mailto:contact@brainscale.app"
                  className="font-semibold text-[#1d4ed8] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/25"
                >
                  contact@brainscale.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-[#475569]">
            <a
              href="/privacy"
              className="transition hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="transition hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Terms
            </a>
            <a
              href="/about"
              className="transition hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              About
            </a>
            <a
              href="mailto:contact@brainscale.app"
              className="transition hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

