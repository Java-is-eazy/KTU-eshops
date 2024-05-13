import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useLocation,useParams} from 'react-router-dom';
import './cardDetailsPage.css';
import axios from 'axios';

const CardDetailsForm = () => {
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const {productId} = useParams();
  const location = useLocation();
  const { formData, cartItems } = location.state || {};

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
  
    if (error) {
      console.error('Error:', error);
      setError(error.message);
    } else {
      console.log('Payment method:', paymentMethod);
      try {
        const response = await axios.post(
          'http://localhost:3001/api/checkout/create-payment-intent',
          { paymentMethod: paymentMethod, productIds: cartItems.map(item => item.id),formData:formData}
        );
    
        const { error, paymentIntent } = await stripe.confirmCardPayment(response.data.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {},
          },
        });
    
        if (error) {
          console.error('Error creating payment intent:', error);
          setError(error.message); // Set error message again in case of confirmation error
        } else {
          setPaymentSuccessful(true); // Set success state if payment confirmed
        }
      } catch (error) {
        console.error('Error creating payment intent:', error);
        setError(error.message);
      }
    }
  };

  return (
    <div className="card-details-container">
      <h2>Enter Card Details</h2>
      <form className="card-details-form" onSubmit={handleSubmitPayment}>
        <label>
          Card details:
          <CardElement
            className="custom-base-class"
            options={{
              hidePostalCode: true,
              iconStyle: 'solid',
            }}
          />
        </label>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {paymentSuccessful && <div style={{ color: 'green' }}>Payment Successful!</div>}
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default CardDetailsForm;
