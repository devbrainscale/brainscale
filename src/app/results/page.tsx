import { Suspense } from "react";

import ResultsContent from "./ResultsContent";

export const metadata = {
  title: "Your Cognitive Assessment Results — BrainScale",
  description: "View your cognitive assessment score and detailed breakdown by domain.",
  robots: { index: false, follow: false },
};

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

