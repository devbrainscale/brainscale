"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    } else if (consent === "accepted") {
      loadGA();
    }
  }, []);

  function loadGA() {
    if (typeof window === "undefined") return;
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-ZTVB50WRWZ";
    script.async = true;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) { window.dataLayer.push(args); };
    window.gtag("js", new Date());
    window.gtag("config", "G-ZTVB50WRWZ", { anonymize_ip: true });
  }

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    loadGA();
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      backgroundColor: "#1A1825",
      color: "#fff",
      borderRadius: "16px",
      padding: "20px 24px",
      maxWidth: "560px",
      width: "calc(100% - 48px)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      flexWrap: "wrap",
    }}>
      <p style={{ margin: 0, fontSize: "13px", color: "#C8C6D8", lineHeight: 1.6, flex: 1, minWidth: "200px" }}>
        We use cookies for analytics to improve our service.{" "}
        <Link href="/privacy" style={{ color: "#9B8FE0", textDecoration: "underline" }}>Privacy Policy</Link>
      </p>
      <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#9896A8", padding: "8px 18px", borderRadius: "999px", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{ backgroundColor: "#5B4FCF", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
