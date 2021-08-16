import React from 'react'
import styled from 'styled-components'
import { Link } from "gatsby"
import { DarkBrandButton } from 'src/styles'

import SEO from 'src/components/Seo'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledLink = styled(Link)`
  align-self: center;
  margin-top: 30px;
`

const Tournaments = ({ data }) => {
  return (
    <>
      <SEO title="Tournaments" />
      <Container>
        <h2>No Upcoming Events</h2>
        <StyledLink to='/shop'>
          <DarkBrandButton>
            View Shop
          </DarkBrandButton>
        </StyledLink>
        {/* <h2>Upcoming Tournaments</h2> */}
        {/* <Events
          events={eventData}
        /> */}
      </Container>
    </>
  )
}

// export const query = graphql`
// query {
//   nagdt: file(relativePath: { eq: "nagdt.jpg" }) {
//     childImageSharp {
//       fluid(maxWidth: 600) {
//         ...GatsbyImageSharpFluid
//       }
//     }
//   }
// }
// `

export default Tournaments
