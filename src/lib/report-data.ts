// ─── Design-system palette ───────────────────────────────────────────────────
export const DS = {
  TER:   '#C96442',
  CREAM: '#FAF8F5',
  INK:   '#1A1916',
  RULE:  '#E8E5DF',
  GOLD:  '#B45309',
  WHITE: '#FFFFFF',
} as const;

// ─── Percentile ──────────────────────────────────────────────────────────────
export function getPercentile(score: number): number {
  if (score >= 145) return 99.9;
  if (score >= 140) return 99.6;
  if (score >= 135) return 99;
  if (score >= 130) return 98;
  if (score >= 125) return 95;
  if (score >= 120) return 91;
  if (score >= 115) return 84;
  if (score >= 110) return 75;
  if (score >= 105) return 63;
  if (score >= 100) return 50;
  if (score >= 95)  return 37;
  if (score >= 90)  return 25;
  if (score >= 85)  return 16;
  if (score >= 80)  return 9;
  return 5;
}

// ─── Tier ────────────────────────────────────────────────────────────────────
export interface TierInfo {
  label:      string; labelFr:      string;
  desc:       string; descFr:       string;
  // Extended narrative for Score Overview
  narrative:  string; narrativeFr:  string;
  // Population comparison line
  comparison: string; comparisonFr: string;
  // Real-world implication
  implication: string; implicationFr: string;
}

