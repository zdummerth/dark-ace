const fetch = require('node-fetch');

const key = process.env.SENDGRID_CREATE_CONTACT_KEY


exports.handler = async event => {

  const body = JSON.parse(event.body)
  console.log('in submit email function', body)
  const url = 'https://sendgrid.com/v3/marketing/contacts'
  try {
    const newContact = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        contacts: [
          {
            email: body
          }
        ]
      })
    })

    console.log('new contact status', newContact.status)
    console.log('new contact status Text', newContact.statusText)

    if (newContact.status !== 202) throw new Error('error adding contact')

    return {
      statusCode: 200,
      body: 'success',
    }
  } catch (err) {
    console.log('error', err)
    return {
      statusCode: 401,
      body: 'error',
    }
  }

}