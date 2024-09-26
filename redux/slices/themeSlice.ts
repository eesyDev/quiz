import { createSlice } from "@reduxjs/toolkit";

const initialState: ThemeState = {
    value: typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light'
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.value = state.value === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', state.value);
        },
        setTheme: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('theme', state.value);
        }
    }
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;