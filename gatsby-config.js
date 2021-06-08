require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: `Dark Ace Apparel`,
        description: `Established in 2020, and hailing from St. Louis, MO, Dark Ace Apparel is a brand on a mission to merge the worlds of headbangers and chainbangers. PLAY DISC GOLF. LISTEN TO METAL.`,
        author: `George Fiorini`,
        keywords: ['disc', 'golf', 'heavy', 'metal', 'clothing', 'apparel']
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `Roboto`,
                    `source sans pro\:300,400,400i,700` // you can also specify font weights and styles
                ],
                display: 'swap'
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `dark-ace-apparel`,
                short_name: `dark`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/square-icon.jpg`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-source-shopify`,
            options: {
                // The domain name of your Shopify shop.
                shopName: process.env.GATSBY_SHOP_NAME,
                // The storefront access token
                accessToken: process.env.GATSBY_ACCESS_TOKEN,
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}