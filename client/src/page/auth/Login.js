import { useState } from "react";
import { toast } from "react-toastify";
import baseUrl from "../../base_url/baseUrl";

export default function Login() {
    const [companyEmail, setCompanyEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const login = async (e) => {
        e.preventDefault();
        const userResponse = {
            companyEmail,
            password,
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
                    <form onSubmit={login} className="single-task-form">
                        <h4>Login</h4>
                        <div className="form-control">
                            <label for="companyEmail">Email</label>
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

                        <button
                            type="submit"
                            className="block btn task-edit-btn"
                        >
                            Login
                        </button>
                        <div className="form-alert"></div>
                    </form>
                </div>
            </main>
        </body>
    );
}
