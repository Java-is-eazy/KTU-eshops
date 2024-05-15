import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";
import PropTypes from "prop-types";


const ItemCard = ({ item }) => {
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
  }

  return (
    <div className={`card ${item.promoted ? "promoted" : ""}`}>
      <div className="imgBox">
        <img src={item.image} alt={item.title} className="mouse"/>
      </div>
      <div className="wishlistContainer">
        <img className={isWished ? "active" : ""} onClick={handleWishClick} src="/icons/heart.svg" alt=""/>
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
  }).isRequired
};

export default ItemCard;