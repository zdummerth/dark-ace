import React from 'react'
// import styled from 'styled-components'
import SEO from 'src/components/Seo'
import ContactForm from 'src/components/forms/ContactForm'


const ContactPage = ({ data }) => {
  return (
    <>
      <SEO title='Contact' />
      <ContactForm />
    </>
  )
}

export default ContactPage
