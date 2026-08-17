"use client";

/* eslint-disable @next/next/no-img-element, react/no-unescaped-entities */

import { FormEvent, useState } from "react";

const images = {
  hero: "https://images.pexels.com/photos/31137459/pexels-photo-31137459/free-photo-of-close-up-of-a-3d-printer-in-action.jpeg?auto=compress&cs=tinysrgb&w=1800",
  finished: "https://images.pexels.com/photos/19583534/pexels-photo-19583534/free-photo-of-man-holding-a-tray-with-plastic-3d-printed-items.jpeg?auto=compress&cs=tinysrgb&w=1000",
  precision: "https://images.pexels.com/photos/20877039/pexels-photo-20877039/free-photo-of-close-up-of-3d-printer.jpeg?auto=compress&cs=tinysrgb&w=1400",
  orange: "https://images.pexels.com/photos/30554826/pexels-photo-30554826/free-photo-of-close-up-of-a-futuristic-3d-printer-in-action.jpeg?auto=compress&cs=tinysrgb&w=1400",
  machine: "https://images.pexels.com/photos/22491105/pexels-photo-22491105/free-photo-of-close-up-of-a-3d-printer.jpeg?auto=compress&cs=tinysrgb&w=1400",
  hand: "https://images.pexels.com/photos/17509941/pexels-photo-17509941/free-photo-of-hand-over-3d-printer.jpeg?auto=compress&cs=tinysrgb&w=1400",
};

const services = [
  ["01", "Prototypage rapide", "Validez une forme, un assemblage ou une idée avant de lancer votre production.", "Tester plus vite"],
  ["02", "Pièces fonctionnelles", "Des pièces adaptées à l'usage réel : gabarits, supports, boîtiers et outillages.", "Produire utile"],
  ["03", "Petites séries", "Une fabrication agile pour vos préséries, besoins ponctuels ou productions régulières.", "Rester flexible"],
  ["04", "Sur-mesure & finition", "Du fichier 3D à la pièce finie, avec conseil matière et niveau de finition maîtrisé.", "Soigner le détail"],
];

const audiences = [
  ["Artisans", "Une pièce introuvable, un gabarit métier ou un accessoire adapté à votre quotidien."],
  ["Commerçants", "Présentoirs, signalétique, supports et objets personnalisés pour votre point de vente."],
  ["Bureaux d'études", "Des prototypes précis et des itérations rapides pour accélérer vos validations."],
  ["TPE & industrie", "Des petites séries, pièces de maintenance et solutions spécifiques sans outillage lourd."],
];

const steps = [
  ["01", "Vous partagez votre besoin", "Un croquis, une photo, un fichier 3D ou simplement une idée."],
  ["02", "Nous étudions la solution", "Dimensions, contraintes, matière, finition, délai et quantité."],
  ["03", "Nous fabriquons", "Impression contrôlée, suivi qualité et ajustements si nécessaire."],
  ["04", "Vous recevez vos pièces", "Livraison soignée, prêtes à être testées, montées ou utilisées."],
];

