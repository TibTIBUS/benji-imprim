import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benj’imprim — Impression 3D à la demande",
  description: "Impression 3D sur mesure : fichier, lien ou simple idée. Tarifs clairs, fabrication soignée et devis rapide.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
