import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import baseUrl from "../base_url/baseUrl";

export default function SignUp() {
    const [companyName, setCompanyName] = useState("");
    const [companyWebpage, setCompanyWebpage] = useState("");
    const [ceoName, setCeoName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const signUp = async (e) => {
        e.preventDefault();
        const userResponse = {
            companyName,
            companyWebpage,
            ceoName,
            companyEmail,
            password,
            password_confirmation: confirmPassword,
        };

        try {
            const response = await baseUrl.post("auth/sign-up", userResponse);
            // setIsLoading(false);

            console.log(response);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error(error.response.data.data);
        }
    };

    return isLoading ? (
        <div className="loader">Loading...</div>
    ) : (
        <body>
            <main>
                <div className="container">
                    <form onSubmit={signUp} className="single-task-form">
                        <h4>Company Sign Up</h4>
                        <div className="form-control">
                            <label for="companyName">Company Name</label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    inputChangeHandler(setCompanyName, e)
                                }
                            />
                        </div>
                        <div className="form-control">
                            <label for="companyWebpage">Company Webpage</label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    inputChangeHandler(setCompanyWebpage, e)
                                }
                            />
                        </div>
                        <div className="form-control">
                            <label for="ceoName">CEO's Name</label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    inputChangeHandler(setCeoName, e)
                                }
                            />
                        </div>
                        <div className="form-control">
                            <label for="companyEmail">Company Email</label>
                            <input
                                type="email"
                                onChange={(e) =>
                                    inputChangeHandler(setCompanyEmail, e)
                                }
                            />
                        </div>
                        <div className="form-control">
                            <label for="password">Password</label>
                            <input
                                type="password"
                                onChange={(e) =>
                                    inputChangeHandler(setPassword, e)
                                }
                            />
                        </div>
                        <div className="form-control">
                            <label for="confirm_password">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                onChange={(e) =>
                                    inputChangeHandler(setConfirmPassword, e)
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="block btn task-edit-btn"
                        >
                            Sign Up
                        </button>
                        <div className="form-alert"></div>
                    </form>
                </div>
            </main>
        </body>
    );
}
