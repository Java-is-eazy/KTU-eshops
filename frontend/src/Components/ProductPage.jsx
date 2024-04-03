import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ItemCard from "./ItemCard";
import Sort from "./Sort";
import "./productPage.css";
import plus from "../assets/PrdAdd.png";

const API_URL = `${window.location.protocol}//${window.location.hostname}:3001/items`;

function ProductPage() {
    const [items, setItems] = useState([]);
    const [filterQuery, setFilterQuery] = useState("");
    const [sortedFilteredData, setSortedFilteredData] = useState([]);

    const searchItems = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setItems(data);
    };

    useEffect(() => {
        searchItems();
    }, []);

    useEffect(() => {
        const filterData = filterItems(filterQuery);
        const sortedData = handleSort(filterData);
        setSortedFilteredData(sortedData);
    }, [filterQuery, items]);

    const filterItems = (query) => {
        return items.filter((item) => {
            return item.title.toLowerCase().includes(query.toLowerCase());
        });
    };

    const handleSort = (data) => {
      // Separate items with promoted property set to true from the rest
      const promotedItems = data.filter(item => item.promoted);
      const nonPromotedItems = data.filter(item => !item.promoted);
  
      // Sort promotedItems to the front
      promotedItems.sort((a, b) => (b.promoted ? 1 : -1));
      // Sort promotedItems to the front and in descending order by price
      promotedItems.sort((a, b) => b.price - a.price);

      // Apply additional sorting methods if necessary to non-promoted items
      // For example, sorting by price in ascending order
      nonPromotedItems.sort((a, b) => b.price - a.price);
  
      // Concatenate the sorted arrays and return the result
      return [...promotedItems, ...nonPromotedItems];
  };

    return (
        <div data-testid="item-list">
            <Link to='/addyourproduct'  className="prdAdd"><img src={plus} alt="Add" className="addimg"/></Link>
            <div className="custom-flex">
                <div className='search'>
                    <input 
                        placeholder="Search for products"
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                    />
                    <img 
                        src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
                        alt="search"
                        onClick={() => {}}
                    />
                </div>
                <div className="sort">
                    <Sort jsonData={sortedFilteredData} onDataSort={setSortedFilteredData}/>
                </div>
            </div>
            {sortedFilteredData.length === 0 ? (
                <div className="empty">
                    <h2>No items found</h2>
                </div>
            ) : (
                <div className='container'>
                    {sortedFilteredData.map((item) => (
                        <ItemCard key={item.id} item={item}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductPage;