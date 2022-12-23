const express = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { connectDatabase } = require("./db/connect");
const { initScheduledJobs, fetchManagers } = require("./cron_job");
const { usersRouter } = require("./router/users");
require("dotenv").config();
require("express-async-errors");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { formLinkRouter } = require("./router/formLink");

const app = express();
const host = "localhost";
const port = process.env.PORT || 8080;

app.use(express.json());

// initScheduledJobs();

// app.get("/api/v1/", (req, res) => {
//     res.status(StatusCodes.OK).json({
//         success: true,
//         data: "Home Page",
//     });
// });
app.use("/api/v1/", usersRouter);
app.use("/api/v1/", formLinkRouter);

app.all("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: ReasonPhrases.NOT_FOUND,
    });
});

app.use(errorMiddleware);

const startServer = async (connectionString) => {
    try {
        await connectDatabase(connectionString);
        // fetchManagers()
        app.listen(port, host, () => {
            console.log(`Server is listening on http://${host}:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer(process.env.CONNECTION_STRING);
