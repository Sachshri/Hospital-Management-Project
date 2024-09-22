import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';
import { toast } from "react-toastify";
import { Context } from "../main";
import {motion} from "framer-motion"
import './AnimatedLink.css';
const Navbar = () => {
const [show, setShow] = useState(false);
const { isAuthenticated, setIsAuthenticated } = useContext(Context);
const navigateTo = useNavigate();
  const handleLogout = async () => {
    // Clear token and cookie
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Update authentication state
    setIsAuthenticated(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/api/v1/user/patient/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        // Redirect to login after successful logout
        navigateTo("/login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("An error occurred during logout.");
    }
  };

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <Link to={"/"} onClick={() => setShow(!show)}>
            <img src="/logo.png" alt="logo" className="logo-img" />
          </Link>
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/shri-disease-detector"} onClick={() => setShow(!show)}>
              <motion.span
                className="gradient-text" // Add a class for styling
                animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }} // Animate background position
                transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
              >
                SHRI DETECTOR
              </motion.span>
          </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;