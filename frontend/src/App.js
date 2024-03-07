import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import ProductPage from "./Components/ProductPage";
import Authentication from "./Components/Authentication";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/404" element={<h1>temporary not found page</h1>} />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
};

export default App;
