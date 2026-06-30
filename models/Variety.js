// const mongoose = require("mongoose");

// const VarietySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     description: { type: String, required: true },
//     images: { type: [String], default: [] }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Variety", VarietySchema);

const mongoose = require("mongoose");

const VarietySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

// ====================================================================================
// NEW: Add index to the 'createdAt' field for faster sorting.
// ====================================================================================
VarietySchema.index({ createdAt: -1 }); // -1 for descending order as used in `getVarieties`

module.exports = mongoose.model("Variety", VarietySchema);