// Separate metadata export for the French homepage
// Used by fr/layout.tsx to override global metadata
export const frHomeMetadata = {
  title: "Test de QI Gratuit — Évaluez Votre Intelligence | BrainScale",
  description:
    "Passez un test de QI gratuit scientifiquement calibré. 40 questions, résultats instantanés, aucune inscription. Découvrez votre score QI et votre rang percentile.",
  keywords:
    "test QI gratuit, test de QI en ligne, test intelligence gratuit, QI test, mesurer son QI, test cognitif gratuit, score QI, test de quotient intellectuel",
  openGraph: {
    title: "Test de QI Gratuit — BrainScale",
    description:
      "40 questions calibrées, résultats instantanés. Mesurez vos capacités cognitives gratuitement.",
    url: "https://www.brainscale.app/fr",
    locale: "fr_FR",
    type: "website" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Test de QI Gratuit — BrainScale",
    description:
      "40 questions calibrées, résultats instantanés. Mesurez vos capacités cognitives gratuitement.",
  },
};
