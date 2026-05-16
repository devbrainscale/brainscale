import Link from "next/link";

export const metadata = {
  title: "Politique de Confidentialité — BrainScale",
  description: "Comment BrainScale traite vos données. Collecte minimale, aucune vente de données personnelles.",
  alternates: { canonical: "https://www.brainscale.app/fr/privacy" },
};

export default function FrPrivacyPage() {
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
          Politique de Confidentialité
        </h1>
        <p style={{ fontSize: "13px", color: "#9896A8", marginBottom: "48px" }}>Dernière mise à jour : 14 mai 2026</p>

        {[
          {
            title: "Aperçu général",
            content: "BrainScale est conçu avec la confidentialité comme valeur par défaut. Aucune inscription n'est requise pour passer le test, vos réponses ne sont jamais stockées sur nos serveurs, et nous ne vendons jamais vos données. Cette politique explique l'ensemble des données que nous collectons et les raisons de cette collecte.",
          },
          {
            title: "1. Données collectées",
            content: "Nous collectons deux types de données : (a) Des analyses anonymes via Google Analytics 4 (GA4) — pages visitées, temps passé sur le site, région géographique, type d'appareil. Ces données sont agrégées et anonymisées. (b) Adresse e-mail et score QI — uniquement si vous soumettez volontairement votre e-mail sur la page de résultats pour recevoir votre plan d'amélioration gratuit. Ces données sont stockées dans Brevo, notre plateforme d'e-mailing, et sont utilisées uniquement pour vous envoyer le contenu demandé. Nous ne collectons pas votre nom, vos réponses au test, ni aucune autre information personnelle sensible.",
          },
          {
            title: "2. E-mails marketing",
            content: "Si vous fournissez votre adresse e-mail sur la page de résultats, vous consentez à recevoir des e-mails de BrainScale incluant votre résumé de résultats et des conseils d'amélioration cognitive. Vous pouvez vous désabonner à tout moment en cliquant sur le lien « Se désabonner » en bas de chaque e-mail. Votre adresse e-mail est stockée de manière sécurisée dans Brevo et n'est jamais vendue ni partagée avec des tiers.",
          },
          {
            title: "3. Cookies",
            content: "Nous utilisons des cookies uniquement pour la mesure Google Analytics, sous réserve de votre consentement. Il s'agit de cookies analytiques qui nous aident à comprendre comment les visiteurs utilisent le site de manière agrégée. Nous n'utilisons pas de cookies publicitaires, de traçage ou de profilage. Vous pouvez retirer votre consentement aux cookies à tout moment via la bannière de cookies ou en désactivant les cookies dans les paramètres de votre navigateur.",
          },
          {
            title: "4. Fonctionnement du test",
            content: "Vos réponses individuelles au test sont traitées entièrement dans votre navigateur et ne sont jamais stockées sur nos serveurs. À la fin du test, seul le nombre total de bonnes réponses (et non les réponses individuelles) est envoyé à notre serveur pour calculer et signer votre score QI. Ce score est ensuite affiché sur votre page de résultats. Nous ne conservons aucun enregistrement de vos performances au test.",
          },
          {
            title: "5. Services tiers",
            content: "Nous utilisons : Google Analytics 4 (Google LLC) pour les analyses d'utilisation anonymes ; Brevo (Sendinblue SAS) pour la livraison d'e-mails si vous vous abonnez ; Stripe (Stripe, Inc.) pour le traitement des paiements si vous achetez un rapport. Ces services traitent les données selon leurs propres politiques de confidentialité respectives. Nous n'utilisons pas de réseaux publicitaires ni de courtiers en données.",
          },
          {
            title: "6. Vos droits (RGPD)",
            content: "Si vous êtes situé dans l'Espace économique européen ou en Suisse, vous avez le droit d'accéder à vos données personnelles, de les corriger ou de les supprimer ; de retirer votre consentement aux e-mails marketing à tout moment ; et de déposer une plainte auprès de votre autorité locale de protection des données. Pour exercer vos droits, contactez-nous à : contact@brainscale.app. Nous répondrons dans les 30 jours.",
          },
          {
            title: "7. Responsable du traitement",
            content: "Le responsable du traitement des données pour BrainScale est : BrainScale, Postfach, 2501 Biel/Bienne, Suisse. Contact : contact@brainscale.app",
          },
          {
            title: "8. Protection des mineurs",
            content: "BrainScale n'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons sciemment aucune donnée provenant d'enfants de moins de 13 ans. Si vous pensez qu'un enfant a utilisé le service, veuillez nous contacter et nous prendrons les mesures appropriées.",
          },
          {
            title: "9. Modifications de cette politique",
            content: "Nous pouvons mettre à jour cette politique de temps en temps. Les modifications seront publiées sur cette page avec une date de mise à jour. L'utilisation continue de BrainScale après les modifications vaut acceptation de la politique mise à jour.",
          },
          {
            title: "10. Contact",
            content: "Pour toute question ou préoccupation relative à la confidentialité, contactez-nous à : contact@brainscale.app",
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
          <Link href="/fr/terms" style={{ fontSize: "14px", color: "#5B4FCF", textDecoration: "none", fontWeight: 500 }}>Conditions d'utilisation</Link>
          <Link href="/fr" style={{ fontSize: "14px", color: "#9896A8", textDecoration: "none" }}>← Retour à l'accueil</Link>
        </div>
      </main>
    </div>
  );
}
