module.exports = {
    siteMetadata: {
        title: `Dark Ace Apparel`,
        description: `A heavy metal disc golf apparel company`,
        author: `Zach Dummerth`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
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
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `content`,
                path: `${__dirname}/src/content`,
            },
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
                icon: `src/images/icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-source-shopify`,
            options: {
              // The domain name of your Shopify shop.
              shopName: `dark-ace-apparel.myshopify.com`,
              // The storefront access token
              accessToken: `022ab4c61d06b91c29a626df8da73d60`,
            },
          },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}