import "./ItemCard.css"

const ItemCard = ({item}) => {
  const promotion = Boolean();
    return (
      <div class="card">
        <div class="imgBox">
          <img src={item.image} alt={item.title} class="mouse"/>
        </div>
        <div class="contentBox">
          <h3 className="card-title" alt={item.title}>{item.title}</h3>
          <h2 class="price">{item.price} €</h2>
          <a href={`getProduct?productId=${item.id}`} class="buy">Buy Now</a>
        </div>
        <div>
          {promotion && <div>Promotion</div>}
        </div>
      </div>
    )
}

export default ItemCard;