import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://carsale.trymorosoft.com"),

  title: "Honda BR-V i-VTEC S for Sale in Islamabad",

  description:
    "Family-used Honda BR-V i-VTEC S for sale in G-10, Islamabad. Demand PKR 5,150,000.",

  keywords: [
    "Honda BR-V for sale",
    "Honda BR-V Islamabad",
    "used car for sale Islamabad",
    "Honda BR-V i-VTEC S",
    "Honda BR-V G-10",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Honda BR-V i-VTEC S for Sale",
    description:
      "Family-used Honda BR-V available for inspection in G-10, Islamabad.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/images/car/hero.webp",
        width: 1000,
        height: 750,
        alt: "Honda BR-V i-VTEC S for sale in Islamabad",
      },
    ],
  },
};


type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={manrope.className}>
      <body>{children}</body>
    </html>
  );
}