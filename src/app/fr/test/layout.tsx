export const metadata = {
  title: "Test de QI Gratuit — 40 Questions, Résultats Instantanés | BrainScale",
  description:
    "Passez le test de QI BrainScale. 40 questions calibrées mesurant le raisonnement fluide, la mémoire de travail, la vitesse de traitement et la compréhension verbale. Gratuit, anonyme, résultats instantanés.",
  alternates: {
    canonical: "https://www.brainscale.app/fr/test",
    languages: {
      "en": "https://www.brainscale.app/test",
      "fr": "https://www.brainscale.app/fr/test",
    },
  },
};

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  "name": "Test de QI Gratuit BrainScale",
  "description":
    "Un test cognitif gratuit de 40 questions mesurant le raisonnement fluide, la mémoire de travail, la vitesse de traitement et la compréhension verbale. Obtenez votre score QI instantanément, sans inscription.",
  "url": "https://www.brainscale.app/fr/test",
  "numberOfQuestions": 40,
  "timeRequired": "PT35M",
  "educationalLevel": "grand public",
  "about": {
    "@type": "Thing",
    "name": "Quotient Intellectuel (QI)",
  },
  "provider": {
    "@type": "Organization",
    "name": "BrainScale",
    "url": "https://www.brainscale.app",
  },
  "isAccessibleForFree": true,
  "inLanguage": "fr",
};

export default function FrTestLayout({ children }: { children: React.ReactNode }) {
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
