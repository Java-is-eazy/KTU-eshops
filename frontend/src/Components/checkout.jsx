import React, { useState } from 'react';
import './checkoutPage.css';
const CheckoutPage = () => {
    // State for form inputs
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
  
    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      // You can handle form submission here, for example, send form data to server
      console.log(formData);
      // After submitting, you may want to redirect the user or show a confirmation message
    };
  
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <form className="checkout-form" onSubmit={handleSubmit}>
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
  
          <button type="submit" className="checkout-button">Place Order</button>
        </form>
      </div>
    );
  };
  
  export default CheckoutPage;