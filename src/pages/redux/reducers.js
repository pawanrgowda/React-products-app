import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import productsReducer from './productsSlice';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
});

export default rootReducer;
