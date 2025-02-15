import type { Metadata } from "next";
import { Inter, Manrope, Orbitron, Poppins, Give_You_Glory, Mynerve } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"], 
  variable: "--font-poppins", 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], 
  display: "swap"
});
const giveYouGlory = Give_You_Glory({
  subsets: ["latin"], 
  variable: "--font-give-you-glory", 
  display: "swap",
  weight: "400"
});
const mynerve = Mynerve({
  subsets: ["latin"], 
  variable: "--font-mynerve", 
  display: "swap",
  weight: "400"
});

export const metadata: Metadata = {
  title: "CupidNote",
  description: "Your own love story",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`
        ${inter.variable} 
        ${manrope.variable} 
        ${orbitron.variable} 
        ${poppins.variable} 
        ${giveYouGlory.variable} 
        ${mynerve.variable}`}
      >
        {children}
      </body>
    </html>
  );
}