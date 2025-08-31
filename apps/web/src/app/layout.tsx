import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learn Quran Online with Certified Teachers | Quran Learning Platform",
  description: "Professional online Quran education with certified teachers. Book your free trial lesson today. Flexible scheduling, personalized learning, all ages welcome.",
  keywords: ["Quran", "online learning", "Islamic education", "certified teachers", "Tajweed", "memorization"],
  authors: [{ name: "Quran Learning Platform" }],
  creator: "Quran Learning Platform",
  publisher: "Quran Learning Platform",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quran-learning-platform.com",
    siteName: "Quran Learning Platform",
    title: "Learn Quran Online with Certified Teachers",
    description: "Professional online Quran education with certified teachers. Book your free trial lesson today.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Quran Online with Certified Teachers",
    description: "Professional online Quran education with certified teachers. Book your free trial lesson today.",
    creator: "@quranlearning",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://quran-learning-platform.com" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
