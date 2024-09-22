import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, setAdmin } = useContext(Context);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation to check if password and confirm password match
    // if (password !== confirmPassword) {
    //   toast.error("Passwords do not match.");
    //   return;
    // }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/api/v1/user/login`,
        {
          method: "POST",
          credentials: "include", // To include cookies in the request
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            confirmPassword,
            role: "Admin", // Ensure this matches your backend requirements
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setIsAuthenticated(true);

        if (data.user.role === "Admin") {
          setAdmin(data.user);
        }

        // Clear input fields after successful login
        navigate("/");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

      } else {
        toast.error(data.message || "Login failed.");
        console.error("Server Error:", data);
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast.error("An error occurred while logging in. Please try again later.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <section className="container form-component">
      <img src="/logo.png" alt="logo" className="logo" />
      <h1 className="form-title">WELCOME TO SHRI (Where People Smile!)</h1>
      <p>Only Admins Are Allowed To Access These Resources!</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          id="email"
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          id="password"
          autoComplete="current-password"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          id="confirm-password"
          autoComplete="new-password"
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
};

export default Login;