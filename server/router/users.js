const express = require("express");
const router = express.Router();
const { getUsers } = require("../controller/users");

router.get("/users", getUsers);

module.exports = { router };
