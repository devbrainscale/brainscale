import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  alternates: {
    canonical: "https://www.brainscale.app",
  },
  openGraph: {
    title: "BrainScale — Free Cognitive Assessment",
    description:
      "Measure your cognitive abilities for free. 20 questions, instant results, no registration.",
    url: "https://www.brainscale.app",
    siteName: "BrainScale",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrainScale — Free Cognitive Assessment",
    description:
      "Measure your cognitive abilities for free. 20 questions, instant results, no registration.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
