import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

const PDF_SERVICE_URL = process.env.PDF_SERVICE_URL!;
const PDF_API_KEY     = process.env.PDF_API_KEY!;
const BREVO_API_KEY   = process.env.BREVO_API_KEY!;
const WEBHOOK_SECRET  = process.env.STRIPE_WEBHOOK_SECRET!;

async function sendBrevoEmail(payload: object) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
    body:    JSON.stringify(payload),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Brevo error: ${res.status} ${errText}`);
  }
}

async function removeFromDripList(email: string, isFr: boolean) {
  // Remove buyer from drip list (5=EN, 6=FR) to stop the automation
  const listId = isFr ? 6 : 5;
  try {
    await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts/remove`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
      body:    JSON.stringify({ emails: [email] }),
    });
  } catch (err) {
    console.error('Failed to remove contact from drip list:', err);
  }
}

function trainingProtocolHtml(score: number, isFr: boolean): string {
  const accent = isFr ? '#C96442' : '#4F46E5';

  // Determine weak areas based on score for personalisation hint
  const level = score >= 130 ? 'elite' : score >= 115 ? 'high' : score >= 100 ? 'average' : 'developing';

  const weeksFr = [
    {
      week: 'Semaine 1 — Mémoire de travail',
      days: [
        'Jour 1 : Dual N-Back niveau 2 · 20 min (app gratuite Brain Workshop)',
        'Jour 2 : Mémoriser 15 mots aléatoires, les réciter 1h plus tard',
        'Jour 3 : Dual N-Back niveau 2 · 20 min + 10 min de méditation',
        'Jour 4 : Séquences de chiffres à rebours (7 chiffres → 10 chiffres)',
        'Jour 5 : Dual N-Back niveau 3 · 20 min',
        'Jour 6 : Lecture active : résumer chaque page en 2 phrases',
        'Jour 7 : Repos cognitif · promenade 30 min sans téléphone',
      ],
    },
    {
      week: 'Semaine 2 — Raisonnement fluide',
      days: [
        'Jour 8 : 20 matrices progressives (Raven — gratuit en ligne)',
        'Jour 9 : Sudoku difficile + 10 analogies verbales',
        'Jour 10 : 30 min d\'échecs en ligne (lichess.org — gratuit)',
        'Jour 11 : 20 matrices + 15 min de Dual N-Back',
        'Jour 12 : Casse-têtes logiques (15 problèmes de type LSAT)',
        'Jour 13 : Séries numériques et lettres (20 séquences)',
        'Jour 14 : Repos cognitif · exercice physique 45 min',
      ],
    },
    {
      week: 'Semaine 3 — Vitesse de traitement',
      days: [
        'Jour 15 : Test de Stroop · 15 min (app gratuite)',
        'Jour 16 : Calcul mental rapide · 100 opérations en moins de 5 min',
        'Jour 17 : Dual N-Back niveau 3 · 25 min',
        'Jour 18 : Jeu de réaction (humanbenchmark.com) · battre votre record',
        'Jour 19 : Lecture rapide · 1 article long, timer 20 min',
        'Jour 20 : Calcul mental + matrices · session mixte 30 min',
        'Jour 21 : Repos cognitif · sommeil 8h priorité absolue',
      ],
    },
    {
      week: 'Semaine 4 — Compréhension verbale & intégration',
      days: [
        'Jour 22 : 20 nouveaux mots de vocabulaire avancé (Anki)',
        'Jour 23 : Analogies verbales complexes · 25 exercices',
        'Jour 24 : Expliquer un concept difficile à voix haute (méthode Feynman)',
        'Jour 25 : Lecture d\'un article scientifique · résumé en 150 mots',
        'Jour 26 : Session complète : N-Back + matrices + vocabulaire · 45 min',
        'Jour 27 : Débat intérieur : prendre 2 positions opposées sur un sujet',
        'Jour 28 : Repassez le test BrainScale et mesurez votre progression !',
      ],
    },
  ];

  const weeksEn = [
    {
      week: 'Week 1 — Working Memory',
      days: [
        'Day 1: Dual N-Back level 2 · 20 min (free app: Brain Workshop)',
        'Day 2: Memorize 15 random words, recall them 1 hour later',
        'Day 3: Dual N-Back level 2 · 20 min + 10 min meditation',
        'Day 4: Backward digit spans (start at 7 digits, push to 10)',
        'Day 5: Dual N-Back level 3 · 20 min',
        'Day 6: Active reading — summarize each page in 2 sentences',
        'Day 7: Cognitive rest · 30-min walk with no phone',
      ],
    },
    {
      week: 'Week 2 — Fluid Reasoning',
      days: [
        'Day 8: 20 progressive matrices (Raven — free online)',
        'Day 9: Hard Sudoku + 10 verbal analogies',
        'Day 10: 30 min online chess (lichess.org — free)',
        'Day 11: 20 matrices + 15 min Dual N-Back',
        'Day 12: Logic puzzles (15 LSAT-style problems)',
        'Day 13: Number and letter sequences (20 series)',
        'Day 14: Cognitive rest · 45 min physical exercise',
      ],
    },
    {
      week: 'Week 3 — Processing Speed',
      days: [
        'Day 15: Stroop test · 15 min (free app)',
        'Day 16: Mental arithmetic sprint · 100 operations in under 5 min',
        'Day 17: Dual N-Back level 3 · 25 min',
        'Day 18: Reaction time game (humanbenchmark.com) · beat your record',
        'Day 19: Speed reading · 1 long article, 20-min timer',
        'Day 20: Mixed session: mental math + matrices · 30 min',
        'Day 21: Cognitive rest · prioritize 8h sleep tonight',
      ],
    },
    {
      week: 'Week 4 — Verbal Intelligence & Integration',
      days: [
        'Day 22: 20 advanced vocabulary words (Anki spaced repetition)',
        'Day 23: Complex verbal analogies · 25 exercises',
        'Day 24: Feynman Technique — explain a difficult concept out loud as if teaching',
        'Day 25: Read a scientific article · write a 150-word summary',
        'Day 26: Full session: N-Back + matrices + vocabulary · 45 min',
        'Day 27: Steel-man exercise — argue both sides of a complex issue',
        'Day 28: Retake the BrainScale test and measure your progress!',
      ],
    },
  ];

  const weeks = isFr ? weeksFr : weeksEn;
  const title = isFr
    ? `Votre protocole d'entraînement cognitif 30 jours`
    : `Your 30-Day Cognitive Training Protocol`;
  const subtitle = isFr
    ? `Conçu pour améliorer votre score QI de 5 à 10 points en 4 semaines`
    : `Designed to improve your IQ score by 5–10 points in 4 weeks`;
  const noteTitle = isFr ? 'Principes fondamentaux' : 'Core principles';
  const notes = isFr
    ? ['Dormez 7–9h chaque nuit — c\'est le levier #1', 'Exercice aérobie 3×/semaine minimum', 'Pas de session de plus de 45 min — la fatigue annule les gains', 'Repasser le test à J+28 pour mesurer la progression']
    : ['Sleep 7–9h every night — it\'s the #1 lever', 'Aerobic exercise minimum 3× per week', 'No session over 45 min — fatigue reverses gains', 'Retest at day 28 to measure progress'];
  const footer = isFr
    ? `Score de départ : ${score} · Niveau : ${level} · brainscale.app`
    : `Starting score: ${score} · Level: ${level} · brainscale.app`;

  return `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#FAF8F5">
  <div style="background:${accent};border-radius:16px;padding:32px;text-align:center;margin-bottom:32px">
    <h1 style="color:#fff;font-size:22px;margin:0 0 8px">${title}</h1>
    <p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0">${subtitle}</p>
  </div>

  <div style="background:#fff;border:1px solid #E2E8F0;border-radius:12px;padding:20px;margin-bottom:24px">
    <h3 style="font-size:14px;font-weight:700;color:${accent};margin:0 0 12px;text-transform:uppercase;letter-spacing:1px">${noteTitle}</h3>
    <ul style="margin:0;padding-left:20px">
      ${notes.map(n => `<li style="color:#475569;font-size:14px;line-height:1.8">${n}</li>`).join('')}
    </ul>
  </div>

  ${weeks.map(w => `
  <div style="margin-bottom:24px">
    <h2 style="font-size:16px;font-weight:700;color:#1A1916;background:#FBF0EB;padding:12px 16px;border-radius:8px;margin:0 0 12px">${w.week}</h2>
    ${w.days.map(d => `
    <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #F1F0ED">
      <span style="color:${accent};font-weight:700;font-size:13px;white-space:nowrap;min-width:52px">${d.split(':')[0]}</span>
      <span style="color:#475569;font-size:13px;line-height:1.5">${d.split(':').slice(1).join(':').trim()}</span>
    </div>`).join('')}
  </div>`).join('')}

  <div style="text-align:center;margin-top:32px;padding:24px;background:${accent};border-radius:12px">
    <p style="color:rgba(255,255,255,0.7);font-size:12px;margin:0">${footer}</p>
  </div>
</div>`;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig  = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session   = event.data.object as Stripe.Checkout.Session;
  const email     = session.customer_email || session.customer_details?.email;
  const score     = parseInt(session.metadata?.iq_score ?? '100');
  const correct   = parseInt(session.metadata?.correct  ?? '20');
  const total     = parseInt(session.metadata?.total    ?? '40');
  const lang      = session.metadata?.lang ?? 'en';
  const isFr      = lang === 'fr';
  const isPremium = session.metadata?.tier === 'premium';

  if (!email) {
    console.error('No email in session', session.id);
    return NextResponse.json({ error: 'No email' }, { status: 400 });
  }

  // 1. Generate PDF report
  let pdfBase64: string;
  try {
    const pdfRes = await fetch(`${PDF_SERVICE_URL}/generate-pdf`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': PDF_API_KEY },
      body:    JSON.stringify({ score, correct, total, lang }),
    });
    if (!pdfRes.ok) throw new Error(`PDF service error: ${pdfRes.status}`);
    const pdfData = await pdfRes.json();
    pdfBase64 = pdfData.pdf_base64;
  } catch (err) {
    console.error('PDF generation failed:', err);
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 });
  }

  // 2. Send cognitive report email (all buyers)
  try {
    await sendBrevoEmail({
      sender:  { name: 'BrainScale', email: 'noreply@brainscale.app' },
      to:      [{ email }],
      subject: isFr
        ? (isPremium ? 'Votre rapport cognitif Premium BrainScale' : 'Votre rapport cognitif BrainScale')
        : (isPremium ? 'Your BrainScale Premium Cognitive Report' : 'Your BrainScale Cognitive Report'),
      htmlContent: isFr ? `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
          <h2 style="font-size:22px;color:#14121F;margin-bottom:8px">Votre rapport est prêt.</h2>
          <p style="color:#475569;line-height:1.6;margin-bottom:24px">
            Merci d&apos;avoir complété le test cognitif BrainScale.<br/>
            Votre rapport complet est joint à cet email.
            ${isPremium ? '<br/><br/><strong>Votre accès Premium :</strong> votre protocole d&apos;entraînement cognitif 30 jours vous sera envoyé dans les prochaines minutes.' : ''}
          </p>
          <p style="color:#475569;line-height:1.6">
            Votre score QI : <strong style="color:#C96442">${score}</strong>
          </p>
          <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0"/>
          <p style="font-size:12px;color:#94A3B8">
            BrainScale &middot; brainscale.app &middot; Ceci n&apos;est pas une &eacute;valuation clinique ou m&eacute;dicale
          </p>
        </div>
      ` : `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
          <h2 style="font-size:22px;color:#14121F;margin-bottom:8px">Your report is ready.</h2>
          <p style="color:#475569;line-height:1.6;margin-bottom:24px">
            Thank you for completing the BrainScale assessment.<br/>
            Your full cognitive report is attached to this email.
            ${isPremium ? '<br/><br/><strong>Your Premium access:</strong> your personalized 30-day cognitive training protocol is on its way in the next few minutes.' : ''}
          </p>
          <p style="color:#475569;line-height:1.6">
            Your IQ Score: <strong style="color:#4F46E5">${score}</strong>
          </p>
          <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0"/>
          <p style="font-size:12px;color:#94A3B8">
            BrainScale &middot; brainscale.app &middot; Not a clinical or medical assessment
          </p>
        </div>
      `,
      attachment: [{
        content: pdfBase64,
        name:    isFr ? 'BrainScale_Rapport_Cognitif.pdf' : 'BrainScale_Cognitive_Report.pdf',
      }],
    });
  } catch (err) {
    console.error('Report email failed:', err);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }

  // 3. Premium only — send 30-day training protocol as second email
  if (isPremium) {
    try {
      await sendBrevoEmail({
        sender:  { name: 'BrainScale', email: 'noreply@brainscale.app' },
        to:      [{ email }],
        subject: isFr
          ? 'Votre protocole d\'entraînement cognitif 30 jours — BrainScale Premium'
          : 'Your 30-Day Cognitive Training Protocol — BrainScale Premium',
        htmlContent: trainingProtocolHtml(score, isFr),
      });
    } catch (err) {
      // Non-blocking — report was already sent, log but don't fail
      console.error('Training protocol email failed:', err);
    }
  }

  // 4. Remove buyer from drip list (stops the automation)
  await removeFromDripList(email, isFr);

  console.log(`✓ Emails sent to ${email} (score: ${score}, premium: ${isPremium})`);
  return NextResponse.json({ success: true });
}
