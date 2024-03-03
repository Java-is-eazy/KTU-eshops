import {useEffect, useState} from 'react';
import './App.css';
import ItemCard from './ItemCard';

const API_URL = 'https://fakestoreapi.com/products/';

const App = () => {

    const [items, setItems] = useState([]);

    const searchItems = async (name) => {
        const response = await fetch(`${API_URL}${name}`);
        const data = await response.json();

        setItems(data)
        //console.log(data)
    }

    useEffect(() => {
        searchItems('');
    }, []);

    return (
        <div className='App'>
            <h1>ProductForge</h1>

            <div className='search'>
                <input 
                placeholder="Search for products"
                input="Superman"
                onChange={() => {}}
                />
                <img src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
                alt="search"
                onClick={() => {}}
                />
            </div>
            {
                items?.length > 0
                ? (
                  <div className='container'>
                    {items.map((item) => (
                        <ItemCard item={item}/>
                    ))}
                  </div>
                ) :
                (
                    <div className="empty">
                        <h2>No items found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App