import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import Sort from "./Sort";
import "./productPage.css";
import plus from "../assets/PrdAdd.png";

const API_URL = `${window.location.protocol}//${window.location.hostname}:3001/items`;

function ProductPage( { isAdmin, token } ) {
    const [items, setItems] = useState([]);
    const [filterQuery, setFilterQuery] = useState("");
    const [sortedFilteredData, setSortedFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadedItemsCount, setLoadedItemsCount] = useState(12);

    const loader = useRef(null);

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

    useEffect(() => {
        const handleObserver = (entities) => {
            const target = entities[0];
            if (target.isIntersecting && !loading && loadedItemsCount < items.length) {
                setLoading(true);
                setTimeout(() => {
                    setLoadedItemsCount((prevCount) => prevCount + 10);
                    setLoading(false);
                }, 1000);
            }
        };

        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "20px",
            threshold: 1.0,
        });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [loading, loadedItemsCount, items]);

    const filterItems = (query) => {
        return items.filter((item) => {
            return item.title.toLowerCase().includes(query.toLowerCase());
        });
    };

    const handleSort = (data) => {
      const promotedItems = data.filter(item => item.promoted);
      const nonPromotedItems = data.filter(item => !item.promoted);
  
      promotedItems.sort((a, b) => (b.promoted ? 1 : -1));
      promotedItems.sort((a, b) => b.price - a.price);
      nonPromotedItems.sort((a, b) => b.price - a.price);
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
                {sortedFilteredData.slice(0, loadedItemsCount).map((item) => (
                    <ItemCard key={item.id} item={item} isAdmin={isAdmin} token={token}/>
                ))}
            </div>
        )}
          <div ref={loader} style={{ marginTop: "20px", textAlign: "center" }}>
              {loading && <p>Loading...</p>}
          </div>
      </div>
  );
}


export default ProductPage;