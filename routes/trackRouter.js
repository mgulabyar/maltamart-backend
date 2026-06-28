// const express = require("express");
// const router = express.Router();
// const ensureAuthenticated = require("../middlewares/Auth");
// const sendMail = require("../utils/sendMail");

// router.post("/track/visit", ensureAuthenticated, async (req, res) => {
//   const { page } = req.body;
//   const user = req.user;
//   await sendMail(
//     process.env.ADMIN_EMAIL,
//     "User Page Visit",
//     `User visited a page:\nName: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nPage: ${page}\nTime: ${new Date()}`
//   );
//   res.json({ success: true });
// });
// module.exports = router;
