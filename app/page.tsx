"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const gallery = [
  ["https://images.pexels.com/photos/19583534/pexels-photo-19583534/free-photo-of-man-holding-a-tray-with-plastic-3d-printed-items.jpeg?auto=compress&cs=tinysrgb&w=900", "Petite série"],
  ["https://images.pexels.com/photos/20877039/pexels-photo-20877039/free-photo-of-close-up-of-3d-printer.jpeg?auto=compress&cs=tinysrgb&w=900", "Pièce technique"],
  ["https://images.pexels.com/photos/17509941/pexels-photo-17509941/free-photo-of-hand-over-3d-printer.jpeg?auto=compress&cs=tinysrgb&w=900", "Objet sur mesure"],
  ["https://images.pexels.com/photos/30554826/pexels-photo-30554826/free-photo-of-close-up-of-a-futuristic-3d-printer-in-action.jpeg?auto=compress&cs=tinysrgb&w=900", "Prototype"],
  ["https://images.pexels.com/photos/22491105/pexels-photo-22491105/free-photo-of-close-up-of-a-3d-printer.jpeg?auto=compress&cs=tinysrgb&w=900", "Impression précise"],
  ["https://images.pexels.com/photos/31137459/pexels-photo-31137459/free-photo-of-close-up-of-a-3d-printer-in-action.jpeg?auto=compress&cs=tinysrgb&w=900", "Fabrication locale"],
];

const uses = [
  ["↻", "Réparations"], ["◆", "Remplacements"], ["✹", "Mécanismes"], ["♟", "Figurines"],
  ["♞", "Jouets"], ["✦", "Décoration"], ["⌁", "Sur mesure"], ["▱", "Boîtiers"],
  ["◢", "Gabarits"], ["✣", "Adaptateurs"], ["▣", "Prototypes"], ["▤", "Maquettes"],
];

const priceTiers = [
  { id: "XS", label: "Très petits objets", dims: "L + l + h ≤ 25 cm", price: 10, ship: 5 },
  { id: "S", label: "Petits objets", dims: "L + l + h ≤ 35 cm", price: 19, ship: 6 },
  { id: "M", label: "Objets moyens", dims: "L + l + h ≤ 50 cm", price: 29, ship: 7, popular: true },
  { id: "L", label: "Grands objets", dims: "L + l + h ≤ 70 cm", price: 60, ship: 9 },
  { id: "XL", label: "Très grands objets", dims: "L + l + h ≤ 100 cm", price: 180, ship: 14 },
];

const colors = [
  "#f6f0d7", "#dad8d2", "#f8f8f6", "#222326", "#df3143", "#2251bb", "#16a35f", "#f79027", "#15a9a7", "#f55c9e", "#8a46cf", "#6b3a1f",
  "#0f1011", "#a9282d", "#244b94", "#16a4b7", "#36b879", "#deb322", "#ff841d", "#91562e", "#9f876f", "#776a5c",
];

const materialOptions = [
  { id: "pla", title: "PLA", note: "Polyvalent · propre · idéal au quotidien", extra: 0 },
  { id: "petg", title: "PETG", note: "Plus résistant · pièces techniques", extra: 4 },
  { id: "abs", title: "ABS", note: "Solide · bonne tenue à la chaleur", extra: 6 },
  { id: "tpu", title: "TPU", note: "Souple · flexible · amortissant", extra: 8 },
];

const finishOptions = [
  { id: "essential", title: "Essentielle", note: "Ébavurage simple", extra: 0 },
  { id: "matte", title: "Finition matifiée", note: "Surface uniforme et plus douce", extra: 9 },
];

const sendModes = [
  { id: "file", title: "J’ai un modèle 3D", note: "Fichier .stl, .obj ou .step", cta: "Envoyer mon fichier", tone: "purple" },
  { id: "link", title: "J’ai un lien", note: "Thingiverse, Printables, MakerWorld…", cta: "Partager un lien", tone: "cyan" },
  { id: "idea", title: "Je n’ai pas de modèle", note: "Une photo, un croquis ou une idée suffit", cta: "Décrire mon projet", tone: "amber" },
];

