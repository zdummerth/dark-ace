const React = require("react")
const StoreContextProvider = require("./src/context/StoreContextProvider").default
const Layout = require("./src/components/layout/layout").default
const ThemeProvider = require('styled-components').ThemeProvider
const DarkTheme = require('./src/styles').DarkTheme




exports.wrapRootElement = ({ element }) => {
  return (
    <StoreContextProvider>
      <ThemeProvider theme={DarkTheme}>
        {element}
      </ThemeProvider>
    </StoreContextProvider>
  )
}


exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props}>{element}</Layout>
}