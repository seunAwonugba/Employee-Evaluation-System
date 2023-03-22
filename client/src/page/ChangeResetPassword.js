import { useState } from "react";
import { toast } from "react-toastify";
import baseUrl from "../base_url/baseUrl";

export default function ChangeResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const changeResetPassword = async (e) => {
        e.preventDefault();
        const userResponse = {
            password,
            confirmPassword,
        };

        try {
            const response = await baseUrl.post(
                "auth/change-reset-password",
                userResponse
            );
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
                    <form
                        onSubmit={changeResetPassword}
                        className="single-task-form"
                    >
                        <h4>Reset Password</h4>
                        <div className="form-control">
                            <label for="companyEmail">Password</label>
                            <input
                                type="password"
                                onChange={(e) =>
                                    inputChangeHandler(setPassword, e)
                                }
                            />
                        </div>
                        <div className="form-control">
                            <label for="password">Confirm password</label>
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
                            Change password
                        </button>
                    </form>
                </div>
            </main>
        </body>
    );
}
