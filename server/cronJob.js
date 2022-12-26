const CronJob = require("node-cron");
const { UserModel } = require("./db/model/user");
const { sendEmails } = require("./utils/sendMail");
require("dotenv").config();

const initScheduledJobs = () => {
    const scheduledJobFunction = CronJob.schedule("*/1 * * * *", async () => {
        const managers = await UserModel.find({ role: "manager" });
        for (let i in managers) {
            sendEmails(
                managers[i].email,
                `${managers[i].firstName}, Monthly Staff Evaluation For Your Staffs`,
                `<p>Hi ${managers[i].firstName}</p> 
                <p>Hope you had a great month!<p>
                <p>Kindly set aside some time to evaluate the staff members under you<p>
                <p>Please find link below<p>
                <a href="${process.env.CLIENT_URL}/managers-form/?userId=${managers[i].id}">Click Here</a>
                <p>Regards<p>`
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
