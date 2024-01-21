import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetchin categories from the api 
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
