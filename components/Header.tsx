import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="flex justify-between p-5 mx-auto max-w-7xl">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="https://i.ibb.co/tspB15t/Add-a-heading.png"
            alt="logo"
            className="object-contain cursor-pointer w-44 "
          />
        </Link>
        <div className="items-center hidden space-x-5 md:inline-flex">
          <Link href="https://piyushmehta.com">About</Link>
          <Link href="mailto:me@piyushmehta.com">Contact</Link>
          <a
            href="https://github.com/piyush97"
            className="px-4 py-1 text-white bg-green-600 rounded-full"
          >
            Follow
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600 ">
        <Link href="https://highest.sanity.studio/">Sign In</Link>
        <a
          href="https://highest.sanity.studio/"
          className="px-4 py-1 border border-green-600 rounded-full"
        >
          Get Started
        </a>
      </div>
    </header>
  )
}

export default Header
