const { StatusCodes } = require("http-status-codes");
const { UserModel } = require("../db/model/user");

const getUsers = async (req, res) => {
    const getUsers = await UserModel.find();
    res.status(StatusCodes.OK).json({
        success: true,
        data: getUsers,
    });
};

module.exports = { getUsers };
