import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";
import PropTypes from 'prop-types';


const ItemCard = ({ item }) => {
  const [isWished, setIsWished] = useState(false);

  const handleWishClick = () => {
    setIsWished(prevIsWished => !prevIsWished);

    let wishList = JSON.parse(localStorage.getItem('wishList')) || [];

    wishList.push(item);

    localStorage.setItem('wishList', JSON.stringify(wishList));

    console.log("Item added: ", item);
  }

  return (
      <div className={`card ${item.promoted ? 'promoted' : ''}`}>
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