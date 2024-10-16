import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import showMenuSlice from "./slices/showMenuSlice";
import authSlice from "./slices/authSlice";
import localeSlice from "./slices/localeSlice";
import categoriesSlice from "./slices/categoriesSlice";

const rootReducer = combineReducers({
    theme: themeSlice,
    auth: authSlice,
    menu: showMenuSlice,
    locale: localeSlice,
    categories: categoriesSlice
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;