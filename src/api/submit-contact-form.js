const fetch = require('node-fetch');
const isEmail = require('validator/lib/isEmail')
const sendEmail = require('lib/send-email.js')



const key = process.env.FAUNA_CREATE_CONTACT

const endpoint = `https://graphql.fauna.com/graphql`

const queryFauna = async ({ query, variables }) => {

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  // const json1 = await res.json()
  // console.log('response from graphql fetcher', res)
  if (res.status === 200) {
    const json = await res.json()
    console.log('json from graphql fetcher', json)
    if (json.errors) {
      // console.log('errors from graphql fetcher', json.errors)
      // return { errors: json.errors }
      throw new Error('Error from fauna')

    } else {
      return { data: json.data }
    }
  } else {
    throw new Error("There was an error in fetching the graphql endpoint")
  }

}


exports.handler = async event => {
  // console.log('in submit email function')

  const { email, name, message } = JSON.parse(event.body)
  console.log('in submit email function', email)

  try {
    if ((typeof email !== 'string') || (typeof name !== 'string') || (typeof message !== 'string')) throw new Error('Missing Arguments')

    const trimmedEmail = email.trim()
    if (!isEmail(trimmedEmail)) throw new Error('Must be email')

    const { data, errors } = await queryFauna({
      variables: {
        data: {
          email: trimmedEmail,
          name,
          message
        }
      },
      query: `mutation($data: FormSubmissionInput!) {
          createFormSubmission( data: $data) {
            email
            name
            message
          }
        }`
    })

    console.log({ data })

    return {
      statusCode: 200,
      body: 'success',
    }


  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    }
  }

}