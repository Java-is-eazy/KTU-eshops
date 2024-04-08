import React, { useState } from 'react';
import './checkoutPage.css';
import { Link } from "react-router-dom";
import {useParams} from 'react-router-dom';
const CheckoutPage = () => {
    const {productId} = useParams();
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      address: '',
      city: '',
      postalCode: ''
    });
  
    // Function to handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <form className="checkout-form">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
  
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
  
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
  
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
  
          <label htmlFor="postalCode">Postal Code:</label>
          <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
            <Link to={{
                    pathname: `/payment/${productId}`,
                    state: { formData: formData }
            }}>
              <button className="checkout-button">Payment</button>
            </Link>
          
        </form>
      </div>
    );
};

export default CheckoutPage;
