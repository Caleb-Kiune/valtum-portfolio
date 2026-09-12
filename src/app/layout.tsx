import type { Metadata } from "next";
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://valtuminteriors.com"), // Placeholder URL
  title: {
    default: "Erick Mwangi W. | Interior Architect & Project Manager",
    template: "%s | Erick Mwangi W.",
  },
  description: "Erick Mwangi W. | Interior Architect & Project Manager. Specializing in space planning, 3D modelling, and site coordination.",
  keywords: ["Interior Architect", "Project Manager", "Valtum Interiors", "Space Planning", "3D Modelling", "Nairobi", "Architecture"],
  authors: [{ name: "Erick Mwangi W." }],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://valtuminteriors.com",
    siteName: "Valtum Interiors",
    title: "Erick Mwangi W. | Interior Architect & Project Manager",
    description: "Erick Mwangi W. | Interior Architect & Project Manager. Specializing in space planning, 3D modelling, and site coordination.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Valtum Interiors Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick Mwangi W. | Interior Architect & Project Manager",
    description: "Erick Mwangi W. | Interior Architect & Project Manager. Specializing in space planning, 3D modelling, and site coordination.",
    images: ["/og-image.jpg"],
  },
};

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth relative">
      <body
        className={`${inter.variable} ${outfit.variable} ${geistMono.variable} relative font-sans min-h-screen bg-page text-foreground antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
