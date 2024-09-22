import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ShriDetector from "./Pages/ShriDetector";
import Appointment from "./Pages/Appointment";
import AboutUS from "./Pages/AboutUS";
import Register from "./Pages/Register";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./main";
import Login from "./Pages/Login";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ADDRESS || "http://localhost:4000"}/api/v1/user/patient/me`,
          {
            method: "GET",
            credentials: "include", // To include cookies in the request
            headers: {
              "Content-Type": "application/json", // Optional in GET, good practice to include
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); 
        setIsAuthenticated(true);
        setUser(data.users); // Corrected 'user' to 'users' based on backend response
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
        console.error("Fetch Error:", error); // Log error for debugging
      }
    };

    fetchUser(); 
  }, [setIsAuthenticated, setUser]);

  return (
    <>
         <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/shri-disease-detector" element={<ShriDetector />} />
          <Route path="/about" element={<AboutUS />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
