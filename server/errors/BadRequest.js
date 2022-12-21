const { StatusCodes } = require("http-status-codes");
const { CustomErrorHandler } = require("./CustomErrorHandler");

class BadRequest extends CustomErrorHandler {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = {BadRequest}
