import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../components/Layout/firebaseConfig";
import "../Login.css";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook to redirect user

  // Handle Email & Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/"); // Redirect to home page after login
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      console.log("Google User:", user);
  
      if (user) {
        localStorage.setItem("userPhoto", user.photoURL);
        localStorage.setItem("userName", user.displayName);
  
        alert("Logged in with Google!");
        navigate("/");
      }
    } catch (error) {
      console.error("Google login error:", error);
      setError(error.message);
    }
  };
  
  

  return (
    <div 
      className=""
      style={{
        backgroundImage: "url('https://www.baltana.com/files/wallpapers-29/World-Map-Background-Wallpapers-94603.jpg')", // Replace with your background image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh",
        padding: "20px",
         // Adjust the opacity of the background image here
      
      }}
    >
    <div className="login-container">
      
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div className="password-toggle">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>

        <button type="submit">Login</button>
      </form>

      <hr />

      {/* Google Login Button */}
      <button onClick={handleGoogleLogin} >
  <FaGoogle size={20} />
  Login with Google
</button>
    </div>
    </div>
  );
    
};

export default Login;
