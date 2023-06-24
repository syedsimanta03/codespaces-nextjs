import '../global.css'
import Head from 'next/head'


export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>simanta-sb5</title>
        <link rel='icon' href='/android-chrome-192x192.png' />
      </Head>
      {/* Rest of your app content */}
      <Component {...pageProps} />
    </>
  )
 
}
