"use client";

// React
import { useState } from "react";

// Auth
import { NextAuthProvider } from "./provider";

// Styles and UI
import "./globals.css";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";

export const metadata = {
  title: "EV Save",
  description: "Plan and manage your budget.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <NextAuthProvider>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <html lang="en">
            <body>{children}</body>
          </html>
        </MantineProvider>
      </ColorSchemeProvider>
    </NextAuthProvider>
  );
}
