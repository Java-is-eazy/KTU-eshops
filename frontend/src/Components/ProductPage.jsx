import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
const API_URL = "https://fakestoreapi.com/products/";

function ProductPage() {

    const [items, setItems] = useState([]);
    const [filterQuery, setFilterQuery] = useState("");

    const searchItems = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
  
      setItems(data);
    };
  
    useEffect(() => {
      searchItems();
    }, []);

    const filterItems = (query) => {
      return items.filter((item) => {
        return item.title.toLowerCase().includes(query.toLowerCase());
      });
    };

  return (
    <div>
        <h1>ProductForge</h1>

        <div className='search'>
            <input 
                placeholder="Search for products"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
            />
            <img src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
                alt="search"
                onClick={() => {}}
            />
        </div>
        {
            filterItems(filterQuery).length === 0
            ? (
                <div className="empty">
                    <h2>No items found</h2>
                </div>
            ) :
            (
                <div className='container'>
                    {filterItems(filterQuery).map((item) => (
                        <ItemCard key={item.id} item={item}/>
                    ))}
                </div>
            )
        }
    </div>
  );
}

export default ProductPage;
