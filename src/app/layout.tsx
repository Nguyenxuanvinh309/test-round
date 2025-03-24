import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import '@mantine/core/styles.css';
import "./globals.css";
import { AppProps } from "next/app";
import Provider from './provider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Problem 2",
  description: "This is problem 2",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}> & AppProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
