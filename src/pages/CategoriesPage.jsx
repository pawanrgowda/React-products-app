import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from './redux/categoriesSlice';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const categories = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="categories-container">
      <h1 className="categories-heading">Categories</h1>
      <div className="categories-columns">
        {categories.map((category, index) => (
          <div key={index} className="category-item" onClick={() => handleCategoryClick(category)}>
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
