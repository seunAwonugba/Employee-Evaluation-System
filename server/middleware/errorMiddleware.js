const { StatusCodes } = require("http-status-codes");
const { CustomErrorHandler } = require("../errors");

const errorMiddleware = (err, req, res, next) => {
    if (err instanceof CustomErrorHandler) {
        console.log(`custom error middleware -> ${err}`);

        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }

    console.log(`server error middleware -> ${err}`);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: err.message,
    });
};

module.exports = { errorMiddleware };
