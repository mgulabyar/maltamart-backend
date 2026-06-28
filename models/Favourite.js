const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    varietyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variety",
      required: true,
    },

    varietyName: { type: String, required: true },
    varietyDescription: { type: String, required: true },
    varietyImages: { type: [String], default: [] },
    varietyCreatedAt: { type: Date },
    varietyUpdatedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favourite", favouriteSchema);
