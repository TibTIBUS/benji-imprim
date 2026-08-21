import type { Metadata } from "next";
import "./globals.css";
import "./reference-typography.css";

export const metadata: Metadata = {
  title: "Benj’imprim — Impression 3D à la demande",
  description: "Impression 3D sur mesure : fichier, lien ou simple idée. Tarifs clairs, fabrication soignée et devis rapide.",
  icons: { icon: "/favicon.svg?v=stack", shortcut: "/favicon.svg?v=stack" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
