import { Suspense } from "react";
import Link from "next/link";
import PixelPurchase from "./PixelPurchase";

export const metadata = {
  title: "Payment Successful — BrainScale",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <>
      <div style={{ backgroundColor: "#FAF8F5", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "24px", padding: "56px 48px", maxWidth: "480px", width: "100%", textAlign: "center", boxShadow: "0 4px 24px rgba(26,25,22,0.08)" }}>
          <div style={{ marginBottom: "24px", display: "flex", justifyContent: "center" }}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#FBF0EB"/>
              <circle cx="32" cy="32" r="24" fill="#C96442"/>
              <polyline points="22,33 29,40 43,25" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "28px", fontWeight: 500, color: "#1A1916", marginBottom: "12px" }}>
            Payment successful!
          </h1>
          <p style={{ fontSize: "15px", color: "#5C5A52", lineHeight: 1.7, marginBottom: "32px" }}>
            Thank you for your purchase. Your Full Cognitive Report will be sent to your email within a few minutes.
          </p>
          <div style={{ backgroundColor: "#FBF0EB", border: "1px solid #E8C4B4", borderRadius: "16px", padding: "16px 20px", marginBottom: "32px" }}>
            <p style={{ fontSize: "13px", color: "#C96442", fontWeight: 600, margin: 0 }}>
              Check your inbox — your report is on its way.
            </p>
          </div>
          <Link href="/" style={{ backgroundColor: "#C96442", color: "#fff", padding: "14px 32px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
            Back to BrainScale
          </Link>
        </div>
      </div>
      {/* Meta Pixel — Purchase event */}
      <Suspense fallback={null}>
        <PixelPurchase />
      </Suspense>
    </>
  );
}
