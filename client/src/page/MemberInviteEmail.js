import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../base_url/baseUrl";

export default function MemberInviteEmail() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const sendInvite = async (e) => {
        e.preventDefault();

        const userResponse = { companyEmail: email };

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
        <body>
            <h4>Loading...</h4>
        </body>
    ) : (
        <body className="container">
            <form className="single-task-form" onSubmit={sendInvite}>
                <div className="form-control">
                    <label for="email">Member Email</label>
                    <input
                        type="email"
                        onChange={(e) => inputChangeHandler(setEmail, e)}
                    />
                </div>
                <button type="submit" className="block btn task-edit-btn">
                    Invite Member
                </button>
            </form>
        </body>
    );
}
