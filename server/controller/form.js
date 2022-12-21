const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const createManagerResponse = async (req, res, next) => {
    const {
        firstName,
        lastName,
        region,
        member,
        workQuality,
        task_completion,
        over_and_abroad,
    } = req.body;
};
