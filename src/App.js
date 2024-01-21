import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './pages/redux/store';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
          <Route path="/category/:category" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
