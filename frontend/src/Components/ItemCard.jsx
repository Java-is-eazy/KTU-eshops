const ItemCard = ({item}) => {
  const promotion = Boolean();
    return (
      <div  className='item'>
      <div>
          <p>{item.price}€</p>
      </div>
      <div>
          <img src={item.image} alt={item.title}/>
      </div>
        <div>
            <span>{item.title}</span>
        </div>
        <div>
        {promotion && <div>Promotion</div>}
        </div>
      </div>
    )
}

export default ItemCard;