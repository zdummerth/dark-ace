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

  const eventData = [
    {
      date: new Date(2021, 4, 22),
      title: 'NADGT Exclusive @ Barracks and The Bunker Presented by Dark Ace',
      location: 'Endicott/Carrolton',
      link: 'https://www.discgolfscene.com/tournaments/NADGT_Exclusive_at_Barracks_and_The_Bunker_Presented_by_Dark_Ace_2021',
      image: data.nagdt.childImageSharp.fluid,
      
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
  nagdt: file(relativePath: { eq: "nagdt.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 600) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default Tournaments
