import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    showMenu: false
};

export const showMenuSlice = createSlice({
    name: 'menuState',
    initialState,
    reducers: {
        openMenu: (state) => {
            state.showMenu = true
        },
        closeMenu: (state) => {
            state.showMenu = false
        }, 
        toggleMenu: (state) => {
            state.showMenu = state.showMenu === true ? false : true
        } 
    }
})

export const { openMenu } = showMenuSlice.actions
export const { closeMenu } = showMenuSlice.actions
export const { toggleMenu } = showMenuSlice.actions

export default showMenuSlice.reducer