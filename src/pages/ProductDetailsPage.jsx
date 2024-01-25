import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addNewProduct } from './redux/productsSlice';
import Slider from 'react-slick';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // making sure that the store is up-to-date
        await dispatch(fetchProducts());

        // finding the product details from the store
        const foundProduct = products.find(product => product.id === parseInt(productId, 10));

        if (foundProduct) {
          setProductDetails(foundProduct);
        } else {
          console.log('error');
          dispatch(addNewProduct(data));
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [dispatch, productId, products]);

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
