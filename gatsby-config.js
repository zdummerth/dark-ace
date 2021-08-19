require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  flags: {
    FUNCTIONS: true,
  },
  siteMetadata: {
    title: `Dark Ace Apparel`,
    description: `Established in 2020, and hailing from St. Louis, MO, Dark Ace Apparel is a brand on a mission to merge the worlds of headbangers and chainbangers. PLAY DISC GOLF. LISTEN TO METAL.`,
    author: `George Fiorini`,
    keywords: ['disc', 'golf', 'heavy', 'metal', 'clothing', 'apparel']
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-root-import',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/da-logo-square.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-shopify`,
      options: {
        // The domain name of your Shopify shop.
        storeUrl: process.env.GATSBY_SHOP_NAME,
        // The storefront access token
        password: process.env.SHOPIFY_ADMIN_PASSWORD,
        shopifyConnections: ['collections']
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
