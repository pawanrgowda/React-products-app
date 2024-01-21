import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('https://dummyjson.com/docs/products/categories');
  return response.data;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { data: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default categoriesSlice.reducer;
