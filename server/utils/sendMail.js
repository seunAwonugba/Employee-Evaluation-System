const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "seunawonugba@gmail.com",
        pass: "jngpauweegirukrs",
    },
});

function sendEmails(to, subject, text) {
    const mailOptions = {
        from: "seunawonugba@gmail.com",
        to: to,
        subject: subject,
        html: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

module.exports = { sendEmails };
