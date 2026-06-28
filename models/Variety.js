const mongoose = require("mongoose");

const VarietySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Variety", VarietySchema);
