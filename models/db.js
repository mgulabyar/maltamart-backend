const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected successfully!.");
  })
  .catch((err) => {
    console.log("Connection Errors", err);
  });
