import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import ProductPage from "./Components/ProductPage";
import Authentication from "./Components/Authentication";
import Header from "./Components/Header";
import ProductInfo from "./Components/ProductInfo";
import ProductAdd from "./Components/ProductAddition";
import CheckoutPage from "./Components/checkout";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CardDetailsForm from "./Components/cardDetails";

const stripePromise = loadStripe('pk_test_51P2Cfs2LzASn7iwOCPkdqxaO2LbTRLJjpDCv0uY419KTMDcnBAejH2mYy51SmesDJNFjdajznygXlaBOFJykNCYA00Kte16mZH');

const App = () => {
  const [token, setToken] = useState("");
  const [username, setUser] = useState("");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header token={token} setToken={setToken} />
              <ProductPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header token={token} setToken={setToken} />
              <Authentication setToken={setToken} setUser={setUser} />
            </>
          }
        />
        <Route
          path="/addyourproduct"
          element={
            <>
              <Header token={token} setToken={setToken} />
              <ProductAdd token={token} setToken={setToken}/>
            </>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <>
              <Header token={token} setToken={setToken} />
              <ProductInfo />
            </>
          }
        />
        <Route
          path="/checkout/:productId"
          element={
            <Elements stripe={stripePromise}>
              <>
                <Header token={token} setToken={setToken} />
                <CheckoutPage />
              </>
            </Elements>
          }
        />
        <Route
          path="/payment/:productId"
          element={
            <Elements stripe={stripePromise}>
              <>
                <Header token={token} setToken={setToken} />
                <CardDetailsForm />
              </>
            </Elements>
          }
        />
        <Route
          path="/404"
          element={
            <>
              <Header token={token} setToken={setToken} />
              <h1 style={{ textAlign: "center" }}>temporary not found page</h1>
            </>
          }
        />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
};

export default App;
