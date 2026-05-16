import Link from "next/link";

export const metadata = {
  title: "Payment Cancelled — BrainScale",
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "24px", padding: "56px 48px", maxWidth: "480px", width: "100%", textAlign: "center", boxShadow: "0 4px 24px rgba(26,24,37,0.08)" }}>
        <div style={{ marginBottom: "24px", display: "flex", justifyContent: "center" }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="32" fill="#F7F6F2"/>
            <circle cx="32" cy="32" r="24" fill="#E8E5DC"/>
            <path d="M38 26H28a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h2l-2 4 6-4h4a4 4 0 0 0 4-4v-4a4 4 0 0 0-4-4z" fill="none" stroke="#9896A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="29" y1="31" x2="35" y2="31" stroke="#9896A8" strokeWidth="2" strokeLinecap="round"/>
            <line x1="29" y1="34" x2="33" y2="34" stroke="#9896A8" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 500, color: "#1A1825", marginBottom: "12px" }}>
          Payment cancelled
        </h1>
        <p style={{ fontSize: "15px", color: "#5C5A6E", lineHeight: 1.7, marginBottom: "32px" }}>
          No charge was made. You can unlock your Full Cognitive Report any time.
        </p>
        <Link href="/results" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "14px 32px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
          Back to my results
        </Link>
      </div>
    </div>
  );
}
