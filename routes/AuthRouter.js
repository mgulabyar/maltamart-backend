const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/Auth");
// const isAdmin = require("../middlewares/isAdmin");
const UserModel = require("../models/User");
const { signup, login } = require("../controllers/AuthController"); 
const { signupValidation, loginValidation } = require("../middlewares/AuthValidation"); 

router.post("/signup", signupValidation, signup);

router.post("/login", loginValidation, login);

router.delete("/logout", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id; 

    await UserModel.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted & logged out!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;
