/**
 * Tambla Design System — Typography
 *
 * Compact mobile-native type scale matching reference design.
 * Uses system font stack (San Francisco on iOS, Roboto on Android).
 */
import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
});

const typography = {
  // Font families
  fontFamily,
  fontFamilyMedium: Platform.select({
    ios: 'System',
    android: 'Roboto',
  }),

  // Hero / monetary displays
  hero: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
  },

  // Large monetary (earnings, wallet balance)
  monetary: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    letterSpacing: -0.3,
  },

  // Screen titles
  title: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
  },

  // Section / card headings
  heading: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },

  // Subheadings
  subheading: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },

  // Body text
  body: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
  },

  // Smaller body
  bodySmall: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },

  // Secondary / helper text
  secondary: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },

  // Captions and labels
  caption: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
  },

  // Button text
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },

  // Small button / link
  buttonSmall: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },

  // Tab bar labels
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 14,
  },

  // Badge text
  badge: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 12,
  },
};

export default typography;
