import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Layout/firebaseConfig";

export const Headers = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to control mobile menu visibility
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log("User Data:", currentUser);

      if (currentUser) {
        const storedPhoto = localStorage.getItem("userPhoto") || "";
        setUser({
          displayName: currentUser.displayName,
          photoURL:
            currentUser.photoURL ||
            storedPhoto ||
            "https://via.placeholder.com/150",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userPhoto");
      localStorage.removeItem("userName");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Toggle menu for mobile view
  const handleMenuToggle = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <header>
      <div className="container">
        <div className="grid navbar-grid">
          <div className="Logo">
            <NavLink to="/">
              <h1>WorldAtlas</h1>
            </NavLink>
          </div>
          <nav>
            <div className="hamburger" onClick={handleMenuToggle}>
              <span className={`bar ${menuOpen ? "open" : ""}`}></span>
              <span className={`bar ${menuOpen ? "open" : ""}`}></span>
              <span className={`bar ${menuOpen ? "open" : ""}`}></span>
            </div>

            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/country">Country</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact Us</NavLink>
              </li>

              {user ? (
                <>
                  <li className="user-info">
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="profile-image"
                    />
                  </li>
                  <span>{user.displayName}</span>
                  <li>
                    <NavLink
                      to="/"
                      onClick={handleLogout}
                      className="logout-link"
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup">Sign Up</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
