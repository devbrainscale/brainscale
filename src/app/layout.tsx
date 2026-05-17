import type { Metadata } from "next";
import { Bitter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieConsent from "./CookieConsent";
import { FB_PIXEL_ID } from "@/lib/fbq";

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BrainScale — Free Cognitive Assessment & IQ Test",
  description:
    "Take a free, scientifically-inspired cognitive reasoning assessment. Measure fluid reasoning, working memory, processing speed, and verbal comprehension. Instant results, no registration required.",
  keywords:
    "free IQ test, cognitive assessment, intelligence test, IQ score, brain test, reasoning test, free IQ test online",
  authors: [{ name: "BrainScale" }],
  creator: "BrainScale",
  metadataBase: new URL("https://www.brainscale.app"),
  openGraph: {
    title: "BrainScale — Free Cognitive Assessment",
    description:
      "Measure your cognitive abilities for free. 40 questions, instant results, no registration.",
    url: "https://www.brainscale.app",
    siteName: "BrainScale",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrainScale — Free Cognitive Assessment",
    description:
      "Measure your cognitive abilities for free. 40 questions, instant results, no registration.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  verification: {
    google: "aYb11-OSmnEYPiEP5LghGfbDzNG816-xIeXTTI28ZHw",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.brainscale.app/#organization",
      "name": "BrainScale",
      "url": "https://www.brainscale.app",
      "description": "Free online cognitive assessment and IQ test platform.",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact@brainscale.app",
        "contactType": "customer support",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.brainscale.app/#website",
      "url": "https://www.brainscale.app",
      "name": "BrainScale",
      "description":
        "Take a free, scientifically-inspired IQ and cognitive assessment. Instant results, no registration required.",
      "publisher": { "@id": "https://www.brainscale.app/#organization" },
      "inLanguage": "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bitter.variable} ${manrope.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <CookieConsent />
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}