import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from '@/context/FavoritesContext';
import { CartProvider } from '@/context/CartContext';
import AuthProvider from '@/components/providers/AuthProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
