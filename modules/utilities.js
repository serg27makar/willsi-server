const nodemailer = require ('nodemailer');

const adminEmail = "good84serg@gmail.com";
const password = "ant1B10t1k1";

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
        to: adminEmail,
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
