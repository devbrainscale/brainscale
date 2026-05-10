export const metadata = {
  title: "Privacy Policy — BrainScale",
  description: "BrainScale collects no personal data. Learn about our privacy-first approach.",
};

export default function PrivacyPage() {
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
          <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-[#475569]">Last updated: May 10, 2026</p>
          <p className="mt-6 text-sm leading-7 text-[#475569]">
            BrainScale collects no personal data whatsoever. If you have questions, contact{" "}
            <a
              href="mailto:contact@brainscale.app"
              className="font-semibold text-[#1d4ed8] underline-offset-4 hover:underline"
            >
              contact@brainscale.app
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}

