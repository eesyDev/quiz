'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LiaAngleDownSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootReducer';

import { toggleLocale, setLocale } from '@/redux/slices/localeSlice';

const LangToggler = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const locale = useSelector((state: RootState) => state.locale.value);
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    const toggleLanguage = (newLocale: string) => {
        setCurrentLanguage(newLocale);
        router.push(`/${newLocale}`);
        setIsOpenDropdown(!isOpenDropdown);
        dispatch(toggleLocale())
    };

    useEffect(() => {
        const savedLocale = localStorage.getItem('locale');
        if (savedLocale) {
            dispatch(setLocale(savedLocale));
            setCurrentLanguage(savedLocale);
        }
    }, [dispatch]);

    console.log(isOpenDropdown)

  return (
    <div className={isOpenDropdown? "language-heading open" : "language-heading"}>
        <div className="lang-heading-inner flex gap-2 items-center" onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
            <div className="lang-icon">
                {currentLanguage === 'ru' ? 'Ру' : 'Eng'}
            </div>
            <LiaAngleDownSolid/>
        </div>
        {
            isOpenDropdown && 
            <div className="language-dropdown">
            <menu>
                <li className="language-dropdown-item" onClick={() => toggleLanguage('ru')}>
                    <div>
                        <p className='value'>Russian</p>
                    </div>
                </li>
                <li className="language-dropdown-item" onClick={() => toggleLanguage('en')}>
                    <div>
                        <p className='value'>English</p>
                    </div>
                </li>
            </menu>
        </div>
        }
    </div>
  );
};

export default LangToggler;
