const express = require("express");
const usersRouter = express.Router();
const {
    getUsers,
    getMembersByBranch,
    getManager,
} = require("../controller/users");

usersRouter.get("/users", getUsers);
usersRouter.get("/members/branch", getMembersByBranch);
usersRouter.get("/manager/:id", getManager);

module.exports = { usersRouter };
