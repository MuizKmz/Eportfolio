import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ScrollStick from "./components/ScrollStick";
import SideNavBar from "./components/SideNavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Muhammad Muizzuddin | Software Engineer",
  description: "Portfolio of Muhammad Muizzuddin bin Kamarozamaan — Software Engineering graduate from UTM, Full-Stack Developer & DevOps enthusiast based in Malaysia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <ScrollStick delay={5.5} />
        <SideNavBar delay={5.5}/>
      </body>
    </html>
  );
}