export function getTierInfo(score: number): TierInfo {
  if (score >= 130) return {
    label:   'Gifted', labelFr: 'Surdoué',
    desc:    'You rank in the top 2% of the global population. Exceptional capacity for abstract reasoning, pattern recognition and multi-domain synthesis.',
    descFr:  'Vous figurez dans le top 2 % de la population mondiale. Capacité exceptionnelle de raisonnement abstrait, de reconnaissance de patterns et de synthèse multi-domaines.',
    narrative:  `A score of ${score} places you well within the gifted range — a threshold reached by fewer than 1 in 50 people worldwide. At this level, the brain demonstrates a qualitatively different mode of processing: it does not simply work faster, it builds richer internal models, tolerates greater complexity without losing coherence, and finds connections across domains that remain invisible to most. Research on individuals in this range consistently shows advantages in long-term memory organisation, metacognitive awareness (thinking about thinking), and the ability to simultaneously hold and manipulate abstract representations. These are not incremental advantages — they represent a fundamentally different cognitive architecture.`,
    narrativeFr: `Un score de ${score} vous place bien dans la zone surdouée — un seuil atteint par moins de 1 personne sur 50 dans le monde. À ce niveau, le cerveau démontre un mode de traitement qualitativement différent : il ne travaille pas simplement plus vite, il construit des modèles internes plus riches, tolère une complexité plus grande sans perdre la cohérence, et trouve des connexions entre domaines qui restent invisibles pour la plupart. Les recherches sur les individus dans cette fourchette montrent des avantages dans l'organisation de la mémoire à long terme, la conscience métacognitive et la capacité à manipuler des représentations abstraites simultanément.`,
    comparison:  `Your score is higher than approximately 98% of the general population, and above the average measured for senior researchers, surgeons and appellate judges.`,
    comparisonFr: `Votre score est supérieur à environ 98 % de la population générale, et dépasse la moyenne mesurée chez les chercheurs seniors, chirurgiens et juges d'appel.`,
    implication:  `You are likely at your best when facing genuinely novel problems — situations where existing frameworks fail and first-principles thinking is required. Routine, highly structured tasks may feel cognitively under-stimulating. Environments that reward original synthesis, long-horizon thinking and cross-domain connection are where this profile produces its greatest output.`,
    implicationFr: `Vous êtes probablement à votre meilleur face à des problèmes genuinement nouveaux — des situations où les cadres existants échouent et où la réflexion à partir de premiers principes est nécessaire. Les tâches routinières peuvent sembler cognitivement sous-stimulantes. Les environnements qui récompensent la synthèse originale, la réflexion à long terme et les connexions inter-domaines sont là où ce profil produit son meilleur output.`,
  };

  if (score >= 120) return {
    label:   'Superior', labelFr: 'Supérieur',
    desc:    'You rank in the top 9% of the global population. Strong analytical and logical abilities, well above the population average.',
    descFr:  'Vous figurez dans le top 9 % de la population mondiale. Solides capacités analytiques et logiques, nettement au-dessus de la moyenne.',
    narrative:  `A score of ${score} places you firmly in the Superior range — a level shared by roughly 1 in 11 people. At this threshold, cognitive performance shifts noticeably above the population median. You process multi-step logical chains with relative ease, hold larger amounts of information in working memory during complex tasks, and tend to reach accurate conclusions faster than average. Research in occupational psychology associates this range with high performance in leadership, law, medicine, scientific research and advanced engineering. The gap between this level and the general population average is meaningful in everyday terms: it translates to faster learning curves, more efficient problem diagnosis and a greater capacity to navigate ambiguous situations.`,
    narrativeFr: `Un score de ${score} vous place fermement dans la tranche Supérieure — un niveau partagé par environ 1 personne sur 11. À ce seuil, les performances cognitives dépassent nettement la médiane de la population. Vous traitez des chaînes logiques multi-étapes avec une relative facilité, maintenez de plus grandes quantités d'informations en mémoire de travail lors de tâches complexes, et tendez à atteindre des conclusions précises plus rapidement que la moyenne. La recherche en psychologie du travail associe cette tranche à des performances élevées en leadership, droit, médecine, recherche scientifique et ingénierie avancée.`,
    comparison:  `Your score exceeds the average measured for medical doctors, attorneys and senior executives. It places you in the top quartile of university graduates.`,
    comparisonFr: `Votre score dépasse la moyenne mesurée chez les médecins, avocats et cadres supérieurs. Il vous place dans le quartile supérieur des diplômés universitaires.`,
    implication:  `You are likely to excel in roles requiring sustained analytical reasoning — strategy, diagnosis, complex negotiation, research or technical leadership. You learn new domains quickly and tend to identify logical inconsistencies that others overlook. You may find that your biggest performance gains come not from raw ability, but from developing structured frameworks that channel your analytical capacity towards the most important problems.`,
    implicationFr: `Vous êtes susceptible d'exceller dans des rôles nécessitant un raisonnement analytique soutenu — stratégie, diagnostic, négociation complexe, recherche ou leadership technique. Vous apprenez de nouveaux domaines rapidement et tendez à identifier des incohérences logiques que d'autres négligent. Vos plus grands gains de performance viennent souvent non de la capacité brute, mais du développement de cadres structurés pour canaliser cette capacité analytique.`,
  };

  if (score >= 110) return {
    label:   'Above Average', labelFr: 'Au-dessus de la moyenne',
    desc:    'You rank in the top 25% of the global population. Above-average reasoning capacity with a solid cognitive foundation.',
    descFr:  'Vous figurez dans le top 25 % de la population mondiale. Capacité de raisonnement supérieure à la moyenne, avec une base cognitive solide.',
    narrative:  `A score of ${score} places you in the Above Average range — a solid cognitive foundation shared by roughly 1 in 4 people. This range indicates reliable reasoning ability, good capacity for structured problem-solving, and the ability to handle complex information with consistency. Individuals in this range typically perform well in technically demanding roles and academic environments. The cognitive machinery is well-calibrated: you can hold multiple variables in mind, reason through multi-step problems and draw sound conclusions from incomplete information — skills that directly translate into professional effectiveness.`,
    narrativeFr: `Un score de ${score} vous place dans la tranche Au-dessus de la moyenne — une base cognitive solide partagée par environ 1 personne sur 4. Cette tranche indique une capacité de raisonnement fiable, une bonne capacité de résolution de problèmes structurés, et la capacité à traiter des informations complexes avec cohérence. Les individus dans cette tranche réussissent généralement bien dans des rôles techniquement exigeants et des environnements académiques.`,
    comparison:  `Your score places you above the general population average, and is comparable to the typical range for professionals in technical and managerial roles.`,
    comparisonFr: `Votre score vous place au-dessus de la moyenne de la population générale, comparable à la fourchette typique des professionnels dans des rôles techniques et managériaux.`,
    implication:  `You are likely to perform consistently well across a wide range of professional and intellectual challenges. Your cognitive profile suggests a person who learns methodically, applies logic reliably and builds sound analytical frameworks. The most effective development path focuses on deepening domain expertise — combining your solid reasoning foundation with specialised knowledge creates a compounding advantage over time.`,
    implicationFr: `Vous êtes susceptible de performer régulièrement bien dans un large éventail de défis professionnels et intellectuels. Votre profil cognitif suggère une personne qui apprend méthodiquement, applique la logique de façon fiable et construit des cadres analytiques solides. Le chemin de développement le plus efficace se concentre sur l'approfondissement de l'expertise de domaine.`,
  };

  if (score >= 90) return {
    label:   'Average', labelFr: 'Dans la moyenne',
    desc:    'Your score falls in the typical range, shared by approximately 68% of the global population.',
    descFr:  'Votre score se situe dans la plage typique, partagée par environ 68 % de la population mondiale.',
    narrative:  `A score of ${score} places you in the Average range — the cognitive profile shared by the majority of the population. This is a fully functional, well-rounded cognitive baseline. The average range is not a ceiling: many successful professionals, entrepreneurs and creatives operate in this range. What differentiates high performers here is not raw ability alone, but deliberate practice, domain expertise accumulated over time, effective metacognitive strategies and the intelligent application of tools and systems that extend cognitive capacity. The research on expertise consistently shows that structured, focused practice over years can functionally compensate for a wide range of initial aptitude differences.`,
    narrativeFr: `Un score de ${score} vous place dans la tranche Moyenne — le profil cognitif partagé par la majorité de la population. C'est une base cognitive pleinement fonctionnelle et équilibrée. La tranche moyenne n'est pas un plafond : de nombreux professionnels, entrepreneurs et créatifs réussis opèrent dans cette tranche. Ce qui différencie les hauts performeurs ici n'est pas la capacité brute seule, mais la pratique délibérée, l'expertise de domaine accumulée, les stratégies métacognitives efficaces et l'application intelligente d'outils qui étendent la capacité cognitive.`,
    comparison:  `Your score is in line with the broad majority of the population. Performance at this level is strongly influenced by motivation, domain expertise, learning habits and environment.`,
    comparisonFr: `Votre score est en ligne avec la grande majorité de la population. Les performances à ce niveau sont fortement influencées par la motivation, l'expertise de domaine, les habitudes d'apprentissage et l'environnement.`,
    implication:  `Focus on building depth in your chosen domain rather than breadth. Deliberate practice — specific, feedback-rich, progressively challenging — is the most reliable lever for cognitive development at this level. Sleep, exercise and structured learning habits have an outsized impact on effective cognitive performance.`,
    implicationFr: `Concentrez-vous sur l'approfondissement de votre domaine choisi plutôt que sur la largeur. La pratique délibérée — spécifique, riche en feedback, progressivement challengeante — est le levier le plus fiable pour le développement cognitif à ce niveau. Le sommeil, l'exercice et les habitudes d'apprentissage structurées ont un impact considérable sur les performances cognitives effectives.`,
  };

  return {
    label:   'Developing', labelFr: 'En développement',
    desc:    'Your score is below the population average. With targeted practice and cognitive training, meaningful improvement is achievable.',
    descFr:  'Votre score est en dessous de la moyenne. Avec un entraînement ciblé, une amélioration significative est tout à fait possible.',
    narrative:  `A score of ${score} falls below the population average — but this is a data point, not a verdict. Cognitive ability measured by IQ tests is meaningfully trainable, particularly in the 75–100 range where working memory and processing speed exercises have documented, replicable effects on test performance. Research shows average gains of 5–10 points are achievable with consistent, targeted training over 4–8 weeks. The development protocol in this report is designed specifically for this trajectory.`,
    narrativeFr: `Un score de ${score} se situe en dessous de la moyenne de la population — mais c'est un point de données, pas un verdict. La capacité cognitive mesurée par les tests de QI est significativement entraînable, particulièrement dans la tranche 75–100 où les exercices de mémoire de travail et de vitesse de traitement ont des effets documentés et reproductibles. Des gains moyens de 5 à 10 points sont atteignables avec un entraînement ciblé et régulier sur 4 à 8 semaines.`,
    comparison:  `Your score is below the general population average. The good news: cognitive training has the strongest documented effect in this range.`,
    comparisonFr: `Votre score est en dessous de la moyenne de la population générale. La bonne nouvelle : l'entraînement cognitif a l'effet documenté le plus fort dans cette tranche.`,
    implication:  `Daily structured cognitive training — particularly Dual N-Back and progressive matrix practice — has the greatest measurable impact at this level. Prioritise sleep (7–9 hours), aerobic exercise and reducing cognitive load in your environment. Retest in 6–8 weeks to measure progress.`,
    implicationFr: `L'entraînement cognitif structuré quotidien — notamment le Dual N-Back et la pratique de matrices progressives — a le plus grand impact mesurable à ce niveau. Priorisez le sommeil (7–9 heures), l'exercice aérobie et la réduction de la charge cognitive dans votre environnement.`,
  };
}

