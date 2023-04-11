import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function NavBar({ isLoggedIn, handleLogout }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <nav className="top-nav-bar">
            <Link to="/" className="title">
                Employee Evaluation System
            </Link>

            <ul>
                {isLoggedIn ? (
                    <>
                        <li>
                            <Link
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                            >
                                Invite
                            </Link>

                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link to="/manager-invite">Manager</Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link to="/member-invite">Member</Link>
                                </MenuItem>
                            </Menu>
                        </li>
                        <li>
                            <Link to="/login" onClick={handleLogout}>
                                Logout
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </ul>
        </nav>
    );
}
