import React from "react";
import baseUrl from "./base-url/base-url";

export default function Home() {
    const hitAdonis = async () => {
        try {
            const response = await baseUrl.get("/users");
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    hitAdonis();
    return <div>Home Page</div>;
}
