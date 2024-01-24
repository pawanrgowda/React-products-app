import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios'; 
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        const data = response.data;
        console.log('Product Details API Response:', data);
        setProductDetails(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!productDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details">
      <h1 className='title'>{productDetails.title}</h1>
      <div className="thumbnail">
        <img src={productDetails.thumbnail} alt={productDetails.title} />
      </div>
      <p>Description: {productDetails.description}</p>
      <p>Price: ${productDetails.price}</p>
      <p>Discount: {productDetails.discountPercentage}%</p>
      <p>Rating: {productDetails.rating}</p>
      <p>Stock: {productDetails.stock}</p>
      <p>Brand: {productDetails.brand}</p>
      <p>Category: {productDetails.category}</p>
      <Slider className="image-carousel">
        {productDetails.images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Product ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductDetailsPage;
