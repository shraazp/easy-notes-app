var nodemailer = require("nodemailer");
class nodeMailer {
    mailer = (email, token) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.My_Email,
                pass: process.env.My_Password
            }
        });

        var mailOptions = {
            from: "shraazp99@gmail.com",
            to: email,
            subject: "Sending Email using Node.js",
            html: `http://localhost:3000/reset/${token}`,
            text: "password reset"
        };
        return transporter.sendMail(mailOptions).then((data) => {
            return "Email sent successfully!!";
        }).catch((err) => {
            return err;
        });
    };
}

module.exports = new nodeMailer();
