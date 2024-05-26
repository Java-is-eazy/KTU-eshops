/* eslint-disable no-unused-vars */
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
import RecoverPassword from "./Components/PasswordRecovery";
import AdminPanel from "./Components/AdminPanel";
import Wishlist from "./Components/Wishlist/Wishlist";
const stripePromise = loadStripe(
  "pk_test_51P2Cfs2LzASn7iwOCPkdqxaO2LbTRLJjpDCv0uY419KTMDcnBAejH2mYy51SmesDJNFjdajznygXlaBOFJykNCYA00Kte16mZH"
);

const App = () => {
  const [token, setToken] = useState("");
  const [username, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUsername = Cookies.get("username");
    const getRole = Cookies.get("role");
    if (storedToken) setToken(storedToken);
    if (storedUsername) setUser(storedUsername);
    if (getRole === "admin") setIsAdmin(true);
  }, []);

  useEffect(() => {
    Cookies.set("token", token);
    Cookies.set("username", username);
    Cookies.set("role", isAdmin ? "admin" : "user");
  }, [token, username, isAdmin]);

  function handleLogout() {
    setToken("");
    setUser("");
    setIsAdmin(false);
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                token={token}
                setToken={handleLogout}
                username={username}
                isAdmin={isAdmin}
              />
              <ProductPage 
                isAdmin={isAdmin}
                token={token}
              />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header
                token={token}
                setToken={handleLogout}
                username={username}
                isAdmin={isAdmin}
              />
              <Authentication
                setToken={setToken}
                setUser={setUser}
                setIsAdmin={setIsAdmin}
              />
            </>
          }
        />
        <Route
          path="/wishlist/:username"
          element={
            <>
              <Header
                token={token}
                setToken={setToken}
                username={username}
                isAdmin={isAdmin}
              />
              <Wishlist />
            </>
          }
        />
        <Route
          path="/addyourproduct"
          element={
            <>
              <Header
                token={token}
                setToken={handleLogout}
                username={username}
                isAdmin={isAdmin}
              />
              <ProductAdd token={token} setToken={setToken} />
            </>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <>
              <Header
                token={token}
                setToken={handleLogout}
                username={username}
                isAdmin={isAdmin}
              />
              <ProductInfo />
            </>
          }
        />
        <Route
          path="/checkout/:productId"
          element={
            <Elements stripe={stripePromise}>
              <>
                <Header
                  token={token}
                  setToken={handleLogout}
                  username={username}
                  isAdmin={isAdmin}
                />
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
                <Header
                  token={token}
                  setToken={handleLogout}
                  username={username}
                  isAdmin={isAdmin}
                />
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
                <Header
                  token={token}
                  setToken={handleLogout}
                  username={username}
                  isAdmin={isAdmin}
                />
                <CardDetailsForm />
              </>
            </Elements>
          }
        />
        <Route
          path="/userprofile/:username"
          element={
            <>
              <Header
                token={token}
                setToken={handleLogout}
                username={username}
                isAdmin={isAdmin}
              />
              <UserProfile
                myUsername={username}
                token={token}
                handleLogout={handleLogout}
              />
            </>
          }
        />
        <Route
          path="/adminpanel"
          element={
            <>
              <Header
                token={token}
                setToken={handleLogout}
                username={username}
                isAdmin={isAdmin}
              />
              <AdminPanel
                myUsername={username}
                token={token}
                handleLogout={handleLogout}
                isAdmin={isAdmin}
              />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header
                token={token}
                setToken={handleLogout}
                username={username}
                isAdmin={isAdmin}
              />
              <Cart />
            </>
          }
        />
        <Route
          path="/recoverpassword/:string"
          element={
            <>
              <RecoverPassword />
            </>
          }
        />

        <Route
          path="/404"
          element={
            <>
              <Header
                token={token}
                setToken={handleLogout}
                username={username}
                isAdmin={isAdmin}
              />
              <h1
                style={{
                  textAlign: "center",
                  position: "relative",
                  top: "50%",
                }}
              >
                Page not found
              </h1>
            </>
          }
        />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
};

export default App;
