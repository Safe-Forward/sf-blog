import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <body className={inter.className}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="https://www.safe-forward.de" className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="font-semibold text-gray-900">Safe Forward</span>
              <span className="text-gray-400 font-normal ml-1">/ Blog</span>
            </a>
            <a
              href="https://www.safe-forward.de/register"
              className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
