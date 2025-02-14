import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Head } from "next/document";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "cupidnote",
  description: "your own love story",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Give+You+Glory&family=Inter:wght@100..900&family=Manrope:wght@200..800&family=Mynerve&family=Orbitron:wght@400..900&family=Poppins:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} 
      >
        
        {children}
      </body>
    </html>
  );
}
