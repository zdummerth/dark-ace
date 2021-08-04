const fetch = require('node-fetch');
const isEmail = require('validator/lib/isEmail')

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
      return { errors: json.errors }

    } else {
      return { data: json.data }
    }
  } else {
    return {
      error: {
        message: "There was an error in fetching the graphql endpoint"
      }
    }
  }

}


exports.handler = async event => {
  console.log('in submit email function')

  const email = JSON.parse(event.body)
  const trimmedEmail = email.trim()

  if (!isEmail(trimmedEmail)) {
    return {
      statusCode: 400,
      body: 'must be an email'
    }
  } else {
    const { data, errors } = await queryFauna({
      variables: {
        email: trimmedEmail
      },
      query: `mutation($email: String!) {
        createContact( data:{
          email: $email
        }) {
          email
        }
      }`
    })

    if (!errors) {
      return {
        statusCode: 200,
        body: 'success',
      }
    } else {
      return {
        statusCode: 400,
        body: 'error',
      }
    }
  }
}