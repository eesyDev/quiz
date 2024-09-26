import React, { useEffect } from 'react';
import { LuSunDim } from "react-icons/lu";
import { RiMoonClearLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootReducer';

import { toggleTheme } from '@/redux/slices/themeSlice';

const ThemeToggler = () => {
    const theme = useSelector((state: RootState) => state.theme.value);
    const dispatch = useDispatch();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme]);

    const handleToggle = () => {
        dispatch(toggleTheme())
    }
  return (
    <div className='theme-toggle border border-gray-100 bg-slate-100 dark:bg-black-mid' onClick={handleToggle}>
        <div className="day text-xl w-[35px] flex items-center justify-center">
            <LuSunDim/>
        </div>
        <div className="night leading-8 text-xl w-[35px] flex items-center justify-center">
            <RiMoonClearLine/>
        </div>
        <div className="toggler absolute bg-slate-400 dark:bg-gray-50 w-[30px] h-[28px] rounded-full"></div>
    </div>
  )
}

export default ThemeToggler