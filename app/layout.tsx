"use client";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <body>{children}</body>
      </html>
    </MantineProvider>
  );
}
