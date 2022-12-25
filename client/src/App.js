// import "./App.css";
import React from "react";
import ManagerForm from "./forms/ManagerForm";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import StaffForm from "./StaffForm";
import NavBar from "./NavBar";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/managersForm" element={<ManagerForm />} />
                <Route path="/staffForm" element={<StaffForm />} />
            </Routes>
        </>
    );
}

export default App;
