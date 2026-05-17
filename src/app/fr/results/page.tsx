import { Suspense } from "react";
import type { Metadata } from "next";
import FrResultsContent from "./ResultsContent";

interface Props {
  searchParams: Promise<{ score?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const rawScore = parseInt(params.score ?? "100");
  const score = isNaN(rawScore) ? 100 : Math.min(145, Math.max(75, rawScore));
  const ogImageUrl = `https://www.brainscale.app/api/og?score=${score}`;

  return {
    title: `Mon Score QI : ${score} — Résultats BrainScale`,
    description: `Je viens de scorer ${score} au test cognitif BrainScale. Passe le test et compare ton score !`,
    robots: { index: false, follow: false },
    openGraph: {
      title: `Mon Score QI : ${score} — BrainScale`,
      description: `Tu peux battre mon score ? Passe le test de QI gratuit sur brainscale.app`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `Score QI BrainScale : ${score}` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Mon Score QI : ${score} — BrainScale`,
      description: `Tu peux battre mon score ? Passe le test de QI gratuit sur brainscale.app`,
      images: [ogImageUrl],
    },
  };
}

export default function FrResultsPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#99958C" }}>Chargement des résultats…</p>
      </div>
    }>
      <FrResultsContent />
    </Suspense>
  );
}
