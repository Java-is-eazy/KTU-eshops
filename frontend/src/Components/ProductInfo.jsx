import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductInfo.css";
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


const API_URL = `${window.location.protocol}//${window.location.hostname}:3001/items`;

const ProductInfo = ({addToCart}) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}?itemid=${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    navigate('/cart');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="info">
          <img src={product.image} alt={product.title} className="picture"/>
        <div className="info-right">
          <div className="prod-info">
            <h1>{product.title}</h1>
            <p className="price">{product.price} €</p>
          </div>
          <div className="add-to-cart">
            <button className="buy" onClick={handleAddToCart}>Add to cart</button>
          </div>
          <div className="buy-now">
          <Link
                to={{
                  pathname: `/checkout/${product.id}`,
                }}
                style={{ width: '50%' }}
              >
               <button className="buy">Buy</button>
          </Link>
          </div>
        </div>
      </div>
      <div className="seller">
        <img src={product.sellerimg} alt={product.title} className="seller-img"/>
        <p className="seller-name">{product.seller}</p>
      </div>
      <div className="description">
      <p>Description: {product.description}</p>
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default ProductInfo;
