import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./cart.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    useEffect(() => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        setTotalPrice(Number(totalPrice).toFixed(2));
    }, [cartItems]);

    const handleClearCart = () => {
        localStorage.removeItem('cart');
        setCartItems([]);
    };

    const handleQuantityChange = (index, quantity) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity = quantity;
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className={'custom-container'}>
            <div className="header">
                <h2>Cart</h2>
                <div className="right-side">
                    <p>TOTAL: {totalPrice} €</p>
                    <button className={'submit-btn'} onClick={handleClearCart}>CLEAR CART</button>
                </div>
            </div>
            <div className="cart-items-container">
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img src={item.image} alt={item.title}/>
                        <div className="item-info-title">
                            <h3>{item.title}</h3>
                        </div>
                        <div className="item-info-count">
                            <input
                                className={'count-input'}
                                type="number"
                                value={item.quantity || 1}
                                min={1}
                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                            />
                        </div>
                        <div className="item-info-price">
                            <p>{item.price} €</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='cart-button-div'>
                <Link
                    to={{
                pathname: '/checkout',
                search: `?items=${encodeURIComponent(JSON.stringify(cartItems))}`,
            }}
                >
                    <button className="submit-btn">Buy</button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;
