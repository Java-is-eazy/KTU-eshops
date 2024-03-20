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

const App = () => {
  const [token, setToken] = useState("");
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
              <Authentication setToken={setToken} />
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