export default function Home() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFormError(false);
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      if (!response.ok) throw new Error("Form submission failed");
      setSent(true);
    } catch {
      setFormError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Benji Imprim, retour en haut">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>BENJI <b>IMPRIM</b></span>
        </a>
        <nav aria-label="Navigation principale">
          <a href="#services">Services</a><a href="#realisations">Réalisations</a><a href="#process">Méthode</a>
        </nav>
        <a className="header-cta" href="#devis" aria-label="Demander un devis">
          <span className="cta-long">Demander un devis</span><span className="cta-short">Devis</span><i aria-hidden="true">↗</i>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-media"><img src={images.hero} alt="Imprimante 3D en fonctionnement dans un atelier" /><div className="hero-shade" /></div>
        <div className="hero-content reveal">
          <p className="eyebrow light"><span /> Fabrication additive · France</p>
          <h1>Vos idées prennent<br /><em>forme.</em></h1>
          <p className="hero-lead">Impression 3D sur mesure pour les professionnels qui veulent prototyper, réparer et produire sans compromis.</p>
          <div className="hero-actions">
            <a className="button button-accent" href="#devis">Parler de votre projet <span>↗</span></a>
            <a className="text-link" href="#realisations">Voir les réalisations <span>↓</span></a>
          </div>
        </div>
        <aside className="hero-card reveal delay-1">
          <img src={images.finished} alt="Pièces imprimées en 3D prêtes à être livrées" />
          <div><span>Projet sur mesure</span><strong>De l'idée à la pièce finie.</strong></div>
        </aside>
        <div className="hero-meta"><span>01 — Conception</span><span>02 — Impression</span><span>03 — Finition</span></div>
      </section>

      <section className="intro section-shell">
        <div><p className="eyebrow"><span /> Notre approche</p><p className="section-index">01 / 07</p></div>
        <div className="intro-copy">
          <h2>La bonne pièce.<br />La bonne matière.<br /><em>Au bon moment.</em></h2>
          <p>Benji Imprim transforme un besoin concret en solution fabriquée. Nous vous accompagnons dans les choix techniques pour obtenir une pièce fiable, précise et réellement adaptée à son usage.</p>
          <div className="micro-values"><span>Conseil technique</span><span>Fabrication locale</span><span>Réponse rapide</span></div>
        </div>
      </section>

      <section className="services section-shell" id="services">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> Nos services</p><p className="section-index">02 / 07</p></div>
          <h2>Fabriquer autrement,<br /><em>sans complexité.</em></h2>
        </div>
        <div className="service-grid">
          {services.map(([number, title, description, tag]) => (
            <article className="service-card" key={number}>
              <span className="card-number">{number}</span><div className="service-icon" aria-hidden="true"><span /><span /><span /></div>
              <h3>{title}</h3><p>{description}</p><div className="card-footer"><span>{tag}</span><b>↗</b></div>
            </article>
          ))}
        </div>
      </section>

      <section className="work" id="realisations">
        <div className="section-shell work-heading">
          <div><p className="eyebrow light"><span /> Réalisations</p><p className="section-index light-index">03 / 07</p></div>
          <h2>Des pièces pensées<br />pour le <em>réel.</em></h2>
          <p>Prototypes, outillages, objets personnalisés et petites séries : chaque projet répond à un usage précis.</p>
        </div>
        <div className="gallery section-shell">
          <figure className="gallery-main"><img src={images.orange} alt="Pièce orange en cours d'impression 3D" /><figcaption><span>Pièce technique</span><b>Impression haute précision</b></figcaption></figure>
          <figure><img src={images.finished} alt="Série de composants imprimés en 3D" /><figcaption><span>Petite série</span><b>Composants fonctionnels</b></figcaption></figure>
          <figure><img src={images.hand} alt="Retrait d'une pièce finie du plateau d'impression" /><figcaption><span>Finition</span><b>Contrôle de chaque pièce</b></figcaption></figure>
          <figure className="gallery-wide"><img src={images.precision} alt="Détail de la tête d'une imprimante 3D" /><figcaption><span>Prototypage</span><b>Du fichier à la matière</b></figcaption></figure>
        </div>
      </section>

      <section className="audiences section-shell">
        <div className="section-heading audience-heading">
          <div><p className="eyebrow"><span /> Pour qui ?</p><p className="section-index">04 / 07</p></div>
          <h2>Une réponse agile<br />pour chaque <em>métier.</em></h2>
        </div>
        <div className="audience-list">
          {audiences.map(([title, text], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><b aria-hidden="true">↗</b></article>
          ))}
        </div>
      </section>

      <section className="process section-shell" id="process">
        <div className="process-photo"><img src={images.machine} alt="Mécanisme d'une imprimante 3D moderne" /><span>Précision · Maîtrise · Répétabilité</span></div>
        <div className="process-content">
          <div><p className="eyebrow"><span /> Comment ça marche</p><p className="section-index">05 / 07</p></div>
          <h2>Simple, du premier<br />échange à la <em>livraison.</em></h2>
          <div className="steps">
            {steps.map(([number, title, text]) => (
              <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="strengths">
        <div className="section-shell strength-grid">
          <div className="strength-title"><p className="eyebrow light"><span /> Pourquoi Benji Imprim</p><p className="section-index light-index">06 / 07</p><h2>Le niveau d'exigence<br />d'un partenaire <em>industriel.</em></h2></div>
          <div className="strength-list">
            <div><strong>24 h</strong><span>pour une première étude de faisabilité</span></div>
            <div><strong>1 → 500</strong><span>pièces, du prototype à la petite série</span></div>
            <div><strong>100 %</strong><span>de vos projets suivis par un interlocuteur unique</span></div>
          </div>
        </div>
      </section>

      <section className="testimonials section-shell">
        <div className="section-heading compact-heading">
          <div><p className="eyebrow"><span /> Ils nous font confiance</p><p className="section-index">07 / 07</p></div>
          <h2>La preuve par<br /><em>l'usage.</em></h2>
        </div>
        <div className="testimonial-grid">
          <blockquote><span>“</span><p>Une pièce devenue introuvable, reproduite rapidement et parfaitement ajustée. Notre machine a pu repartir sans attendre.</p><footer><b>M. L.</b><small>Artisan · Témoignage exemple</small></footer></blockquote>
          <blockquote><span>“</span><p>Benji Imprim nous a aidés à simplifier le prototype avant fabrication. Une vraie écoute et un résultat très propre.</p><footer><b>S. D.</b><small>Bureau d'études · Témoignage exemple</small></footer></blockquote>
          <blockquote><span>“</span><p>De l'idée au présentoir final, tout a été fluide. Les petites séries nous permettent de tester sans immobiliser de budget.</p><footer><b>A. R.</b><small>Commerce · Témoignage exemple</small></footer></blockquote>
        </div>
      </section>

      <section className="quote-section" id="devis">
        <div className="section-shell quote-grid">
          <div className="quote-copy">
            <p className="eyebrow light"><span /> Votre projet</p><h2>Une idée ?<br /><em>Faisons-la exister.</em></h2>
            <p>Décrivez-nous votre besoin, même simplement. Nous revenons vers vous pour préciser le projet et établir un devis personnalisé.</p>
            <div className="contact-line"><span>Réponse sous 24 h ouvrées</span><span>Projets partout en France</span></div>
          </div>
          {sent ? (
            <div className="success" role="status"><span>✓</span><h3>Merci pour votre demande.</h3><p>Votre projet a bien été préparé. Pour la version finale, ce formulaire sera relié à l'adresse de Benji Imprim.</p><button onClick={() => setSent(false)}>Envoyer une autre demande</button></div>
          ) : (
            <form name="demande-devis" method="POST" data-netlify="true" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="demande-devis" />
              <div className="field-row"><label>Nom et prénom<input required name="name" placeholder="Votre nom" /></label><label>Entreprise<input name="company" placeholder="Nom de l'entreprise" /></label></div>
              <div className="field-row"><label>E-mail<input required type="email" name="email" placeholder="vous@entreprise.fr" /></label><label>Téléphone<input type="tel" name="phone" placeholder="06 00 00 00 00" /></label></div>
              <label>Votre besoin<select name="need" defaultValue=""><option value="" disabled>Sélectionnez un service</option><option>Prototypage rapide</option><option>Pièce fonctionnelle</option><option>Petite série</option><option>Objet sur mesure</option><option>Je ne sais pas encore</option></select></label>
              <label>Parlez-nous du projet<textarea required name="message" rows={4} placeholder="Dimensions, quantité, usage, délai… Quelques mots suffisent." /></label>
              {formError && <p className="form-error" role="alert">La demande n'a pas pu être envoyée. Vous pouvez réessayer dans un instant.</p>}
              <div className="form-bottom"><label className="checkbox"><input required type="checkbox" name="consent" value="oui" /> <span>J'accepte d'être recontacté au sujet de ma demande.</span></label><button className="button button-accent" type="submit" disabled={submitting}>{submitting ? "Envoi en cours…" : "Envoyer ma demande"} <span>↗</span></button></div>
            </form>
          )}
        </div>
      </section>

      <footer className="footer" id="mentions-legales">
        <div className="section-shell footer-top">
          <a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>BENJI <b>IMPRIM</b></span></a>
          <p>L'impression 3D sur mesure<br />pensée pour les professionnels.</p>
          <div><b>Nous contacter</b><a href="mailto:contact@benji-imprim.fr">contact@benji-imprim.fr</a><span>France entière</span></div>
          <div><b>Navigation</b><a href="#services">Services</a><a href="#realisations">Réalisations</a><a href="#devis">Demander un devis</a></div>
        </div>
        <div className="section-shell footer-bottom"><span>© 2026 Benji Imprim. Maquette de présentation.</span><span>Mentions légales · Confidentialité</span><a href="#top">Retour en haut ↑</a></div>
      </footer>
    </main>
  );
}
