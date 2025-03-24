'use client';
import type { MantineTheme } from '@mantine/core';
import { createTheme } from '@mantine/core';
import components from './components';
import colors from './colors';
import '@mantine/notifications/styles.css';

const theme = createTheme({
  /* Put your mantine theme override here */
  fontFamily: 'Noto Sans JP, sans-serif',
  fontFamilyMonospace: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  headings: {
    // Controls font-family of h1-h6 tags in Title and TypographyStylesProvider components, fallbacks to theme.fontFamily if not defined
    fontFamily: 'Noto Sans JP, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '40px', lineHeight: '56px', fontWeight: '700' },
      h2: { fontSize: '32px', lineHeight: '46px', fontWeight: '700 ' },
      h3: { fontSize: '32px', lineHeight: '46px', fontWeight: '700' },
      h4: { fontSize: '28px', lineHeight: '40px', fontWeight: '700' },
      h5: { fontSize: '24px', lineHeight: '34px', fontWeight: '700' },
      h6: { fontSize: '18px', lineHeight: '26px', fontWeight: '700' },
    },
  },
  components,
  primaryColor: 'primary',
  primaryShade: 6,
  white: '#FFFFFF',
  black: '#101211',
  colors,
  breakpoints: {
    xs: '36em', // 576px
    sm: '48em', // 767px
    md: '62em', // 991px
    lg: '75em', // 1199
    xl: '88em', // 1408px
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
  },
  radius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '16px',
    xl: '32px',
  },
  spacing: {
    xs: '10px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
  },
  defaultRadius: 'md',
});

export default theme as MantineTheme;
