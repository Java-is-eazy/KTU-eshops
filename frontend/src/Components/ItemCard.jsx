import React from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";

const ItemCard = ({ item }) => {
  return (
    <div className={`card ${item.promoted ? 'promoted' : ''}`}>
      <div className="imgBox">
        <img src={item.image} alt={item.title} className="mouse" />
      </div>
      <div className="contentBox">
        <h3 className="card-title" alt={item.title}>
          {item.title}
        </h3>
        <h2 className="price">{item.price} €</h2>
        <Link to={`/product/${item.id}`} className="buy">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;