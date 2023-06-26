import twilio from 'twilio'

export default async function handler(req, res) {
  const client = twilio(
    process.env.T_ACCOUNT_SID,
    process.env.T_AUTH_TOKEN
  )
  

  const messages = await client.messages.list({ limit: 1 })
  const sms = messages[0]

  res.status(200).json({ body: sms.body })
}
