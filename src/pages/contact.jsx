import React from 'react'
// import styled from 'styled-components'
import Seo from 'src/components/SEO'
import ContactForm from 'src/components/forms/ContactForm'


const ContactPage = ({ data }) => {
  return (
    <>
      <Seo title='Contact' />
      <ContactForm />
    </>
  )
}

export default ContactPage
