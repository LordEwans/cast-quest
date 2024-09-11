import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const pixelify = localFont({
  src: "./fonts/PixelifySans.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cast Quest",
  description: "Generated by create next app",
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
