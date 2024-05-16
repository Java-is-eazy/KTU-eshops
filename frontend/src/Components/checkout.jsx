/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./checkoutPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentMethodOption from "./paymentMethod";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const queryParams = new URLSearchParams(location.search);
  const cartItems = JSON.parse(decodeURIComponent(queryParams.get("items")));

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: ""
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showPaymentMethodOption, setShowPaymentMethodOption] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethodOption(false);

    navigate("/payment", { state: { formData: formData, cartItems: cartItems } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(formData).some(field => !field);

    if (isEmpty) {
      const errorMessageElement = document.getElementById("errorMessage");
      errorMessageElement.textContent = "Please fill in all required fields!";
      return;
    }
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

              <div className="item-list-checkout">
                  <h3>Items:</h3>
                  {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
                <div key={index}>
                    <p>{item.title} Quantity: {item.quantity} Price: {item.price} €</p>
                </div>
            ))
          ) : (
              <p>No items in the cart</p>
          )}
              </div>

              <button className="submit-btn" type="submit">Payment</button>
              <div id="errorMessage"></div>
              {showPaymentMethodOption && (
              <PaymentMethodOption onSelectPaymentMethod={handlePaymentMethodSelect} />
        )}
          </form>
      </div>
  );
};

export default CheckoutPage;
