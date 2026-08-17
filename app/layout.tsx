import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benji Imprim — Impression 3D sur mesure",
  description: "Prototypage, pièces fonctionnelles et petites séries en impression 3D pour les professionnels.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <form name="demande-devis" data-netlify="true" hidden>
          <input type="text" name="name" />
          <input type="text" name="company" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <input type="text" name="need" />
          <textarea name="message" />
        </form>
        {children}
      </body>
    </html>
  );
}
