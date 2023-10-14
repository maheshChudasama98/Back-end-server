require('dotenv').config();
const nodemailer = require("nodemailer");

const emailSendHelper = async (emailMessage) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    // const emailMessage = {
    //     from: from,
    //     to: to,
    //     subject: subject,
    //     text: message,
    //     text: message,
    // };
    // if (cc) {
    //     emailMessage.cc = cc;
    // }
    // console.log(emailMessage);
    var mailOptions = emailMessage;
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(`\x1b[91mAt email send error :- ${error} \x1b[91m`);
            return error
        } else {
            return info.response
        }
    });
}

const EmailOTP = async (details) => {
    
    const emailMessage = {
        // from: 'user.my005@gmail.com',
        from: `${details.from}`,
        // to: `mahesh.chudasma@fotoouro.com`,
        to: `${details.to}`,
        subject: `forgot Password `,
        // cc: `parmar.nitin@fotoouro.com`,
        // cc: `${useRecode.email}`,
        html: `
        <html>
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${process.env.PROJECT_NAME}</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing ${process.env.PROJECT_NAME}. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${details.Otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />${process.env.PROJECT_NAME}</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>${process.env.PROJECT_NAME}</p>
            <p>${process.env.PROJECT_OTHER}</p>
            <p>${process.env.PROJECT_ADDRESS}</p>
          </div>
        </div>
      </div>
      <html>`
    };

    emailSendHelper(emailMessage)
}

module.exports = {
    emailSendHelper,
    EmailOTP
}