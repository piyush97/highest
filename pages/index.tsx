import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'

const Home: NextPage = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Highest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
    </div>
  )
}

export default Home
