import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webstix.studio"),
  title: {
    default: "Webstix — Websites Built for What's Next. | Digital Studio",
    template: "%s | Webstix Digital Studio",
  },
  description:
    "Independent digital studio founded by Vinit Gohil and Riddhi Patthar. We build modern digital experiences, web applications, and e-commerce storefronts for clients in India and internationally.",
  keywords: [
    "Webstix",
    "digital agency",
    "web development studio",
    "Next.js web development",
    "React developer",
    "Vinit Gohil",
    "Riddhi Patthar",
    "e-commerce websites",
    "full-stack web applications",
    "modern web design",
    "India digital studio"
  ],
  authors: [
    { name: "Vinit Gohil", url: "https://github.com/vinitgohil45" },
    { name: "Riddhi Patthar", url: "https://github.com/riddhipatthar" }
  ],
  creator: "Webstix Studio",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://webstix.studio",
    siteName: "Webstix",
    title: "Webstix — Websites Built for What's Next.",
    description:
      "We design and build modern digital experiences that help ambitious businesses turn ideas into reality. An independent digital studio by Vinit Gohil & Riddhi Patthar.",
    images: [
      {
        url: "/images/webstix-og.jpg",
        width: 1200,
        height: 675,
        alt: "Webstix — Websites Built for What's Next.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webstix — Websites Built for What's Next.",
    description:
      "Independent digital studio by Vinit Gohil and Riddhi Patthar. Modern websites, full-stack applications, and e-commerce stores.",
    images: ["/images/webstix-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#0B1020] text-[#F8FAFC] antialiased selection:bg-purple-600 selection:text-white">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