// ─── Architecture scores ─────────────────────────────────────────────────────
export interface ArchitectureScores {
  fluidReasoning:      number;
  workingMemory:       number;
  processingSpeed:     number;
  verbalComprehension: number;
}

export function getArchitectureScores(score: number, correct: number, total: number): ArchitectureScores {
  const ratio = total > 0 ? correct / total : 0.5;
  const clamp = (v: number) => Math.min(145, Math.max(75, Math.round(v)));
  return {
    fluidReasoning:      clamp(score * 1.02 - 2  + (ratio - 0.5) * 8),
    workingMemory:       clamp(score * 0.97 + 3  - (1 - ratio)  * 6),
    processingSpeed:     clamp(score * 0.95 + 4  + (ratio - 0.5) * 4),
    verbalComprehension: clamp(score * 1.01       + (ratio - 0.5) * 6),
  };
}

// ─── Architecture dimension interpretation ───────────────────────────────────
export interface DimensionDetail {
  label: string; labelFr: string;
  interpretation: string; interpretationFr: string;
}

export function getDimensionDetails(arch: ArchitectureScores): DimensionDetail[] {
  const interp = (score: number, dim: 'fr' | 'wm' | 'ps' | 'vc'): [string, string] => {
    const level = score >= 130 ? 'exceptional' : score >= 115 ? 'high' : score >= 100 ? 'average' : 'developing';
    const map: Record<typeof dim, Record<typeof level, [string, string]>> = {
      fr: {
        exceptional: [
          'Your fluid reasoning score is exceptional. You excel at detecting abstract patterns and solving problems you have never encountered before. This is the most "g-loaded" factor — the one most closely linked to general intelligence — and your score here reflects a strong capacity for first-principles thinking, scientific reasoning and strategic analysis.',
          'Votre score en raisonnement fluide est exceptionnel. Vous excellez à détecter des patterns abstraits et à résoudre des problèmes que vous n\'avez jamais rencontrés auparavant. C\'est le facteur le plus lié à l\'intelligence générale — et votre score reflète une forte capacité de réflexion à partir de premiers principes, de raisonnement scientifique et d\'analyse stratégique.',
        ],
        high: [
          'Your fluid reasoning score is strong. You handle novel, unstructured problems well and demonstrate good capacity for abstract thinking. You likely find pattern recognition relatively natural — whether in data, arguments or complex systems. This ability transfers directly to performance in analytical roles, strategic planning and technical problem-solving.',
          'Votre score en raisonnement fluide est fort. Vous gérez bien les problèmes nouveaux et non structurés et démontrez une bonne capacité de pensée abstraite. Cette capacité se transfère directement à la performance dans les rôles analytiques, la planification stratégique et la résolution de problèmes techniques.',
        ],
        average: [
          'Your fluid reasoning score is in the average range. You can navigate structured problems reliably, though complex novel situations may require more time and deliberate effort. Targeted practice with progressive matrix problems and logic puzzles can produce meaningful improvement in this dimension.',
          'Votre score en raisonnement fluide est dans la moyenne. Vous pouvez naviguer les problèmes structurés de façon fiable, bien que les situations nouvelles complexes puissent nécessiter plus de temps et d\'effort délibéré. La pratique ciblée avec des matrices progressives et des puzzles logiques peut produire une amélioration significative.',
        ],
        developing: [
          'Your fluid reasoning score is an area for development. This dimension responds well to deliberate practice — specifically Raven-style matrices and non-verbal reasoning exercises performed consistently over several weeks. Focus your training here for the highest return.',
          'Votre score en raisonnement fluide est un axe de développement. Cette dimension répond bien à la pratique délibérée — spécifiquement les matrices de type Raven et les exercices de raisonnement non verbal pratiqués régulièrement sur plusieurs semaines.',
        ],
      },
      wm: {
        exceptional: [
          'Your working memory score is exceptional. You can hold and manipulate large amounts of information simultaneously without losing track — a capability that underlies complex reasoning, multi-step planning and performance under cognitive load. This score predicts particularly strong performance in roles requiring sustained mental effort: law, surgery, advanced mathematics, complex negotiation.',
          'Votre score en mémoire de travail est exceptionnel. Vous pouvez maintenir et manipuler de grandes quantités d\'informations simultanément sans vous perdre — une capacité qui sous-tend le raisonnement complexe, la planification multi-étapes et la performance sous charge cognitive. Ce score prédit une performance particulièrement forte dans les rôles nécessitant un effort mental soutenu : droit, chirurgie, mathématiques avancées, négociation complexe.',
        ],
        high: [
          'Your working memory score is strong. You manage multi-step tasks and complex information chains well. When others begin to lose track in demanding conversations or layered analytical tasks, you tend to maintain coherence. This is a significant practical advantage in any role requiring sustained cognitive load.',
          'Votre score en mémoire de travail est fort. Vous gérez bien les tâches multi-étapes et les chaînes d\'informations complexes. Quand d\'autres commencent à se perdre dans des conversations exigeantes ou des tâches analytiques complexes, vous tendez à maintenir la cohérence. C\'est un avantage pratique significatif dans tout rôle nécessitant une charge cognitive soutenue.',
        ],
        average: [
          'Your working memory score is in the average range. You handle typical information loads well, though very complex multi-step tasks may occasionally require external support — notes, checklists, structured frameworks. Dual N-Back training (20 minutes, 4× per week) is the most evidence-backed method for improving this dimension.',
          'Votre score en mémoire de travail est dans la moyenne. Vous gérez bien les charges d\'informations typiques, bien que les tâches multi-étapes très complexes puissent occasionnellement nécessiter un support externe — notes, listes. L\'entraînement Dual N-Back (20 minutes, 4× par semaine) est la méthode la plus soutenue par la recherche pour améliorer cette dimension.',
        ],
        developing: [
          'Working memory is your highest-leverage development target. This dimension has the strongest training response of the four — consistent Dual N-Back practice over 4–6 weeks produces measurable gains that transfer to general cognitive performance. Prioritise this in your training protocol.',
          'La mémoire de travail est votre cible de développement à plus fort levier. Cette dimension a la réponse à l\'entraînement la plus forte des quatre — la pratique régulière du Dual N-Back sur 4 à 6 semaines produit des gains mesurables qui se transfèrent aux performances cognitives générales.',
        ],
      },
      ps: {
        exceptional: [
          'Your processing speed score is exceptional. You register, categorise and respond to new information faster than almost everyone. In practice, this means quicker reaction times, faster reading with high retention, and the ability to make accurate decisions under time pressure. Note that very high processing speed, combined with strong fluid reasoning, is a particularly powerful cognitive combination.',
          'Votre score en vitesse de traitement est exceptionnel. Vous enregistrez, catégorisez et répondez aux nouvelles informations plus rapidement que presque tout le monde. En pratique, cela signifie des temps de réaction plus rapides, une lecture plus rapide avec une haute rétention, et la capacité à prendre des décisions précises sous pression temporelle.',
        ],
        high: [
          'Your processing speed score is strong. You take in and categorise new information quickly, which accelerates learning curves and enables effective performance in fast-paced environments. This score suggests you rarely feel "overwhelmed" by information volume — your brain processes it efficiently.',
          'Votre score en vitesse de traitement est fort. Vous absorbez et catégorisez les nouvelles informations rapidement, ce qui accélère les courbes d\'apprentissage et permet une performance efficace dans les environnements rapides. Ce score suggère que vous vous sentez rarement "submergé" par le volume d\'informations.',
        ],
        average: [
          'Your processing speed is in the average range. Information processing at this level is reliable for typical demands. Speed can be improved through specific exercises: reaction time training, speed reading practice and Stroop tasks have measurable effects on this dimension over 3–4 weeks.',
          'Votre vitesse de traitement est dans la moyenne. Le traitement de l\'information à ce niveau est fiable pour les demandes typiques. La vitesse peut être améliorée par des exercices spécifiques : entraînement au temps de réaction, lecture rapide et tâches de Stroop ont des effets mesurables sur cette dimension en 3 à 4 semaines.',
        ],
        developing: [
          'Processing speed is an area for targeted improvement. Timed tasks — reaction games, speed arithmetic and Stroop exercises — are effective training tools. Regular aerobic exercise also has a well-documented positive effect on processing speed through improved neural efficiency.',
          'La vitesse de traitement est un axe d\'amélioration ciblée. Les tâches chronométrées — jeux de réaction, arithmétique rapide et exercices de Stroop — sont des outils d\'entraînement efficaces. L\'exercice aérobie régulier a également un effet positif bien documenté sur la vitesse de traitement.',
        ],
      },
      vc: {
        exceptional: [
          'Your verbal comprehension score is exceptional. You grasp nuanced language, extract precise meaning from complex text and articulate ideas with unusual clarity. This is the cognitive foundation for high-level reading, writing, communication and teaching. Strong verbal comprehension also correlates with broad accumulated knowledge and the ability to understand arguments at a structural level — identifying premises, assumptions and logical gaps with precision.',
          'Votre score en compréhension verbale est exceptionnel. Vous saisissez le langage nuancé, extrayez une signification précise de textes complexes et articulez les idées avec une clarté peu commune. C\'est la base cognitive pour la lecture, l\'écriture, la communication et l\'enseignement de haut niveau.',
        ],
        high: [
          'Your verbal comprehension score is strong. You understand complex language, follow sophisticated arguments and express yourself clearly. This score predicts strong performance in communication-heavy roles — management, law, writing, consulting, education — where the ability to understand and transmit complex ideas accurately is a core skill.',
          'Votre score en compréhension verbale est fort. Vous comprenez le langage complexe, suivez des arguments sophistiqués et vous exprimez clairement. Ce score prédit de bonnes performances dans les rôles à forte communication — management, droit, écriture, conseil, éducation.',
        ],
        average: [
          'Your verbal comprehension is in the average range. You handle typical language demands reliably. To improve this dimension, the most effective approach is deep reading: long-form non-fiction, complex arguments and deliberate vocabulary expansion through spaced repetition (Anki). Aim for one substantive text per week.',
          'Votre compréhension verbale est dans la moyenne. Vous gérez les demandes linguistiques typiques de façon fiable. Pour améliorer cette dimension, l\'approche la plus efficace est la lecture profonde : non-fiction longue, arguments complexes et expansion délibérée du vocabulaire par répétition espacée. Visez un texte substantiel par semaine.',
        ],
        developing: [
          'Verbal comprehension is an area for focused development. Daily reading of challenging material — well above your current comfort level — combined with active vocabulary building (Anki, 20 new words per week) produces consistent improvement. Write brief summaries of what you read to deepen retention.',
          'La compréhension verbale est un axe de développement ciblé. La lecture quotidienne de matériel challengeant — bien au-dessus de votre niveau de confort actuel — combinée à la construction active du vocabulaire (Anki, 20 nouveaux mots par semaine) produit une amélioration constante.',
        ],
      },
    };
    return map[dim][level];
  };

  return [
    { label: 'Fluid Reasoning', labelFr: 'Raisonnement fluide', interpretation: interp(arch.fluidReasoning, 'fr')[0], interpretationFr: interp(arch.fluidReasoning, 'fr')[1] },
    { label: 'Working Memory', labelFr: 'Mémoire de travail', interpretation: interp(arch.workingMemory, 'wm')[0], interpretationFr: interp(arch.workingMemory, 'wm')[1] },
    { label: 'Processing Speed', labelFr: 'Vitesse de traitement', interpretation: interp(arch.processingSpeed, 'ps')[0], interpretationFr: interp(arch.processingSpeed, 'ps')[1] },
    { label: 'Verbal Comprehension', labelFr: 'Compréhension verbale', interpretation: interp(arch.verbalComprehension, 'vc')[0], interpretationFr: interp(arch.verbalComprehension, 'vc')[1] },
  ];
}

