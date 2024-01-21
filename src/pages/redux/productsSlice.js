import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchProductDetails = createAsyncThunk('products/fetchProductDetails', async (productId) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    productDetails: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
