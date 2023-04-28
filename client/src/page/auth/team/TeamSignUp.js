import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import baseUrl from "../../../base_url/baseUrl";
import { useNavigate } from "react-router-dom";

const params = window.location.search;
const companyId = new URLSearchParams(params).get("id");
const type = new URLSearchParams(params).get("type");

export default function TeamSignUp() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const signUp = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const userResponse = {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            password_confirmation: confirmPassword,
        };

        try {
            const response = await baseUrl.post(
                `auth/team-sign-up/?id=${companyId}&type=${type}`,
                userResponse
            );
            setIsLoading(false);
            console.log(response);

            if (response.data.success === true) {
                navigate("/");
            } else {
                toast.error(response.data.data);
            }
        } catch (error) {
            setIsLoading(false);
            // console.log(error);
            toast.error(error.response.data.data);
        }
    };

    return isLoading ? (
        <body>
            <h4>Loading...</h4>
        </body>
    ) : (
        <body className="container">
            <form onSubmit={signUp} className="single-task-form">
                <h4>Team Sign Up</h4>
                <div className="form-control">
                    <label for="companyName">First name</label>
                    <input
                        type="text"
                        onChange={(e) => inputChangeHandler(setFirstName, e)}
                        value={firstName}
                    />
                </div>
                <div className="form-control">
                    <label for="companyWebpage">Last name</label>
                    <input
                        type="text"
                        onChange={(e) => inputChangeHandler(setLastName, e)}
                        value={lastName}
                    />
                </div>
                <div className="form-control">
                    <label for="companyEmail">Email</label>
                    <input
                        type="email"
                        onChange={(e) => inputChangeHandler(setEmail, e)}
                        value={email}
                    />
                </div>
                <div className="form-control">
                    <label for="companyEmail">Phone number</label>
                    <input
                        type="tel"
                        onChange={(e) => inputChangeHandler(setPhoneNumber, e)}
                        value={phoneNumber}
                    />
                </div>
                <div className="form-control">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        onChange={(e) => inputChangeHandler(setPassword, e)}
                        value={password}
                    />
                </div>
                <div className="form-control">
                    <label for="confirm_password">Confirm Password</label>
                    <input
                        type="password"
                        onChange={(e) =>
                            inputChangeHandler(setConfirmPassword, e)
                        }
                        value={confirmPassword}
                    />
                </div>

                <button type="submit" className="block btn task-edit-btn">
                    Sign Up
                </button>
                <div className="form-alert"></div>
            </form>
        </body>
    );
}
