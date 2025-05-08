"use client"; // Required since we're using useState, useEffect, or context consumers in this component

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes"; // Provides dark/light mode via Tailwind-compatible class
import { type ThemeProviderProps } from "next-themes/dist/types"; // Import proper prop types for better TypeScript support

// Wrapper ThemeProvider that forwards all props to NextThemesProvider
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Render the theme context provider and pass down all props (like `defaultTheme`, `attribute`, etc.)
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
