const express = require("express");
const app = express();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const host = "localhost";
const port = process.env.PORT || 8080;

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

app.listen(port, host, () => {
    console.log(`Server is listening on http://${host}:${port}`);
});
