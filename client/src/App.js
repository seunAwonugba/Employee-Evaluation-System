// import "./App.css";
import React, { useState } from "react";
import ManagerForm from "./page/forms/ManagersForm";
import { Route, Routes } from "react-router-dom";
import AllUsers from "./AllUsers";
import StaffForm from "./page/forms/MembersForm";
import NavBar from "./navbar/NavBar";
import { ToastContainer } from "react-toastify";
import ManagerScores from "./page/scores/Manager";
import MemberScores from "./page/scores/Member";
import SignUp from "./page/auth/SignUp";
import EmailConfirmation from "./page/EmailConfirmation";
import Login from "./page/auth/Login";
import EmailConfirmationSent from "./page/EmailConfirmationSent";
import ForgotPasswordEmail from "./page/ForgotPasswordEmail";
import ForgotPasswordEmailSent from "./page/ForgotPasswordEmailSent";
import ChangeResetPassword from "./page/ChangeResetPassword";
import LandingPage from "./page/LandingPage";
import Dashboard from "./page/Dashboard";
import ManagerInviteEmail from "./page/ManagerInviteEmail";
import MemberInviteEmail from "./page/MemberInviteEmail";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("employee_eval_token"))
    );

    const handleLogin = (token) => {
        localStorage.setItem("employee_eval_token", token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("employee_eval_token");
        setIsLoggedIn(false);
    };

    return (
        <>
            <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/managers-form" element={<ManagerForm />} />
                <Route path="/members-form" element={<StaffForm />} />
                <Route path="/manager-scores" element={<ManagerScores />} />
                <Route path="/member-scores" element={<MemberScores />} />

                <Route path="/sign-up" element={<SignUp />} />
                <Route
                    path="/login"
                    element={<Login handleLogin={handleLogin} />}
                />

                <Route
                    path="/email-confirmation"
                    element={<EmailConfirmation />}
                />

                <Route
                    path="/email-confirmation-sent"
                    element={<EmailConfirmationSent />}
                />

                <Route
                    path="/forgot-password-email"
                    element={<ForgotPasswordEmail />}
                />

                <Route
                    path="/forgot-password-email-sent"
                    element={<ForgotPasswordEmailSent />}
                />

                <Route
                    path="/change-reset-password"
                    element={<ChangeResetPassword />}
                />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route
                    path="/manager-invite"
                    element={<ManagerInviteEmail />}
                />

                <Route path="/member-invite" element={<MemberInviteEmail />} />
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
