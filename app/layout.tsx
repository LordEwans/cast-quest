import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const pixelify = localFont({
  src: "./fonts/PixelifySans.woff2",
  variable: "--font-pixelify",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cast Quest",
  description: "hallenge your friends on Warpcast by betting on fun activities and turning everyday tasks into thrilling competitions!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pixelify.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
