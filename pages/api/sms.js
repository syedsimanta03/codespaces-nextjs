import twilio from 'twilio'
console.log(process.env.TWILIO_ACCOUNT_SID)
console.log(process.env.TWILIO_AUTH_TOKEN)
export default async function handler(req, res) {
  const client = twilio(
    'ACcf49d743b4efa9b9796be98f4c02fb09',
    '6df8c79ae8bb0255d1282844ebd2a5dc'
  )
  

  const messages = await client.messages.list({ limit: 1 })
  const sms = messages[0]

  res.status(200).json({ body: sms.body })
}
