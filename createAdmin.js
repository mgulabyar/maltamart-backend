require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserModel = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB for admin creation");

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    let admin = await UserModel.findOne({ email });

    if (admin) {
      console.log("Admin already exists");
      if (admin.role !== "admin") {
        admin.role = "admin";
        await admin.save();
        console.log("Admin role updated to 'admin'");
      }
      await mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully!");
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error creating admin:", err);
    await mongoose.disconnect();
  }
};
createAdmin();
