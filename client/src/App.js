// import "./App.css";
import React from "react";
import ManagerForm from "./page/forms/ManagersForm";
import { Route, Routes } from "react-router-dom";
import AllUsers from "./AllUsers";
import StaffForm from "./page/forms/MembersForm";
import NavBar from "./NavBar";
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

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<AllUsers />} />
                <Route path="/managers-form" element={<ManagerForm />} />
                <Route path="/members-form" element={<StaffForm />} />
                <Route path="/manager-scores" element={<ManagerScores />} />
                <Route path="/member-scores" element={<MemberScores />} />

                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/login" element={<Login />} />

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
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
