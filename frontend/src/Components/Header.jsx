/* eslint-disable no-undef */
import { useState, React } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/logo.png';
import './header.css';
import PropTypes from 'prop-types';


function Header({ token, setToken, username }) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(location.pathname);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (currentLocation !== location.pathname) {
    setCurrentLocation(location.pathname);
  }

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
                  <li>
                      <Link 
                          to="/login" 
                          onClick={() => { if (token !== "") setToken(''); }} 
                          className={`navlink ${currentLocation === '/login' ? 'active' : ''}`}
                      >
                          {token === "" ? 'Login' : 'Logout'}
                      </Link>
                  </li>
                  {token === "" ? null : (
                      <li>
                          <Link to={`/userprofile/${username}`}>
                              My Profile
                          </Link>
                      </li>
        )}
                  {token === "" ? null : (
                      <li>
                          <Link to={`/wishlist/${username}`}>
                              Wishlist
                          </Link>
                      </li>
            )}
                  {token === "" ? null : (
                      <li>
                          <Link to={`/cart`}>
                              <img className={'shopping-bag-icon'} src={process.env.PUBLIC_URL + '/icons/shopping-bag.png'} alt="Cart"/>
                          </Link>
                      </li>
            )}
              </ul>
          </nav>
      </header>
  );
}

Header.propTypes = {
  setToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};


export default Header;
