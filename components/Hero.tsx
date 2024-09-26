import React from 'react';
import Image from 'next/image';
// import blur1 from '@icons/hero-blur.svg';

const Hero = () => {
  return (
    <section className='hero-outer relative'>
        <div className="container">
            <div className="hero-info flex flex-col gap-4 py-6 mt-40 max-w-[600px]">
                <h1 className="h1 text-6xl">
                    Learn how to code like a pro, check your knowledge
                    <span className="accent-bar bg-pink-100"></span>
                </h1>
                <p className="text text-xl text-gray-100">Appwrite helps you build secure and scalable apps, faster. Leverage Appwrite's powerful APIs to stop fighting technologies and start delivering value.</p>
            </div>
            <div className="hero-blur-1 absolute -translate-y-96 translate-x-96">
                <Image src='./icons/hero-blur.svg' alt="hero blur" width={600} height={100}/>
            </div>
        </div>
        
    </section>
  )
}

export default Hero