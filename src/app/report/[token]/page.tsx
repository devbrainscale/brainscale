import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { verifyReportToken } from '@/lib/report-token';
import { getPercentile, getTierInfo } from '@/lib/report-data';
import ReportPage from '@/components/ReportPage';

interface Props {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const data = verifyReportToken(token);
  if (!data) return { title: 'Report — BrainScale' };

  const pct = getPercentile(data.score);
  const ti  = getTierInfo(data.score);

  return {
    title: `IQ ${data.score} — ${ti.label} — BrainScale`,
    description: `Cognitive assessment report. IQ Score: ${data.score}. Top ${Math.round(pct)}% of the population.`,
    robots: { index: false, follow: false }, // private report
    openGraph: {
      title: `BrainScale — IQ ${data.score}`,
      description: `${ti.label} · Top ${Math.round(pct)}% · Cognitive Report`,
      siteName: 'BrainScale',
    },
  };
}

export default async function ReportTokenPage({ params }: Props) {
  const { token } = await params;
  const data = verifyReportToken(token);

  if (!data) notFound();

  return (
    <ReportPage
      score={data.score}
      correct={data.correct}
      total={data.total}
      lang="en"
      tier={data.tier}
    />
  );
}
