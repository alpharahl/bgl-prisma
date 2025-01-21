import type {Metadata} from "next";
import {Geist, Geist_Mono, Comfortaa} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/navbar";
import {ClerkProvider} from "@clerk/nextjs";
import Footer from "@/app/footer";

const comfortaa = Comfortaa({})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Broken Gaming Leagues",
  description: "Home of the Broken Gaming League",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

      <html lang="en">
      <body
        className={`flex flex-col min-h-screen gap-3 ${comfortaa.className}`}
      >
      <Navbar/>
      {children}
      <Footer />
      </body>
      </html>
    </ClerkProvider>
  );
}
