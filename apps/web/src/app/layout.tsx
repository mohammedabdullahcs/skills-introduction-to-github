import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quran CRM & LMS",
  description: "A comprehensive Quran Customer Relationship Management and Learning Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
