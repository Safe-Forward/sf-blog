import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.safe-forward.de"),
  title: {
    default: "Safe Forward Blog – Wissen rund um Arbeitssicherheit & HSE",
    template: "%s | Safe Forward Blog",
  },
  description:
    "Praxiswissen zu Arbeitssicherheit, Gefährdungsbeurteilungen, Unterweisungen und HSE-Management für KMU.",
  openGraph: {
    siteName: "Safe Forward Blog",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-GZ7G9PR77C" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GZ7G9PR77C');
        `}</Script>
      </head>
      <body className={inter.className}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="https://www.safe-forward.de" className="flex items-center gap-3">
              <Image src="/logo-icon.svg" alt="Safe Forward" width={36} height={36} />
              <span className="font-extrabold text-[#161B33] text-lg tracking-tight">
                Safe<span className="text-[#0E6E5C]">-Forward</span>
              </span>
              <span className="text-gray-300 font-normal">|</span>
              <span className="text-gray-500 text-sm font-medium">Blog</span>
            </a>
            <a
              href="https://www.safe-forward.de/register"
              className="bg-[#0E6E5C] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#0a5a4a] transition-colors"
            >
              Kostenlos testen
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-50 border-t border-gray-200 mt-20">
          <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Safe Forward. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="https://www.safe-forward.de/impressum" className="hover:text-gray-900">Impressum</a>
              <a href="https://www.safe-forward.de/datenschutz" className="hover:text-gray-900">Datenschutz</a>
              <a href="https://www.safe-forward.de" className="hover:text-gray-900">Zur Plattform</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
