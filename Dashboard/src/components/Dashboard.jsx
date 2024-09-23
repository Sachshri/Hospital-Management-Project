import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai"; 

const Dashboard = () => {
  const [appointments, setAppointments] =useState([]);
  const { isAuthenticated, admin,setAdmin } = useContext(Context);
  console.log("Admin:", admin);
  const user = localStorage.getItem("user")
   useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ADDRESS}/api/v1/appointment/getAllAppointments`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setAppointments(data.appointment || []);
      } catch (error) {
        toast.error(error.message);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, []);

  

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/api/v1/appointment/update_appointment/${appointmentId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to handle deleting an appointment with a confirmation popup
  const handleDeleteStatus = async (appointmentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) return; // If the user cancels, do nothing

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/api/v1/appointment/delete_appointment/${appointmentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Remove the deleted appointment from the state
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello,</p>
                <h5>
                  {admin.firstName ? `${admin.firstName}` : "Admin"}
                </h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>10</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
                <th>Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
  {appointments && appointments.length > 0 ? (
    appointments.map((appointment) => (
      <tr key={appointment._id}>
        <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
        <td>{appointment.appointment_date.substring(0, 16)}</td>
        <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
        <td>{appointment.department}</td>
        <td>
          <select
            className={
              appointment.status === "Pending"
                ? "value-pending"
                : appointment.status === "Accepted"
                ? "value-accepted"
                : "value-rejected"
            }
            value={appointment.status}
            onChange={(e) =>
              handleUpdateStatus(appointment._id, e.target.value)
            }
          >
            <option value="Pending" className="value-pending">
              Pending
            </option>
            <option value="Accepted" className="value-accepted">
              Accepted
            </option>
            <option value="Rejected" className="value-rejected">
              Rejected
            </option>
          </select>
        </td>
        <td>
          {appointment.hasVisited ? (
            <GoCheckCircleFill className="green" />
          ) : (
            <AiFillCloseCircle className="red" />
          )}
        </td>
        <td>
          <button
            onClick={() => handleDeleteStatus(appointment._id)}
            className="delete-button"
          >
            <AiFillDelete className="delete-icon" />
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">No Appointments Found!</td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;