// ─── Strengths ───────────────────────────────────────────────────────────────
export interface Strength {
  icon: string;
  title: string; titleFr: string;
  desc:  string; descFr:  string;
}

const STRENGTH_MAP: Record<keyof ArchitectureScores, Strength> = {
  fluidReasoning: {
    icon: '◈',
    title:   'Abstract Pattern Recognition',
    titleFr: 'Reconnaissance de patterns abstraits',
    desc:    'You excel at identifying relationships in novel situations, solving unfamiliar problems by detecting underlying structure. This ability — the core of fluid intelligence — allows you to navigate ambiguity without losing analytical rigour. It is the primary cognitive asset for roles in strategy, research, data science and systems design.',
    descFr:  'Vous excellez à identifier des relations dans des situations inédites, en détectant la structure sous-jacente. Cette capacité — le cœur de l\'intelligence fluide — vous permet de naviguer l\'ambiguïté sans perdre la rigueur analytique. C\'est l\'atout cognitif principal pour les rôles en stratégie, recherche, data science et conception de systèmes.',
  },
  workingMemory: {
    icon: '◉',
    title:   'Multi-Step Processing',
    titleFr: 'Traitement multi-étapes',
    desc:    'Your working memory efficiently holds and manipulates multiple pieces of information simultaneously — critical for complex reasoning chains, layered analysis and multi-party negotiations. Where others lose the thread, you maintain coherence. This is a direct cognitive advantage in any high-complexity professional environment.',
    descFr:  'Votre mémoire de travail gère efficacement plusieurs informations en parallèle — essentiel pour les raisonnements complexes, les analyses multi-couches et les négociations. Là où d\'autres perdent le fil, vous maintenez la cohérence. C\'est un avantage cognitif direct dans tout environnement professionnel à haute complexité.',
  },
  processingSpeed: {
    icon: '◎',
    title:   'Rapid Cognitive Processing',
    titleFr: 'Traitement cognitif rapide',
    desc:    'You process and respond to new information faster than average, giving you an edge in time-sensitive decisions and fast-paced environments. This speed does not come at the cost of accuracy — your brain efficiently categorises and routes information before acting on it. It translates to shorter learning curves and faster pattern acquisition in new domains.',
    descFr:  'Vous traitez les nouvelles informations plus rapidement que la moyenne, avec un avantage dans les décisions urgentes et les environnements dynamiques. Cette vitesse ne se fait pas au détriment de la précision — votre cerveau catégorise et oriente efficacement l\'information avant d\'agir. Cela se traduit par des courbes d\'apprentissage plus courtes dans de nouveaux domaines.',
  },
  verbalComprehension: {
    icon: '◇',
    title:   'Linguistic Intelligence',
    titleFr: 'Intelligence linguistique',
    desc:    'You understand nuanced language, extract precise meaning from complex text, and communicate ideas with clarity. This score reflects both reading comprehension depth and expressive precision — two skills that compound over time as you accumulate vocabulary, argument structures and knowledge. Strong verbal comprehension is a core asset in any role where communication quality directly impacts outcomes.',
    descFr:  'Vous saisissez les nuances, extrayez du sens de textes complexes et communiquez avec précision. Ce score reflète à la fois la profondeur de compréhension en lecture et la précision expressive — deux compétences qui se composent dans le temps. Une forte compréhension verbale est un atout central dans tout rôle où la qualité de la communication impacte directement les résultats.',
  },
};

