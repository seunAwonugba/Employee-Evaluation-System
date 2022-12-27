const express = require("express");
const { createManagerResponse } = require("../controller/form");
const formRouter = express.Router();

formRouter.post("/manager/response", createManagerResponse);

module.exports = { formRouter };
