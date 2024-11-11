import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/NavBar";
import { NextAuthProvider } from '@/authProvider';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Blog Post Platform",
  description: "Generated by create next app",
};
export function Header(){
  
}

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
      {/* header */}
      {/* <header className="w- p-3">
      <div className="text-center bg-[#CAD7D3] W-1/2">
    <h1>Dashboard</h1>
  </div>
      </header> */}
      <NextAuthProvider>
                      {children}
      </NextAuthProvider>

      </body>
    </html>
  );
}
