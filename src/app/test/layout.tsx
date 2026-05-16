export const metadata = {
  title: "Free IQ Test — 40 Questions, Instant Results | BrainScale",
  description:
    "Take BrainScale's free IQ test. 40 scientifically-calibrated questions measuring fluid reasoning, working memory, processing speed and verbal comprehension. Free, anonymous, instant results.",
};

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  "name": "BrainScale Free IQ & Cognitive Assessment",
  "description":
    "A free 40-question cognitive reasoning test measuring fluid reasoning, working memory, processing speed, and verbal comprehension. Get your IQ score instantly, no registration required.",
  "url": "https://www.brainscale.app/test",
  "numberOfQuestions": 40,
  "timeRequired": "PT35M",
  "educationalLevel": "general public",
  "about": {
    "@type": "Thing",
    "name": "Intelligence Quotient (IQ)",
  },
  "provider": {
    "@type": "Organization",
    "name": "BrainScale",
    "url": "https://www.brainscale.app",
  },
  "isAccessibleForFree": true,
  "inLanguage": "en",
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      {children}
    </>
  );
}

