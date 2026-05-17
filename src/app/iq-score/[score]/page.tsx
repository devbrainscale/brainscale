import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// ── Score range: 70–145 ────────────────────────────────────────────────────
const SCORES = Array.from({ length: 76 }, (_, i) => 70 + i);

export async function generateStaticParams() {
  return SCORES.map((s) => ({ score: String(s) }));
}

// ── Helpers ────────────────────────────────────────────────────────────────
function getPercentile(iq: number): number {
  if (iq >= 145) return 99.9;
  if (iq >= 140) return 99.6;
  if (iq >= 135) return 99;
  if (iq >= 130) return 98;
  if (iq >= 125) return 95;
  if (iq >= 120) return 91;
  if (iq >= 115) return 84;
  if (iq >= 110) return 75;
  if (iq >= 105) return 63;
  if (iq >= 100) return 50;
  if (iq >= 95) return 37;
  if (iq >= 90) return 25;
  if (iq >= 85) return 16;
  if (iq >= 80) return 9;
  return 5;
}

function getClassification(iq: number): { label: string; color: string; band: string } {
  if (iq >= 130) return { label: "Gifted", color: "#C96442", band: "Top 2%" };
  if (iq >= 120) return { label: "Superior", color: "#B5572F", band: "Top 9%" };
  if (iq >= 110) return { label: "Above Average", color: "#5248D0", band: "Top 25%" };
  if (iq >= 90)  return { label: "Average", color: "#D4835E", band: "Middle 50%" };
  if (iq >= 80)  return { label: "Below Average", color: "#99958C", band: "Bottom 25%" };
  return { label: "Low", color: "#B0AEC0", band: "Bottom 9%" };
}

function getGaugePercent(iq: number): number {
  return Math.min(100, Math.max(0, ((iq - 70) / 75) * 100));
}

