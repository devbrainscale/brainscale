"use client";

import {
  getPercentile,
  getTierInfo,
  getArchitectureScores,
  getDimensionDetails,
  getTopStrengths,
  getRecommendations,
  getCognitiveSignature,
  DS,
  type ArchitectureScores,
} from '@/lib/report-data';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Props {
  score:   number;
  correct: number;
  total:   number;
  lang:    'en' | 'fr';
  tier:    'basic' | 'premium';
}

// ─── SVG Arc Gauge ───────────────────────────────────────────────────────────
// 320° arc, gap centered at bottom. Matches PDF editorial gauge.
function GaugeSvg({ pct, size = 140 }: { pct: number; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r  = size * 0.385;
  const lw = size * 0.072;

  // Gap centered at bottom (90° in SVG = 6 o'clock).
  // Arc spans 320°: start at 90°+20°=110°, end at 90°-20°=70°, sweep CW 320°.
  const START = 110;
  const SPAN  = 320;

  function pt(deg: number): string {
    const rad = (deg * Math.PI) / 180;
    return `${(cx + r * Math.cos(rad)).toFixed(3)},${(cy + r * Math.sin(rad)).toFixed(3)}`;
  }

  const trackEnd = pt((START + SPAN) % 360); // 70°

  // Full track
  const trackPath = `M ${pt(START)} A ${r},${r} 0 1,1 ${trackEnd}`;

  // Filled portion
  const fillSpan  = (pct / 100) * SPAN;
  const fillDeg   = (START + fillSpan) % 360;
  const fillLarge = fillSpan > 180 ? 1 : 0;
  const fillPath  = fillSpan > 1
    ? `M ${pt(START)} A ${r},${r} 0 ${fillLarge},1 ${pt(fillDeg)}`
    : '';

  // End-cap dot
  const dotRad = (fillDeg * Math.PI) / 180;
  const dotX   = cx + r * Math.cos(dotRad);
  const dotY   = cy + r * Math.sin(dotRad);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
      <path d={trackPath} fill="none" stroke={DS.RULE} strokeWidth={lw} strokeLinecap="round" />
      {fillPath && (
        <path d={fillPath} fill="none" stroke={DS.TER} strokeWidth={lw} strokeLinecap="round" />
      )}
      {fillSpan > 1 && (
        <>
          <circle cx={dotX} cy={dotY} r={lw / 2 + 2} fill={DS.TER} />
          <circle cx={dotX} cy={dotY} r={lw / 2 - 3} fill="#fff" />
        </>
      )}
    </svg>
  );
}

