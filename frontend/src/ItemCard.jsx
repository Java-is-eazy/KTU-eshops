import React from "react";

const ItemCard = ({item}) => {
    return (
      <div  className='item'>
      <div>
          <p>{item.price}</p>
      </div>
      <div>
          <img src={item.image} alt={item.title}/>
      </div>
      <div>
          <span>{item.category}</span>
          <span>{item.title}</span>
      </div>
      </div>
    )
}

export default ItemCard;