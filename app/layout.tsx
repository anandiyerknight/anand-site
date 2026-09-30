import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anand Iyer — Architect of Revenue Infrastructure",
    description:
      "Done-For-You Revenue Infrastructure for ambitious founders. 15+ years of Tier-1 production pedigree.",
    type: "website",
    url: "https://anandiyer.co.in",
    siteName: "Anand Iyer",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://anandiyer.co.in/#person",
                  name: "Anand Iyer",
                  url: "https://anandiyer.co.in",
                  image: "https://anandiyer.co.in/profile.jpg",
                  jobTitle: "Revenue Infrastructure Architect",
                  description: "Anand Iyer builds automated content, marketing, and web operations systems for ambitious founders.",
                  sameAs: ["https://www.linkedin.com/in/anand-iyer-3322a320/"],
                  knowsAbout: ["revenue infrastructure", "marketing automation", "outbound systems", "content operations"],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://anandiyer.co.in/#website",
                  name: "Anand Iyer",
                  url: "https://anandiyer.co.in",
                  description: "AI-powered content, marketing, and outbound systems for ambitious founders.",
                  publisher: { "@id": "https://anandiyer.co.in/#person" },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
