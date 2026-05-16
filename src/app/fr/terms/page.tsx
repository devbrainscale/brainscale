import Link from "next/link";

export const metadata = {
  title: "Conditions d'Utilisation — BrainScale",
  description: "Conditions générales d'utilisation du test cognitif gratuit BrainScale.",
  alternates: { canonical: "https://www.brainscale.app/fr/terms" },
};

export default function FrTermsPage() {
  return (
    <div style={{ backgroundColor: "#F7F6F2", minHeight: "100vh", fontFamily: "var(--font-body, sans-serif)" }}>
      <header style={{ backgroundColor: "#F7F6F2", borderBottom: "1px solid #E8E5DC", padding: "0 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/fr" style={{ fontFamily: "var(--font-display, serif)", fontSize: "18px", fontWeight: 600, color: "#1A1825", textDecoration: "none" }}>
            Brain<span style={{ color: "#5B4FCF" }}>Scale</span>
          </Link>
          <Link href="/fr/test" style={{ backgroundColor: "#5B4FCF", color: "#fff", padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Faire le test
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px 96px" }}>
        <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "42px", fontWeight: 300, color: "#1A1825", marginBottom: "8px" }}>
          Conditions d'Utilisation
        </h1>
        <p style={{ fontSize: "13px", color: "#9896A8", marginBottom: "48px" }}>Dernière mise à jour : 14 mai 2026</p>

        {[
          {
            title: "1. Acceptation des conditions",
            content: "En accédant à BrainScale (brainscale.app) ou en l'utilisant, vous acceptez d'être lié par ces Conditions d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le service. Nous nous réservons le droit de mettre à jour ces conditions à tout moment. L'utilisation continue du site après les modifications vaut acceptation.",
          },
          {
            title: "2. Description du service",
            content: "BrainScale fournit un test d'évaluation cognitive gratuit en ligne conçu pour estimer votre score QI sur la base de questions de raisonnement logique, spatial et analytique. Le service est fourni à des fins informatives et de divertissement uniquement.",
          },
          {
            title: "3. Pas une évaluation clinique",
            content: "Le test BrainScale n'est pas une évaluation psychométrique clinique certifiée. Les résultats sont des estimations basées sur les performances sur notre ensemble de questions et ne doivent pas être utilisés à des fins médicales, éducatives, professionnelles ou diagnostiques. Pour une évaluation certifiée du QI, veuillez consulter un psychologue agréé. BrainScale ne donne aucune garantie quant à l'exactitude, l'exhaustivité ou l'adéquation des résultats à un usage particulier.",
          },
          {
            title: "4. Conditions d'accès",
            content: "Vous devez avoir au moins 13 ans pour utiliser BrainScale. En utilisant le service, vous déclarez remplir cette condition d'âge. Si vous avez moins de 18 ans, vous devriez lire ces conditions avec un parent ou un tuteur.",
          },
          {
            title: "5. Utilisation acceptable",
            content: "Vous vous engagez à ne pas : tenter de décompiler, copier ou reproduire les questions du test ou l'algorithme de notation ; utiliser des outils automatisés, bots ou scripts pour accéder au service ; utiliser le service d'une manière qui pourrait l'endommager, le désactiver ou le dégrader ; présenter votre score BrainScale comme un résultat de QI certifié ; ou utiliser le service à des fins illicites.",
          },
          {
            title: "6. Propriété intellectuelle",
            content: "Tout le contenu de BrainScale — incluant notamment les questions du test, le design, le texte, les graphiques et le code — est la propriété de BrainScale et est protégé par les lois applicables en matière de propriété intellectuelle. Vous ne pouvez pas reproduire, distribuer ou créer des œuvres dérivées sans notre autorisation écrite expresse.",
          },
          {
            title: "7. Exclusion de garanties",
            content: "BrainScale est fourni « tel quel » et « selon disponibilité » sans aucune garantie d'aucune sorte, expresse ou implicite. Nous ne garantissons pas que le service sera ininterrompu, exempt d'erreurs ou de virus ou d'autres composants nuisibles. Nous ne garantissons pas l'exactitude ni la fiabilité des résultats produits par le service.",
          },
          {
            title: "8. Limitation de responsabilité",
            content: "Dans toute la mesure permise par la loi, BrainScale et ses opérateurs ne pourront être tenus responsables de tout dommage indirect, accessoire, spécial, consécutif ou punitif découlant de votre utilisation du service, y compris notamment la confiance dans les résultats du test, la perte de données ou la perte de profits.",
          },
          {
            title: "9. Liens vers des tiers",
            content: "BrainScale peut contenir des liens vers des sites web tiers. Nous ne sommes pas responsables du contenu, des pratiques de confidentialité ni des conditions de ces sites. Les liens ne constituent pas un cautionnement.",
          },
          {
            title: "10. Droit applicable",
            content: "Ces conditions sont régies par le droit suisse, sans égard aux principes de conflit de lois. Tout litige découlant de ces conditions ou de votre utilisation de BrainScale sera soumis à la juridiction exclusive des tribunaux suisses.",
          },
          {
            title: "11. Contact",
            content: "Pour toute question relative aux présentes Conditions d'Utilisation, contactez-nous à : contact@brainscale.app",
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "36px" }}>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "20px", fontWeight: 500, color: "#1A1825", marginBottom: "12px" }}>
              {section.title}
            </h2>
            <p style={{ fontSize: "15px", color: "#5C5A6E", lineHeight: 1.8 }}>
              {section.content}
            </p>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #E8E5DC", paddingTop: "32px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <Link href="/fr/privacy" style={{ fontSize: "14px", color: "#5B4FCF", textDecoration: "none", fontWeight: 500 }}>Politique de confidentialité</Link>
          <Link href="/fr" style={{ fontSize: "14px", color: "#9896A8", textDecoration: "none" }}>← Retour à l'accueil</Link>
        </div>
      </main>
    </div>
  );
}
