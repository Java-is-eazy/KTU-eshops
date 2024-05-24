import React from "react";
import "./paymentMethod.css";
import PropTypes from "prop-types";
 

const PaymentMethodOption = ({ onSelectPaymentMethod }) => {
  return (
      <div className="modal-overlay">
          <div className="modal">
              <h3>Select Payment Method</h3>
              <button onClick={() => onSelectPaymentMethod("card")}>Card</button>
              <button onClick={() => onSelectPaymentMethod("paypal")}>PayPal</button>
          </div>
      </div>
  );
};


PaymentMethodOption.propTypes = {
  onSelectPaymentMethod: PropTypes.func.isRequired,
};


export default PaymentMethodOption;

