/* eslint-disable no-alert */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";
import PropTypes from "prop-types";

const ItemCard = ({ item, isAdmin, token }) => {
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    const wishList = JSON.parse(localStorage.getItem("wishList")) || [];
    const isAlreadyInWishlist = wishList.some(wishItem => wishItem.id === item.id);
    setIsWished(isAlreadyInWishlist);
  }, [item.id]);

  const handleWishClick = () => {
    const wishList = JSON.parse(localStorage.getItem("wishList")) || [];
    const isAlreadyInWishlist = wishList.some(wishItem => wishItem.id === item.id);

    if (!isAlreadyInWishlist) {
      wishList.push(item);
      localStorage.setItem("wishList", JSON.stringify(wishList));
      setIsWished(true);
      console.log("Item added: ", item);
    } else {
      const updatedWishlist = wishList.filter(wishItem => wishItem.id !== item.id);
      localStorage.setItem("wishList", JSON.stringify(updatedWishlist));
      setIsWished(false);
      console.log("Item removed: ", item);
    }
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      fetch(`${window.location.protocol}//${window.location.hostname}:3001/listing/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        },
      })
        .then(response => {
          if (response.ok) {
            console.log("Item deleted:", item);
            window.location.reload();
          } else {
            console.error("Failed to delete item");
          }
        })
        .catch(error => console.error("Error:", error));
    }
  };
  
  return (
    <div className={`card ${item.promoted ? "promoted" : ""}`}>
      {isAdmin && (
        <div className="adminOptions">
          <span className="adminOptionsDots" onClick={handleDeleteClick}>
          ⋮
          </span>
        </div>
      )}
      <div className="imgBox">
        <img src={item.image} alt={item.title} className="mouse" />
      </div>
      <div className="wishlistContainer">
        <img className={isWished ? "active" : ""} onClick={handleWishClick} src="/icons/heart.svg" alt="" />
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

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    promoted: PropTypes.bool
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired
};

export default ItemCard;
