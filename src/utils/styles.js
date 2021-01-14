
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
  error: `#ec1818`,
  grayBackground: '#262626',
  background: '#020202',
  gradient: `linear-gradient(to bottom right, #C00A0A 45%, #020202)`,
  specialGradient: `linear-gradient(to right, #C00A0A, #fff)`,

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
  headerHeight: '70px',
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
