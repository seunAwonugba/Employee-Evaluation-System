const CronJob = require("node-cron");
const { UserModel } = require("./db/model/user");
const { sendEmails } = require("./utils/send_mail");

// const fetchManagers = async () => {
//     try {
//         const managers = await UserModel.find({ role: "manager" });
//         console.log(managers);
//     } catch (error) {
//         console.log(error);
//     }
// };

const initScheduledJobs = () => {
    const scheduledJobFunction = CronJob.schedule("*/1 * * * *", async () => {
        const managers = await UserModel.find({ role: "manager" });
        for (let i in managers) {
            sendEmails(
                managers[i].email,
                `${managers[i].firstName}, Monthly Staff Evaluation For Your Staffs`,
                html `<a href ="http://localhost:3000/" ></a>`
            );
            console.log(`Email Sent to : ${managers[i].email}`);
        }

        // managers.map(async (manager) => {
        //     members = await UserModel.find({ role: "member", managerId: manager._id })
        //     const memberEmails = members.map((member) => member.email).join()
        //     sendEmails(manager.email, "Monthly Staff Survey",  `Please Complete Survey for these staff (${memberEmails})`)
        // });
        // console.log("cron done");
    });

    scheduledJobFunction.start();
};

module.exports = { initScheduledJobs };
