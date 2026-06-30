const express = require("express");
const router = express.Router();
const Favourite = require("../models/Favourite");
const Variety = require("../models/Variety");
const ensureAuthenticated = require("../middlewares/Auth");

router.post("/add/:varietyId", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const varietyId = req.params.varietyId;

    const exists = await Favourite.findOne({ userId, varietyId });
    if (exists) {
      return res.status(400).json({ success: false, message: "Already added" });
    }

    const variety = await Variety.findById(varietyId);
    if (!variety) {
      return res
        .status(404)
        .json({ success: false, message: "Variety not found" });
    }

    const fav = await Favourite.create({
      userId,
      varietyId,
      varietyName: variety.name,
      varietyDescription: variety.description,
      varietyImages: variety.images,
      varietyCreatedAt: variety.createdAt,
      varietyUpdatedAt: variety.updatedAt,
    });

    res.json({ success: true, message: "Added to favourites", data: fav });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const favs = await Favourite.find({ userId: req.user._id });
    res.json({ success: true, data: favs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.delete("/remove/:favId", ensureAuthenticated, async (req, res) => {
  try {
    const favId = req.params.favId;
    const userId = req.user._id;

    const fav = await Favourite.findOneAndDelete({ _id: favId, userId });
    if (!fav) {
      return res.status(404).json({ success: false, message: "Favourite not found" });
    }

    res.json({ success: true, message: "Removed from favourites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.delete("/remove-by-variety/:varietyId", ensureAuthenticated, async (req, res) => {
  try {
    const varietyId = req.params.varietyId;
    const userId = req.user._id;

    const fav = await Favourite.findOneAndDelete({ varietyId, userId });
    if (!fav) {
      return res.status(404).json({ success: false, message: "Favourite not found" });
    }

    res.json({ success: true, message: "Removed from favourites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
