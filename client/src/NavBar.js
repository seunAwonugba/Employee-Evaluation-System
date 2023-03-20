import React from "react";
import "./css/navbar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="top-nav-bar">
            <Link to="/" className="title">
                Employee Evaluation System
            </Link>

            <ul>
                <li className="hide">
                    <Link to="/managers-form">Managers</Link>
                </li>
                <li className="hide">
                    <Link to="/members-form">Staffs</Link>
                </li>
                <li>
                    <Link to="/sign-up">Sign Up</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
}
