import Link from "next/link";
import { notFound } from "next/navigation";
import { createReportToken } from "@/lib/report-token";

// Dev-only — returns 404 in production
export default function ReportPreview() {
  if (process.env.NODE_ENV === "production") notFound();

  const cases = [
    { score: 132, correct: 36, total: 40, lang: "en" as const, tier: "premium" as const, label: "Gifted · EN" },
    { score: 118, correct: 28, total: 40, lang: "en" as const, tier: "premium" as const, label: "Superior · EN" },
    { score: 102, correct: 21, total: 40, lang: "en" as const, tier: "premium" as const, label: "Average · EN" },
    { score: 128, correct: 34, total: 40, lang: "fr" as const, tier: "premium" as const, label: "Gifted · FR" },
    { score: 95,  correct: 14, total: 40, lang: "fr" as const, tier: "premium" as const, label: "Average · FR" },
  ];

  return (
    <div style={{ padding: "48px 24px", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>Report Preview (dev only)</h1>
      <p style={{ color: "#888", marginBottom: "32px" }}>This page returns 404 in production.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {cases.map((c) => {
          const token = createReportToken({ score: c.score, correct: c.correct, total: c.total, lang: c.lang, tier: c.tier });
          const path  = c.lang === "fr" ? `/fr/report/${token}` : `/report/${token}`;
          return (
            <div key={c.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
              <span style={{ fontWeight: 600 }}>{c.label} — IQ {c.score}</span>
              <Link href={path} style={{ color: "#C96442", fontWeight: 600 }}>View →</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