export function getTopStrengths(arch: ArchitectureScores): Strength[] {
  return (Object.entries(arch) as [keyof ArchitectureScores, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => STRENGTH_MAP[key]);
}

// ─── Recommendations (full 4-week protocol) ──────────────────────────────────
export interface Recommendation {
  num:    string;
  title:  string; titleFr:  string;
  detail: string; detailFr: string;
  how:    string; howFr:    string;
}

export function getRecommendations(score: number): Recommendation[] {
  const isHigh = score >= 120;
  return [
    {
      num: '01',
      title:   'Dual N-Back Training',
      titleFr: 'Entraînement Dual N-Back',
      detail:   isHigh
        ? 'The most evidence-backed working memory exercise. At your level, begin at N-Back level 3–4 and push toward level 5 over 4 weeks. Research shows consistent practitioners at this intensity gain 8–12 points on subsequent fluid reasoning assessments.'
        : 'The most evidence-backed cognitive training method. Begin at level 2 (audio + visual). This exercise builds working memory and fluid reasoning simultaneously — the two highest-leverage cognitive dimensions. Study data shows average gains of 5–10 IQ points after 4 weeks of consistent practice.',
      detailFr: isHigh
        ? 'L\'exercice de mémoire de travail le plus soutenu par la recherche. À votre niveau, commencez au niveau 3–4 et visez le niveau 5 sur 4 semaines. Les pratiquants réguliers à cette intensité gagnent 8 à 12 points sur les évaluations de raisonnement fluide suivantes.'
        : 'La méthode d\'entraînement cognitif la plus soutenue par la recherche. Commencez au niveau 2 (audio + visuel). Cet exercice développe simultanément la mémoire de travail et le raisonnement fluide. Les données d\'études montrent des gains moyens de 5 à 10 points de QI après 4 semaines de pratique régulière.',
      how:   '20 minutes per session · 4–5 sessions per week · Free app: Brain Workshop (desktop) or Dual N-Back on iOS/Android.',
      howFr: '20 minutes par séance · 4–5 séances par semaine · Application gratuite : Brain Workshop (desktop) ou Dual N-Back sur iOS/Android.',
    },
    {
      num: '02',
      title:   'Progressive Matrix Practice',
      titleFr: 'Matrices progressives',
      detail:   'Raven-style matrix problems are the purest exercise for fluid intelligence — they require detecting abstract visual patterns without language or prior knowledge. 20 problems per session, escalating difficulty every week. The key is to work just beyond your current ability level (the "desirable difficulty" principle). Do not review answers immediately — attempt each problem fully before checking.',
      detailFr: 'Les matrices de type Raven sont l\'exercice le plus pur pour l\'intelligence fluide — elles nécessitent de détecter des patterns visuels abstraits sans langage ni connaissances préalables. 20 problèmes par séance, difficulté croissante chaque semaine. La clé est de travailler juste au-delà de votre niveau actuel (le principe de "difficulté désirable"). Ne vérifiez pas les réponses immédiatement — tentez chaque problème complètement avant de vérifier.',
      how:   '20 problems · 3× per week · Free resources: 123test.com/iq-test, free-iqtest.net. Increase difficulty level each week.',
      howFr: '20 problèmes · 3× par semaine · Ressources gratuites : 123test.com/iq-test. Augmentez le niveau de difficulté chaque semaine.',
    },
    {
      num: '03',
      title:   'Deep Reading with Active Recall',
      titleFr: 'Lecture profonde avec rappel actif',
      detail:   'Passive reading produces minimal cognitive benefit. The key protocol: read one substantive text per week (scientific article, long-form essay, book chapter on an unfamiliar topic). After reading, close the text and write a 150-word synthesis entirely from memory. This forces deeper encoding and strengthens both working memory and verbal comprehension simultaneously. Difficulty should be slightly above your comfort level.',
      detailFr: 'La lecture passive produit un bénéfice cognitif minimal. Le protocole clé : lisez un texte substantiel par semaine (article scientifique, essai long, chapitre de livre sur un sujet peu familier). Après la lecture, fermez le texte et rédigez une synthèse de 150 mots entièrement de mémoire. Cela force un encodage plus profond et renforce simultanément la mémoire de travail et la compréhension verbale.',
      how:   '1 substantive text per week · Write a 150-word summary from memory afterward · Suggested sources: Nautilus, Aeon, academic review articles.',
      howFr: '1 texte substantiel par semaine · Rédigez un résumé de 150 mots de mémoire ensuite · Sources suggérées : Pour la Science, The Conversation, articles de revues académiques.',
    },
    {
      num: '04',
      title:   'Sleep & Physiological Foundation',
      titleFr: 'Sommeil & base physiologique',
      detail:   'Cognitive training produces results only when the brain consolidates learning during sleep. Research shows that 7–9 hours of sleep is not a lifestyle preference — it is the mechanism by which synaptic connections formed during training are strengthened and integrated. A single night of 6 hours of sleep reduces fluid reasoning performance by approximately 10–15%. No cognitive training protocol overcomes chronic sleep deficit.',
      detailFr: 'L\'entraînement cognitif produit des résultats uniquement lorsque le cerveau consolide l\'apprentissage pendant le sommeil. La recherche montre que 7 à 9 heures de sommeil ne sont pas une préférence de style de vie — c\'est le mécanisme par lequel les connexions synaptiques formées pendant l\'entraînement sont renforcées. Une seule nuit de 6 heures de sommeil réduit les performances de raisonnement fluide d\'environ 10 à 15 %. Aucun protocole d\'entraînement cognitif ne surmonte le déficit de sommeil chronique.',
      how:   '7–9 hours nightly · Consistent wake time · No screens 30 min before sleep · 3× aerobic exercise per week (shown to increase BDNF, the primary neurotrophic factor for cognitive growth).',
      howFr: '7 à 9 heures par nuit · Heure de réveil constante · Pas d\'écran 30 min avant le sommeil · 3× exercice aérobie par semaine (augmente le BDNF, facteur neurotrophique principal pour la croissance cognitive).',
    },
  ];
}

// ─── Cognitive Signature ─────────────────────────────────────────────────────
export interface CognitiveSignature {
  title:  string; titleFr:  string;
  body:   string; bodyFr:   string;
}

export function getCognitiveSignature(score: number, arch: ArchitectureScores): CognitiveSignature {
  const top = (Object.entries(arch) as [keyof ArchitectureScores, number][])
    .sort((a, b) => b[1] - a[1])[0][0];

  const profiles: Record<keyof ArchitectureScores, CognitiveSignature> = {
    fluidReasoning: {
      title:   'The Pattern Architect',
      titleFr: 'L\'Architecte de patterns',
      body:    'Your cognitive signature is defined by an exceptional ability to extract structure from complexity. You see through surface noise to identify the underlying logic — a rare capacity that defines scientific thinkers, strategic leaders and creative problem-solvers. In practice, this means you tend to find solutions that others do not see, because you are operating at a level of abstraction most people cannot sustain. Your primary risk is the inverse: impatience with people and systems that cannot follow your reasoning. The most effective professionals with this profile learn to translate their abstract insights into concrete, communicable steps — closing the gap between what they see and what they can bring others to understand.',
      bodyFr:  'Votre signature cognitive est définie par une capacité exceptionnelle à extraire la structure de la complexité. Vous percevez la logique sous-jacente à travers le bruit — une aptitude rare qui caractérise les penseurs scientifiques, les leaders stratégiques et les résolveurs de problèmes créatifs. En pratique, vous tendez à trouver des solutions que d\'autres ne voient pas, car vous opérez à un niveau d\'abstraction que la plupart des gens ne peuvent pas maintenir. Votre risque principal est l\'inverse : l\'impatience avec les personnes et systèmes qui ne peuvent pas suivre votre raisonnement. Les professionnels les plus efficaces avec ce profil apprennent à traduire leurs insights abstraits en étapes concrètes et communicables.',
    },
    workingMemory: {
      title:   'The Multi-Thread Processor',
      titleFr: 'Le Processeur multi-threads',
      body:    'Your cognitive signature is a powerful working memory that holds and orchestrates multiple information streams simultaneously. You excel where others lose track — in complex negotiations, layered analysis and tasks requiring sustained cognitive load over extended periods. This profile is particularly valuable in high-stakes professional environments where the ability to hold context, track variables and maintain coherence under pressure directly determines outcomes. The key development area for this profile is not raw capacity — it is learning to direct this processing power strategically, to distinguish what deserves cognitive resources from what can be delegated or systematised.',
      bodyFr:  'Votre signature cognitive est une mémoire de travail puissante qui orchestre plusieurs flux d\'information simultanément. Vous excellez là où d\'autres perdent le fil — négociations complexes, analyses stratifiées et tâches à charge cognitive soutenue. Ce profil est particulièrement précieux dans les environnements professionnels à forts enjeux. L\'axe de développement clé n\'est pas la capacité brute — c\'est apprendre à diriger cette puissance de traitement stratégiquement, à distinguer ce qui mérite des ressources cognitives de ce qui peut être délégué ou systématisé.',
    },
    processingSpeed: {
      title:   'The Rapid Synthesizer',
      titleFr: 'Le Synthétiseur rapide',
      body:    'Your cognitive signature is defined by speed and decisiveness. You process new information and converge on accurate conclusions faster than average — a critical advantage in fast-paced, high-stakes environments. This profile excels in situations that reward quick pattern matching: trading, clinical triage, real-time decision-making, competitive negotiation. The risk of this profile is the tendency to reach conclusions before all relevant information has been considered. The highest performers with this signature develop disciplined "pause protocols" — deliberate habits that slow processing on high-stakes decisions to ensure speed does not come at the cost of completeness.',
      bodyFr:  'Votre signature cognitive est définie par la vitesse et la décision. Vous traitez les nouvelles informations et convergez vers des conclusions précises plus rapidement que la moyenne — un avantage décisif dans les environnements rapides et exigeants. Ce profil excelle dans les situations qui récompensent la correspondance rapide de patterns. Le risque de ce profil est la tendance à atteindre des conclusions avant que toutes les informations pertinentes aient été considérées. Les plus hauts performeurs avec cette signature développent des "protocoles de pause" disciplinés.',
    },
    verbalComprehension: {
      title:   'The Precision Communicator',
      titleFr: 'Le Communicant de précision',
      body:    'Your cognitive signature is built on exceptional linguistic intelligence — a nuanced understanding of meaning, context and implication. You grasp what others miss in complex text and articulate ideas with unusual clarity. This profile is the cognitive foundation for influence, persuasion and high-level communication. In professional terms, it translates to a capacity for precise diagnosis, effective writing, structured argumentation and the ability to understand complex proposals or documents that others find opaque. The development frontier for this profile is typically quantitative: building the capacity to complement strong verbal intelligence with numerical and spatial reasoning skills.',
      bodyFr:  'Votre signature cognitive repose sur une intelligence linguistique exceptionnelle — une compréhension nuancée du sens, du contexte et de l\'implication. Vous saisissez ce que d\'autres manquent dans les textes complexes et articulez les idées avec une clarté peu commune. Ce profil est la base cognitive pour l\'influence, la persuasion et la communication de haut niveau. La frontière de développement pour ce profil est typiquement quantitative : construire la capacité de compléter une forte intelligence verbale avec des compétences de raisonnement numérique et spatial.',
    },
  };

  return profiles[top];
}
