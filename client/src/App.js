// import "./App.css";
import React from "react";
import ManagerForm from "./forms/ManagersForm";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import StaffForm from "./forms/StaffForm";
import NavBar from "./NavBar";
import { ToastContainer, toast } from "react-toastify";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/managers-form" element={<ManagerForm />} />
                <Route path="/staff-form" element={<StaffForm />} />
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
