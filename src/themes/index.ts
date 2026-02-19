import type { CVTheme } from '../types/cv.types';

/**
 * Theme registry - stores all available themes
 */
const themeRegistry = new Map<string, CVTheme>();

/**
 * Register a new theme
 */
export function registerTheme(theme: CVTheme): void {
  themeRegistry.set(theme.id, theme);
}

/**
 * Get a theme by ID
 */
export function getTheme(id: string): CVTheme | undefined {
  return themeRegistry.get(id);
}

/**
 * Get all registered themes
 */
export function getAllThemes(): CVTheme[] {
  return Array.from(themeRegistry.values());
}

/**
 * Check if a theme exists
 */
export function hasTheme(id: string): boolean {
  return themeRegistry.has(id);
}
