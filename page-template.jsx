import React from 'react'
import styled from 'styled-components'
import SEO from '../components/seo'

import {  } from '../utils/styles'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Page = ({ data }) => {

  return (
    <>
      <SEO title="Page" />
      <Container>
        <h2>Page</h2>
      </Container>
    </>
  )
}

export const query = graphql`
query {

}
`

export default Page
