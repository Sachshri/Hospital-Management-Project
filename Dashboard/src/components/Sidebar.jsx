import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
      localStorage.removeItem("token");
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsAuthenticated(false);

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/api/v1/user/admin/logout`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message);
          navigateTo("/login");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("An error occurred while logging out.");
      }
  };
  const handleNavigation = (path) => {
    navigateTo(path);
    setShow(false);
  };

  if (!isAuthenticated) {
    return null; // Do not render the sidebar if not authenticated
  }

  return (
    <>
      <nav className={show ? "show sidebar" : "sidebar"}>
        <div className="links">
          <TiHome onClick={() => handleNavigation("/")} />
          <FaUserDoctor onClick={() => handleNavigation("/doctors")} />
          <MdAddModerator onClick={() => handleNavigation("/admin/addnew")} />
          <IoPersonAddSharp onClick={() => handleNavigation("/doctor/addnew")} />
          <AiFillMessage onClick={() => handleNavigation("/messages")} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div className="wrapper">
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
