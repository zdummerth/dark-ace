import { keyframes } from '@emotion/core';

/*
 * NOTE: use a six-character hex code for all colors to allow alpha channel
 * adjustment without adding extra vars and/or a color manipulation lib.
 *
 * Example:
 *    // use the brand color at 25% opacity
 *    border-color: ${colors.brand}40;
 */
export const colors = {
  brand: '#C00A0A',
  brandBright: '#e0d6eb',
  brandLight: '#f5f3f7',
  brandLighter: '#fbfafc',
  lightest: '#ffffff',
  darkest: '#4d4058',
  gradient: `linear-gradient(to bottom, #020202, #C00A0A 250%)`,
  text: '#333333',
  textMild: '#555555',
  textLight: '#7e718a',
  textLighter: '#aaaaaa',
  lilac: `#8c65b3`,
  accent: `#ffb238`,
  error: `#ec1818`,
  lemon: `#ffdf37`,
  grayBackground: '#262626',
  background: '#020202'
};


export const spacing = {
  '3xs': 2,
  '2xs': 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48
};

export const breakpoints = {
  mobile: '400px',
  phablet: '550px',
  tablet: '750px',
  desktop: '1000px',
  hd: '1300px'
};

export const radius = {
  default: 2,
  large: 4
};

export const defaultFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Open Sans',
  'Helvetica Neue',
  'sans-serif'
].join();

const monospaceFontStack = [
  `Space Mono`,
  `SFMono-Regular`,
  `Menlo`,
  `Monaco`,
  `Consolas`,
  `Liberation Mono`,
  `Courier New`,
  `monospace`
].join();

export const fonts = {
  body: defaultFontStack,
  heading: `Futura PT, ${defaultFontStack}`,
  monospace: monospaceFontStack
};

export const dimensions = {
  headerHeight: '75px',
  cartWidthDesktop: '400px',

  pictureBrowserAction: {
    widthDesktop: '200px',
    heightMobile: '80px'
  }
};

export const scrollbarStyles = {
  WebkitOverflowScrolling: `touch`,
  '&::-webkit-scrollbar': { width: `6px`, height: `6px` },
  '&::-webkit-scrollbar-thumb': { background: colors.brandBright },
  '&::-webkit-scrollbar-thumb:hover': { background: colors.lilac },
  '&::-webkit-scrollbar-track': { background: colors.brandLight }
};

const simpleEntry = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const deadSimpleEntry = keyframes`
  from {
    opacity: .25;
  }
`;

export const animations = {
  simpleEntry: `${simpleEntry} .75s ease forwards`,
  deadSimpleEntry: `${deadSimpleEntry} .5s ease forwards`
};
