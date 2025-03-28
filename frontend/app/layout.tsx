import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/animations.css";
import './styles/fonts.css';
import { LuxuryNavbar } from './components/ui/luxury-navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DreamNest - Where Your Dreams Find a Home",
  description: "Awaken your wildest dreams, ignite your sensual power, and reclaim your authentic expression with DreamNest coaching.",
};

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
        <LuxuryNavbar items={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '#about' },
          { name: 'Services', url: '#services' },
          { name: 'For Women', url: '#for-women' },
          { name: 'For Men', url: '#for-men' },
          { name: 'Testimonials', url: '#testimonials' },
          { name: 'Blog', url: '/blog' }
        ]} />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
