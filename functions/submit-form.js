const fetch = require('node-fetch');
const FormData = require('form-data');


const NAME_ID = 'entry.2005620554'
const EMAIL_ID = 'entry.1045781291'
// const SUBJECT_ID = 'entry.2141769552'
const MESSAGE_ID = 'entry.1332384896'


const FORM_ID = '1FAIpQLSdZjvFQX7fwsgPXiR7MXQqXPthMldADutfaimCZLpqL4i6L2A'

const FormURL = `https://docs.google.com/forms/u/0/d/e/${FORM_ID}/formResponse`

exports.handler = async event => {

    const body = JSON.parse(event.body)

    let formData = new FormData()

    formData.append(NAME_ID, body.name)
    formData.append(EMAIL_ID, body.email)
    // formData.append(SUBJECT_ID, body.subject)
    formData.append(MESSAGE_ID, body.message)

    const response = await fetch(FormURL, {
        method: 'POST',
        body: formData
    })

    console.log('response', response)

    if(response.ok) {
      return {
        statusCode: response.status,
        body: 'success',
      }
    } else {
      return {
        statusCode: 400,
        body: 'error',
      }
    }
  
  }