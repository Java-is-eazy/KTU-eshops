import React from 'react';
import './paymentMethod.css';

const PaymentMethodOption = ({ onSelectPaymentMethod }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Select Payment Method</h3>
        <button onClick={() => onSelectPaymentMethod('card')}>Card</button>
        <button onClick={() => onSelectPaymentMethod('paypal')}>PayPal</button>
      </div>
    </div>
  );
};

export default PaymentMethodOption;
