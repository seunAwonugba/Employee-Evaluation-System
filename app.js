const express = require("express");
const app = express();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const host = "localhost";
const port = process.env.PORT || 8080;
const { connectDatabase } = require("./db/connect");
require("dotenv").config();
require("express-async-errors");

app.use(express.json());

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: "Home Page",
    });
});

app.all("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: ReasonPhrases.NOT_FOUND,
    });
});

const startServer = async (connectionString) => {
    try {
        await connectDatabase(connectionString);
        app.listen(port, host, () => {
            console.log(`Server is listening on http://${host}:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer(process.env.CONNECTION_STRING);
