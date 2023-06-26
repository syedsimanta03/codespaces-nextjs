import twilio from 'twilio'
//package not taking env variables
export default async function handler(req, res) {
  const client = twilio(
    'ACcf49d743b4efa9b9796be98f4c02fb09',
    '7733e12217ff94fb6e5caa3b573a55ce'
  )
  

  const messages = await client.messages.list({ limit: 1 })
  const sms = messages[0]

  res.status(200).json({ body: sms.body })
}
