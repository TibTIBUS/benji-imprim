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
        {children}
      </body>
    </html>
  );
}
