import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../components/Layout/firebaseConfig";
import "../Signup.css";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Redirect after login/signup

  // Handle Email & Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user's display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      // Store user details in localStorage
      localStorage.setItem("userName", `${firstName} ${lastName}`);
      localStorage.setItem("userEmail", email);

      alert("Account created successfully!");
      navigate("/"); // Redirect to Home after signup
    } catch (error) {
      console.error("Signup error:", error);
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
   
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
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
        <div>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </div>
    
  );
};

export default Signup;
