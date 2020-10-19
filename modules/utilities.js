const nodemailer = require ('nodemailer');

const adminEmail = "startwillsi@gmail.com";
const willsiEmail = "info@willsi.top";
const password = "123Willsi!";

const transporter = nodemailer.createTransport ({
    service: 'gmail',
    auth: {
        user: adminEmail,
        pass: password,
    }
});


module.exports.sendEmailToWillsi = function (data) {
    const {UserName, UserPhone} = data;
    const mailOptions = {
        from: `Willsi <${adminEmail}>`,
        to: willsiEmail,
        subject: 'Application for cooperation',
        html: `<p> Имя клиента ${UserName}, телефон клиента ${UserPhone}</p>`,
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.error("Mail not sent", err);
            throw new Error("Mail not sent");
        }
    });
};
