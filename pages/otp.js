import { useState, useEffect } from 'react'
import Alert from '../components/Alert'

const Home = () => {
  const [smsOtp, setSmsOtp] = useState('')
  const [smsBody, setSmsBody] = useState('')
  const [error, setError] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [time, setTime] = useState(new Date())
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  const [passwordCorrect, setPasswordCorrect] = useState(null)

  const handleClick = () => {
    const password = prompt('Please enter the password:')

    if (password === '48') {
      setPasswordCorrect(true)
      fetchSms()
    } else {
      setPasswordCorrect(false)
    }
  }

  const handleAlert = () => {
    setMessage('👍OPT Copied!')
    setType('gray')
  }

  const phoneNumber = '4846737746'
  const hiddenDigits = phoneNumber.slice(-2)
  const maskedNumber = hiddenDigits.replace(/\d/g, '*')
  const lastTwoDigits = phoneNumber.slice(2)
  const maskedPhoneNumber = maskedNumber + lastTwoDigits

  console.log(maskedPhoneNumber)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const twelveHourFormat = hours % 12 || 12
  const formattedTime = `${twelveHourFormat}:${minutes} ${ampm}`

  const fetchSms = async () => {
    try {
      const response = await fetch('/api/sms')
      if (!response.ok) {
        throw new Error('Failed to fetch SMS')
      }
      const data = await response.json()
      setSmsBody(data.body)
      const otpCode = data.body.match(/\d+/g)?.join('') || ''
      setSmsOtp(otpCode)
      setError('')
    } catch (error) {
      setError(error.message)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(smsOtp)
    handleAlert()
    setIsCopied(true)
  }

  const renderOtpFields = () => {
    const otpLength = smsOtp.length
    const otpFields = []

    for (let i = 0; i < otpLength; i++) {
      otpFields.push(
        <input
          key={i}
          type='text'
          maxLength='1'
          value={smsOtp[i]}
          readOnly
          className='w-10 h-10 border border-gray-300 rounded text-center mr-2'
        />
      )
    }

    return otpFields
  }

  return (
    <>
      {isCopied && <Alert message={message} type={type} />}
      <div className='w-full overflow-clip sm:overflow-auto bg-white text-white'>
        {/* mobile */}
        <div className='shadow-lg h-[89vh] bg-gray-800 rounded-bl-[50px] rounded-br-[50px] flex flex-col justify-between'>
          {/* Bar */}
          <div className='flex justify-between px-4 pt-2 w-full'>
            <p className='text-[13px] font-bold'>{formattedTime}</p>
            <img className='w-12 mr-4' src='/bar.svg' alt='bar' />
          </div>
          {/* Robot */}
            <img
              className='w-full sm:w-[30%] mx-8 text-center sm:mx-auto'
              src='/robot.svg'
              alt='bar'
            />
          <div className='my-2 text-center font-bold flex justify-center items-center'>
            <span className='animate-ping h-3 w-3 -mt-2 rounded-full bg-green-500 opacity-90  mr-2'></span>
            Active Number:{' '}
            <span className='text-lime-500'>&nbsp;{maskedPhoneNumber}</span>
          </div>
          {/* Body text */}
          <p className='text-center p-4'>{smsBody}</p>
          {passwordCorrect === false && (
            <p className='bg-red-500 text-center font-bold text-white p-4 mt-4'>
              🤣Password is incorrect!
            </p>
          )}
          {error && (
            <div className='bg-red-500 text-center font-bold text-white p-4 mt-4'>
              <p>{error}</p>
            </div>
          )}
          {/* Forms & Button  */}
          {smsOtp && (
            <div className='mt-4 text-gray-700 text-center font-bold text-md'>
              <div>{renderOtpFields()}</div>
              <button
                onClick={copyCode}
                className='text-gray-800 font-bold shadow shadow-lime-500 my-10 bg-lime-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 rounded-full text-sm px-5 py-2.5 hover:shadow-none text-center focus:ring-yellow-900'
              >
                {isCopied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          )}
          {!smsOtp && (
            <button
              className='mx-auto mb-10 text-center w-[130px] text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none shadow-md shadow-blue-600 focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5'
              onClick={handleClick}
            >
              📩My OTP!
            </button>
          )}
        </div>
        {/* mobile */}
      </div>
      <a
        className='text-center text-xs flex items-center justify-center bg-white text-gray-700 font-bold py-2 my-auto'
        href='https://t.me/simanta03'
        target='_blank'
      >
        <svg
          className='w-6 h-6'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <path
            d='M12.001 22C6.47813 22 2.00098 17.5228 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22ZM8.89113 13.1708L8.90378 13.1628C9.48351 15.0767 9.77337 16.0337 9.77337 16.0337C9.88564 16.3442 10.04 16.3996 10.2273 16.3743C10.4145 16.3489 10.5139 16.2476 10.6361 16.1297C10.6361 16.1297 11.0324 15.7472 11.825 14.9823L14.3759 16.8698C14.8407 17.1266 15.1763 16.9941 15.2917 16.4377L16.9495 8.61641C17.1325 7.88842 16.8115 7.59644 16.247 7.82754L6.51397 11.5871C5.84996 11.854 5.85317 12.2255 6.39308 12.3911L8.89113 13.1708Z'
            fill='rgba(70,146,221,1)'
          />
        </svg>
        @simanta03
      </a>
    </>
  )
}

export default Home