function getContent(iq: number): { intro: string; profile: string; context: string; fields: string[] } {
  const pct = getPercentile(iq);
  const cls = getClassification(iq);

  if (iq >= 140) return {
    intro: `An IQ score of ${iq} places you at the ${pct}th percentile — a level of cognitive performance achieved by fewer than 1 in 250 people. Scores in this range are associated with exceptional abstract reasoning, near-instant pattern recognition, and a capacity to build mental models of extraordinary complexity. Most standardized tests cannot reliably measure at this ceiling.`,
    profile: `Individuals scoring ${iq} typically demonstrate rare facility with multi-step logical inference, the ability to hold and manipulate many variables simultaneously, and an intuitive grasp of structural relationships across domains. This profile commonly correlates with achievement in theoretical physics, mathematics, philosophy of mind, and elite strategic disciplines.`,
    context: `A score of ${iq} exceeds the threshold required for admission to the most selective high-IQ societies, including Mensa (top 2%), Intertel (top 1%), and Triple Nine Society (top 0.1%). It reflects not just raw reasoning speed but a qualitative difference in how problems are decomposed and solved.`,
    fields: ["Theoretical research", "Advanced mathematics", "Cognitive science", "Strategic consulting", "Philosophy", "Elite engineering"],
  };

  if (iq >= 130) return {
    intro: `An IQ score of ${iq} places you at the ${pct}th percentile — meaning roughly ${100 - pct}% of people score lower under equivalent conditions. This puts you firmly in the ${cls.label} range, a category that represents only 2% of the global population. Scores at this level reflect a measurably different relationship with complexity.`,
    profile: `At ${iq}, fluid reasoning operates at a level where novel problems are decomposed quickly and accurately. Working memory capacity is typically large enough to hold entire problem structures in mind simultaneously, reducing the cognitive cost of multi-step inference. This manifests as a consistent ability to see further ahead than peers and to operate effectively without external scaffolding.`,
    context: `An IQ of ${iq} exceeds the minimum threshold for Mensa membership (top 2%) and is associated with high academic achievement, professional distinction, and unusual creative output. Research consistently shows that scores above 130 predict not just academic success but also leadership emergence and entrepreneurial success.`,
    fields: ["Academic research", "Medicine", "Law", "Technology leadership", "Finance", "Creative direction"],
  };

  if (iq >= 120) return {
    intro: `An IQ score of ${iq} places you at the ${pct}th percentile worldwide — ahead of roughly ${pct}% of the population. This falls in the ${cls.label} range, a band occupied by approximately 9% of people. It reflects strong analytical capacity, efficient processing, and above-average facility with both quantitative and verbal reasoning.`,
    profile: `A score of ${iq} is associated with the ability to master complex material relatively quickly, to identify non-obvious patterns, and to reason effectively under conditions of incomplete information. Individuals in this range tend to perform well in environments that reward structured thinking and independent problem-solving.`,
    context: `At ${iq}, you are well above the cognitive threshold required for most professional and academic tracks. Research by psychologist Linda Gottfredson suggests scores above 120 correlate with the ability to handle the theoretical demands of most graduate-level disciplines without exceptional effort.`,
    fields: ["Engineering", "Law", "Medicine", "Research", "Architecture", "Data science", "Business strategy"],
  };

  if (iq >= 110) return {
    intro: `An IQ score of ${iq} places you at the ${pct}th percentile — above the majority of the population. This is the ${cls.label} range, representing the top 25% of cognitive performers. Scores in this band reflect solid reasoning ability, above-average processing speed, and good capacity for abstract thought.`,
    profile: `At ${iq}, you can handle cognitively demanding tasks with relative ease. This range is associated with strong academic performance, professional competence across a wide range of careers, and the ability to learn new skills efficiently. It is the most common score range among university graduates in selective programs.`,
    context: `A score of ${iq} is sufficient for success across virtually every professional discipline, including most that are considered cognitively demanding. It represents a meaningful and practical advantage in learning speed, problem-solving quality, and decision-making under uncertainty.`,
    fields: ["Most professional fields", "University education", "Technical roles", "Management", "Healthcare", "Teaching"],
  };

  if (iq >= 100) return {
    intro: `An IQ score of ${iq} is right at or slightly above the population average of 100. You are at the ${pct}th percentile — meaning roughly half of all people score at or below this level. This places you squarely in the ${cls.label} range, which encompasses the largest segment of the population.`,
    profile: `Scores around ${iq} reflect solid everyday reasoning ability. You can handle most tasks that require logical thinking, follow complex instructions reliably, and learn new material at a comfortable pace. This is the range where most people operate successfully across a wide variety of life and professional contexts.`,
    context: `The average IQ is defined as 100, with a standard deviation of 15. A score of ${iq} is within one standard deviation of the mean and is typical of the general population. The vast majority of careers and educational paths are fully accessible at this level.`,
    fields: ["Trade professions", "Sales", "Administration", "Service industries", "Many technical roles", "Arts and crafts"],
  };

  if (iq >= 90) return {
    intro: `An IQ score of ${iq} falls in the ${cls.label} range, at the ${pct}th percentile. This means approximately ${pct}% of people score at or below this level. Scores in this range are entirely normal and represent a fully functional level of cognitive performance for everyday life and most professional contexts.`,
    profile: `At ${iq}, you can handle routine tasks, follow multi-step procedures, and learn practical skills effectively. While tasks requiring rapid abstract reasoning or very complex problem-solving may be more challenging, a wide range of meaningful and fulfilling professional and personal paths are fully within reach.`,
    context: `IQ scores between 90 and 109 are considered average and account for about 50% of the population. A score of ${iq} is within the normal range and should not be interpreted as a limitation. Motivation, emotional intelligence, creativity, and practical experience often matter more than raw IQ in most real-world outcomes.`,
    fields: ["Skilled trades", "Customer service", "Healthcare support", "Administrative roles", "Retail management", "Community work"],
  };

  if (iq >= 80) return {
    intro: `An IQ score of ${iq} falls at the ${pct}th percentile, in the ${cls.label} range. This means approximately ${pct}% of the population scores at or below this level. Scores in this range may require more time or practice for certain cognitively demanding tasks, but many people in this range live fully capable, productive lives.`,
    profile: `At ${iq}, you can manage practical daily tasks, learn hands-on skills, and contribute effectively in structured work environments. Success in this range is strongly tied to persistence, social skills, and finding roles that align with personal strengths rather than raw cognitive speed.`,
    context: `IQ is one of many factors that determine success. People in this score range often excel in roles requiring reliability, practical skill, interpersonal warmth, or physical capability. Many lead fulfilling lives in trades, community roles, and supportive professions.`,
    fields: ["Practical trades", "Support services", "Agricultural work", "Physical labor", "Community care", "Retail"],
  };

  return {
    intro: `An IQ score of ${iq} is at the ${pct}th percentile. Scores in this range reflect cognitive challenges that may benefit from tailored support and structured environments. Many people in this range live independently and contribute meaningfully to their communities with the right support.`,
    profile: `At ${iq}, tasks requiring complex abstract reasoning can be challenging. However, practical skills, emotional intelligence, social connection, and routine competencies remain fully within reach. Success is highly dependent on supportive environments and access to appropriate resources.`,
    context: `IQ scores below 80 represent a small portion of the population and may indicate a need for learning support. They are not deterministic of outcomes — many people in this range live full, independent, and meaningful lives. IQ measures a narrow slice of human capability.`,
    fields: ["Supported employment", "Community programs", "Practical skills work", "Arts and crafts", "Care environments"],
  };
}

