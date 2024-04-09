import React, { useState } from 'react';
import './checkoutPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import PaymentMethodOption from './paymentMethod'; 

const CheckoutPage = () => {
  const { productId } = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); 
  const [showPaymentMethodOption, setShowPaymentMethodOption] = useState(false); 
  const navigate = useNavigate();

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle payment method selection
  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethodOption(false);

    // Redirect to payment page
    navigate(`/payment/${productId}`, { state: { formData: formData } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(formData).some(field => !field);
  
    if (isEmpty) {
      const errorMessageElement = document.getElementById('errorMessage');
      errorMessageElement.textContent = 'Please fill in all required fields!';
      return; 
    } 

    // Show payment method options
    setShowPaymentMethodOption(true);
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

        <button className="checkout-button" type="submit">Payment</button>
        <div id="errorMessage"></div>
        {showPaymentMethodOption && (
          <PaymentMethodOption onSelectPaymentMethod={handlePaymentMethodSelect} />
        )}
      </form>
    </div>
  );
};

export default CheckoutPage;
