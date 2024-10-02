"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// import blur1 from '@icons/hero-blur.svg';

const Hero = () => {
    const { t } = useTranslation('common');

  return (
    <section className='hero-outer relative'>
        <div className="container">
            <div className="hero-info flex flex-col gap-4 py-6 mt-40 max-w-[600px]">
                <h1 className="h1 text-6xl">
                    {t("hero_title")}
                    <span className="accent-bar bg-pink-100"></span>
                </h1>
                <p className="text text-xl text-gray-100">{t("hero_subtitle")}</p>
            </div>
            <div className="hero-blur-1 absolute -translate-y-96 translate-x-96">
                <Image src='./icons/hero-blur.svg' alt="hero blur" width={600} height={100}/>
            </div>
        </div>
        
    </section>
  )
}

export default Hero