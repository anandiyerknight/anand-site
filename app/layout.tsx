import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anand Iyer — Architect of Revenue Infrastructure",
  description:
    "We deploy custom, automated pipelines that handle the heavy lifting of Content, Marketing, and Web Ops — collapsing weeks of manual labor into minutes of high-performance output.",
  metadataBase: new URL("https://anandiyer.co.in"),
  openGraph: {
    title: "Anand Iyer — Architect of Revenue Infrastructure",
    description:
      "Done-For-You Revenue Infrastructure for ambitious founders. 15+ years of Tier-1 production pedigree.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>
        <LenisProvider>{children}</LenisProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Anand Iyer",
              url: "https://anandiyer.co.in",
              jobTitle: "Revenue Infrastructure Architect",
              description: "Anand Iyer builds automated content, marketing, and web operations systems for ambitious founders.",
              knowsAbout: ["revenue infrastructure", "marketing automation", "outbound systems", "content operations"],
            }),
          }}
        />
      </body>
    </html>
  );
}
