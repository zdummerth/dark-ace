import { useStaticQuery, graphql } from "gatsby"


export default function useSiteMetaData() {
    const { 
        site: {
            siteMetadata
        }
    } = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                title
                description
                author
              }
            }
          }
        `
    )

    // console.log('site', title)
    return siteMetadata
}