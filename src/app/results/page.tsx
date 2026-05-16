import { Suspense } from "react";
import type { Metadata } from "next";
import ResultsContent from "./ResultsContent";

interface Props {
  searchParams: Promise<{ score?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const rawScore = parseInt(params.score ?? "100");
  const score = isNaN(rawScore) ? 100 : Math.min(145, Math.max(75, rawScore));

  const ogImageUrl = `https://www.brainscale.app/api/og?score=${score}`;

  return {
    title: `IQ Score ${score} — My BrainScale Results`,
    description: `I just scored ${score} on BrainScale's free cognitive assessment. Take the test and see how you compare!`,
    robots: { index: false, follow: false },
    openGraph: {
      title: `My IQ Score: ${score} — BrainScale`,
      description: `Can you beat my score? Take the free cognitive assessment at brainscale.app`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `BrainScale IQ Score: ${score}`,
        },
      ],
      type: "website",
      url: `https://www.brainscale.app/results?score=${score}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `My IQ Score: ${score} — BrainScale`,
      description: `Can you beat my score? Take the free cognitive assessment at brainscale.app`,
      images: [ogImageUrl],
    },
  };
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-gray-500">Loading results...</p>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}

