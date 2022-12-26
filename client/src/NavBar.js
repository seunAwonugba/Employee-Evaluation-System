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
                <li>
                    <Link to="/managers-form">Managers</Link>
                </li>
                <li>
                    <Link to="/staffForm">Staffs</Link>
                </li>
            </ul>
        </nav>
    );
}
