const UserModel = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id); 
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = isAdmin;