function Logo() {
  return (
    <span className="logo" aria-label="Benj'imprim">
      <span className="logo-bars" aria-hidden="true"><i /><i /><i /></span>
      <span className="logo-word">Benj<span>’imprim</span></span>
    </span>
  );
}

function Cube() {
  return (
    <div className="cube-stage" aria-hidden="true">
      <div className="cube-glow" />
      <div className="cube">
        <span className="face front" /><span className="face back" /><span className="face right" /><span className="face left" /><span className="face top" /><span className="face bottom" />
      </div>
      <span className="float-pill p1"><b /> Modèle fourni</span>
      <span className="float-pill p2"><b /> Sur mesure</span>
      <span className="float-pill p3"><b /> Multi-couleur</span>
    </div>
  );
}

function SectionKicker({ children }: { children?: React.ReactNode }) {
  return <p className="kicker"><span>✦</span>{children}</p>;
}

export default function Home() {
  const [activeMode, setActiveMode] = useState("file");
  const [size, setSize] = useState("M");
  const [color, setColor] = useState(colors[4]);
  const [material, setMaterial] = useState("pla");
  const [finish, setFinish] = useState("essential");
  const [qty, setQty] = useState(1);
  const [social, setSocial] = useState("yes");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState(false);
  const orderRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const price = useMemo(() => {
    const tier = priceTiers.find((t) => t.id === size) ?? priceTiers[2];
    const mat = materialOptions.find((m) => m.id === material)?.extra ?? 0;
    const fin = finishOptions.find((f) => f.id === finish)?.extra ?? 0;
    const discount = qty >= 10 ? 0.15 : qty >= 6 ? 0.10 : qty >= 3 ? 0.05 : 0;
    const unit = (tier.price + mat + fin) * (1 - discount);
    return { unit, subtotal: unit * qty, ship: tier.ship, total: unit * qty + tier.ship };
  }, [finish, material, qty, size]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setFormError(false);
    const formData = new FormData(event.currentTarget);
    formData.set("size", size);
    formData.set("color", color);
    formData.set("material", material);
    formData.set("finish", finish);
    formData.set("quantity", String(qty));
    formData.set("project-start", activeMode);
    formData.set("social", social);
    formData.set("estimated-total", price.total.toFixed(2));
    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      if (!response.ok) throw new Error("submission failed");
      setSent(true);
      setTimeout(() => orderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
    } catch {
      setFormError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand-link"><Logo /></a>
        <nav aria-label="Navigation principale">
          <a href="#tarifs">Tarifs</a>
          <a href="#envoi">Envoyer mon projet</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <a className="social-dot" href="#reseaux" aria-label="Instagram">◎</a>
          <a className="social-dot" href="#reseaux" aria-label="TikTok">♪</a>
          <a className="black-pill" href="#commande">Commander</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy" data-reveal>
          <SectionKicker>Impression 3D sur mesure</SectionKicker>
          <h1>L’impression 3D <em>à la demande</em>, sans prise de tête.</h1>
          <p>Vous avez un modèle, un lien ou juste une idée ? On s’occupe du reste. Des tarifs simples selon la taille de votre pièce, sans mauvaise surprise.</p>
          <div className="hero-buttons">
            <a className="primary-btn" href="#commande">Commander une impression <span>→</span></a>
            <a className="plain-link" href="#tarifs">Voir les tarifs</a>
          </div>
          <div className="hero-stats">
            <div><strong>5</strong><span>tailles forfaitaires</span></div>
            <div><strong>30+</strong><span>couleurs en stock</span></div>
            <div><strong>24h</strong><span>devis garanti</span></div>
          </div>
        </div>
        <div className="hero-art" data-reveal><Cube /></div>
      </section>

      <div className="trust-strip">
        <span>✦ Devis gratuit sous 24h</span><span>✦ Tarifs forfaitaires clairs</span><span>✦ Livraison France entière</span><span>✦ Paiement sécurisé</span>
      </div>

      <section className="story section" id="realisations">
        <div className="split-heading" data-reveal>
          <div><SectionKicker>Réalisations</SectionKicker><h2>Des objets qui ont une <em>histoire.</em></h2></div>
          <p>Chaque pièce est fabriquée sur mesure, vérifiée à la main, ajustée pour servir au quotidien.</p>
        </div>
        <div className="reel" data-reveal>
          <div className="reel-track">
            {[...gallery, ...gallery].map(([src, label], index) => (
              <figure key={`${label}-${index}`}><img src={src} alt="Réalisation d'impression 3D" /><figcaption>{label}</figcaption></figure>
            ))}
          </div>
        </div>
      </section>

      <section className="send section" id="envoi">
        <div className="split-heading" data-reveal>
          <div><SectionKicker>Comment ça marche ?</SectionKicker><h2>Trois façons de nous <em>envoyer votre projet.</em></h2></div>
          <p>Vous avez un fichier, un lien ou juste une idée. Dans tous les cas, on s’occupe de vérifier, préparer et imprimer votre pièce.</p>
        </div>
        <div className="send-grid">
          {sendModes.map((mode, index) => (
            <article className={`send-card ${mode.tone}`} key={mode.id} data-reveal>
              <div className="mock-visual">
                {index === 0 && <><span className="wire-orb" /><span className="solid-orb" /></>}
                {index === 1 && <><span className="mini-browser" /><span className="solid-orb small" /></>}
                {index === 2 && <><span className="sketch-box" /><span className="solid-cube" /></>}
                <b className="mock-arrow">→</b>
              </div>
              <span className="option-index">OPTION 0{index + 1}</span>
              <h3>{mode.title}</h3><p>{mode.note}</p>
              <button type="button" onClick={() => { setActiveMode(mode.id); document.querySelector("#commande")?.scrollIntoView({ behavior: "smooth" }); }}>{mode.cta} →</button>
            </article>
          ))}
        </div>
      </section>

      <section className="possibilities section">
        <div className="split-heading" data-reveal>
          <div><SectionKicker>Possibilités</SectionKicker><h2>Tout ce que l’impression 3D<br />peut faire <em>pour vous.</em></h2></div>
          <p>Pièce cassée, idée déco, projet sur-mesure… Si vous pouvez l’imaginer, on peut probablement l’imprimer.</p>
        </div>
        <div className="use-grid" data-reveal>
          {uses.map(([icon, label]) => <div key={label}><span>{icon}</span><b>{label}</b></div>)}
        </div>
      </section>

      <section className="pricing section" id="tarifs">
        <div className="split-heading" data-reveal>
          <div><SectionKicker>Tarifs</SectionKicker><h2>Un prix forfaitaire selon la <em>taille.</em></h2></div>
          <p>Pas de calcul complexe ni de surprise à la livraison. Le tarif dépend uniquement de la taille de votre pièce, puis des options choisies.</p>
        </div>
        <div className="price-grid" data-reveal>
          {priceTiers.map((tier) => (
            <button className={`price-card ${tier.popular ? "popular" : ""}`} key={tier.id} type="button" onClick={() => { setSize(tier.id); document.querySelector("#commande")?.scrollIntoView({ behavior: "smooth" }); }}>
              {tier.popular && <span className="popular-label">POPULAIRE</span>}
              <span className="size-tag">TAILLE {tier.id}</span>
              <h3>{tier.label}</h3><p>{tier.dims}</p><strong>{tier.price}€</strong><small>/ pièce · + {tier.ship}€ port</small>
            </button>
          ))}
        </div>

        <div className="quantity-panel" data-reveal>
          <div className="quantity-head"><span>💡</span><div><h3>Prix dégressif selon la quantité</h3><p>Remise automatiquement appliquée sur le prix unitaire.</p></div></div>
          <div className="discount-table">
            <div><b>QUANTITÉ</b><b>REMISE</b><b>EXEMPLE TAILLE S</b></div>
            <div><span>1–2 pièces</span><span>0%</span><span>19,00 € / pièce</span></div>
            <div><span>3–5 pièces</span><span>-5%</span><span>18,05 € / pièce</span></div>
            <div><span>6–10 pièces</span><span>-10%</span><span>17,10 € / pièce</span></div>
            <div><span>10+ pièces</span><span>-15%</span><span>16,15 € / pièce</span></div>
          </div>
        </div>

        <div className="color-panel" data-reveal>
          <div><SectionKicker>Couleurs</SectionKicker><h3>Couleurs disponibles</h3><p>Plus de 30 teintes selon les matières et disponibilités.</p></div>
          <div className="palette-block"><b>PLA · SILK</b><div className="palette">{colors.slice(0,12).map((c) => <span key={c} style={{ backgroundColor: c }} />)}</div><b>PLA+ · MAT</b><div className="palette">{colors.slice(8).map((c) => <span key={c} style={{ backgroundColor: c }} />)}</div></div>
        </div>
      </section>

      <section className="manifesto section" data-reveal>
        <blockquote>“Vous m’indiquez votre idée, je m’occupe du reste.<br />Pas de devis brouillon, pas de prise de tête. Juste du travail bien fait.”</blockquote>
        <span>— Benj’imprim · atelier d’impression 3D</span>
      </section>

      <section className="testimonials section">
        <div className="split-heading" data-reveal>
          <div><SectionKicker>Avis</SectionKicker><h2>Ce qu’en pensent mes <em>clients.</em></h2></div>
          <p>Un bon échange, une pièce qui sert vraiment, et le résultat parle de lui-même.</p>
        </div>
        <div className="testimonial-grid">
          <article data-reveal><div className="stars">★★★★★</div><p>“Super échange et résultat très propre. La pièce correspond exactement à ce dont j’avais besoin.”</p><footer><span className="avatar">ML</span><div><b>Marc L.</b><small>Projet sur mesure</small></div></footer></article>
          <article data-reveal><div className="stars">★★★★★</div><p>“Explications claires, fabrication rapide et finition soignée. Je recommande sans hésiter.”</p><footer><span className="avatar">JD</span><div><b>Julie D.</b><small>Petite série</small></div></footer></article>
        </div>
      </section>

      <section className="social-section section" id="reseaux">
        <div className="split-heading" data-reveal>
          <div><SectionKicker>Suivez l’atelier</SectionKicker><h2>On se croise sur les <em>réseaux ?</em></h2></div>
          <p>Coulisses, essais, nouvelles matières et projets terminés : suivez les prochaines impressions.</p>
        </div>
        <div className="social-cards" data-reveal>
          <a href="#contact"><span className="instagram">◎</span><div><b>Instagram</b><small>@benjimprim</small></div><em>Suivre</em></a>
          <a href="#contact"><span>♪</span><div><b>TikTok</b><small>@benjimprim</small></div><em>Suivre</em></a>
        </div>
      </section>

      <section className="order-section" id="commande" ref={orderRef}>
        <div className="order-heading section" data-reveal>
          <div><SectionKicker>Commande</SectionKicker><h2>Démarrez votre <em>commande.</em></h2></div>
          <p>Remplissez les étapes ci-dessous. Pas d’engagement : une réponse vous sera envoyée avant validation.</p>
        </div>

        <div className="order-shell section">
          {sent ? (
            <div className="success-card" data-reveal>
              <span>✓</span><h3>Demande envoyée.</h3><p>Merci ! Le projet est bien enregistré. Benj’imprim pourra vous recontacter pour confirmer les détails avant fabrication.</p>
              <button type="button" onClick={() => setSent(false)}>Préparer une autre demande</button>
            </div>
          ) : (
            <form name="demande-devis" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="demande-devis" />
              <p hidden><label>Ne pas remplir<input name="bot-field" /></label></p>

              <section className="form-step">
                <header><span>1</span><h3>Votre point de départ</h3></header>
                <div className="choice-grid three">
                  {sendModes.map((m) => <button key={m.id} type="button" className={activeMode === m.id ? "selected" : ""} onClick={() => setActiveMode(m.id)}><b>{m.title}</b><small>{m.note}</small></button>)}
                </div>
                {activeMode === "file" && <label className="upload-field"><span>Fichier 3D</span><input type="file" name="project-file" accept=".stl,.obj,.step,.stp,.3mf" /><small>STL, OBJ, STEP, 3MF · fichier facultatif pour cette maquette</small></label>}
                {activeMode === "link" && <label className="text-field"><span>Lien vers le modèle</span><input type="url" name="project-link" placeholder="https://…" /></label>}
                {activeMode === "idea" && <label className="text-field"><span>Décrivez votre idée</span><textarea name="project-idea" rows={3} placeholder="Ce que vous voulez fabriquer, dimensions approximatives, usage…" /></label>}
              </section>

              <section className="form-step">
                <header><span>2</span><h3>Taille de la pièce</h3></header>
                <div className="choice-grid sizes">{priceTiers.map((tier) => <button key={tier.id} type="button" className={size === tier.id ? "selected" : ""} onClick={() => setSize(tier.id)}><b>Taille {tier.id}</b><small>{tier.dims}</small><em>{tier.price}€ · +{tier.ship}€ port</em></button>)}</div>
              </section>

              <section className="form-step">
                <header><span>3</span><h3>Choix de la couleur</h3></header>
                <div className="order-palette">{colors.map((c) => <button key={c} type="button" className={color === c ? "selected" : ""} style={{ backgroundColor: c }} aria-label={`Couleur ${c}`} onClick={() => setColor(c)} />)}</div>
              </section>

              <section className="form-step">
                <header><span>4</span><h3>Matière</h3></header>
                <div className="choice-grid two">{materialOptions.map((m) => <button key={m.id} type="button" className={material === m.id ? "selected" : ""} onClick={() => setMaterial(m.id)}><b>{m.title}</b><small>{m.note}</small>{m.extra > 0 && <em>+{m.extra}€</em>}</button>)}</div>
              </section>

              <section className="form-step">
                <header><span>5</span><h3>Finition</h3></header>
                <div className="choice-grid two">{finishOptions.map((f) => <button key={f.id} type="button" className={finish === f.id ? "selected" : ""} onClick={() => setFinish(f.id)}><b>Finition {f.title}</b><small>{f.note}</small>{f.extra > 0 && <em>+{f.extra}€</em>}</button>)}</div>
              </section>

              <section className="form-step compact-step">
                <header><span>6</span><h3>Quantité</h3></header>
                <div className="qty-control"><button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button><b>{qty}</b><button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))}>+</button></div>
                <small>À partir de 3 pièces identiques, une remise est automatiquement appliquée.</small>
              </section>

              <section className="form-step">
                <header><span>7</span><h3>Vos informations</h3></header>
                <div className="field-grid">
                  <label>Nom complet<input required name="name" placeholder="Alex Martin" /></label>
                  <label>Entreprise<input name="company" placeholder="Facultatif" /></label>
                  <label>E-mail<input required type="email" name="email" placeholder="alex@email.fr" /></label>
                  <label>Téléphone<input type="tel" name="phone" placeholder="06 00 00 00 00" /></label>
                  <label className="wide">Adresse / livraison<input name="address" placeholder="Ville, code postal ou adresse de livraison" /></label>
                  <label className="wide">Message<textarea name="message" rows={3} placeholder="Une autre précision, une question, une demande spéciale…" /></label>
                </div>
              </section>

              <section className="form-step compact-step">
                <header><span>8</span><h3>Publication sur nos réseaux <small>(optionnel)</small></h3></header>
                <p>Autorisez-vous le partage de votre projet terminé sur les réseaux de Benj’imprim ?</p>
                <div className="choice-grid two"><button type="button" className={social === "yes" ? "selected" : ""} onClick={() => setSocial("yes")}><b>✓ Oui, avec plaisir</b><small>Votre pièce pourra être présentée.</small></button><button type="button" className={social === "no" ? "selected" : ""} onClick={() => setSocial("no")}><b>Non, ma commande reste privée</b><small>Aucune publication.</small></button></div>
              </section>

              <section className="form-step compact-step">
                <header><span>9</span><h3>Code promo <small>(optionnel)</small></h3></header>
                <label className="promo-field"><input name="promo" placeholder="ENTREZ VOTRE CODE" /><button type="button">Appliquer</button></label>
              </section>

              <section className="form-step summary-step">
                <header><span>10</span><h3>Récapitulatif</h3></header>
                <div className="summary-box">
                  <div><span>Taille</span><b>{size}</b></div><div><span>Matière</span><b>{material.toUpperCase()}</b></div><div><span>Quantité</span><b>{qty}</b></div><div><span>Finition</span><b>{finish === "matte" ? "Matifiée" : "Essentielle"}</b></div>
                  <div className="summary-total"><span>Estimation avec port</span><strong>{price.total.toFixed(2).replace(".", ",")} €</strong></div>
                </div>
                <label className="consent"><input required type="checkbox" name="consent" value="oui" /><span>J’accepte d’être recontacté au sujet de cette demande. Le montant affiché est une estimation qui sera confirmée avant fabrication.</span></label>
                {formError && <p className="form-error">La demande n’a pas pu être envoyée. Réessayez dans un instant.</p>}
                <button className="request-btn" type="submit" disabled={sending}>{sending ? "Envoi en cours…" : "Envoyer ma demande →"}</button>
                <button className="pay-btn" type="submit" disabled={sending}>▤ Payer et envoyer ma commande →</button>
                <small className="payment-note">Paiement sécurisé · la validation finale reste confirmée avant fabrication.</small>
              </section>
            </form>
          )}
        </div>
      </section>

      <section className="finish-section section">
        <div className="finish-copy" data-reveal><SectionKicker>Résultat final</SectionKicker><h2>L’état brut :<br />c’est quoi <em>exactement ?</em></h2><p>Toute pièce imprimée en 3D présente naturellement certaines caractéristiques liées au procédé de fabrication. C’est ce qui lui donne son identité.</p></div>
        <div className="finish-detail" data-reveal>
          <div className="detail-list"><div><b>Stries de couche</b><p>Lignes fines visibles selon l’orientation et la hauteur de couche.</p></div><div><b>Traces de supports</b><p>De petites marques peuvent rester sur les zones qui nécessitent un maintien pendant l’impression.</p></div><div><b>Points d’attache</b><p>Les surfaces peuvent demander une légère reprise à certains endroits.</p></div></div>
          <img src="https://images.pexels.com/photos/19583534/pexels-photo-19583534/free-photo-of-man-holding-a-tray-with-plastic-3d-printed-items.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Pièce imprimée en 3D" />
        </div>
        <div className="finish-cards" data-reveal><article><SectionKicker>Finition de base</SectionKicker><h3>Finition Essentielle<br /><em>+0€</em></h3><ul><li>Retrait simple des supports</li><li>Ébavurage des défauts visibles</li><li>Nettoyage général de la pièce</li><li>Aspect brut mais propre et fonctionnel</li></ul></article><article className="featured"><SectionKicker>Finition premium</SectionKicker><h3>Finition Matifiée<br /><em>À partir de 9€</em></h3><ul><li>Même préparation que l’essentielle</li><li>Aspect mat uniforme</li><li>Surfaces plus douces et homogènes</li><li>Atténuation des lignes de couche visibles</li></ul></article></div>
      </section>

      <section className="multicolor section" data-reveal>
        <div><SectionKicker>Option couleur</SectionKicker><h2>Impression <em>multicolore.</em></h2><p>Deux couleurs intégrées dans la même pièce, sans peinture ni assemblage séparé. Idéal pour les logos, repères ou objets décoratifs.</p><ul><li>Couleurs dans la masse</li><li>Logo, texte ou motif</li><li>Jusqu’à plusieurs couleurs selon la pièce</li><li>Temps d’impression plus long</li></ul></div>
        <div className="multi-demo"><div className="swatches">{["#8142d4","#1ca5aa","#ef9a24","#252528","#e24a5f","#34a95f","#91794f","#dbc42f"].map(c => <span key={c} style={{backgroundColor:c}} />)}</div><div className="multi-price"><small>Prix du multicolore</small><strong>+5€ / couleur<br />supplémentaire</strong></div></div>
      </section>

      <section className="final-cta section" id="contact" data-reveal>
        <SectionKicker>Votre projet</SectionKicker><h2>Prêt à commander votre pièce ?</h2><p>On avance étape par étape. Vous validez avant impression.</p><div><a className="light-btn" href="#commande">Commander une impression →</a><a href="#envoi">Poser une question</a></div>
      </section>

      <footer className="footer section">
        <Logo />
        <div><a href="#contact">Contact</a><a href="#tarifs">Tarifs</a><a href="#commande">Commander</a></div>
        <p>© 2026 Benj’imprim — Tous droits réservés.</p>
      </footer>
    </main>
  );
}
