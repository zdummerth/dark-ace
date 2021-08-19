// import fetch from 'node-fetch'
import sendEmail from '../lib/send-email'
import isEmail from 'validator/lib/isEmail'

const isString = i => typeof i === 'string'


export default async function handler(req, res) {
  console.log('in submit email function', req.body)

  const { email } = req.body
  try {
    if (!email) throw new Error('Email is required')
    if (!isString(email)) throw new Error('Email must be a string')
    if (!isEmail(email.trim())) throw new Error('Email must be a valid email')
    const sent = await sendEmail({
      subject: `Welcome to ${process.env.SITE_NAME}`,
      html: `
        <h1>Hello/</h1>
      `,
      to: email,
      from: {
        name: process.env.SITE_NAME,
        address: process.env.EMAIL_ADDRESS
      },
    })

    console.log('email sent: ', sent)
    res.status(200).json({ test: 'Testers' })

  } catch (error) {
    console.log('ERROR MOTHERFUCKER: ', error.message);
    res.status(400).json({ error })
  }
}