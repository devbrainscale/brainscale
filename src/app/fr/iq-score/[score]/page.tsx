import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// ── Plage de scores : 70–145 ────────────────────────────────────────────────
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
  if (iq >= 130) return { label: "Surdoué", color: "#5B4FCF", band: "Top 2 %" };
  if (iq >= 120) return { label: "Supérieur", color: "#4A3EBE", band: "Top 9 %" };
  if (iq >= 110) return { label: "Au-dessus de la moyenne", color: "#6B5FD9", band: "Top 25 %" };
  if (iq >= 90)  return { label: "Moyen", color: "#8B7FE8", band: "Milieu 50 %" };
  if (iq >= 80)  return { label: "Sous la moyenne", color: "#9896A8", band: "Bas 25 %" };
  return { label: "Faible", color: "#B0AEC0", band: "Bas 9 %" };
}

function getGaugePercent(iq: number): number {
  return Math.min(100, Math.max(0, ((iq - 70) / 75) * 100));
}

function getContent(iq: number): { intro: string; profile: string; context: string; fields: string[] } {
  const pct = getPercentile(iq);
  const cls = getClassification(iq);

  if (iq >= 140) return {
    intro: `Un score de QI de ${iq} vous place au ${pct}e percentile — un niveau de performance cognitive atteint par moins d'une personne sur 250. Les scores dans cette plage sont associés à un raisonnement abstrait exceptionnel, une reconnaissance quasi instantanée des schémas, et une capacité à construire des modèles mentaux d'une complexité extraordinaire. La plupart des tests standardisés ne peuvent pas mesurer de manière fiable à ce plafond.`,
    profile: `Les individus obtenant ${iq} démontrent généralement une rare facilité avec l'inférence logique en plusieurs étapes, la capacité à retenir et manipuler de nombreuses variables simultanément, et une saisie intuitive des relations structurelles entre domaines. Ce profil est couramment associé à des réalisations en physique théorique, mathématiques, philosophie de l'esprit et disciplines stratégiques d'élite.`,
    context: `Un score de ${iq} dépasse le seuil d'admission aux sociétés à QI élevé les plus sélectives, dont Mensa (top 2 %), Intertel (top 1 %) et la Triple Nine Society (top 0,1 %). Il reflète non seulement la vitesse de raisonnement brute, mais une différence qualitative dans la façon dont les problèmes sont décomposés et résolus.`,
    fields: ["Recherche théorique", "Mathématiques avancées", "Sciences cognitives", "Conseil stratégique", "Philosophie", "Ingénierie d'élite"],
  };

  if (iq >= 130) return {
    intro: `Un score de QI de ${iq} vous place au ${pct}e percentile — soit environ ${100 - pct} % des personnes obtiennent un score inférieur dans des conditions équivalentes. Cela vous place fermement dans la catégorie ${cls.label}, une catégorie qui ne représente que 2 % de la population mondiale. Les scores à ce niveau reflètent une relation mesurément différente avec la complexité.`,
    profile: `À ${iq}, le raisonnement fluide opère à un niveau où les problèmes nouveaux sont décomposés rapidement et avec précision. La capacité de mémoire de travail est généralement suffisamment grande pour retenir des structures de problèmes entières en même temps, réduisant le coût cognitif de l'inférence en plusieurs étapes. Cela se manifeste par une capacité constante à voir plus loin que ses pairs et à opérer efficacement sans échafaudage externe.`,
    context: `Un QI de ${iq} dépasse le seuil minimum pour l'adhésion à Mensa (top 2 %) et est associé à une réussite académique élevée, une distinction professionnelle, et une production créative inhabituelle. Les recherches montrent constamment que les scores au-dessus de 130 prédisent non seulement la réussite académique, mais aussi l'émergence de leaders et le succès entrepreneurial.`,
    fields: ["Recherche académique", "Médecine", "Droit", "Direction technologique", "Finance", "Direction créative"],
  };

  if (iq >= 120) return {
    intro: `Un score de QI de ${iq} vous place au ${pct}e percentile mondial — devant environ ${pct} % de la population. Cela correspond à la catégorie ${cls.label}, une bande occupée par environ 9 % des personnes. Il reflète une forte capacité analytique, un traitement efficace, et une facilité supérieure à la moyenne pour le raisonnement quantitatif et verbal.`,
    profile: `Un score de ${iq} est associé à la capacité de maîtriser des matières complexes relativement rapidement, d'identifier des schémas non évidents, et de raisonner efficacement dans des conditions d'information incomplète. Les individus dans cette plage ont tendance à bien performer dans des environnements qui récompensent la pensée structurée et la résolution de problèmes indépendante.`,
    context: `À ${iq}, vous êtes bien au-dessus du seuil cognitif requis pour la plupart des cursus professionnels et académiques. Les recherches de la psychologue Linda Gottfredson suggèrent que les scores supérieurs à 120 correspondent à la capacité de gérer les exigences théoriques de la plupart des disciplines de niveau master sans effort exceptionnel.`,
    fields: ["Ingénierie", "Droit", "Médecine", "Recherche", "Architecture", "Science des données", "Stratégie d'entreprise"],
  };

  if (iq >= 110) return {
    intro: `Un score de QI de ${iq} vous place au ${pct}e percentile — au-dessus de la majorité de la population. C'est la catégorie ${cls.label}, représentant les 25 % supérieurs des performeurs cognitifs. Les scores dans cette plage reflètent une solide capacité de raisonnement, une vitesse de traitement supérieure à la moyenne, et une bonne capacité de pensée abstraite.`,
    profile: `À ${iq}, vous pouvez gérer des tâches cognitivement exigeantes avec une relative aisance. Cette plage est associée à de bonnes performances académiques, une compétence professionnelle dans un large éventail de carrières, et la capacité à apprendre de nouvelles compétences efficacement. C'est la plage de scores la plus courante parmi les diplômés universitaires de programmes sélectifs.`,
    context: `Un score de ${iq} est suffisant pour réussir dans pratiquement toutes les disciplines professionnelles, y compris la plupart de celles considérées comme cognitivement exigeantes. Il représente un avantage significatif et pratique en termes de vitesse d'apprentissage, de qualité de résolution de problèmes, et de prise de décision dans l'incertitude.`,
    fields: ["La plupart des domaines professionnels", "Enseignement universitaire", "Rôles techniques", "Management", "Santé", "Enseignement"],
  };

  if (iq >= 100) return {
    intro: `Un score de QI de ${iq} est à ou légèrement au-dessus de la moyenne de la population de 100. Vous êtes au ${pct}e percentile — soit environ la moitié des personnes obtiennent un score égal ou inférieur à ce niveau. Cela vous place dans la catégorie ${cls.label}, qui englobe le plus grand segment de la population.`,
    profile: `Les scores autour de ${iq} reflètent une solide capacité de raisonnement quotidien. Vous pouvez gérer la plupart des tâches nécessitant une pensée logique, suivre des instructions complexes de manière fiable, et apprendre de nouvelles matières à un rythme confortable. C'est la plage dans laquelle la plupart des gens fonctionnent avec succès dans une grande variété de contextes de vie et professionnels.`,
    context: `Le QI moyen est défini comme 100, avec un écart-type de 15. Un score de ${iq} se situe dans un écart-type de la moyenne et est typique de la population générale. La grande majorité des carrières et des parcours éducatifs sont pleinement accessibles à ce niveau.`,
    fields: ["Professions artisanales", "Vente", "Administration", "Industries de services", "Nombreux rôles techniques", "Arts et artisanat"],
  };

  if (iq >= 90) return {
    intro: `Un score de QI de ${iq} se situe dans la catégorie ${cls.label}, au ${pct}e percentile. Cela signifie qu'environ ${pct} % des personnes obtiennent un score égal ou inférieur à ce niveau. Les scores dans cette plage sont tout à fait normaux et représentent un niveau de performance cognitive entièrement fonctionnel pour la vie quotidienne et la plupart des contextes professionnels.`,
    profile: `À ${iq}, vous pouvez gérer des tâches courantes, suivre des procédures en plusieurs étapes, et apprendre des compétences pratiques efficacement. Bien que les tâches nécessitant un raisonnement abstrait rapide ou une résolution de problèmes très complexe puissent être plus difficiles, un large éventail de parcours professionnels et personnels significatifs et épanouissants sont pleinement à portée.`,
    context: `Les scores de QI entre 90 et 109 sont considérés comme moyens et représentent environ 50 % de la population. Un score de ${iq} se situe dans la plage normale et ne doit pas être interprété comme une limitation. La motivation, l'intelligence émotionnelle, la créativité et l'expérience pratique comptent souvent plus que le QI brut dans la plupart des résultats réels.`,
    fields: ["Métiers qualifiés", "Service client", "Support en santé", "Rôles administratifs", "Gestion commerciale", "Travail communautaire"],
  };

  if (iq >= 80) return {
    intro: `Un score de QI de ${iq} se situe au ${pct}e percentile, dans la catégorie ${cls.label}. Cela signifie qu'environ ${pct} % de la population obtient un score égal ou inférieur à ce niveau. Les scores dans cette plage peuvent nécessiter plus de temps ou de pratique pour certaines tâches cognitivement exigeantes, mais de nombreuses personnes dans cette plage mènent des vies pleinement compétentes et productives.`,
    profile: `À ${iq}, vous pouvez gérer les tâches pratiques quotidiennes, apprendre des compétences manuelles, et contribuer efficacement dans des environnements de travail structurés. Le succès dans cette plage est fortement lié à la persévérance, aux compétences sociales, et au fait de trouver des rôles qui correspondent aux forces personnelles plutôt qu'à la vitesse cognitive brute.`,
    context: `Le QI n'est qu'un des nombreux facteurs qui déterminent le succès. Les personnes dans cette plage de scores excellent souvent dans des rôles nécessitant fiabilité, compétence pratique, chaleur interpersonnelle, ou capacité physique. Beaucoup mènent des vies épanouissantes dans les métiers, les rôles communautaires, et les professions de soutien.`,
    fields: ["Métiers pratiques", "Services de soutien", "Travail agricole", "Travail physique", "Soins communautaires", "Commerce de détail"],
  };

  return {
    intro: `Un score de QI de ${iq} se situe au ${pct}e percentile. Les scores dans cette plage reflètent des défis cognitifs qui peuvent bénéficier d'un soutien adapté et d'environnements structurés. De nombreuses personnes dans cette plage vivent de manière indépendante et contribuent de manière significative à leurs communautés avec le bon soutien.`,
    profile: `À ${iq}, les tâches nécessitant un raisonnement abstrait complexe peuvent être difficiles. Cependant, les compétences pratiques, l'intelligence émotionnelle, la connexion sociale et les compétences de routine restent pleinement accessibles. Le succès dépend fortement d'environnements favorables et de l'accès aux ressources appropriées.`,
    context: `Les scores de QI inférieurs à 80 représentent une petite portion de la population et peuvent indiquer un besoin de soutien à l'apprentissage. Ils ne sont pas déterministes des résultats — de nombreuses personnes dans cette plage mènent des vies pleines, indépendantes et significatives. Le QI mesure une tranche étroite de la capacité humaine.`,
    fields: ["Emploi accompagné", "Programmes communautaires", "Travail de compétences pratiques", "Arts et artisanat", "Environnements de soins"],
  };
}

