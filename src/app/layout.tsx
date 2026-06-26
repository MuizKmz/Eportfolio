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
        {/* Runs during HTML parse, before first paint, so the browser never
            restores the old scroll position on refresh — page always starts
            at the top with no jump/flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{history.scrollRestoration='manual';window.scrollTo(0,0);}catch(e){}`,
          }}
        />
        {children}
        <ScrollStick delay={5.5} className="hidden lg:flex" />
        <SideNavBar delay={5.5}/>
      </body>
    </html>
  );
}
