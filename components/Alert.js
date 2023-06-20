import { useState, useEffect } from 'react'

const Alert = ({ message, type }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (message) {
      setShow(true)
      const timer = setTimeout(() => setShow(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div
      className={`fixed top-4 right-4 ${
        show ? 'opacity-100' : 'opacity-0'
      } transition-all duration-500 ease-in-out z-50`}
    >
      <div
        className={`bg-${type}-400 text-${type}-800 rounded-md shadow-md py-2 px-3 w-64`}
      >
        <p className='text-sm'>{message}</p>
      </div>
    </div>
  )
}

export default Alert
