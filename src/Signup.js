import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "./endless-constellation.png";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: Add actual signup logic (e.g., API call)
    console.log("Signing up with", username, email, password);
    navigate("/login"); // Redirect to login after signup
  };

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      backgroundImage: `url(${Background})`,
      backgroundSize: "cover",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden"
    }}>
      <form onSubmit={handleSignup} style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        width: "300px"
      }}>
        <h2 style={{ color: "white", fontWeight: "bold", marginBottom: "1rem" }}>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem",
            width: "100%",
            border: "2px solid white",
            borderRadius: "5px",
            backgroundColor: "transparent",
            color: "white"
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem",
            width: "100%",
            border: "2px solid white",
            borderRadius: "5px",
            backgroundColor: "transparent",
            color: "white"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem",
            width: "100%",
            border: "2px solid white",
            borderRadius: "5px",
            backgroundColor: "transparent",
            color: "white"
          }}
        />
        <button type="submit" style={{
          padding: "0.5rem 1rem",
          backgroundColor: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold"
        }}>Sign Up</button>
        <p style={{ color: "white", marginTop: "1rem" }}>
          Already have an account? <a href="/login" style={{ color: "lightblue" }}>Login</a>
        </p>
      </form>
    </div>
  );
}