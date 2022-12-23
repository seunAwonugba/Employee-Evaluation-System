const { StatusCodes } = require("http-status-codes");

const formLink = async (req, res, next) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: "form link end point",
    });
};

module.exports = { formLink };
