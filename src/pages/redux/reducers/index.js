
import { combineReducers } from 'redux';
import categoriesReducer from '.src/pages/redux/categoriesSlice'; 

const rootReducer = combineReducers({
  categories: categoriesReducer,

});

export default rootReducer;
