import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './redux/productsSlice';

const ProductsPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProductTitle, setNewProductTitle] = useState('');

  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [dispatch, category]);

  const addNewProduct = async () => {
    try {
      if (newProductTitle && newProductTitle.trim() !== "") {
        const response = await axios.post(`https://dummyjson.com/products/add`, {
          title: newProductTitle,
        });
        const data = response.data;

        // Update the state with the newly added product
        dispatch({ type: 'products/addNewProduct', payload: data });

        // Clear the form and hide it
        setNewProductTitle('');
        setShowAddProductForm(false);
      } else {
        alert("Title cannot be empty");
      }
    } catch (error) {
      console.error('Error adding new product:', error);
    }
  };

  return (
    <div className="prod">
      <h1>{category} details</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => setShowAddProductForm(true)}>Add New Product</button>

      {showAddProductForm && (
        <div>
          <label>
            Title:
            <input
              type="text"
              value={newProductTitle}
              onChange={(e) => setNewProductTitle(e.target.value)}
              required
            />
          </label>
          <button className='btn' onClick={addNewProduct}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
