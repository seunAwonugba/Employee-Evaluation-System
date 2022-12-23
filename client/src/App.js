// import "./App.css";
import React from "react";
import ManagerForm from "./ManagerForm";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import StaffForm from "./StaffForm";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/managersForm" element={<ManagerForm />} />
                <Route path="/staffForm" element={<StaffForm />} />
            </Routes>
        </>
    );
}

export default App;
