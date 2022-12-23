const express = require("express");
const { formLink } = require("../controller/formLink");
const formLinkRouter = express.Router();

formLinkRouter.get("/formLink", formLink);

module.exports = { formLinkRouter };
