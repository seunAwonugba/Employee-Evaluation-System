// import "./App.css";
import React from "react";
import ManagerForm from "./forms/ManagersForm";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import StaffForm from "./forms/MembersForm";
import NavBar from "./NavBar";
import { ToastContainer, toast } from "react-toastify";
import ManagerScores from "./scores/Manager";
import MemberScores from "./scores/Member";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/managers-form" element={<ManagerForm />} />
                <Route path="/members-form" element={<StaffForm />} />
                <Route path="/manager-scores" element={<ManagerScores />} />
                <Route path="/member-scores" element={<MemberScores />} />
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