// ─── Architecture bar ────────────────────────────────────────────────────────
function ArchBar({
  label, score, pct,
}: { label: string; score: number; pct: number }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6760' }}>
          {label}
        </span>
        <span style={{ fontFamily: 'Lora, serif', fontSize: 20, fontWeight: 600, color: DS.TER }}>
          {score}
        </span>
      </div>
      {/* track */}
      <div style={{ height: 3, background: DS.RULE, borderRadius: 2 }}>
        {/* fill */}
        <div style={{
          height: '100%',
          width: `${Math.round(pct)}%`,
          background: DS.TER,
          borderRadius: 2,
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  );
}

// ─── Helper: score → bar fill% ───────────────────────────────────────────────
function archPct(s: number) {
  return Math.max(0, Math.min(100, ((s - 70) / 75) * 100));
}

// ─── Main report component ───────────────────────────────────────────────────
export default function ReportPage({ score, correct, total, lang, tier }: Props) {
  const isFr  = lang === 'fr';
  const pct   = getPercentile(score);
  const ti    = getTierInfo(score);
  const arch  = getArchitectureScores(score, correct, total);
  const dims  = getDimensionDetails(arch);
  const sig   = getCognitiveSignature(score, arch);
  const str   = getTopStrengths(arch);
  const recs  = getRecommendations(score);
  const todayFull = new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const archLabels: Record<keyof ArchitectureScores, [string, string]> = {
    fluidReasoning:      ['Fluid Reasoning',       'Raisonnement fluide'],
    workingMemory:       ['Working Memory',         'Mémoire de travail'],
    processingSpeed:     ['Processing Speed',       'Vitesse de traitement'],
    verbalComprehension: ['Verbal Comprehension',   'Compréhension verbale'],
  };

  const t = {
    sectionScore:    isFr ? 'Vue d\'ensemble' : 'Score Overview',
    sectionArch:     isFr ? 'Architecture cognitive' : 'Cognitive Architecture',
    sectionSig:      isFr ? 'Profil cognitif' : 'Cognitive Signature',
    sectionStr:      isFr ? 'Points forts' : 'Cognitive Strengths',
    sectionRec:      isFr ? 'Protocole de développement' : 'Development Protocol',
    sectionCert:     isFr ? 'Certificat' : 'Certificate',
    percentileLabel: isFr ? 'Percentile' : 'Percentile',
    scoreLabel:      isFr ? 'Score QI' : 'IQ Score',
    topOf:           isFr ? 'des personnes testées' : 'of people tested',
    certTitle:       isFr ? 'Rapport cognitif certifié' : 'Certified Cognitive Report',
    certBody:        isFr
      ? 'Ce rapport atteste que le titulaire a complété l\'évaluation cognitive BrainScale et obtenu le score mentionné ci-dessous.'
      : 'This report certifies that the holder has completed the BrainScale cognitive assessment and achieved the score stated below.',
    printBtn:        isFr ? 'Imprimer / PDF' : 'Print / Save PDF',
    shareBtn:        isFr ? 'Partager' : 'Share',
  };

  return (
    <>
      {/* ── Google Fonts ─────────────────────────────────────────────────── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;700&family=Poppins:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* ── Global reset + print CSS ─────────────────────────────────────── */}
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:${DS.CREAM};color:${DS.INK};font-family:'Lato',sans-serif;-webkit-font-smoothing:antialiased}
        ::selection{background:${DS.TER};color:#fff}

        .report-section{padding:72px 24px;max-width:760px;margin:0 auto}

        /* Nav header */
        .report-nav{
          position:sticky;top:0;z-index:100;
          background:rgba(250,248,245,0.92);
          backdrop-filter:blur(12px);
          border-bottom:1px solid ${DS.RULE};
          padding:0 24px;
          display:flex;align-items:center;justify-content:space-between;
          height:52px;
        }
        .nav-wordmark{font-family:'Lora',serif;font-size:15px;letter-spacing:.04em;color:${DS.INK}}
        .nav-actions{display:flex;gap:12px;align-items:center}
        .btn-ghost{
          font-family:'Poppins',sans-serif;font-size:11px;font-weight:500;
          letter-spacing:.06em;text-transform:uppercase;
          border:1px solid ${DS.RULE};border-radius:2px;
          padding:6px 14px;cursor:pointer;background:transparent;color:${DS.INK};
          transition:border-color .2s,background .2s;
        }
        .btn-ghost:hover{border-color:${DS.TER};background:${DS.TER};color:#fff}
        .btn-primary{
          font-family:'Poppins',sans-serif;font-size:11px;font-weight:500;
          letter-spacing:.06em;text-transform:uppercase;
          border:none;border-radius:2px;
          padding:6px 14px;cursor:pointer;background:${DS.TER};color:#fff;
          transition:opacity .2s;
        }
        .btn-primary:hover{opacity:.85}

        /* Section labels */
        .section-label{
          font-family:'Poppins',sans-serif;font-size:10px;font-weight:600;
          letter-spacing:.14em;text-transform:uppercase;
          color:${DS.TER};margin-bottom:32px;
          display:flex;align-items:center;gap:12px;
        }
        .section-label::after{content:'';flex:1;height:1px;background:${DS.RULE}}

        /* Divider */
        .rule{border:none;border-top:1px solid ${DS.RULE};margin:48px 0}

        /* Score block */
        .score-number{
          font-family:'Lora',serif;color:${DS.TER};
          line-height:.9;margin-bottom:16px;
        }

        /* Strength card */
        .strength-card{
          border:1px solid ${DS.RULE};border-radius:2px;
          padding:28px 24px;margin-bottom:16px;
          background:#fff;
        }
        .strength-icon{
          font-size:20px;color:${DS.TER};
          font-family:'Lora',serif;margin-bottom:16px;display:block;
        }
        .strength-title{
          font-family:'Lora',serif;font-size:16px;font-weight:600;
          color:${DS.INK};margin-bottom:8px;
        }
        .strength-desc{
          font-family:'Lato',sans-serif;font-size:14px;line-height:1.7;
          color:#5A5650;
        }

        /* Rec block */
        .rec-item{
          display:grid;grid-template-columns:56px 1fr;gap:0;
          padding:28px 0;border-bottom:1px solid ${DS.RULE};
        }
        .rec-num{
          font-family:'Lora',serif;font-size:32px;font-weight:400;
          color:${DS.RULE};line-height:1;padding-top:4px;
        }
        .rec-title{
          font-family:'Poppins',sans-serif;font-size:13px;font-weight:600;
          letter-spacing:.04em;text-transform:uppercase;
          color:${DS.INK};margin-bottom:8px;
        }
        .rec-desc{
          font-family:'Lato',sans-serif;font-size:14px;line-height:1.7;color:#5A5650;
        }

        /* Certificate */
        .cert-border{
          border:1px solid ${DS.INK};
          margin:0 auto;max-width:680px;
          padding:56px 64px;
          position:relative;
          background:${DS.CREAM};
        }
        .cert-border::after{
          content:'';position:absolute;
          inset:10px;border:0.5px solid ${DS.TER};
          pointer-events:none;
        }
        .cert-watermark{
          position:absolute;inset:0;
          display:flex;align-items:center;justify-content:center;
          font-family:'Lora',serif;font-size:260px;font-weight:700;
          color:#F5DAD0;line-height:1;pointer-events:none;
          user-select:none;overflow:hidden;
        }


        @media(max-width:640px){
          .score-number{font-size:96px!important}
          .cert-border{padding:32px 24px}
          .cert-watermark{font-size:140px}
        }

        /* ── Print styles ──────────────────────────────────────────────── */
        @media print{
          .report-nav,.btn-ghost,.btn-primary{display:none!important}
          body{background:#fff}
          .report-section{padding:40px 32px}
          .section-hero{height:auto!important;padding:60px 32px!important}
        }
      `}</style>

      {/* ── Sticky nav ─────────────────────────────────────────────────────── */}
      <nav className="report-nav">
        <span className="nav-wordmark">BrainScale</span>
        <div className="nav-actions">
          <button
            className="btn-ghost"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ url: window.location.href, title: 'Mon rapport BrainScale' });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
          >
            {t.shareBtn}
          </button>
          <button className="btn-primary" onClick={() => window.print()}>
            {t.printBtn}
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO (dark)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-hero"
        style={{
          background: DS.INK,
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid */}
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="#fff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* Left accent rule */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: DS.TER }} />

        {/* Content — centered */}
        <div style={{ maxWidth: 760, margin: '0 auto', width: '100%', textAlign: 'center', position: 'relative' }}>
          {/* Score — the composition */}
          <div
            className="score-number"
            style={{ fontSize: 180, color: '#fff', fontFamily: 'Lora, serif', lineHeight: 0.88 }}
          >
            {score}
          </div>

          {/* Terracotta rule */}
          <div style={{ width: 48, height: 2, background: DS.TER, margin: '20px auto 18px' }} />

          {/* Tier */}
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 11, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: DS.TER, marginBottom: 10,
          }}>
            {isFr ? ti.labelFr : ti.label}
          </div>

          {/* Percentile */}
          <div style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: 14, color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.04em',
          }}>
            {isFr
              ? `Top ${pct < 1 ? pct : Math.round(pct)} % ${t.topOf}`
              : `Top ${pct < 1 ? pct : Math.round(pct)}% ${t.topOf}`}
          </div>

        </div>

        {/* Scroll nudge */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'Poppins, sans-serif', fontSize: 9,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
        }}>
          ↓
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — SCORE OVERVIEW (cream)
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DS.CREAM }}>
        <div className="report-section">
          <div className="section-label">{t.sectionScore}</div>

          {/* Score + tier */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: 'Lora, serif', fontSize: 96, fontWeight: 600, color: DS.TER, lineHeight: 0.9, marginBottom: 20 }}>
              {score}
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: DS.TER, marginBottom: 20 }}>
              {t.scoreLabel} · {isFr ? ti.labelFr : ti.label}
            </div>

            {/* Percentile + comparison strip */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
              <div style={{ padding: '16px 20px', background: '#FBF0EB', borderLeft: `3px solid ${DS.TER}` }}>
                <span style={{ fontFamily: 'Lora, serif', fontSize: 28, fontWeight: 600, color: DS.TER, display: 'block', lineHeight: 1 }}>
                  {pct < 1 ? pct : Math.round(pct)}%
                </span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A8178', marginTop: 4, display: 'block' }}>
                  {t.percentileLabel}
                </span>
              </div>
            </div>

            {/* Comparison line */}
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, lineHeight: 1.7, color: DS.TER, fontStyle: 'italic', marginBottom: 24, maxWidth: 560 }}>
              {isFr ? ti.comparisonFr : ti.comparison}
            </p>
          </div>

          {/* Narrative */}
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 15, lineHeight: 1.85, color: '#4A4640', maxWidth: 640, marginBottom: 32 }}>
            {isFr ? ti.narrativeFr : ti.narrative}
          </p>

          {/* Divider */}
          <div style={{ height: 1, background: DS.RULE, marginBottom: 32 }} />

          {/* Implication */}
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9690', marginBottom: 12 }}>
            {isFr ? 'Ce que cela signifie en pratique' : 'What this means in practice'}
          </div>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 15, lineHeight: 1.85, color: '#4A4640', maxWidth: 640 }}>
            {isFr ? ti.implicationFr : ti.implication}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — COGNITIVE ARCHITECTURE (white)
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderTop: `1px solid ${DS.RULE}`, borderBottom: `1px solid ${DS.RULE}` }}>
        <div className="report-section">
          <div className="section-label">{t.sectionArch}</div>

          {dims.map((dim, i) => {
            const val = [arch.fluidReasoning, arch.workingMemory, arch.processingSpeed, arch.verbalComprehension][i];
            return (
              <div key={dim.label} style={{ marginBottom: 48 }}>
                <ArchBar
                  label={isFr ? dim.labelFr : dim.label}
                  score={val}
                  pct={archPct(val)}
                />
                <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, lineHeight: 1.8, color: '#5A5650', marginTop: 12, maxWidth: 620 }}>
                  {isFr ? dim.interpretationFr : dim.interpretation}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — COGNITIVE SIGNATURE (dark)
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DS.INK, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: DS.TER }} />
        <div className="report-section">
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {t.sectionSig}
          </div>

          {/* Profile title */}
          <div style={{
            fontFamily: 'Lora, serif',
            fontSize: 36, fontWeight: 600,
            color: '#fff', lineHeight: 1.2,
            marginBottom: 24, maxWidth: 540,
          }}>
            {isFr ? sig.titleFr : sig.title}
          </div>

          <p style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: 16, lineHeight: 1.8,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 560,
          }}>
            {isFr ? sig.bodyFr : sig.body}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 — COGNITIVE STRENGTHS (cream)
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DS.CREAM }}>
        <div className="report-section">
          <div className="section-label">{t.sectionStr}</div>

          {str.map((s, i) => (
            <div key={i} className="strength-card">
              <span className="strength-icon">{s.icon}</span>
              <div className="strength-title">{isFr ? s.titleFr : s.title}</div>
              <p className="strength-desc">{isFr ? s.descFr : s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6 — DEVELOPMENT PROTOCOL (white)
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderTop: `1px solid ${DS.RULE}`, borderBottom: `1px solid ${DS.RULE}` }}>
        <div className="report-section" style={{ position: 'relative' }}>
          <div className="section-label">{t.sectionRec}</div>

          <div>
            {recs.map((r) => (
              <div key={r.num} className="rec-item">
                <div className="rec-num">{r.num}</div>
                <div>
                  <div className="rec-title">{isFr ? r.titleFr : r.title}</div>
                  <p className="rec-desc" style={{ marginBottom: 12 }}>{isFr ? r.detailFr : r.detail}</p>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: DS.TER, fontWeight: 500, background: '#FBF0EB', padding: '8px 12px', borderRadius: 2, display: 'inline-block' }}>
                    {isFr ? r.howFr : r.how}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7 — CERTIFICATE (cream)
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DS.CREAM, paddingTop: 72, paddingBottom: 80 }}>
        <div style={{ padding: '0 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div className="section-label">{t.sectionCert}</div>
          </div>

          <div className="cert-border">
            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

              {/* Wordmark */}
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 10, fontWeight: 600,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: DS.TER, marginBottom: 48,
              }}>
                BrainScale
              </div>

              {/* Score */}
              <div style={{
                fontFamily: 'Lora, serif',
                fontSize: 72, fontWeight: 700,
                color: DS.TER, lineHeight: 1,
                marginBottom: 12,
              }}>
                {score}
              </div>

              {/* Thin rule */}
              <div style={{ width: 32, height: 1, background: DS.TER, margin: '0 auto 14px' }} />

              {/* Tier */}
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: DS.INK, marginBottom: 48,
              }}>
                {isFr ? ti.labelFr : ti.label}
              </div>

              {/* Date */}
              <div style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 11, color: '#B0ABA5',
                letterSpacing: '0.04em',
              }}>
                {todayFull} · brainscale.app
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ maxWidth: 760, margin: '48px auto 0', padding: '0 24px' }}>
          <div style={{ height: 1, background: DS.RULE, marginBottom: 24 }} />
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 11, color: '#B0ABA5', lineHeight: 1.6 }}>
            {isFr
              ? 'BrainScale · brainscale.app · Ceci n\'est pas une évaluation clinique ou médicale.'
              : 'BrainScale · brainscale.app · Not a clinical or medical assessment.'}
          </p>
        </div>
      </section>
    </>
  );
}
