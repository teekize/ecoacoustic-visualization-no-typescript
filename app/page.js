import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
  return (
<div className="hero min-h-screen bg-slate-100 rounded-xl">
  <div className="hero-content flex-col lg:flex-row-reverse">
    
    <div className="max-w-sm rounded-lg shadow-2xl" >
      <Image src="/logo.png"
      width={500}
      height={500}
      alt="Picture of the author" />
    </div>
    <div>
      <h1 className="text-5xl font-bold">Hello Earth!</h1>
      <p className="py-6">"Welcome to EcoAcoustic, where the music of the Earth comes to life. Dive into a world of natural soundscapes, from the rustling leaves of the Amazon rainforest to the haunting calls of whales in the deep ocean. Our EcoAcoustic platform offers an immersive auditory experience, connecting you with the heartbeats of diverse ecosystems around the globe. Join our community of nature enthusiasts, scientists, and conservationists in understanding and preserving the planet’s acoustic heritage. Your journey into the wild begins here!"
      </p>
      <button className="btn bg-[#F9B572]">
       <Link href="/sound/main">
       Get Started
       </Link>
       
        </button>
    </div>
  </div>
</div>
  )
}
