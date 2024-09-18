'use client'
import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setAuthState } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { client } from '@/utils/client';

const Header = () => {
    const [user, setUser] = useState<IUser | null>();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     setUser(userProfile);
    //   }, [userProfile]);
    const createOrGetUser = async(response: any) => {
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
        await axios.post('http://localhost:3000/api/user', user)
    }
  return (
    <div>
        <GoogleLogin
            onSuccess={(response) => createOrGetUser(response)}
            onError={() => console.log('error')}
        />
    </div>
  )
}

export default Header