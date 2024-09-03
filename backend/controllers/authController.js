const db = require('../models');
const passport = require('../config');
const nodemailer = require('../services/nodemailer');
const { generateHash } = require('random-hash');

module.exports = {

  authenticate: async() => {
    console.log('I am hit!');
    res.json('I am hit!');
  },

  signUp: async (req, res, next) => {
    try {
      const { email, firstName, lastName, password } = req.body;
      const newUser = new db.User({ email, firstName, lastName });
  
      await newUser.setPassword(password);
      await newUser.save();
  
      const signUpEmailContent = getEmailContent('signUp', newUser.email, newUser.firstName, newUser.lastName);
      await nodemailer(signUpEmailContent);
  
      passport.authenticate('local')(req, res, next);
    } catch (err) {
      res.status(422).json({ error: err.message });
    }
  },
  
  login: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await db.User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  logout: (req, res, next) => {
    req.logOut();
    req.session.destroy(err => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      return res.json({ authenticated: req.isAuthenticated() });
    });
  },

  resetPW: async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email);
  
      const randomHash = generateHash.generateHash({
        length: 64,
        charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'
      });
  
      const updatedUser = await db.User.findOneAndUpdate(
        { email },
        { $set: { resetPW_hash: randomHash } },
        { new: true } // Returns the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const resetEmailContent = getEmailContent('resetPassword', user.email, user.firstName, user.lastName, randomHash);
      await nodemailer(resetEmailContent);
  
      res.json({ email: updatedUser.email });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updatepw: async (req, res) => {
    if (req.body.code) {
      try {
        const { code, password } = req.body;
  
        const user = await db.User.findOne({ resetPW_hash: code });
  
        if (!user) {
          return res.status(404).json({ error: "Invalid or expired reset code" });
        }
  
        // Reset the password and clear the reset hash
        await user.setPassword(password);
        user.resetPW_hash = null;
        await user.save();
  
        const updateEmailContent = getEmailContent('updatePassword', user.email, user.firstName, user.lastName);
        await nodemailer(updateEmailContent);
  
        res.json({ status: "Password updated successfully" });
  
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    } else {
      res.status(400).json({ error: "Reset code is required" });
    }
  },


};

// Note, we need to change this base url later, when the application is finallyupdated to be deployed to elsewhere.
function getEmailContent(type, email, firstName, lastName, hash = '') {
  const baseUrl = 'https://careerdeer.herokuapp.com';
  let subject, text, html, actionUrl;

  switch (type) {
    case 'signUp':
      subject = 'Welcome to Career Deer!';
      text = `Hello ${firstName}, welcome to Career Deer! Your account has been successfully created.`;
      html = `
        <div style="text-align: center; font-family: Open Sans, Helvetica;">
          <div style="width: 600px; margin-left: auto; margin-right: auto;">
            <img src="https://i.imgur.com/DxHFy4x.png" width="60%" alt="Career Deer Logo">
            <h2>Welcome Aboard!</h2>
            <div style="text-align: left;">
              <p>Hello ${firstName},</p>
              <p>Welcome to Career Deer! Your account has been successfully created.</p>
              <p>We're excited to have you join us.</p>
            </div>
          </div>
        </div>`;
      break;

    case 'resetPassword':
      subject = 'Password Reset Request for Career Deer';
      actionUrl = `${baseUrl}/updatepw?code=${hash}`;
      text = `Hello ${firstName}, a password reset has been requested for your Career Deer account. To reset the password, click the url below or copy and paste it into your browser's address bar. ${actionUrl}`;
      html = `
        <div style="text-align: center; font-family:Open Sans,Helvetica;">
          <div style="width: 600px; margin-left: auto; margin-right: auto;">
            <img src="https://i.imgur.com/DxHFy4x.png" width="60%" alt="Career Deer Logo">
            <h2>Password Reset Requested.</h2>
            <div style="text-align: left;">
              <p>Hello ${firstName},</p>
              <p>A password reset has been requested for your Career Deer account.</p>
              <p>To reset your password, click the url below or copy and paste it into your browser's address bar.</p>
              <a href="${actionUrl}">${actionUrl}</a>
            </div>
          </div>
        </div>`;
      break;

    case 'updatePassword':
      subject = 'Password Change Confirmation for Career Deer';
      actionUrl = `${baseUrl}/forgotpw`;
      text = `Hello ${firstName}, your Career Deer account password has been changed successfully. If this was not done by you, please reset your password immediately by visiting ${actionUrl}.`;
      html = `
        <div style="text-align: center; font-family:Open Sans,Helvetica;">
          <div style="width: 600px; margin-left: auto; margin-right: auto;">
            <img src="https://i.imgur.com/DxHFy4x.png" width="60%" alt="Career Deer Logo">
            <h2>Password Changed.</h2>
            <div style="text-align: left;">
              <p>Hello ${firstName},</p>
              <p>Your Career Deer account password has been changed successfully.</p>
              <p>If this was not done by you, please reset your password immediately by visiting the link below.</p>
              <a href="${actionUrl}">${actionUrl}</a>
              <p>Sincerely,</p>
              <p>Your Friends at Career Deer</p>
            </div>
          </div>
        </div>`;
      break;
  }

  return {
    emailTo: email,
    firstName: firstName,
    lastName: lastName,
    emailSubject: subject,
    emailText: text,
    emailHtml: html
  };
}


// function getSignUpText(email, firstName, lastName) {
//   const emailObj = {
//     emailTo: email,
//     firstName: firstName,
//     lastName: lastName
//   }

//   emailObj.emailSubject = `Welcome to Career Deer!`;

//   emailObj.emailText = `Hi ${firstName}, thanks for joining us in your adventure to track down a new job. Let us help you keep track of your job applications and provide analytics to help you find and improve areas of concern.`;

//   emailObj.emailHtml = `
//     <div style="text-align: center; font-family:Open Sans,Helvetica;">
//       <div style="width: 600px; margin-left: auto; margin-right: auto;">
//         <img src="https://i.imgur.com/DxHFy4x.png" width="60%" alt="Career Deer Logo">
//         <h2>Welcome to Career Deer!</h2>
//         <div style="text-align: left;">
//           <p>Hello ${firstName}</p>
//           <p>Thanks for joining us in your adventure to track down a new job.</p>
//           <p>Let us help you keep track of your job applications and provide analytics to help you find and improve areas of concern.</p>
//         </div>
//       </div>
//     </div>`;

//   return emailObj;

// }

// function getResetPWText(email, firstName, lastName, randomHash) {
//   const emailObj = {
//     emailTo: email,
//     firstName: firstName,
//     lastName: lastName
//   }

//   emailObj.emailSubject = `Password Reset Request for Career Deer`;

//   emailObj.emailText = `Hello ${firstName}, a password reset has been requested for your Career Deer account. To reset the password for your account, click the url below. Or you may copy and paste into your browser's address bar. https://careerdeer.herokuapp.com/updatepw?code=${randomHash}`;

//   emailObj.emailHtml = `
//     <div style="text-align: center; font-family:Open Sans,Helvetica;">
//       <div style="width: 600px; margin-left: auto; margin-right: auto;">
//         <img src="https://i.imgur.com/DxHFy4x.png" width="60%" alt="Career Deer Logo">
//         <h2>Password Reset Requested.</h2>
//         <div style="text-align: left;">
//           <p>Hello ${firstName},</p>
//           <p>A password reset has been requested for your Career Deer account.</p>
//           <p>To reset the password for your account, click the url below. Or you may copy and paste into your browser's address bar.</p>
//           <a href="https://careerdeer.herokuapp.com/updatepw?code=${randomHash}">https://careerdeer.herokuapp.com/updatepw?code=${randomHash}</a>
//         </div>
//       </div>
//     </div>`;

//   return emailObj;
// }



