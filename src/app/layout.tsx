import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CookieConsent from "./CookieConsent";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
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
      className={`${fraunces.variable} ${jakarta.variable} h-full`}
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
      </body>
    </html>
  );
}