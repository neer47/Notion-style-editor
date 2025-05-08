// Global CSS import
import './globals.css';

import type { Metadata } from 'next'; // Used for SEO metadata configuration
import { Inter } from 'next/font/google'; // Optimized Google Font loader
import { ThemeProvider } from '@/components/theme-provider'; // Custom wrapper around next-themes

// Load the Inter font with Latin character subset
const inter = Inter({ subsets: ['latin'] });

// Metadata for SEO and social previews
export const metadata: Metadata = {
  title: 'Notion-style Editor with AI',
  description: 'A Notion-style editor with AI chat capabilities',
};

/**
 * RootLayout: The global layout that wraps all routes.
 * This acts like the root-level <App> in traditional React apps.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ThemeProvider enables dark/light mode based on system or user preference */}
        <ThemeProvider
          attribute="class"              // Uses <html class="dark"> for Tailwind dark mode
          defaultTheme="light"           // Sets the default theme (can be "system" or "dark" too)
          enableSystem                   // Allows system preference fallback
          disableTransitionOnChange      // Prevents flickering when switching themes
        >
          {/* All page content gets rendered here */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
