const { StatusCodes } = require("http-status-codes");
const { UserModel } = require("../db/model/user");

const getUsers = async (req, res) => {
    const users = await UserModel.find();

    res.status(StatusCodes.OK).json({
        success: true,
        data: users,
    });
};

const getMembersByBranch = async (req, res) => {
    const { branch } = req.query;

    const queryObject = {};

    if (branch) {
        queryObject.branch = branch;
    }

    const membersByBranch = await UserModel.find(queryObject);

    const filterMembers = membersByBranch.filter((members) => {
        return members.role == "member";
    });
    
    res.status(StatusCodes.OK).json({
        success: true,
        data: filterMembers,
    });
};

module.exports = { getUsers, getMembersByBranch };
