import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pdf Hub – All-in-One PDF Tools",
  description:
    "DFHub is a free online platform to convert, edit, merge, compress, and manage PDF files easily. Fast, secure, and user-friendly PDF tools for everyone.",
  icons: {
    icon: "/favicon3.png",
  },
  keywords: [
    "PDF Tools",
    "PDF Converter",
    "Text to PDF",
    "Compress PDF",
    "Online PDF Editor",
    "Free PDF Tools",
    "Resume Builder",
    "Image to PDF",
    "Merge PDF",
    "Split PDF",
    "PDF Hub",
    "PDF Editor",
    "PDF Merger",
    "PDF Splitter",
    "PDF Converter",
    "PDF Editor",
    "PDF Merger",
    "PDF Splitter",
    "PDF Tools",
    "Online PDF Services",
    "Document Management",
    "PDF Compression",
    
  ],
  authors: [{ name: "PDFHub" }],
  openGraph: {
    title: "PDFHub – All-in-One PDF Tools",
    description:
      "Convert, edit, merge, and manage PDF files online with PDFHub. Simple, fast, and secure PDF solutions.",
    url: "https://pdfhubx.vercel.app",
    siteName: "PDFHub",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
