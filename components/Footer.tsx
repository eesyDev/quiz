import React from 'react';
import { selectCategories, fetchCategories } from '@/redux/slices/categoriesSlice';
import { FaGithub, FaDiscord, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootReducer';
import { urlFor } from '@/utils/client';
import { useTranslation } from 'next-i18next';


const Footer = () => {
    const categories = useSelector(selectCategories);
    const { t } = useTranslation('common');
    const theme = useSelector((state: RootState) => state?.theme?.value);
    const srcLogo = theme === 'dark' ? './icons/logo_white.svg' : './icons/logo_dark.svg';

    const socials = [
      {
        name: 'Github',
        link: '/#',
        icon: <FaGithub/>
      },
      {
        name: 'Discord',
        link: '/#',
        icon: <FaDiscord/>
      },
      {
        name: 'Linkedin',
        link: '/#',
        icon: <FaLinkedin/>
      },
      {
        name: 'Twitter',
        link: '/#',
        icon: <FaTwitter/>
      },
      {
        name: 'Youtube',
        link: '/#',
        icon: <FaYoutube/>
      }
    ]
    
  return (
    <div className='footer mt-16'>
        <div className="container">
            <div className="footer-wrapper pt-16">
              <div className="footer-col">
              <Link href="/"><Image src={srcLogo} alt="logo" width={130} height={40}/></Link>
              </div>
            {categories && (
			<ul className='footer-col'>
                <h5 className="typo-h5">{t("categories")}</h5>
				{categories?.map((category : Category) => (
					<li key={category._id} className='category'>
						<Link href={`/category/${category?.slug?.current}`} className='footer-col-item hover-main-color'>
							{category.title}
						</Link>
					</li>
				))}
			</ul>
            )}
            </div>
            <div className="footer-bootom mt-12 py-12 ">
              <div className="footer-socials flex gap-4">
                {
                  socials.map(net => (
                    <Link href={net.link}>
                      {net.icon}
                    </Link>
                  ))
                }
              </div>
              <div className="footer-bottom-menu flex gap-8 mt-8">
                <p className="copy">
                Copyright © {new Date().getFullYear()} JSQuiz
                </p>
                <ul className="menu flex gap-4">
                  <li key='1'>
                    <Link href="" className='hover-main-color'>{t("terms")}</Link>
                  </li>
                  <li key='2'>
                    <Link href="" className='hover-main-color'>{t("privacy")}</Link>
                  </li>
                  <li key='3'>
                    <Link href="" className='hover-main-color'>{t("cookies")}</Link>
                  </li>
                </ul>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Footer