import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (category) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    total: 0,
    skip: 0,
    limit: 5,
    status: 'idle',
    error: null,
  },
  reducers: {
    addNewProduct: (state, action) => {
      state.products = [...state.products, action.payload];
      state.total += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addNewProduct } = productsSlice.actions;
export default productsSlice.reducer;
