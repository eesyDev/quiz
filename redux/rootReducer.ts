import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import showMenuSlice from "./slices/showMenuSlice";
import authSlice from "./slices/authSlice";
import localeSlice from "./slices/localeSlice";
import categoriesSlice from "./slices/categoriesSlice";
import quizAnswersSlice from "./slices/quizAnswersSlice";

const rootReducer = combineReducers({
    theme: themeSlice,
    auth: authSlice,
    menu: showMenuSlice,
    locale: localeSlice,
    categories: categoriesSlice,
    quizAnswers: quizAnswersSlice
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;