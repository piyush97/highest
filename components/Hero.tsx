import React from 'react'

const Hero = () => {
  return (
    <div className="flex items-center justify-between py-10 bg-yellow-400 border-black border-y lg:py-0">
      <div className="px-10 space-y-5">
        <h1 className="max-w-xl font-serif text-6xl">
          <span className="underline decoration-black decoration-4">
            Highest
          </span>{' '}
          is a place to write, read and connect
        </h1>
        <h2>
          It's easy and free to post your're thinking on any topic and connect
          with millions of readers.
        </h2>
      </div>
      <img
        className="hidden h-32 md:inline-flex lg:h-full"
        src="https://i.ibb.co/F5C5550/H-1.png"
        alt=""
      />
    </div>
  )
}

export default Hero
