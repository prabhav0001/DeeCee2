import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEECEE HAIR - Premium Hair Extensions | 100% Authentic Quality",
  description: "Shop premium quality hair extensions at DEECEE HAIR. Silky straight, wavy, curly extensions for women & men. 100% authentic with free shipping on orders above ₹5000. Book free consultation.",
  keywords: [
    "hair extensions",
    "premium hair extensions",
    "hair extensions india",
    "silky straight hair",
    "wavy hair extensions",
    "curly hair extensions",
    "natural hair extensions",
    "remy hair extensions",
    "human hair extensions",
    "hair extensions for women",
    "hair extensions for men",
    "deecee hair",
    "authentic hair extensions",
    "quality hair extensions",
    "hair extension consultation",
    "hair extensions online india"
  ],
  authors: [{ name: "DEECEE HAIR" }],
  creator: "DEECEE HAIR",
  publisher: "DEECEE HAIR",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.deeceehairs.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "DEECEE HAIR - Premium Hair Extensions",
    description: "Shop premium quality hair extensions - Silky straight, wavy, curly. 100% authentic with free shipping on orders above ₹5000.",
    url: 'https://www.deeceehairs.com',
    siteName: 'DEECEE HAIR',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DEECEE HAIR - Premium Hair Extensions',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DEECEE HAIR - Premium Hair Extensions',
    description: 'Shop premium quality hair extensions - 100% authentic with free shipping',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification=IvfBdZ1nEtZIEYVSRJkTt9YwcnxP9XrBPqiVoQDevLI', // Add your Google Search Console verification
  },
  category: 'E-commerce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DEECEE HAIR',
    url: 'https://www.deeceehairs.com',
    logo: 'https://www.deeceehairs.com/logo.png',
    description: 'Premium quality hair extensions for women and men',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'deeceehair0@gmail.com',
    },
    sameAs: [
      'https://www.instagram.com/deeceehair',
      'https://www.facebook.com/deeceehair',
      'https://www.youtube.com/deeceehair',
    ],
  };

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DEECEE HAIR',
    url: 'https://www.deeceehairs.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.deeceehairs.com/shop?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
