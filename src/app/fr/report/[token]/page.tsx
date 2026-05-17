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
  if (!data) return { title: 'Rapport — BrainScale' };

  const pct = getPercentile(data.score);
  const ti  = getTierInfo(data.score);

  return {
    title: `QI ${data.score} — ${ti.labelFr} — BrainScale`,
    description: `Rapport cognitif BrainScale. Score QI : ${data.score}. Top ${Math.round(pct)} % de la population.`,
    robots: { index: false, follow: false },
    openGraph: {
      title: `BrainScale — QI ${data.score}`,
      description: `${ti.labelFr} · Top ${Math.round(pct)} % · Rapport cognitif`,
      siteName: 'BrainScale',
      locale: 'fr_FR',
    },
  };
}

export default async function ReportTokenPageFr({ params }: Props) {
  const { token } = await params;
  const data = verifyReportToken(token);

  if (!data) notFound();

  return (
    <ReportPage
      score={data.score}
      correct={data.correct}
      total={data.total}
      lang="fr"
      tier={data.tier}
    />
  );
}
