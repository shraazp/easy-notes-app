var nodemailer = require('nodemailer');
require("dotenv").config();
exports.sendmail=()=>{
 transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.My_Email,
    pass: process.env.My_Password
  }
});

var mailOptions = {
  from: 'shraazp99@gmail.com',
  to: 'shravyamaradithaya@gmail.com',
  subject: 'login email',
  text: 'Welcome to note easy app!! Here you can create different notes'
};
    transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})}