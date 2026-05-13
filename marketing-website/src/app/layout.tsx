import type { Metadata } from "next";
import { Caveat_Brush, Fredoka, Quicksand } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fredoka",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-quicksand",
});

const caveatBrush = Caveat_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-caveat-brush",
});

export const metadata: Metadata = {
  title: "Storybloom | Personalized Storybooks for Kids",
  description:
    "Turn screen time into story time with personalized hardcover keepsakes for kids.",
  icons: {
    icon: "/images/icon.png",
    shortcut: "/images/icon.png",
    apple: "/images/icon.png",
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
        className={`${fredoka.variable} ${quicksand.variable} ${caveatBrush.variable} bg-canvas text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
