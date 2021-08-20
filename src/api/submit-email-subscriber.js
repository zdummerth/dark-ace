import isEmail from 'validator/lib/isEmail'
import queryFauna from '../lib/queryFauna'

const isString = i => typeof i === 'string'


export default async function handler(req, res) {
  console.log('in submit email function', req.body)

  const { email } = req.body
  try {
    if (!email) throw new Error('Email is required')
    if (!isString(email)) throw new Error('Email must be a string')
    if (!isEmail(email.trim())) throw new Error('Email must be a valid email')

    const { createContact } = await queryFauna({
      variables: {
        email: email.trim()
      },
      secret: process.env.FAUNA_CREATE_CONTACT,
      query: `mutation($email: String!) {
        createContact( data:{
          email: $email
        }) {
          email
        }
      }`
    })

    console.log('create subscriber fauna resonse', createContact)

    res.status(200).send('success')

  } catch (error) {
    console.log('ERROR MOTHERFUCKER: ', error.message);
    res.status(400).json({ error })
  }
}