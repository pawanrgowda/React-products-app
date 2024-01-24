import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './redux/productsSlice';

const ProductsPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { products, total, skip, limit, status, error } = useSelector((state) => state.products);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProductTitle, setNewProductTitle] = useState('');

  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [dispatch, category]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  const addNewProduct = () => {
    if (newProductTitle && newProductTitle.trim() !== "") {
      axios.post(`https://dummyjson.com/products/add`, {
        title: newProductTitle,
      })
        .then((response) => {
          const data = response.data;
          console.log(data);
          const productDetailsUrl = `/products/${data.id}`;
          window.location.href = productDetailsUrl;
        })
        .catch((error) => {
          console.error('Error adding new product:', error);
        });
    } else {
      alert("Title cannot be empty");
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

      {/* Add form */}
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
