/**
 * Theme utility hook
 * 
 * Provides easy access to theme values throughout the application
 */

import { theme } from '../styles/theme';

export const useTheme = () => {
  return theme;
};

// Helper functions for common theme access patterns
export const getColor = (path: string) => {
  const parts = path.split('.');
  let value: any = theme.colors;
  
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      return undefined;
    }
  }
  
  return value;
};

export const getFont = (type: 'heading' | 'body') => {
  return theme.fonts[type];
};

export const getSpacing = (size: keyof typeof theme.spacing) => {
  return theme.spacing[size];
};

// Export theme directly for static access
export { theme };
