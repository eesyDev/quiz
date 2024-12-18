'use client'
import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import axios from "axios";
import { signIn, signOut, useSession } from 'next-auth/react';
import { jwtDecode } from "jwt-decode";
import { setAuthState } from '@/redux/slices/authSlice';
import { client } from '@/utils/client';
import Image from 'next/image';
import Link from 'next/link';
import { TbMenu } from "react-icons/tb";
import SideMenu from './SideMenu';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/rootReducer';
import { toggleTheme } from '@/redux/slices/themeSlice';
import { toggleMenu } from '@/redux/slices/showMenuSlice';

const Header = () => {
    const [user, setUser] = useState<IUser | null>();
    const [isOpenMenu, setIsOpenMenu] = useState<Boolean>(false)
    const theme = useSelector((state: RootState) => state?.theme?.value);
    const {showMenu} = useSelector((state : RootState) => state.menu);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state : RootState) => state.auth.isLoggedIn);
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
           createUser(session);
           setUser(session?.user)
        }
     }, [session]); 

    const handleToggle = () => {
        dispatch(toggleTheme())
    }

    const handleOpenMenu = () => {
        dispatch(toggleMenu())
        setIsOpenMenu(!isOpenMenu)
    }

    const srcLogo = theme === 'dark' ? '/icons/logo_white.svg' : '/icons/logo_dark.svg';

    const generateUserId = (email: string) => {
        return email.replace(/[^a-zA-Z0-9_-]/g, '');
     };

    const createUser = async(sessionData: any) => {
        const { name, image, email } = sessionData.user;

        const user = {
            _id: generateUserId(email),
            _type: 'user',
            userName: name,
            image: image,
            email: email,
            role: 'student'
        }
        try {
            await client.createIfNotExists(user);
            console.log('OK')
            dispatch(setAuthState({ 
                data: user, 
                isLoggedIn: true 
            }));
        } catch (error) {
            console.error("Error creating user in Sanity:", error);
        }
        // await axios.post('/api/users', user)
    }

    const handleGoogleLogin = async () => {
        try {
            console.log('handleGoogleLogin вызван');
            const response = await signIn('google', { redirect: false });
            
            if (!response || !response.ok) {
                console.error('Ошибка авторизации', response);
            }
        } catch (error) {
            console.error('Произошла ошибка при Google входе:', error);
        }
    };
    
  return (
    <div className='header border-gray-10'>
        <div className="container">
            <div className="header-wrapper flex justify-between">
                <Link href="/"><Image src={srcLogo} alt="logo" width={130} height={40}/></Link>
                <div className="header-actions flex items-center gap-4">
                    
                    {isLoggedIn ?
                    <>
                    Hello, {user?.name}!
                    <Link href="/auth/profile">
                        <a className="btn">Личный кабинет</a> {/* <-- Кнопка-ссылка в личный кабинет */}
                    </Link>
                    </>
                     : <button onClick={handleGoogleLogin}>Войти с Google</button>}

                    <button className={`${isOpenMenu ? "opened " : ""}burger-menu text-2xl text-gray-100`} onClick={handleOpenMenu}>
                        <TbMenu/>
                    </button>
                    
                </div>
                {  
                    showMenu && <SideMenu/>
                }
            </div>
        </div>
    </div>
  )
}

export default Header