import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Headers = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to track the menu visibility

  // Function to toggle the menu open/close
  const handleMenuToggle = () => {
    setMenuOpen(prevState => !prevState);
  };


  return (
    <header>
      <div className="container">
        <div className="grid navbar-grid">
          <div className="Logo">
            <NavLink to='/'>
              <h1>WorldAtlas</h1>
            </NavLink>
          </div>
          <nav>
            {/* Hamburger Icon for mobile view */}
            <div className="hamburger" onClick={handleMenuToggle}>
              <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
              <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
              <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
            </div>

            {/* Navigation Menu - Only visible when isMenuOpen is true */}
            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <li>
                <NavLink to='/'>Home</NavLink>
              </li>
              <li>
                <NavLink to='/about'>About</NavLink>
              </li>
              <li>
                <NavLink to='/country'>Country</NavLink>
              </li>
              <li>
                <NavLink to='/contact'>Contact Us</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
