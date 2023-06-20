import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Alert from '../components/Alert'

function ProxyApp() {
  const [country, setCountry] = useState('')
  const [proxyType, setProxyType] = useState('socks4')
  const [proxies, setProxies] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  const fetchProxies = async () => {
    setIsLoading(true)

    const url = `https://api.proxyscrape.com/v2/?request=displayproxies&protocol=${proxyType}&timeout=10000&country=${country}&anonymity=all`

    try {
      const response = await axios.get(url)
      const data = response.data
      setProxies(data)
    } catch (error) {
      console.error('Error fetching proxies:', error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    /* fetchProxies() */
  }, [country, proxyType, fetchProxies])

  const downloadProxies = () => {
    const filename = `SB5_${proxyType}.txt`
    const element = document.createElement('a')
    const file = new Blob([proxies], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element) // Required for Firefox
    element.click()
    document.body.removeChild(element)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(proxies)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }
  const handleAlert = () => {
    setMessage('All Proxies Copied!')
    setType('gray')
  }
  const handleFetch = () => {
    fetchProxies()
  }

  const countryOptions = {
    AE: 'United Arab Emirates',
    AF: 'Afghanistan',
    AL: 'Albania',
    AM: 'Armenia',
    AR: 'Argentina',
    AT: 'Austria',
    AU: 'Australia',
    AW: 'Aruba',
    AZ: 'Azerbaijan',
    BA: 'Bosnia and Herzegovina',
    BD: 'Bangladesh',
    BE: 'Belgium',
    BG: 'Bulgaria',
    BH: 'Bahrain',
    BR: 'Brazil',
    BS: 'Bahamas',
    BY: 'Belarus',
    CA: 'Canada',
    CH: 'Switzerland',
    CL: 'Chile',
    CM: 'Cameroon',
    CN: 'China',
    CO: 'Colombia',
    CR: 'Costa Rica',
    CY: 'Cyprus',
    CZ: 'Czech Republic',
    DE: 'Germany',
    DK: 'Denmark',
    DO: 'Dominican Republic',
    DZ: 'Algeria',
    EC: 'Ecuador',
    EE: 'Estonia',
    EG: 'Egypt',
    ES: 'Spain',
    ET: 'Ethiopia',
    FI: 'Finland',
    FR: 'France',
    GB: 'United Kingdom',
    GE: 'Georgia',
    GH: 'Ghana',
    GR: 'Greece',
    GT: 'Guatemala',
    GY: 'Guyana',
    HK: 'Hong Kong, SAR China',
    HR: 'Croatia',
    HU: 'Hungary',
    ID: 'Indonesia',
    IE: 'Ireland',
    IL: 'Israel',
    IN: 'India',
    IQ: 'Iraq',
    IR: 'Iran, Islamic Republic of',
    IT: 'Italy',
    JP: 'Japan',
    JM: 'Jamaica',
    KE: 'Kenya',
    KH: 'Cambodia',
    KR: 'South Korea',
    KW: 'Kuwait',
    KZ: 'Kazakhstan',
    LK: 'Sri Lanka',
    LT: 'Lithuania',
    LV: 'Latvia',
    MA: 'Morocco',
    MD: 'Moldova',
    ME: 'Montenegro',
    MG: 'Madagascar',
    MN: 'Mongolia',
    MU: 'Mauritius',
    MX: 'Mexico',
    MY: 'Malaysia',
    MZ: 'Mozambique',
    NG: 'Nigeria',
    NL: 'Netherlands',
    NO: 'Norway',
    NP: 'Nepal',
    NZ: 'New Zealand',
    OM: 'Oman',
    PA: 'Panama',
    PE: 'Peru',
    PH: 'Philippines',
    PK: 'Pakistan',
    PL: 'Poland',
    PR: 'Puerto Rico',
    PS: 'Palestine',
    PT: 'Portugal',
    PY: 'Paraguay',
    QA: 'Qatar',
    RO: 'Romania',
    RS: 'Serbia',
    RU: 'Russia',
    SA: 'Saudi Arabia',
    SE: 'Sweden',
    SG: 'Singapore',
    SI: 'Slovenia',
    SK: 'Slovakia',
    SN: 'Senegal',
    SO: 'Somalia',
    SR: 'Suriname',
    SV: 'El Salvador',
    SY: 'Syria',
    TH: 'Thailand',
    TJ: 'Tajikistan',
    TN: 'Tunisia',
    TR: 'Turkey',
    TT: 'Trinidad and Tobago',
    TW: 'Taiwan',
    UA: 'Ukraine',
    UG: 'Uganda',
    US: 'United States of America',
    UZ: 'Uzbekistan',
    VE: 'Venezuela',
    VN: 'Viet Nam',
    ZA: 'South Africa',
    ZM: 'Zambia',
  }

  return (
    <div className='container box m-auto max-w-4xl  rounded shadow flex flex-col items-center'>
      <img
        className='sm:w-[10vw] w-[20vw] h-auto mt-2'
        src='./hk.png'
        alt='logo'
      />
      <h1 className='sm:text-2xl text-lg text-center font-bold mb-4'>
        Proxy App |
        <span className='sm:text-2xl text-lg font-bold mb-2 text-center text-amber-500'>
          {' '}
          BATCH-5:
        </span>
      </h1>

      {proxies && (
        <div className='mt-6'>
          <div className='glass rounded p-2 w-[60vw] my-auto sm:mx-0 mx-10'>
            <textarea
              className='w-full scroll text-amber-500 rounded p-2.5 text-sm h-[40vh] focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 resize-none'
              value={proxies}
              readOnly
            />
            <svg
              onClick={() => {
                copyToClipboard()
                handleAlert()
              }}
              className='copy'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path
                d='M6 4V8H18V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H6ZM8 2H16V6H8V2Z'
                fill='rgba(140,153,163,1)'
              />
            </svg>
          </div>
          {isCopied && <Alert message={message} type={type} />}
          {/* {isCopied && (
            <span className='ml-2 text-green-500 tooltip'>
              <span className='tooltiptext'>Proxies Copied!</span>
            </span>
          )} */}
        </div>
      )}

      <div className='md:flex grid gap-1 mx-auto py-5'>
        <button
          onClick={handleFetch}
          type='button'
          className='text-white py-3 px-4 bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm text-center inline-flex items-center mr-2 shadow-sm hover:shadow-none'
        >
          <svg
            className='w-4 h-4 mr-2 -ml-1 animate-spin'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path
              d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM16.8201 17.0761C18.1628 15.8007 19 13.9981 19 12C19 8.13401 15.866 5 12 5C10.9391 5 9.9334 5.23599 9.03241 5.65834L10.0072 7.41292C10.6177 7.14729 11.2917 7 12 7C14.7614 7 17 9.23858 17 12H14L16.8201 17.0761ZM14.9676 18.3417L13.9928 16.5871C13.3823 16.8527 12.7083 17 12 17C9.23858 17 7 14.7614 7 12H10L7.17993 6.92387C5.83719 8.19929 5 10.0019 5 12C5 15.866 8.13401 19 12 19C13.0609 19 14.0666 18.764 14.9676 18.3417Z'
              fill='rgba(255,255,255,1)'
            />
          </svg>
          Fetch Proxies
        </button>

        <select
          className='py-3 px-4 border rounded-md bg-gray-700 border-gray-900 text-gray-400'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value=''>All Countries</option>
          {Object.entries(countryOptions).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>

        <select
          className='py-3 px-4 border rounded-md bg-gray-700 border-gray-900 text-gray-400'
          value={proxyType}
          onChange={(e) => setProxyType(e.target.value)}
        >
          <option value='socks4'>SOCKS4</option>
          <option value='socks5'>SOCKS5</option>
          <option value='http'>HTTP</option>
        </select>
        <button
          className='flex items-center py-3 px-4 text-sm font-medium text-gray-400 focus:outline-none bg-gray-700 rounded-full border border-gray-600 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:ring-opacity-50'
          onClick={downloadProxies}
        >
          <svg
            className='w-4 h-4 mr-2 -ml-1 animate-bounce'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path
              d='M13 13V18.585L14.8284 16.7574L16.2426 18.1716L12 22.4142L7.75736 18.1716L9.17157 16.7574L11 18.585V13H13ZM12 2C15.5934 2 18.5544 4.70761 18.9541 8.19395C21.2858 8.83154 23 10.9656 23 13.5C23 16.3688 20.8036 18.7246 18.0006 18.9776L18 17C18 13.6863 15.3137 11 12 11C8.7616 11 6.12243 13.5656 6.00414 16.7751L6 17L6.00039 18.9776C3.19696 18.7252 1 16.3692 1 13.5C1 10.9656 2.71424 8.83154 5.04648 8.19411C5.44561 4.70761 8.40661 2 12 2Z'
              fill='rgba(255,255,255,1)'
            />
          </svg>
          Download Proxies
        </button>
      </div>

      {isLoading && (
        <div className='mt-4 text-center'>
          <span className='text-gray-500'>Loading proxies...</span>
        </div>
      )}
      <a
        className='text-center flex items-center gap-1 my-auto justify-end'
        href='t.me/@simanta03'
        target='_blank'
        rel='noopener noreferrer'
      >
        <svg
          className='w-10 h-10'
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
    </div>
  )
}

export default ProxyApp
