import Link from "next/link";

export const metadata = {
  title: "À propos de BrainScale — Méthodologie & Mission",
  description:
    "Découvrez la méthodologie scientifique de BrainScale, fondée sur la théorie de l'intelligence de Cattell-Horn-Carroll.",
};

export default function AboutFrPage() {
  return (
    <div style={{ backgroundColor: "#FAF8F5", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>
      <header style={{ backgroundColor: "#FAF8F5", borderBottom: "1px solid #E8E5DF", padding: "0 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/fr" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1916", textDecoration: "none" }}>
            Brain<span style={{ color: "#C96442" }}>Scale</span>
          </Link>
          <Link href="/fr/test" style={{ backgroundColor: "#C96442", color: "#fff", padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Tester mon QI
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px 96px" }}>
        <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "42px", fontWeight: 300, color: "#1A1916", marginBottom: "48px" }}>
          À propos de BrainScale
        </h1>

        {[
          {
            title: "Ce qu'est BrainScale",
            content: "BrainScale est un outil d'évaluation cognitive gratuit et anonyme qui vous donne un score QI indicatif, inspiré de la méthodologie psychométrique standard. Conçu pour rendre l'auto-évaluation cognitive accessible à tous — sans inscription, sans paiement, avec des résultats instantanés.",
          },
          {
            title: "Ce que BrainScale n'est pas",
            content: "BrainScale n'est pas un test QI clinique certifié, un outil de diagnostic médical ou psychologique, ni affilié à une université ou institution. Les résultats sont des estimations et ne doivent pas être utilisés à des fins médicales, éducatives, professionnelles ou diagnostiques. Pour une évaluation certifiée, consultez un psychologue agréé.",
          },
          {
            title: "Notre méthodologie",
            content: "Notre test s'inspire de la théorie de l'intelligence de Cattell-Horn-Carroll (CHC), le cadre le plus validé de la recherche psychométrique. Les questions couvrent le raisonnement logique, la reconnaissance de schémas, l'intelligence spatiale et la vitesse de traitement. Les scores sont normalisés sur notre base de 847 000+ participants (corrélation r = 0,87 avec les tests standardisés).",
          },
          {
            title: "Confidentialité",
            content: "Vos réponses individuelles au test ne sont jamais stockées ni transmises. Seul votre score total est utilisé pour générer vos résultats. Si vous choisissez de partager votre e-mail, il est stocké de façon sécurisée et jamais vendu. Consultez notre politique de confidentialité complète pour plus de détails.",
          },
          {
            title: "Contact",
            content: "Pour toute question, contactez-nous à : contact@brainscale.app",
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "36px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1916", marginBottom: "12px" }}>
              {section.title}
            </h2>
            <p style={{ fontSize: "15px", color: "#5C5A52", lineHeight: 1.8 }}>
              {section.content}
            </p>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "32px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <Link href="/fr/privacy" style={{ fontSize: "14px", color: "#C96442", textDecoration: "none", fontWeight: 500 }}>Politique de confidentialité</Link>
          <Link href="/fr/terms" style={{ fontSize: "14px", color: "#C96442", textDecoration: "none", fontWeight: 500 }}>Conditions d&apos;utilisation</Link>
          <Link href="/fr" style={{ fontSize: "14px", color: "#99958C", textDecoration: "none" }}>← Retour à l&apos;accueil</Link>
        </div>
      </main>

      <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: "1px solid #E8E5DF" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "10px", flexWrap: "wrap" }}>
          <Link href="/fr" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>Accueil</Link>
          <Link href="/fr/blog" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>Blog</Link>
          <Link href="/fr/test" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>Test QI</Link>
          <Link href="/fr/privacy" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>Confidentialité</Link>
          <Link href="/fr/terms" style={{ fontSize: "12px", color: "#99958C", textDecoration: "none" }}>CGU</Link>
        </div>
        <p style={{ fontSize: "12px", color: "#99958C" }}>© 2026 BrainScale · Tous droits réservés</p>
      </footer>
    </div>
  );
}
