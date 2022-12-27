const express = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { connectDatabase } = require("./db/connect");
const { initScheduledJobs, fetchManagers } = require("./cronJob");
const { usersRouter } = require("./router/users");
require("dotenv").config();
require("express-async-errors");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { formLinkRouter } = require("./router/formLink");
const { formRouter } = require("./router/form");

const app = express();
const host = "localhost";
const port = process.env.PORT || 8080;

app.use(express.json());

// console.log(process.env.CONNECTION_STRING);

// initScheduledJobs();

app.use("/api/v1/", usersRouter);
app.use("/api/v1/", formLinkRouter);
app.use("/api/v1/", formRouter);

app.all("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: ReasonPhrases.NOT_FOUND,
    });
});

app.use(errorMiddleware);

const startServer = async () => {
    try {
        await connectDatabase(process.env.CONNECTION_STRING);
        // fetchManagers()
        app.listen(port, host, () => {
            console.log(`Server is listening on http://${host}:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
