import type {Metadata} from "next";
import {Comfortaa, Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/navbar";
import Footer from "@/app/footer";
import BG from '@/assets/bg.jpg';

const comfortaa = Comfortaa({
  subsets: ['latin'],
})

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

    <html lang="en">
    <body
      className={`flex flex-col min-h-screen gap-3 min-w-screen ${comfortaa.className}`}
    >
    <div className=" fixed inset-0 h-[100%] bg-cover -z-10 opacity-25 bg-fixed bg-no-repeat"
         style={{backgroundImage: `url(${BG.src})`}}>
      {/*<Image src={BG.src} layout={"fill"}/>*/}
    </div>
    <div className=" inset-0 overscroll-contain">
      <Navbar/>
      {children}
      <Footer/>
    </div>
    </body>
    </html>
  );
}
