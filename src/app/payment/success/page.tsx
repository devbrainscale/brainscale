import { Suspense } from "react";
import Link from "next/link";
import PixelPurchase from "./PixelPurchase";

export const metadata = {
  title: "Payment Successful — BrainScale",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "24px", padding: "56px 48px", maxWidth: "480px", width: "100%", textAlign: "center", boxShadow: "0 4px 24px rgba(26,24,37,0.08)" }}>
        <div style={{ fontSize: "48px", marginBottom: "20px" }}>🎉</div>
        <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 500, color: "#1A1825", marginBottom: "12px" }}>
          Payment successful!
        </h1>
        <p style={{ fontSize: "15px", color: "#5C5A6E", lineHeight: 1.7, marginBottom: "32px" }}>
          Thank you for your purchase. Your Full Cognitive Report will be sent to your email within a few minutes.
        </p>
        <div style={{ backgroundColor: "#EDE9FF", border: "1px solid #C4BBFF", borderRadius: "16px", padding: "16px 20px", marginBottom: "32px" }}>
          <p style={{ fontSize: "13px", color: "#5B4FCF", fontWeight: 600, margin: 0 }}>
            Check your inbox — your report is on its way.
          </p>
        </div>
        <Link href="/" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "14px 32px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
          Back to BrainScale
        </Link>
      </div>
    </div>
    {/* Meta Pixel — Purchase event */}
    <Suspense fallback={null}>
      <PixelPurchase />
    </Suspense>
  );
}
