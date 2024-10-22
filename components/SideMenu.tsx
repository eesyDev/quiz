import React from 'react';
import { LuSearch } from "react-icons/lu";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {LangToggler, ThemeToggler} from '.';
import { sideMenu } from '@/utils';

const SideMenu = () => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const currentLocale = locale as 'ru' | 'en';
  return (
    <div className='side-menu fixed '>
      <div className="side-menu-inner flex flex-col">
        <button className='btn btn--bordered'><LuSearch/> {t("search_in_test")}</button>
        <ul>
        {sideMenu[currentLocale].map(menu => (
          <li>
            <Link href={menu.link}>{menu.name}</Link>
          </li>
        ))}
        </ul>
        
        <ThemeToggler/>
        <LangToggler/>
      </div>
    </div>
  )
}

export default SideMenu