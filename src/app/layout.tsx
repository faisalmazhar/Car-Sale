import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://carsale.trymorosoft.com"),

  title: "Honda BR-V i-VTEC S for Sale in Islamabad",

  description:
    "Family-used Honda BR-V i-VTEC S for sale in G-10, Islamabad. Asking price PKR 4,98,000.",

  keywords: [
    "Honda BR-V for sale",
    "Honda BR-V Islamabad",
    "Honda BR-V i-VTEC S",
    "used car for sale Islamabad",
    "car for sale G-10 Islamabad",
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
      <head>
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '544951920257076');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* End Meta Pixel Code */}
      </head>

      <body>{children}</body>
    </html>
  );
}