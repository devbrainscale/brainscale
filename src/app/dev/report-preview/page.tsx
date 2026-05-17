import Link from "next/link";
import { createReportToken } from "@/lib/report-token";

// Quick dev preview — generates test report links without Stripe
// Remove this file before going to production (or keep it, token is still HMAC-signed)

export default function ReportPreview() {
  const cases = [
    { score: 132, correct: 36, total: 40, lang: "en" as const, tier: "premium" as const, label: "Gifted · Premium · EN" },
    { score: 122, correct: 30, total: 40, lang: "en" as const, tier: "basic"   as const, label: "Superior · Basic · EN" },
    { score: 107, correct: 23, total: 40, lang: "en" as const, tier: "basic"   as const, label: "Average · Basic · EN" },
    { score: 132, correct: 36, total: 40, lang: "fr" as const, tier: "premium" as const, label: "Surdoué · Premium · FR" },
    { score: 118, correct: 28, total: 40, lang: "fr" as const, tier: "basic"   as const, label: "Supérieur · Basic · FR" },
  ];

  return (
    <div style={{ fontFamily: "sans-serif", padding: "48px 32px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "8px" }}>Report preview</h1>
      <p style={{ fontSize: "13px", color: "#888", marginBottom: "32px" }}>Dev only — click a case to open the report</p>

      {cases.map((c) => {
        const token = createReportToken(c);
        const path  = c.lang === "fr" ? "/fr/report/" : "/report/";
        const url   = `${path}${token}`;
        return (
          <div key={c.label} style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px", border: "1px solid #E8E5DF", borderRadius: "8px" }}>
            <span style={{ flex: 1, fontSize: "14px", fontWeight: 500 }}>{c.label}</span>
            <span style={{ fontSize: "13px", color: "#C96442", fontWeight: 600 }}>IQ {c.score}</span>
            <Link href={url} style={{ fontSize: "13px", color: "#fff", background: "#C96442", padding: "8px 16px", borderRadius: "6px", textDecoration: "none", whiteSpace: "nowrap" }}>
              Open →
            </Link>
          </div>
        );
      })}
    </div>
  );
}
