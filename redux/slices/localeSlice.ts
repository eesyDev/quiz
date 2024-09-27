import { createSlice } from "@reduxjs/toolkit";

const initialState: LocaleState = {
    value: typeof window !== 'undefined' ? localStorage.getItem('locale') || 'light' : 'light'
};

export const localeSlice = createSlice({
    name: 'locale',
    initialState,
    reducers: {
        toggleLocale: (state) => {
            state.value = state.value === 'ru' ? 'en' : 'ru';
            localStorage.setItem('locale', state.value);
        },
        setLocale: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('locale', state.value);
        }
    }
});

export const { toggleLocale, setLocale } = localeSlice.actions;

export default localeSlice.reducer;