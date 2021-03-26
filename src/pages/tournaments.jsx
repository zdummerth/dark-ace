import React from 'react'
import styled from 'styled-components'

import Events from '../components/Events'

import SEO from '../components/seo'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Tournaments = ({ data }) => {
  const doublesLink = 'https://events.discgolfunited.com/disc-golf-tournaments/event-detail.cfm/tourn_id/10567'

  const eventData = [
    {
      date: new Date(2021, 4, 22),
      title: 'USDGC Doubles Qualifier',
      location: 'Endicott/Carrolton',
      link: doublesLink,
      image: data.doublesResponsive.childImageSharp.fluid,
      
    }
  ]
  return (
    <>
      <SEO title="Tournaments" />
      <Container>
        <h2>Upcoming Tournaments</h2>
        <Events
          events={eventData}
        />
      </Container>
    </>
  )
}

export const query = graphql`
query {
  doubles: file(relativePath: { eq: "usdgc.jpg" }) {
    childImageSharp {
      fixed(width: 80, height: 80) {
        ...GatsbyImageSharpFixed
      }
    }
  }
  doublesResponsive: file(relativePath: { eq: "usdgc.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 600) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default Tournaments