function getFAQ(iq: number): Array<{ q: string; a: string }> {
  const pct = getPercentile(iq);
  const cls = getClassification(iq);

  return [
    {
      q: `Is an IQ of ${iq} good?`,
      a: `An IQ of ${iq} places you at the ${pct}th percentile, in the ${cls.label} range (${cls.band}). ${iq >= 110 ? `This is above average and reflects strong cognitive ability. Most professional and academic paths are well within reach.` : iq >= 90 ? `This is within the normal range. The average IQ is 100, so a score of ${iq} is entirely typical.` : `This is below average, but IQ measures only a narrow slice of human ability. Many other factors determine success and quality of life.`}`,
    },
    {
      q: `What percentile is IQ ${iq}?`,
      a: `An IQ of ${iq} corresponds to the ${pct}th percentile. This means that ${pct}% of the population scores at or below ${iq} under the same testing conditions. ${100 - pct}% of people score higher.`,
    },
    {
      q: `What does IQ ${iq} mean in terms of cognitive ability?`,
      a: `IQ ${iq} falls in the "${cls.label}" classification (${cls.band}). ${iq >= 130 ? "This reflects exceptional analytical reasoning, fast processing, and the ability to handle very high levels of cognitive complexity." : iq >= 120 ? "This reflects strong problem-solving skills, above-average processing speed, and the ability to master complex material efficiently." : iq >= 110 ? "This reflects solid reasoning ability, above-average comprehension, and competence across most demanding cognitive tasks." : iq >= 90 ? "This reflects typical cognitive function, sufficient for the vast majority of everyday tasks and professional environments." : "This score reflects below-average performance on standardized reasoning tasks. Other factors — creativity, emotional intelligence, experience — also play significant roles in life outcomes."}`,
    },
    {
      q: `Can IQ change from ${iq}?`,
      a: `IQ scores are not fixed. Research shows that targeted cognitive training, quality sleep, aerobic exercise, and reduced chronic stress can measurably improve performance on IQ-type tasks. Dual N-Back training in particular has been shown to increase working memory and fluid reasoning scores. A well-designed 30-day cognitive training protocol can produce meaningful gains.`,
    },
    {
      q: `How rare is an IQ of ${iq}?`,
      a: `${iq >= 130 ? `An IQ of ${iq} is rare — only about ${100 - pct}% of people score this high. It places you in the top ${100 - pct}% of the cognitive distribution.` : iq >= 110 ? `About ${100 - pct}% of people score above ${iq}, making it a relatively uncommon level of performance — you are in the top ${100 - pct}%.` : iq >= 90 ? `An IQ of ${iq} is fairly common — it falls within the normal range that encompasses about 50% of the population.` : `About ${pct}% of people score at or below ${iq}. This is below average but not extremely rare.`}`,
    },
  ];
}

// ── Metadata ────────────────────────────────────────────────────────────────
interface Props { params: Promise<{ score: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { score: scoreStr } = await params;
  const iq = parseInt(scoreStr);
  if (isNaN(iq) || iq < 70 || iq > 145) return {};

  const pct = getPercentile(iq);
  const cls = getClassification(iq);

