"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackFbq } from "@/lib/fbq";

export default function PixelPurchase() {
  const params = useSearchParams();

  useEffect(() => {
    const tier = params.get("tier") ?? "basic";
    const lang = params.get("lang") ?? "en";
    const isFr = lang === "fr";
    const isPremium = tier === "premium";

    // EUR for FR, USD for EN — mirrors create-checkout-session prices
    const value    = isPremium ? (isFr ? 22.99 : 24.99) : (isFr ? 13.99 : 14.99);
    const currency = isFr ? "EUR" : "USD";

    trackFbq("track", "Purchase", { value, currency });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
