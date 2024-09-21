import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Navbar from "./Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./main";
import Login from "./Pages/Login";
import ShriDetector from "./Pages/ShriDetector";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/api/v1/user/patient/me`, {
          method: "POST",
          credentials: "include", // To include cookies in the request
          headers: {
            "Content-Type": "application/json", // Optional if not sending a body
            // getSetCookies: true,
             Cookie: "token:" + localStorage.getItem("token"),
          },
          //send token with body
          body: JSON.stringify({ token: localStorage.getItem("token") }),
          
        });

        if (!response.ok) {
          // Handle non-200 HTTP responses
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); // Automatic JSON transformation
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
        toast.error("Failed to fetch user data"); // Use toast to show an error notification
        console.error("Fetch Error:", error);
      }
    };

    fetchUser();
  }, [isAuthenticated, setIsAuthenticated, setUser]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/shri-disease-detector" element={<ShriDetector />} />
          <Route path="/about" element={<AboutUs />} />
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

