import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import Sidebar from "./components/Sidebar";
import AddNewAdmin from "./components/AddNewAdmin";

import { Context } from "./main";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/api/v1/user/admin/me`,  {
          method: "GET",
          credentials: "include", // To include cookies in the request
          headers: {
            "Content-Type": "application/json", // Optional in GET, good practice to include
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); 
        const token = localStorage.getItem("token");
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setAdmin(data.users);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setAdmin]); 

  return (
    <Router>
      {isAuthenticated && <Sidebar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/addnew" element={<AddNewDoctor />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;