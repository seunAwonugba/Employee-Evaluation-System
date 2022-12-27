const { StatusCodes } = require("http-status-codes");
const { CustomErrorHandler } = require("./CustomErrorHandler");

class NotFound extends CustomErrorHandler {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = { NotFound };
