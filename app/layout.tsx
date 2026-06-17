import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Virtual Apothecary",
  description: "A mobile-first paid PWA for traditional herbal recipes.",
  applicationName: "Virtual Apothecary",
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
