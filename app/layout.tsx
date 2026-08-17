import type { Metadata, Viewport } from "next";
import { Inter, Saira, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import OwnerPopup from "@/components/OwnerPopup";
import { site, allCities, services } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const saira = Saira({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-saira",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Mobile Mechanic in Conroe & Montgomery County, TX | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name} is a mobile auto repair and diagnostics service run by ${site.owner}, a ${site.aseYears}-year ASE certified technician. We come to you in Conroe, Montgomery, Spring, Humble, Porter and Anderson. Open 24 hours. Call ${site.phone}.`,
  keywords: [
    "mobile mechanic Conroe TX",
    "mobile auto repair Montgomery County",
    "mobile mechanic Spring TX",
    "mobile mechanic Humble TX",
    "check engine light diagnosis Conroe",
    "mobile brake repair",
    "ASE certified mobile mechanic",
    "24 hour mechanic Conroe",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `Mobile Mechanic in Conroe & Montgomery County, TX | ${site.name}`,
    description: `${site.owner} comes to your driveway. ${site.aseYears} years ASE certified. Diagnostics, brakes, suspension, electrical, A/C. Open 24 hours.`,
    images: [{ url: "/img/logo-source.jpg", width: 1400, height: 1400, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Mobile Mechanic, Conroe TX`,
    description: `We come to you. ${site.aseYears} years ASE certified. Open 24 hours.`,
    images: ["/img/logo-source.jpg"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08070f",
  width: "device-width",
  initialScale: 1,
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${site.url}/#business`,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  telephone: site.phoneRaw,
  description: `Mobile auto repair and diagnostics serving Conroe, Montgomery, Spring, Humble, Porter and Anderson, Texas. Owner-operated by ${site.owner}, ${site.aseYears}-year ASE certified technician.`,
  image: `${site.url}/img/logo-source.jpg`,
  priceRange: "$$",
  founder: { "@type": "Person", name: site.owner },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.baseCity,
    addressRegion: site.baseRegion,
    addressCountry: "US",
  },
  areaServed: allCities.map((c) => ({
    "@type": "City",
    name: `${c}, TX`,
  })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating,
    reviewCount: site.reviewCount,
    bestRating: 5,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mobile auto repair services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, description: s.short },
    })),
  },
  sameAs: [site.social.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${saira.variable} ${mono.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        <Header />
        <main id="top">{children}</main>
        <Footer />
        <MobileDock />
        <OwnerPopup />
      </body>
    </html>
  );
}
