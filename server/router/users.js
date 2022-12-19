const express = require("express");
const router = express.Router();
const { getUsers, getMembersByBranch } = require("../controller/users");

router.get("/users", getUsers);
router.get("/members/branch", getMembersByBranch);

module.exports = { router };
