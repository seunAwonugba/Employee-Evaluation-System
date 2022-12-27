const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { BadRequest } = require("../errors");

const createManagerResponse = async (req, res, next) => {
    console.log(req.body);
    const {
        managerName,
        managerId,
        branch,
        member,
        workQuality,
        workQualityReason,
        taskCompletion,
        taskCompletionReason,
        overAndAbroad,
        overAndAbroadReason,
        communication,
        communicationReason,
    } = req.body;

    // console.log(`
    //     Manager name ->${managerName}
    //     Manager id ->${managerId}
    //     Manager region ->${branch}
    //     Selected member ->${member}
    //     Work quality -> ${workQuality}
    //     Work quality reason -> ${workQualityReason}
    //     Task completion ->${taskCompletion}
    //     Task completion reason ->${taskCompletionReason}
    //     Over and abroad ->${overAndAbroad}
    //     Over and abroad reason ->${overAndAbroadReason}
    //     Communication ->${communication}
    //     Communication reason->${communicationReason}
    //     `);

    if (!branch) {
        return next(new BadRequest("Managers branch is required"));
    }

    if (!member) {
        return next(new BadRequest("Kindly select a member to evaluate"));
    }

    if (!workQuality) {
        return next(new BadRequest("Work quality rating is required"));
    }

    if (!workQualityReason) {
        return next(new BadRequest("Kindly provide work quality reasons"));
    }

    if (!taskCompletion) {
        return next(new BadRequest("Task completion rating is required"));
    }

    if (!taskCompletionReason) {
        return next(new BadRequest("Kindly provide task completion reasons"));
    }

    if (!overAndAbroad) {
        return next(new BadRequest("Over and abroad rating is required"));
    }

    if (!overAndAbroadReason) {
        return next(new BadRequest("Kindly provide over and abroad reasons"));
    }

    if (!communication) {
        return next(new BadRequest("communications rating is required"));
    }

    if (!communicationReason) {
        return next(new BadRequest("Kindly provide communication reasons"));
    }

    res.status(StatusCodes.CREATED).json({
        success: true,
        data: "evaluation recorded",
    });
};

module.exports = { createManagerResponse };
