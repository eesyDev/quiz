import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import showMenuSlice from "./slices/showMenuSlice";
import authSlice from "./slices/authSlice";
import localeSlice from "./slices/localeSlice";

const rootReducer = combineReducers({
    theme: themeSlice,
    auth: authSlice,
    menu: showMenuSlice,
    locale: localeSlice
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;