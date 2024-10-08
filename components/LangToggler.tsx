'use client';
import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { useRouter } from 'next/router';
import { LiaAngleDownSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootReducer';
import { setLocale } from '@/redux/slices/localeSlice';

const LangToggler = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const locale = useSelector((state: RootState) => state.locale.value);
    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
    const [isClient, setIsClient] = useState<boolean>(false); // state to check client

    // Effect for set locale on client
    useEffect(() => {
        setIsClient(true); // Client is loaded
        const savedLocale = localStorage.getItem('locale');
        if (savedLocale && savedLocale !== locale) {
            // i18n.changeLanguage(savedLocale); 
            dispatch(setLocale(savedLocale)); 
        }
    }, [dispatch, locale]);

    const toggleLanguage = (newLocale: string) => {
        // if (newLocale === 'ru') {
        //     router.push('/'); 
        // } else {
        //     router.push(`/${newLocale}`); 
        // }
        router.push(router.pathname, router.asPath, { locale: newLocale });
        // i18n.changeLanguage(newLocale);
        localStorage.setItem('locale', newLocale); 
        dispatch(setLocale(newLocale)); 
        setIsOpenDropdown(!isOpenDropdown)
    };

    console.log(locale)
    //waiting client is loaded
    if (!isClient) {
        return null; 
    }

    return (
        <div className={isOpenDropdown ? "language-heading open" : "language-heading"}>
            <div className="lang-heading-inner flex gap-2 items-center" onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
                <div className="lang-icon">
                    {locale === 'ru' ? 'Ру' : 'Eng'}
                </div>
                <LiaAngleDownSolid />
            </div>
            {isOpenDropdown && (
                <div className="language-dropdown">
                    <menu>
                        <li className="language-dropdown-item" onClick={() => toggleLanguage('ru')}>
                            <div>
                                <p className="value">Russian</p>
                            </div>
                        </li>
                        <li className="language-dropdown-item" onClick={() => toggleLanguage('en')}>
                            <div>
                                <p className="value">English</p>
                            </div>
                        </li>
                    </menu>
                </div>
            )}
        </div>
    );
};

export default LangToggler;
