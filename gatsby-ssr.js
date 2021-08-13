const React = require("react")
const StoreContextProvider = require("./src/context/StoreContextProvider").default
const Layout = require("./src/components/layout/layout").default



exports.wrapRootElement = ({ element }) => {
  return <StoreContextProvider>{element}</StoreContextProvider>
}


exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props}>{element}</Layout>
}