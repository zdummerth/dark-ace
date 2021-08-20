import isEmail from 'validator/lib/isEmail'
import queryFauna from '../lib/queryFauna'
import sendEmail from '../lib/send-email'


const isString = i => typeof i === 'string'


export default async function handler(req, res) {
  console.log('in submit contact function', req.body)

  const { email, name, message } = req.body
  try {
    if (!email || !name || !message) throw new Error('Missing Argument')
    if (!isString(email) || !isString(name) || !isString(message)) throw new Error('Arguments must be a string')
    if (!isEmail(email.trim())) throw new Error('Email must be a valid email')

    const { createFormSubmission } = await queryFauna({
      variables: {
        data: {
          email: email.trim(),
          name,
          message
        }
      },
      secret: process.env.FAUNA_CREATE_CONTACT,
      query: `mutation($data: FormSubmissionInput!) {
        createFormSubmission(data: $data) {
          email
          message
          name
        }
      }`
    })

    console.log('create form submission fauna response', createFormSubmission)

    const sent = await sendEmail({
      subject: `New message from online form.`,
      html: `
        <p>Name: ${createFormSubmission.name}</p>
        <p>Message: </p>
        <p>${createFormSubmission.message}</p>
      `,
      to: process.env.SITE_ADMIN_CONTACT_EMAIL,
      bcc: process.env.INCOMING_EMAIL_ADDRESS,
      replyTo: createFormSubmission.email,
      from: {
        name: process.env.SITE_NAME,
        address: process.env.OUTGOING_EMAIL_ADDRESS
      },
    })

    console.log('email sent: ', sent)

    res.status(200).send('success')

  } catch (error) {
    console.log('ERROR MOTHERFUCKER: ', error.message);
    res.status(400).json({ error })
  }
}