'use client'
import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setAuthState } from '@/redux/slices/authSlice';
import { client } from '@/utils/client';
import Image from 'next/image';
import { TbMenu } from "react-icons/tb";
import { SideMenu } from '.';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/rootReducer';
import { toggleTheme } from '@/redux/slices/themeSlice';
import { toggleMenu } from '@/redux/slices/showMenuSlice';
import {LangToggler, ThemeToggler} from '.';

const Header = () => {
    const [user, setUser] = useState<IUser | null>();
    const theme = useSelector((state: RootState) => state?.theme?.value);
    const {showMenu} = useSelector((state : RootState) => state.menu);
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTheme())
    }

    const handleOpenMenu = () => {
        dispatch(toggleMenu())
    }

    const srcLogo = theme === 'dark' ? '/icons/logo_white.svg' : '/icons/logo_dark.svg'

    // useEffect(() => {
    //     setUser(userProfile);
    //   }, [userProfile]);
    const createUser = async(response: any) => {
        const token = response.credential;
        const decoded: {name: string, picture: string, sub: string} = jwtDecode(token);

        const { name, picture, sub } = decoded;

        const user = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture,
        }
        try {
            // Добавляем пользователя в Sanity
            await client.createIfNotExists(user);

            // Обновляем состояние в Redux
            dispatch(setAuthState({ 
                data: user, 
                isLoggedIn: true 
            }));
        } catch (error) {
            console.error("Error creating user in Sanity:", error);
        }
        // await axios.post('/api/users', user)
    }
  return (
    <div className='header border-gray-10'>
        <div className="container">
            <div className="header-wrapper flex justify-between">
                <Image src={srcLogo} alt="logo" width={130} height={40}/>
                <div className="header-actions flex items-center gap-4">
                    <ThemeToggler/>
                    <LangToggler/>
                    <button className='burger-menu text-2xl text-gray-100' onClick={handleOpenMenu}>
                        <TbMenu/>
                    </button>
                </div>
                {  
                    showMenu && <SideMenu/>
                }
                {/* <GoogleLogin
                    onSuccess={(response) => createUser(response)}
                    onError={() => console.log('error')}
                /> */}
            </div>
        </div>
    </div>
  )
}

export default Header