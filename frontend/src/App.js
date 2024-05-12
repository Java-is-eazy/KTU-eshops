import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, React } from "react";
import Cookies from "js-cookie";
import "./App.css";
import ProductPage from "./Components/ProductPage";
import Authentication from "./Components/Authentication";
import Header from "./Components/Header";
import ProductInfo from "./Components/ProductInfo";
import ProductAdd from "./Components/ProductAddition";
import CheckoutPage from "./Components/checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardDetailsForm from "./Components/cardDetails";
import UserProfile from "./Components/UserProfile";
import Cart from "./Components/Cart";
const stripePromise = loadStripe(
  "pk_test_51P2Cfs2LzASn7iwOCPkdqxaO2LbTRLJjpDCv0uY419KTMDcnBAejH2mYy51SmesDJNFjdajznygXlaBOFJykNCYA00Kte16mZH"
);

const App = () => {
  const [token, setToken] = useState("");
  const [username, setUser] = useState("");

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUsername = Cookies.get("username");
    if (storedToken) setToken(storedToken);
    if (storedUsername) setUser(storedUsername);
  }, []);

  useEffect(() => {
    Cookies.set("token", token);
    Cookies.set("username", username);
  }, [token, username]);

  function handleLogout() {
    setToken("");
    setUser("");
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header token={token} setToken={setToken} username={username} />
              <ProductPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header token={token} setToken={setToken} username={username} />
              <Authentication setToken={setToken} setUser={setUser} />
            </>
          }
        />
        <Route
          path="/addyourproduct"
          element={
            <>
              <Header token={token} setToken={setToken} username={username} />
              <ProductAdd token={token} setToken={setToken} />
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
          path="/checkout"
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
          path="/userprofile/:username"
          element={
            <>
              <Header token={token} setToken={setToken} username={username} />
              <UserProfile
                myUsername={username}
                token={token}
                handleLogout={handleLogout}
              />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header token={token} setToken={setToken} username={username} />
              <Cart />
            </>
          }
        />

        <Route
          path="/404"
          element={
            <>
              <Header token={token} setToken={setToken} username={username} />
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
