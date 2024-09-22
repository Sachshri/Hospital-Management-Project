import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar_number, setAadhar] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/api/v1/user/admin/addnew`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          aadhar_number,
          DOB,
          gender,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setIsAuthenticated(true);
        navigateTo("/");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setAadhar("");
        setDOB("");
        setGender("");
        setPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding a new admin.");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">ADD NEW ADMIN</h1>
        <form onSubmit={handleAddNewAdmin}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="firstName"
              id="firstName"
              autoComplete="given-name"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name="lastName"
              id="lastName"
              autoComplete="family-name"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              autoComplete="email"
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
              id="phone"
              autoComplete="tel"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="aadhar_number"
              value={aadhar_number}
              onChange={(e) => setAadhar(e.target.value)}
              name="aadhar_number"
              id="aadhar_number"
              autoComplete="off"
              required
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
              name="DOB"
              id="DOB"
              autoComplete="bday"
              required
            />
          </div>
          <div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              id="gender"
              autoComplete="sex"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              autoComplete="new-password"
              required
            />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">ADD NEW ADMIN</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewAdmin;
