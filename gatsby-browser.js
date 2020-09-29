import React from "react"
import StoreContextProvider from "./src/context/StoreContextProvider"
import Layout from './src/components/layout'

export const wrapRootElement = ({ element }) => {
  return <StoreContextProvider>{element}</StoreContextProvider>
}


/*
Since the spotify component can't be unmounted in order to continue playing through page changes,
this wraps Layout around the site so I don't need to import layout in each page file
*/
export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props}>{element}</Layout>
}