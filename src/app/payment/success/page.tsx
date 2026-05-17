import { Suspense } from "react";
import Link from "next/link";
import PixelPurchase from "./PixelPurchase";
import { createReportToken } from "@/lib/report-token";

export const metadata = {
  title: "Payment Successful — BrainScale",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams;

  const score   = parseInt(params.score   ?? "100");
  const correct = parseInt(params.correct ?? "20");
  const total   = parseInt(params.total   ?? "40");
  const lang    = (params.lang ?? "en") as "en" | "fr";
  const isFr    = lang === "fr";

  // Generate the report token server-side — instant, no DB call needed
  let reportUrl: string | null = null;
  try {
    const token = createReportToken({ score, correct, total, lang, tier: 'premium' });
    const path  = isFr ? "/fr/report/" : "/report/";
    reportUrl   = `${process.env.NEXT_PUBLIC_APP_URL || "https://www.brainscale.app"}${path}${token}`;
  } catch {
    // If token generation fails (missing secret), fall back gracefully
    reportUrl = null;
  }

  const t = {
    title:    isFr ? "Paiement réussi !" : "Payment successful!",
    subtitle: isFr
      ? "Merci pour votre achat. Votre rapport est prêt."
      : "Thank you for your purchase. Your report is ready.",
    ctaView:  isFr ? "Voir mon rapport →" : "View my report →",
    emailNote: isFr
      ? "Un lien permanent a aussi été envoyé à votre adresse email."
      : "A permanent link has also been sent to your email address.",
    home:     isFr ? "Retour à BrainScale" : "Back to BrainScale",
  };

  return (
    <>
      <div style={{
        backgroundColor: "#FAF8F5",
        minHeight: "100vh",
        fontFamily: "var(--font-body, sans-serif)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}>
        <div style={{
          backgroundColor: "#fff",
          border: "1px solid #E8E5DF",
          borderRadius: "24px",
          padding: "56px 48px",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 4px 24px rgba(26,25,22,0.08)",
        }}>
          {/* Checkmark */}
          <div style={{ marginBottom: "24px", display: "flex", justifyContent: "center" }}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#FBF0EB"/>
              <circle cx="32" cy="32" r="24" fill="#C96442"/>
              <polyline points="22,33 29,40 43,25" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display, serif)",
            fontSize: "28px",
            fontWeight: 500,
            color: "#1A1916",
            marginBottom: "12px",
          }}>
            {t.title}
          </h1>

          <p style={{
            fontSize: "15px",
            color: "#5C5A52",
            lineHeight: 1.7,
            marginBottom: "32px",
          }}>
            {t.subtitle}
          </p>

          {/* Score pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: "8px",
            backgroundColor: "#FBF0EB",
            border: "1px solid #E8C4B4",
            borderRadius: "12px",
            padding: "12px 24px",
            marginBottom: "28px",
          }}>
            <span style={{
              fontFamily: "var(--font-display, serif)",
              fontSize: "40px",
              fontWeight: 600,
              color: "#C96442",
              lineHeight: 1,
            }}>
              {score}
            </span>
            <span style={{ fontSize: "13px", color: "#C96442", fontWeight: 600, letterSpacing: "0.05em" }}>
              IQ
            </span>
          </div>

          {/* Report CTA */}
          {reportUrl ? (
            <div style={{ marginBottom: "24px" }}>
              <Link
                href={reportUrl}
                style={{
                  display: "block",
                  backgroundColor: "#C96442",
                  color: "#fff",
                  padding: "16px 32px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  marginBottom: "12px",
                }}
              >
                {t.ctaView}
              </Link>
              <p style={{ fontSize: "12px", color: "#99958C", lineHeight: 1.5 }}>
                {t.emailNote}
              </p>
            </div>
          ) : (
            <div style={{
              backgroundColor: "#FBF0EB",
              border: "1px solid #E8C4B4",
              borderRadius: "12px",
              padding: "16px 20px",
              marginBottom: "24px",
            }}>
              <p style={{ fontSize: "13px", color: "#C96442", fontWeight: 600, margin: 0 }}>
                {isFr
                  ? "Votre rapport est en route — vérifiez votre boîte mail."
                  : "Check your inbox — your report is on its way."}
              </p>
            </div>
          )}

          <Link
            href={isFr ? "/fr" : "/"}
            style={{
              backgroundColor: "transparent",
              color: "#99958C",
              padding: "10px 24px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-block",
              border: "1px solid #E8E5DF",
            }}
          >
            {t.home}
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
