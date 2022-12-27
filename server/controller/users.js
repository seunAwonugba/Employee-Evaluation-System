const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { UserModel } = require("../db/model/user");
const { NotFound } = require("../errors");
const mongoose = require("mongoose");

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

const getManager = async (req, res, next) => {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
        const manager = await UserModel.findById(id);

        if (manager) {
            res.status(StatusCodes.OK).json({
                success: true,
                data: manager,
            });
        } else {
            return next(new NotFound(ReasonPhrases.NOT_FOUND));
        }
    } else {
        return next(new NotFound(ReasonPhrases.NOT_FOUND));
    }
};

module.exports = { getUsers, getMembersByBranch, getManager };
