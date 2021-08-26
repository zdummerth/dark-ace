const isString = i => typeof i === 'string'


export default async function handler(req, res) {
  console.log('verfify access code', req.body)

  const { accessCode } = req.body
  try {
    if (!accessCode) throw new Error('Acccess is required')
    if (!isString(accessCode)) throw new Error('Access Code must be a string')

    if (accessCode !== process.env.EARLY_ACCESS_CODE) {
      throw new Error('Nice try')
    }


    res.status(200).json({ status: 'success' })

  } catch (error) {
    console.log('ERROR MOTHERFUCKER: ', error.message);
    res.status(400).json({ error })
  }
}