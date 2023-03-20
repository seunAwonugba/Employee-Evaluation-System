import { useState, useEffect } from "react";
import baseUrl from "../base_url/baseUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const params = window.location.search;
const token = new URLSearchParams(params).get("token");
// console.log(token);

export default function EmailConfirmation() {
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await baseUrl.get(
                    `/auth/confirm-email/?token=${token}`
                );
                console.log(response);
                // if (response.data.data.success === true) {
                //     toast.success(response.data.data);
                //     navigate("/login");
                // } else {
                //     toast.error(response.data.data);
                //     // navigate("/");
                // } // toast.success()
            } catch (error) {}
        };
        validateToken();
    }, []);

    return <h1>Email address confirmation screen</h1>;
}
