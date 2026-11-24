import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-fraunces",
});
const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: {
    default: "Trazzos — Papelería creativa hecha a mano",
    template: "%s — Trazzos",
  },
  description:
    "Bitácoras, cuadernillos, kits artísticos y complementos para dibujo y pintura, hechos a mano en Perú.",
  openGraph: {
    title: "Trazzos — Papelería creativa hecha a mano",
    description: "Bitácoras, cuadernillos y kits artísticos para tu práctica creativa.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${nunito.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
