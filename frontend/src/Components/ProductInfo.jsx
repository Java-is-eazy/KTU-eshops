import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ProductInfo.css";

const API_URL = `${window.location.protocol}//${window.location.hostname}:3001/items`;

const ProductInfo = () => {
  const { productId } = useParams();
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
            <button className="buy">Add to cart</button>
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

export default ProductInfo;
