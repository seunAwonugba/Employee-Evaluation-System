const express = require("express");
const usersRouter = express.Router();
const { getUsers, getMembersByBranch } = require("../controller/users");

usersRouter.get("/users", getUsers);
usersRouter.get("/members/branch", getMembersByBranch);

module.exports = { usersRouter };
