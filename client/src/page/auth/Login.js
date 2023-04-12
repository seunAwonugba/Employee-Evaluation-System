import { useState } from "react";
import { toast } from "react-toastify";
import baseUrl from "../../base_url/baseUrl";
import { useNavigate } from "react-router-dom";

export default function Login({ handleLogin }) {
    const navigate = useNavigate();

    const [companyEmail, setCompanyEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const login = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userResponse = {
            companyEmail,
            password,
        };

        try {
            const response = await baseUrl.post("auth/login", userResponse);
            setIsLoading(false);

            if (response.data.success === true) {
                console.log(response);
                toast.success("Login successful");
                handleLogin(response.data.token);

                navigate("/dashboard");
            } else {
                toast.error(response.data.data);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response.data.data);
        }
    };

    return isLoading ? (
        <body>
            <h4>Loading...</h4>
        </body>
    ) : (
        <body className="container">
            <form onSubmit={login} className="single-task-form">
                <h4>Login</h4>
                <div className="form-control">
                    <label for="companyEmail">Email</label>
                    <input
                        type="email"
                        onChange={(e) => inputChangeHandler(setCompanyEmail, e)}
                        value={companyEmail}
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

                <button
                    type="submit"
                    className="block btn task-edit-btn"
                    disabled={isLoading}
                >
                    Login
                </button>

                <p>
                    Forgot password?{" "}
                    <a href="http://localhost:3000/forgot-password-email">
                        Click here
                    </a>{" "}
                    to reset
                </p>
            </form>
        </body>
    );
}