  return {
    title: `IQ Score ${iq}: Meaning, Percentile & Classification | BrainScale`,
    description: `An IQ score of ${iq} places you at the ${pct}th percentile — ${cls.label} (${cls.band}). Learn what IQ ${iq} means, how rare it is, and what cognitive abilities it reflects.`,
    alternates: {
      canonical: `https://www.brainscale.app/iq-score/${iq}`,
      languages: {
        "en": `https://www.brainscale.app/iq-score/${iq}`,
        "fr": `https://www.brainscale.app/fr/iq-score/${iq}`,
        "x-default": `https://www.brainscale.app/iq-score/${iq}`,
      },
    },
    openGraph: {
      title: `IQ Score ${iq}: What Does It Mean?`,
      description: `IQ ${iq} = ${pct}th percentile. ${cls.label} range. Learn what this score means and how it compares to the population.`,
      url: `https://www.brainscale.app/iq-score/${iq}`,
      type: "article",
    },
  };
}

// ── Page ────────────────────────────────────────────────────────────────────
export default async function IQScorePage({ params }: Props) {
  const { score: scoreStr } = await params;
  const iq = parseInt(scoreStr);
  if (isNaN(iq) || iq < 70 || iq > 145) notFound();

  const pct = getPercentile(iq);
  const cls = getClassification(iq);
  const gauge = getGaugePercent(iq);
  const content = getContent(iq);
  const faq = getFAQ(iq);

  const related = SCORES.filter(s => s !== iq && Math.abs(s - iq) <= 5 && Math.abs(s - iq) > 0)
    .sort((a, b) => Math.abs(a - iq) - Math.abs(b - iq))
    .slice(0, 6);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.brainscale.app" },
      { "@type": "ListItem", "position": 2, "name": "IQ Scores", "item": "https://www.brainscale.app/iq-score/100" },
      { "@type": "ListItem", "position": 3, "name": `IQ ${iq}`, "item": `https://www.brainscale.app/iq-score/${iq}` },
    ],
  };

  return (
    <div style={{ backgroundColor: "#FAF8F5", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HEADER */}
      <header style={{ backgroundColor: "#FAF8F5", borderBottom: "1px solid #E8E5DF", padding: "0 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1916", textDecoration: "none" }}>
            Brain<span style={{ color: "#C96442" }}>Scale</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link href="/blog" style={{ fontSize: "13px", color: "#C96442", fontWeight: 600, textDecoration: "none" }}>Blog</Link>
            <Link href="/test" style={{ backgroundColor: "#C96442", color: "#fff", padding: "8px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
              Take the test →
            </Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* BREADCRUMB */}
        <nav style={{ fontSize: "12px", color: "#99958C", marginBottom: "32px" }}>
          <Link href="/" style={{ color: "#99958C", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/iq-score/100" style={{ color: "#99958C", textDecoration: "none" }}>IQ Scores</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#1A1916" }}>IQ {iq}</span>
        </nav>

        {/* HERO */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", color: "#99958C", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "16px" }}>
            IQ Score Analysis
          </p>
          <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(80px, 15vw, 112px)", fontWeight: 300, color: "#C96442", lineHeight: 1, marginBottom: "16px" }}>
            {iq}
          </div>
          <div style={{ display: "inline-block", backgroundColor: cls.color, color: "#fff", padding: "8px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "12px" }}>
            {cls.label}
          </div>
          <p style={{ fontSize: "15px", color: "#5C5A52", margin: "0 auto", lineHeight: 1.6 }}>
            {pct}th percentile · {cls.band} worldwide
          </p>
        </div>

        {/* GAUGE */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "16px", padding: "28px 32px", marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1A1916" }}>Position on the IQ scale</span>
            <span style={{ fontSize: "12px", color: "#99958C" }}>70 — 145</span>
          </div>
          <div style={{ height: "8px", backgroundColor: "#F0EDE6", borderRadius: "999px", overflow: "hidden", marginBottom: "8px" }}>
            <div style={{ height: "100%", width: `${gauge}%`, borderRadius: "999px", background: "linear-gradient(90deg, #E8C4B4, #C96442)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#E8C4B4" }}>
            <span>70</span><span>85</span><span>100</span><span>115</span><span>130</span><span>145</span>
          </div>
        </div>

        {/* STATS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "32px" }}>
          {[
            { value: `${pct}th`, label: "Percentile", sub: "worldwide" },
            { value: cls.label, label: "Classification", sub: cls.band },
            { value: `${100 - pct}%`, label: "Score higher", sub: "than you" },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "12px", padding: "20px 16px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "22px", fontWeight: 500, color: "#C96442" }}>{s.value}</div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#1A1916", marginTop: "4px" }}>{s.label}</div>
              <div style={{ fontSize: "11px", color: "#99958C", marginTop: "2px" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* WHAT IT MEANS */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "16px", padding: "32px", marginBottom: "16px" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1916", marginBottom: "16px" }}>
            What does an IQ of {iq} mean?
          </h2>
          <p style={{ fontSize: "15px", color: "#5C5A52", lineHeight: 1.8, marginBottom: "16px" }}>{content.intro}</p>
          <p style={{ fontSize: "15px", color: "#5C5A52", lineHeight: 1.8 }}>{content.profile}</p>
        </div>

        {/* POPULATION CONTEXT */}
        <div style={{ backgroundColor: "#FBF0EB", border: "1px solid #E8C4B4", borderRadius: "16px", padding: "32px", marginBottom: "16px" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1916", marginBottom: "16px" }}>
            Population context
          </h2>
          <p style={{ fontSize: "15px", color: "#5C5A52", lineHeight: 1.8, marginBottom: "20px" }}>{content.context}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {content.fields.map(f => (
              <span key={f} style={{ backgroundColor: "#fff", border: "1px solid #E8C4B4", color: "#C96442", padding: "5px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 }}>{f}</span>
            ))}
          </div>
        </div>

        {/* IQ CLASSIFICATION TABLE */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "16px", padding: "32px", marginBottom: "16px" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1916", marginBottom: "20px" }}>
            IQ classification scale
          </h2>
          {[
            { range: "130–145", label: "Gifted", band: "Top 2%", current: iq >= 130 },
            { range: "120–129", label: "Superior", band: "Top 9%", current: iq >= 120 && iq < 130 },
            { range: "110–119", label: "Above Average", band: "Top 25%", current: iq >= 110 && iq < 120 },
            { range: "90–109", label: "Average", band: "Middle 50%", current: iq >= 90 && iq < 110 },
            { range: "80–89", label: "Below Average", band: "Bottom 25%", current: iq >= 80 && iq < 90 },
            { range: "70–79", label: "Low", band: "Bottom 9%", current: iq < 80 },
          ].map((row) => (
            <div key={row.range} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: "8px", marginBottom: "4px", backgroundColor: row.current ? "#FBF0EB" : "transparent", border: row.current ? "1px solid #E8C4B4" : "1px solid transparent" }}>
              <span style={{ fontSize: "13px", fontWeight: row.current ? 700 : 400, color: row.current ? "#C96442" : "#5C5A52", minWidth: "80px" }}>{row.range}</span>
              <span style={{ fontSize: "13px", fontWeight: row.current ? 700 : 500, color: row.current ? "#C96442" : "#1A1916", flex: 1, textAlign: "center" }}>{row.label}</span>
              <span style={{ fontSize: "12px", color: row.current ? "#C96442" : "#99958C", minWidth: "80px", textAlign: "right" }}>{row.band}</span>
              {row.current && <span style={{ marginLeft: "8px", fontSize: "11px", fontWeight: 700, color: "#C96442" }}>← You</span>}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "16px", padding: "32px", marginBottom: "16px" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1916", marginBottom: "24px" }}>
            Frequently asked questions
          </h2>
          {faq.map(({ q, a }, i) => (
            <div key={i} style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: i < faq.length - 1 ? "1px solid #F0EEE8" : "none" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1A1916", marginBottom: "8px" }}>{q}</h3>
              <p style={{ fontSize: "14px", color: "#5C5A52", lineHeight: 1.7, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        {/* RELATED SCORES */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DF", borderRadius: "16px", padding: "28px 32px", marginBottom: "32px" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "17px", fontWeight: 500, color: "#1A1916", marginBottom: "16px" }}>
            Related IQ scores
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {related.map(s => (
              <Link key={s} href={`/iq-score/${s}`} style={{ backgroundColor: "#FAF8F5", border: "1px solid #E8E5DF", color: "#C96442", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                IQ {s}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ backgroundColor: "#1A1916", borderRadius: "16px", padding: "40px 32px", textAlign: "center" }}>
          <p style={{ fontSize: "11px", color: "rgba(185,172,255,0.7)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>
            Find out your score
          </p>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "24px", fontWeight: 400, color: "#fff", marginBottom: "12px", lineHeight: 1.4 }}>
            What is your IQ?
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", marginBottom: "28px", lineHeight: 1.6 }}>
            40 questions · ~20 minutes · Instant results · Free
          </p>
          <Link href="/test" style={{ display: "inline-block", backgroundColor: "#C96442", color: "#fff", padding: "16px 40px", borderRadius: "8px", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
            Take the free IQ test →
          </Link>
        </div>

      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E8E5DF", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "10px", flexWrap: "wrap" }}>
          <Link href="/" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>Home</Link>
          <Link href="/blog" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>Blog</Link>
          <Link href="/test" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>IQ Test</Link>
          <Link href="/privacy" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>Privacy</Link>
          <Link href="/terms" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>Terms</Link>
          <Link href={`/fr/iq-score/${iq}`} style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>Français</Link>
        </div>
        <p style={{ fontSize: "11px", color: "#E8C4B4" }}>© 2026 BrainScale · Not a clinical assessment</p>
      </footer>
    </div>
  );
}
