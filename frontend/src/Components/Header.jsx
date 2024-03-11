import './header.css';
import logo from '../assets/logo.png';
function Header () {
  return (
    <header class="site-header">
      <div class="site-identity" href="/">
        <a><img src={logo} style={{ height: '3.5rem' }} alt="Logo" /></a>
        <a style={{fontSize:"2em"}}>ProductForge</a>
      </div>  
      <nav class="site-navigation">
        <ul class="nav">
          <li><a href="/">Home</a></li> 
          <li><a href="/login">Login</a></li> 

        </ul>
      </nav>
    </header>
  )
}

export default Header;