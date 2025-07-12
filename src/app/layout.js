import { Geist, Geist_Mono, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/provider/tanstackQuery";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "SnapCart",
  description:
    "Capture what you see. Shop what you love. Walmart Lens lets you snap, search, and shop in an instant.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Navbar />
        <QueryProvider>{
        children}</QueryProvider>
      </body>
    </html>
  );
}