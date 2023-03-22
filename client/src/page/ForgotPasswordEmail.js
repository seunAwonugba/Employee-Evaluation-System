import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../base_url/baseUrl";

export default function ForgotPasswordEmail() {
    const navigate = useNavigate();
    const [companyEmail, setCompanyEmail] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const sendResetPasswordLink = async (e) => {
        e.preventDefault();

        const userResponse = { companyEmail };

        try {
            const response = await baseUrl.post(
                "auth/reset-password-link",
                userResponse
            );

            if (response.data.success === true) {
                toast.success(response.data.data);
                navigate("/forgot-password-email-sent");
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
        <div className="loader">Loading...</div>
    ) : (
        <>
            <body>
                <main>
                    <div className="container">
                        <form
                            className="single-task-form"
                            onSubmit={sendResetPasswordLink}
                        >
                            <div className="form-control">
                                <label for="email">Company Email</label>
                                <input
                                    type="email"
                                    onChange={(e) =>
                                        inputChangeHandler(setCompanyEmail, e)
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className="block btn task-edit-btn"
                            >
                                Continue Reset Password
                            </button>
                        </form>
                    </div>
                </main>
            </body>
        </>
    );
}
