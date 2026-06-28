// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail", // ya koi aur SMTP service
//   auth: {
//     user: process.env.ADMIN_EMAIL,
//     pass: process.env.ADMIN_PASSWORD,
//   },
// });

// const sendMail = async (to, subject, text) => {
//   try {
//     await transporter.sendMail({
//       from: process.env.ADMIN_EMAIL,
//       to,
//       subject,
//       text,
//     });
//     console.log("Email sent to admin");
//   } catch (err) {
//     console.log("Email Error:", err);
//   }
// };

// module.exports = sendMail;
