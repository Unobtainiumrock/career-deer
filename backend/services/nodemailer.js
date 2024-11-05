'use strict';
const nodemailer = require('nodemailer');

module.exports = async (emailData) => {
  const { emailTo, emailSubject, emailText, emailHtml } = emailData;

  // Create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Correct SMTP server for Gmail
    port: 465, // Use 465 for SSL, or 587 for TLS
    secure: true, // true for port 465, false for 587
    auth: {
      user: process.env.TRANSPORTER_USER,
      pass: process.env.TRANSPORTER_PASS
    },
    tls: {
      rejectUnauthorized: false // Allows connections without SSL certificate verification
    }
  });

  // Setup email data
  let mailOptions = {
    from: '"Career Deer 🦌" <no-reply@careerdeer.io>', // sender address
    to: emailTo, // recipient address
    bcc: 'careerdeer@gmail.com', // optional BCC for record-keeping
    subject: emailSubject, // Subject line
    text: emailText, // plain text body
    html: emailHtml // HTML body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    console.log("Attempting to send email...");
    if (error) {
      return console.log("Error occurred:", error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}
