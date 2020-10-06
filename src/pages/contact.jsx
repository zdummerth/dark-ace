import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import SEO from '../components/seo'
import BasicForm from '../components/form'

import { breakpoints, dimensions, colors } from '../utils/styles';


const BgWrapper = styled.div`
    position: relative;
    color: white;
    height: calc(100vh - ${dimensions.headerHeight} - ${dimensions.spotifyHeight} - ${dimensions.footerHeight} - 70px);
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.7);
`
// const TextWrapper = styled.div`
//     text-align: center;
//     // padding-top: 20vh;
//     margin: 20vh auto 0;
//     width: 90%;

//     @media (min-width: 500px) {
//         font-size: 1.5rem;;
//       }

// `

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  max-height: 500px;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  font-weight: bold;

  .input-wrapper {
    width: 100%;
  }
  .input-wrapper select, .input-wrapper input, textarea {
    display: block;
    // margin: 4px auto;
    width: 90%;
  }

  #message {
    // height: 100px;
  }

`

const Input = styled.input`
  // display: block;
  // margin-top: 8px;
`

const ContactPage = ({data}) => {
  
    return (
        <>
            <SEO title='Contact' />
            <BgWrapper>
                <Img 
                    fluid={data.file.childImageSharp.fluid} 
                    alt={'bone basket background'}
                    style={{
                      height: '100%'
                    }}
                    imgStyle={{
                      objectFit: 'contain'
                    }}
                />
                <Overlay>
                    {/* <TextWrapper>
                        <p>For sponsorships of any kind, custom artwork, or to share your favorite band, please send us an email :</p>
                        <p>DARKACEAPPAREL@GMAIL.COM</p>
                    </TextWrapper> */}
                    <Form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdZjvFQX7fwsgPXiR7MXQqXPthMldADutfaimCZLpqL4i6L2A/formResponse">
                      <div className='input-wrapper'>
                        <label htmlFor="name">Name
                          <input name="entry.2005620554" type="text" id="name" />
                        </label>
                      </div>
                      <div className='input-wrapper'>
                        <label htmlFor="email">Email
                          <input name="entry.1045781291" type="email" id="email" required />
                        </label>
                      </div>
                      <div className='input-wrapper'>
                        <label htmlFor="subject">Subject
                          <select id="subject" name="entry.1332384896">
                            <option value="shipping">Shipping</option>
                            <option value="wholesale">Wholesale</option>
                            <option value="sponsorship">Sponsorship</option>
                          </select> 
                        </label>
                      </div>
                      <div className='input-wrapper'>
                        <label htmlFor="message">Message
                          <textarea name="entry.2141769552" id="message" rows="5" required />
                        </label>
                      </div>
                      <Input type="submit" value="Send" />
                    </Form>
                    <BasicForm />
                </Overlay>
            </BgWrapper>
        </>
    )
}

export const query = graphql`
query {
  file(relativePath: { eq: "bg.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default ContactPage
