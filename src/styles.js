import React from 'react'
import styled from 'styled-components'
import "@fontsource/covered-by-your-grace"; // Defaults to weight 400.



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
  brandTransparent: '#02020299',
  brandBright: '#e0d6eb',
  brandLight: '#f5f3f7',
  brandLighter: '#fbfafc',
  lightest: '#ffffff',
  darkest: '#4d4058',
  error: `#ec1818`,
  grayBackground: '#262626',
  background: '#020202',
  gradient: `linear-gradient(to bottom right, #020202, #C00A0A 45%, #020202)`,
  radialGradient: `radial-gradient(#020202 80%, #C00A0A)`,
  downGradient: `linear-gradient(to bottom, #C00A0A, #020202 25%, #020202 75%, #C00A0A)`,
  darkGradient: `linear-gradient(to bottom right, #020202 65%, #C00A0A)`,
  darkToBottom: `radial-gradient(ellipse at 50% 100%, #C00A0A, #020202 75%)`,
  grayGradient: `linear-gradient(to bottom right, #020202 45%, #454545)`,
  lightGradient: `linear-gradient(to bottom right, #fff 45%, #C00A0A)`,
  gray: '#454545',
  spacer: 'linear-gradient(to right, #020202, #C00A0A, #020202)',
  specialGradient: `linear-gradient(to right, #C00A0A, #fff)`,
}

export const DarkTheme = {
  colors: {
    neon: '#6FFFB0',
    brand: '#C00A0A',
    text: 'white',
    error: 'red',
    background: 'black',
    gray: 'gray',
    lightblue: 'rgb(164,232,242)',
    uncompleted: '#ffea8a',
    button: {
      background: `linear-gradient(to bottom right, #C00A0A 45%, #020202)`,
      remove: '#C00A0A',
      cancel: 'transparent',
      color: 'white',
      disabled: 'rgba(0,0,0,.6)'
    },
    input: {
      background: '#202020',
    }
  }
}



export const BrandButton = styled.button`
  background: ${colors.gradient};
  box-shadow: 0 0 5px ${colors.brand};
  border: none;
  border-radius: 5px;
  padding: 10px;
  // width: 150px;
  color: white;

  :hover {
    cursor: pointer;
    background: ${colors.brand};
    box-shadow: 0 0 5px ${colors.lightest};
  }
`

export const Spacer = styled.div`
  height: 10px;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
  background: ${colors.spacer};
`

export const DarkBrandButton = styled(BrandButton)`
  background: ${colors.darkGradient};

  :hover {
    background: ${colors.background};
  }
`


export const spacing = {
  '3xs': '2px',
  '2xs': '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: `32px`,
  '2xl': '40px',
  '3xl': '48px'
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
  headerHeight: '60px',
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

const StyledListing = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  justify-content: center;
`

export const Listing = ({ children, style }) => {
  const isSingleItem = !children.length
  return (
    <StyledListing
      style={style}
      isSingleItem={isSingleItem}
    >
      {children}
    </StyledListing>
  )
}


export const Subtitle = styled.h2`
  // font-size: rem;
  margin-bottom: 10px;
  text-decoration: underline;
  margin: 30px;
  text-align: center;
  font-family: 'Covered By Your Grace';
  font-size: 1.75rem;
`

export const H3 = styled.h3`
  // margin-top: 10px;
  text-align: center;
  // font-family: 'Covered By Your Grace';
}
`

export const H2 = styled.h3`
  // margin-top: 10px;
  text-align: center;
`

export const H1 = styled.h1`
  // text-align: center;
  // font-family: 'Covered By Your Grace';
`