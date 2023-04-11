import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import baseUrl from "../base_url/baseUrl";
import { useNavigate } from "react-router-dom";

const params = window.location.search;
const token = new URLSearchParams(params).get("token");

export default function ChangeResetPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const changeResetPassword = async (e) => {
        e.preventDefault();
        const userResponse = {
            email,
            password,
            password_confirmation: confirmPassword,
            token,
        };

        try {
            const response = await baseUrl.post(
                "auth/change-reset-password",
                userResponse
            );
            console.log(response);
            // setIsLoading(false);
            if (response.data.success === true) {
                toast.success(response.data.data);
                navigate("/login");
            } else {
                toast.error(response.data.data);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error(error.response.data.data);
        }
    };

    return isLoading ? (
        <body>
            <h4>Loading...</h4>
        </body>
    ) : (
        <body>
            <form onSubmit={changeResetPassword} className="single-task-form">
                <h4>Reset Password</h4>
                <div className="form-control">
                    <label for="company_email">Company email</label>
                    <input
                        type="email"
                        onChange={(e) => inputChangeHandler(setEmail, e)}
                    />
                </div>
                <div className="form-control">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        onChange={(e) => inputChangeHandler(setPassword, e)}
                    />
                </div>
                <div className="form-control">
                    <label for="confirm_password">Confirm password</label>
                    <input
                        type="password"
                        onChange={(e) =>
                            inputChangeHandler(setConfirmPassword, e)
                        }
                    />
                </div>

                <button type="submit" className="block btn task-edit-btn">
                    Change password
                </button>
            </form>
        </body>
    );
}
