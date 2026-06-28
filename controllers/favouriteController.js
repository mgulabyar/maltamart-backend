const Favourite = require("../models/Favourite");

exports.addFavourite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { varietyId } = req.body;

    const exists = await Favourite.findOne({
      user: userId,
      variety: varietyId,
    });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Already in favourites" });
    }

    const fav = await Favourite.create({ user: userId, variety: varietyId });
    res
      .status(201)
      .json({ success: true, message: "Added to favourites", data: fav });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.removeFavourite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { varietyId } = req.params;

    const deleted = await Favourite.findOneAndDelete({
      user: userId,
      variety: varietyId,
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Not in favourites" });
    }

    res.status(200).json({ success: true, message: "Removed from favourites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getFavourites = async (req, res) => {
  try {
    const userId = req.user._id;

    const favs = await Favourite.find({ user: userId }).populate("variety");
    const varieties = favs.map((f) => f.variety);

    res.status(200).json({ success: true, data: varieties });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
