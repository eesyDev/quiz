import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '@/utils/client';
import { allCategoriesQuery } from '@/utils/queries';
import { RootState } from '../rootReducer';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const data = await client.fetch(allCategoriesQuery());
    return data;
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        loading: false,
        error: null
    },
    reducers: {
        setCategoryData: (state, action) => {
            state.categories = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;  // Начинаем загрузку
                state.error = null;    // Сбрасываем ошибку
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;  // Останавливаем загрузку
                state.categories = action.payload;  // Обновляем категории
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;  // Останавливаем загрузку
                state.error = action.error.message;  // Устанавливаем ошибку
            });
    }
});

export const { setCategoryData } = categoriesSlice.actions
export const selectCategories = (state: RootState) => state.categories.categories;
export default categoriesSlice.reducer