import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import SEO from '../components/seo'
import BasicForm from '../components/form'


const BgWrapper = styled.div`
  position: relative;
  color: white;
  width: 100%;
  max-width: 600px;
  margin-right: auto;
  margin-left: auto;
`
const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.7);
  text-align: center;
`

const Banner = styled.div`
  width: 100%;
  max-width: 1500px;
  align-self: center;
`

const ContactPage = ({data}) => {
    return (
      <>
        <SEO title='Contact' />
        <BgWrapper>
            <Img 
                fluid={data.boneBasket.childImageSharp.fluid} 
                alt={'bone basket background'}
                imgStyle={{
                  objectFit: 'contain'
                }}
            />
            <Overlay>
              <h1>Contact Us</h1>
              <BasicForm />
            </Overlay>
        </BgWrapper>
        <Banner>
          <Img fluid={data.parked.childImageSharp.fluid} />
        </Banner>
      </>
    )
}

export const query = graphql`
query {
  boneBasket: file(relativePath: { eq: "bone-basket.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  parked: file(relativePath: { eq: "parked.png" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default ContactPage
