import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "CodeVentures — Premium Technical Co-Founder & Venture Studio",
  description:
    "We don't just write code. We build, invest, and scale alongside founders. CodeVentures combines elite product engineering, startup strategy, and capital to turn ambitious ideas into viable companies.",
  keywords: [
    "venture studio",
    "technical cofounder",
    "startup incubator",
    "MVP development",
    "Armia Systems",
    "startup engineering",
  ],
  authors: [{ name: "CodeVentures" }],
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('codeventures-theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-cv-page text-cv-fg overflow-x-hidden selection:bg-[#00BFA5]/20 selection:text-[#00BFA5]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