function getFAQ(iq: number): Array<{ q: string; a: string }> {
  const pct = getPercentile(iq);
  const cls = getClassification(iq);

  return [
    {
      q: `Un QI de ${iq} est-il bon ?`,
      a: `Un QI de ${iq} vous place au ${pct}e percentile, dans la catégorie ${cls.label} (${cls.band}). ${iq >= 110 ? `C'est au-dessus de la moyenne et reflète une forte capacité cognitive. La plupart des parcours professionnels et académiques sont bien à votre portée.` : iq >= 90 ? `C'est dans la plage normale. Le QI moyen est de 100, donc un score de ${iq} est tout à fait typique.` : `C'est en dessous de la moyenne, mais le QI ne mesure qu'une tranche étroite de la capacité humaine. De nombreux autres facteurs déterminent le succès et la qualité de vie.`}`,
    },
    {
      q: `Quel percentile correspond à un QI de ${iq} ?`,
      a: `Un QI de ${iq} correspond au ${pct}e percentile. Cela signifie que ${pct} % de la population obtient un score égal ou inférieur à ${iq} dans les mêmes conditions de test. ${100 - pct} % des personnes obtiennent un score plus élevé.`,
    },
    {
      q: `Que signifie un QI de ${iq} en termes de capacités cognitives ?`,
      a: `Un QI de ${iq} correspond à la classification « ${cls.label} » (${cls.band}). ${iq >= 130 ? "Cela reflète un raisonnement analytique exceptionnel, un traitement rapide et la capacité de gérer des niveaux très élevés de complexité cognitive." : iq >= 120 ? "Cela reflète de solides compétences en résolution de problèmes, une vitesse de traitement supérieure à la moyenne et la capacité de maîtriser des matières complexes efficacement." : iq >= 110 ? "Cela reflète une solide capacité de raisonnement, une compréhension supérieure à la moyenne et des compétences dans la plupart des tâches cognitives exigeantes." : iq >= 90 ? "Cela reflète une fonction cognitive typique, suffisante pour la grande majorité des tâches quotidiennes et des environnements professionnels." : "Ce score reflète des performances en dessous de la moyenne sur des tâches de raisonnement standardisées. D'autres facteurs — créativité, intelligence émotionnelle, expérience — jouent également un rôle significatif dans les résultats de vie."}`,
    },
    {
      q: `Le QI peut-il changer depuis ${iq} ?`,
      a: `Les scores de QI ne sont pas fixes. Les recherches montrent que l'entraînement cognitif ciblé, un sommeil de qualité, l'exercice aérobie et la réduction du stress chronique peuvent améliorer de manière mesurable les performances sur les tâches de type QI. L'entraînement Dual N-Back en particulier a montré qu'il augmente la mémoire de travail et les scores de raisonnement fluide. Un protocole d'entraînement cognitif bien conçu sur 30 jours peut produire des gains significatifs.`,
    },
    {
      q: `À quel point un QI de ${iq} est-il rare ?`,
      a: `${iq >= 130 ? `Un QI de ${iq} est rare — seulement environ ${100 - pct} % des personnes obtiennent un score aussi élevé. Cela vous place dans le top ${100 - pct} % de la distribution cognitive.` : iq >= 110 ? `Environ ${100 - pct} % des personnes obtiennent un score supérieur à ${iq}, ce qui en fait un niveau de performance relativement peu commun — vous êtes dans le top ${100 - pct} %.` : iq >= 90 ? `Un QI de ${iq} est assez commun — il se situe dans la plage normale qui englobe environ 50 % de la population.` : `Environ ${pct} % des personnes obtiennent un score égal ou inférieur à ${iq}. C'est en dessous de la moyenne mais pas extrêmement rare.`}`,
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
    title: `QI ${iq} : Signification, Percentile & Classification | BrainScale`,
    description: `Un score de QI de ${iq} vous place au ${pct}e percentile — ${cls.label} (${cls.band}). Découvrez ce que signifie un QI de ${iq}, à quel point c'est rare, et quelles capacités cognitives il reflète.`,
    alternates: {
      canonical: `https://www.brainscale.app/fr/iq-score/${iq}`,
      languages: {
        "en": `https://www.brainscale.app/iq-score/${iq}`,
        "fr": `https://www.brainscale.app/fr/iq-score/${iq}`,
        "x-default": `https://www.brainscale.app/iq-score/${iq}`,
      },
    },
    openGraph: {
      title: `QI ${iq} : Que signifie ce score ?`,
      description: `QI ${iq} = ${pct}e percentile. Catégorie ${cls.label}. Découvrez ce que ce score signifie et comment il se compare à la population.`,
      url: `https://www.brainscale.app/fr/iq-score/${iq}`,
      type: "article",
    },
  };
}

// ── Page ────────────────────────────────────────────────────────────────────
export default async function IQScorePageFr({ params }: Props) {
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
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.brainscale.app/fr" },
      { "@type": "ListItem", "position": 2, "name": "Scores QI", "item": "https://www.brainscale.app/fr/iq-score/100" },
      { "@type": "ListItem", "position": 3, "name": `QI ${iq}`, "item": `https://www.brainscale.app/fr/iq-score/${iq}` },
    ],
  };

  return (
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HEADER */}
      <header style={{ backgroundColor: "#F7F6F2", borderBottom: "1px solid #E8E5DC", padding: "0 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/fr" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1825", textDecoration: "none" }}>
            Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
          </Link>
          <Link href="/fr/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "8px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
            Passer le test →
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* BREADCRUMB */}
        <nav style={{ fontSize: "12px", color: "#9896A8", marginBottom: "32px" }}>
          <Link href="/fr" style={{ color: "#9896A8", textDecoration: "none" }}>Accueil</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/fr/iq-score/100" style={{ color: "#9896A8", textDecoration: "none" }}>Scores QI</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#1A1825" }}>QI {iq}</span>
        </nav>

        {/* HERO */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", color: "#9896A8", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "16px" }}>
            Analyse du score QI
          </p>
          <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(80px, 15vw, 112px)", fontWeight: 300, color: "#5B4FCF", lineHeight: 1, marginBottom: "16px" }}>
            {iq}
          </div>
          <div style={{ display: "inline-block", backgroundColor: cls.color, color: "#fff", padding: "8px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "12px" }}>
            {cls.label}
          </div>
          <p style={{ fontSize: "15px", color: "#5C5A6E", margin: "0 auto", lineHeight: 1.6 }}>
            {pct}e percentile · {cls.band} dans le monde
          </p>
        </div>

        {/* GAUGE */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "16px", padding: "28px 32px", marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1A1825" }}>Position sur l'échelle de QI</span>
            <span style={{ fontSize: "12px", color: "#9896A8" }}>70 — 145</span>
          </div>
          <div style={{ height: "8px", backgroundColor: "#EFEDE6", borderRadius: "999px", overflow: "hidden", marginBottom: "8px" }}>
            <div style={{ height: "100%", width: `${gauge}%`, borderRadius: "999px", background: "linear-gradient(90deg, #C4BBFF, #5B4FCF)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#C4BBFF" }}>
            <span>70</span><span>85</span><span>100</span><span>115</span><span>130</span><span>145</span>
          </div>
        </div>

        {/* STATS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "32px" }}>
          {[
            { value: `${pct}e`, label: "Percentile", sub: "dans le monde" },
            { value: cls.label, label: "Classification", sub: cls.band },
            { value: `${100 - pct} %`, label: "Scorent plus haut", sub: "que vous" },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "12px", padding: "20px 16px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "22px", fontWeight: 500, color: "#5B4FCF" }}>{s.value}</div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#1A1825", marginTop: "4px" }}>{s.label}</div>
              <div style={{ fontSize: "11px", color: "#9896A8", marginTop: "2px" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* WHAT IT MEANS */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "16px", padding: "32px", marginBottom: "16px" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1825", marginBottom: "16px" }}>
            Que signifie un QI de {iq} ?
          </h2>
          <p style={{ fontSize: "15px", color: "#5C5A6E", lineHeight: 1.8, marginBottom: "16px" }}>{content.intro}</p>
          <p style={{ fontSize: "15px", color: "#5C5A6E", lineHeight: 1.8 }}>{content.profile}</p>
        </div>

        {/* POPULATION CONTEXT */}
        <div style={{ backgroundColor: "#EDE9FF", border: "1px solid #C4BBFF", borderRadius: "16px", padding: "32px", marginBottom: "16px" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1825", marginBottom: "16px" }}>
            Contexte populationnel
          </h2>
          <p style={{ fontSize: "15px", color: "#5C5A6E", lineHeight: 1.8, marginBottom: "20px" }}>{content.context}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {content.fields.map(f => (
              <span key={f} style={{ backgroundColor: "#fff", border: "1px solid #C4BBFF", color: "#5B4FCF", padding: "5px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 }}>{f}</span>
            ))}
          </div>
        </div>

        {/* IQ CLASSIFICATION TABLE */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "16px", padding: "32px", marginBottom: "16px" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1825", marginBottom: "20px" }}>
            Échelle de classification du QI
          </h2>
          {[
            { range: "130–145", label: "Surdoué", band: "Top 2 %", current: iq >= 130 },
            { range: "120–129", label: "Supérieur", band: "Top 9 %", current: iq >= 120 && iq < 130 },
            { range: "110–119", label: "Au-dessus de la moyenne", band: "Top 25 %", current: iq >= 110 && iq < 120 },
            { range: "90–109", label: "Moyen", band: "Milieu 50 %", current: iq >= 90 && iq < 110 },
            { range: "80–89", label: "Sous la moyenne", band: "Bas 25 %", current: iq >= 80 && iq < 90 },
            { range: "70–79", label: "Faible", band: "Bas 9 %", current: iq < 80 },
          ].map((row) => (
            <div key={row.range} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: "8px", marginBottom: "4px", backgroundColor: row.current ? "#EDE9FF" : "transparent", border: row.current ? "1px solid #C4BBFF" : "1px solid transparent" }}>
              <span style={{ fontSize: "13px", fontWeight: row.current ? 700 : 400, color: row.current ? "#5B4FCF" : "#5C5A6E", minWidth: "80px" }}>{row.range}</span>
              <span style={{ fontSize: "13px", fontWeight: row.current ? 700 : 500, color: row.current ? "#5B4FCF" : "#1A1825", flex: 1, textAlign: "center" }}>{row.label}</span>
              <span style={{ fontSize: "12px", color: row.current ? "#5B4FCF" : "#9896A8", minWidth: "80px", textAlign: "right" }}>{row.band}</span>
              {row.current && <span style={{ marginLeft: "8px", fontSize: "11px", fontWeight: 700, color: "#5B4FCF" }}>← Vous</span>}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "16px", padding: "32px", marginBottom: "16px" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1825", marginBottom: "24px" }}>
            Questions fréquentes
          </h2>
          {faq.map(({ q, a }, i) => (
            <div key={i} style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: i < faq.length - 1 ? "1px solid #F0EEE8" : "none" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1A1825", marginBottom: "8px" }}>{q}</h3>
              <p style={{ fontSize: "14px", color: "#5C5A6E", lineHeight: 1.7, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        {/* RELATED SCORES */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #E8E5DC", borderRadius: "16px", padding: "28px 32px", marginBottom: "32px" }}>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "17px", fontWeight: 500, color: "#1A1825", marginBottom: "16px" }}>
            Scores QI proches
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {related.map(s => (
              <Link key={s} href={`/fr/iq-score/${s}`} style={{ backgroundColor: "#F7F6F2", border: "1px solid #E8E5DC", color: "#5B4FCF", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                QI {s}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ backgroundColor: "#1A1825", borderRadius: "16px", padding: "40px 32px", textAlign: "center" }}>
          <p style={{ fontSize: "11px", color: "rgba(185,172,255,0.7)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>
            Découvrez votre score
          </p>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "24px", fontWeight: 400, color: "#fff", marginBottom: "12px", lineHeight: 1.4 }}>
            Quel est votre QI ?
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", marginBottom: "28px", lineHeight: 1.6 }}>
            40 questions · ~20 minutes · Résultats instantanés · Gratuit
          </p>
          <Link href="/fr/test" style={{ display: "inline-block", backgroundColor: "#5B4FCF", color: "#fff", padding: "16px 40px", borderRadius: "8px", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
            Passer le test QI gratuit →
          </Link>
        </div>

      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E8E5DC", padding: "24px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", color: "#9896A8" }}>
          <Link href="/fr" style={{ color: "#9896A8", textDecoration: "none" }}>BrainScale</Link>
          {" · "}
          <Link href="/privacy" style={{ color: "#9896A8", textDecoration: "none" }}>Confidentialité</Link>
          {" · "}
          <Link href="/terms" style={{ color: "#9896A8", textDecoration: "none" }}>Conditions</Link>
          {" · Pas une évaluation clinique"}
        </p>
      </footer>
    </div>
  );
}
