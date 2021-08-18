import React from 'react'
import styled from 'styled-components'
import Youtube from 'src/components/Youtube'


import SEO from 'src/components/SEO'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Media = ({ data }) => {

  return (
    <>
      <SEO title="Media" />
      <Container>
        {/* <h2>Media</h2> */}
        <Youtube />
      </Container>
    </>
  )
}


export default Media
