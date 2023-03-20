import axios from "axios";

export default axios.create({
    baseURL: "http://127.0.0.1:3333/api/v1/" || "http://localhost:8080/api/v1",
});
