import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
  const { category } = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProductTitle, setNewProductTitle] = useState('');

  useEffect(() => {
    // Fetch category details 
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setCategoryDetails(data));
  }, [category]);

  if (!categoryDetails) {
    return <p>Loading...</p>;
  }

  // Function to add new product
  const addNewProduct = () => {
    // Check if title is not null 
    if (newProductTitle && newProductTitle.trim() !== "") {
      fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newProductTitle, 
          category: category, 
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setCategoryDetails((prevDetails) => ({
            ...prevDetails,
            products: [...prevDetails.products, data],
          }));
          setShowAddProductForm(false);
          setNewProductTitle('');
        });
    } else {
      alert("Title cannot be empty");
    }
  };

  return (
    <div className="prod">
      <h1>{category} details</h1>
      <ul>
        {categoryDetails.products.map((product) => (
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
              onChange={(e) => setNewProductTitle(e.target.value) }
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
