import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Home Apothecary",
  description: "A mobile-first paid PWA for traditional herbal remedies.",
  applicationName: "Home Apothecary",
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="bg-[var(--bg-app)] text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
