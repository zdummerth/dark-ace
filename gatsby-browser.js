import React from 'react'
import StoreContextProvider from './src/context/StoreContextProvider'
import { Auth0Provider } from '@auth0/auth0-react'

import Layout from './src/components/layout/layout'

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      clientId={process.env.GATSBY_AUTH0_CLIENTID}
      redirectUri={process.env.GATSBY_AUTH0_CALLBACK}
    >
      <StoreContextProvider>{element}</StoreContextProvider>
    </Auth0Provider>
  )
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