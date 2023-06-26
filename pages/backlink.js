import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Navbar from '../components/Navbar'
 


const BacklinkFetcher = () => {
  const [keyword, setKeyword] = useState('')
  const [backlinks, setBacklinks] = useState([])
  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const links = 100;

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value)
  }

  const fetchBacklinks = async (startIndex, accumulatedBacklinks) => {
    try {
      setIsLoading(true)
      const cx = `${process.env.NEXT_PUBLIC_GOOGLE_CX}` // Replace with your Custom Search Engine CX ID
      console.log(cx)
      const apiKey = `${process.env.NEXT_PUBLIC_GOOGLE_API}` // Replace with your Google Custom Search API key

      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${keyword}&cx=${cx}&key=${apiKey}&start=${startIndex}&num=10`
      )

      const items = response.data.items
      const urls = items.map((item) => item.link)
      const updatedBacklinks = [...accumulatedBacklinks, ...urls]

      setBacklinks(updatedBacklinks)

      if (startIndex + 10 <= links) {
        setTimeout(() => {
          fetchBacklinks(startIndex + 10, updatedBacklinks)
        }, 3000) // 3-second delay between requests
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error fetching backlinks:', error)
      setIsLoading(false)
    }
  }

  const handleFetch = () => {
    setBacklinks([])
    setIsCopied(false)
    setIsLoading(true)
    fetchBacklinks(1, [])
  }

  const handleCopy = () => {
    setIsCopied(true)
  }

  const handleDownload = () => {
    const truncatedBacklinks = backlinks.slice(0, links)
    const text = truncatedBacklinks.join('\n')
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, 'backlinks.txt')
  }

  useEffect(() => {
    if (backlinks.length >= links) {
      setIsLoading(false)
      setIsCopied(false)
    }
  }, [backlinks])

  return (
    <div className='max-w-[80%] h-[90vh] mx-auto'>
      <a href='/'>
        <img
          className='sm:w-[10vw] w-[20vw] h-auto mt-2 text-center mx-auto'
          src='./hk.png'
          alt='logo'
        />
      </a>
      <h1 className='sm:text-2xl text-lg text-center font-bold mb-2'>
        𝔹𝕒𝕔𝕜𝕝𝕚𝕟𝕜 𝔾𝕖𝕟𝕖𝕣𝕒𝕥𝕠𝕣
      </h1>
      <Navbar />
      <div className='mb-4'>
        <div className='max-w-[600px] mx-auto'>
          <label
            htmlFor='default-search'
            className='mb-2 text-sm font-medium text-white'
          ></label>
          <div className='relative mt-20'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-gray-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              type='text'
              value={keyword}
              onChange={handleKeywordChange}
              className='relative w-full p-4 pl-10 text-sm  border  rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
              placeholder='Keyword...'
              required
            />
            <button
              className='text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none shadow-md shadow-blue-800 rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 hover:shadow-none focus:ring-blue-800'
              onClick={handleFetch}
              disabled={isLoading}
            >
              Fetch Links
            </button>
          </div>
        </div>

        {/* <input
          type='text'
          value={keyword}
          onChange={handleKeywordChange}
          className='border border-gray-400 rounded px-4 py-2 w-[50%] mt-20 text-gray-800'
        /> */}
      </div>
      {/*  <div className='mb-4'>
        <button
          onClick={handleFetch}
          className='bg-blue-500 text-white rounded px-4 py-2'
          disabled={isLoading}
        >
          Fetch
        </button>
      </div> */}
      <div className='mb-4 flex justify-center flex-col mr-auto'>
        {/*Work logic */}
        {isLoading && (
          <p className='flex items-center place-content-center text-lime-600 text-center mx-auto w-full'>
            <span className='loader mr-1'></span>
            Fetching backlinks...
          </p>
        )}
        {backlinks.length === links && (
          <p className='flex items-center place-content-center text-lime-600 text-center mx-auto w-full'>
            👍All Backlinks Fetched!...
          </p>
        )}
        {/*Work logic */}
        {backlinks.length > 0 ? (
          <>
            <div className='scroll overflow-x-hidden overflow-y-auto max-h-[500px] text-gray-400'>
              <ul className='papers mb-2 flex flex-col place-content-center text-gray-300 divide-y divide-dashed divide-gray-500'>
                {backlinks.map((url, index) => (
                  <li key={index} className='w-[100%]'>
                    {url}
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex place-content-center space-x-4 mt-10'>
              <CopyToClipboard text={backlinks.join('\n')} onCopy={handleCopy}>
                <button
                  className='flex items-center py-3 px-4 text-sm font-medium text-gray-400 focus:outline-none  rounded-full border border-gray-600 hover:bg-gray-600 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 focus:ring-opacity-50'
                  disabled={isCopied}
                >
                  {isCopied ? 'Copied!' : 'Copy URLs'}
                </button>
              </CopyToClipboard>
              <button
                onClick={handleDownload}
                className='flex items-center py-3 px-4 text-sm font-medium text-gray-400 focus:outline-none bg-gray-700 rounded-full border border-gray-600 hover:bg-gray-600 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 focus:ring-opacity-50'
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
                Download URLs
              </button>
            </div>
          </>
        ) : (
          /* can be a text */
          <p></p>
        )}
      </div>
      <a
        className='text-center flex items-center gap-1 my-auto justify-center mt-10'
        href='https://t.me/simanta03'
        target='_blank'
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

export default BacklinkFetcher
