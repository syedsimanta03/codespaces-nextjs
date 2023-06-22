import React, { useState } from 'react'
import axios from 'axios'
import cheerio from 'cheerio'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const BacklinkGenerator = () => {
  const [inputValue, setInputValue] = useState('')
  const [backlinks, setBacklinks] = useState([])
  const [isCopied, setIsCopied] = useState(false)

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const handleGenerateBacklinks = async () => {
    try {
      const searchEngines = ['google', 'bing'] // Add more search engines here if needed
      const queryParameters = ['link', 'site', 'inurl', 'intitle'] // Add more query parameters here if needed
      const words = inputValue.split(',').map((word) => word.trim())
      const backlinks = []

      for (const engine of searchEngines) {
        for (const parameter of queryParameters) {
          for (const word of words) {
            const searchUrl = `https://${engine}.com/search?q=${parameter}:${word}&num=100`

            // Implement rate limiting by adding a delay before each request
            await delay(2000) // Adjust the delay duration (in milliseconds) based on your needs

            const response = await axios.get(searchUrl)
            const $ = cheerio.load(response.data)

            $('cite').each((index, element) => {
              const backlink = $(element).text()
              backlinks.push(backlink)
            })
          }
        }
      }

      setBacklinks(backlinks.slice(0, 500))
    } catch (error) {
      console.error('Error generating backlinks:', error)
    }
  }

  const handleCopy = () => {
    setIsCopied(true)
  }

  const handleDownload = () => {
    const content = backlinks.join('\n')
    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'backlinks.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div>
      <h1>Backlink Generator</h1>
      <input type='text' value={inputValue} onChange={handleChange} />
      <button onClick={handleGenerateBacklinks}>Generate Backlinks</button>

      {backlinks.length > 0 && (
        <div>
          <h2>Backlinks:</h2>
          <ul>
            {backlinks.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
          <CopyToClipboard text={backlinks.join('\n')} onCopy={handleCopy}>
            <button>{isCopied ? 'Copied!' : 'Copy Backlinks'}</button>
          </CopyToClipboard>
          <button onClick={handleDownload}>Download Backlinks</button>
        </div>
      )}
    </div>
  )
}

export default BacklinkGenerator
