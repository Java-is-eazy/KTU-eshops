import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/logo.png';
import './header.css';

function Header() {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location.pathname);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <nav className="site-navigation">
        <ul className="nav">
          <li className="branding">
            <>
            <h1 className="collapseButton" onClick={toggleCollapse}>≡</h1>
            <img src={logo} alt="ProductForge" className="imglogo"/>
            <Link to="/" className="textlogo">ProductForge</Link>
            </>
          </li>
        </ul>
        <ul className={`links ${isCollapsed ? 'hide' : ''}`}>
          <li><Link to="/" className={`navlink ${currentLocation === '/' ? 'active' : ''}`}>Home</Link></li> 
          <li><Link to="/login" className={`navlink ${currentLocation === '/login' ? 'active' : ''}`}>Login</Link></li> 
        </ul>

      </nav>
    </header>
  )
}

export default Header;
