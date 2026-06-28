const Variety = require("../models/Variety");

exports.createVariety = async (req, res) => {
  try {
    const { name, description, images } = req.body;

    const imagesArray = Array.isArray(images)
      ? images
      : images
          .split(",")
          .map((i) => i.trim())
          .filter((i) => i.length > 0);

    const variety = await Variety.create({
      name,
      description,
      images: imagesArray,
    });

    res.status(201).json({
      success: true,
      message: "Variety created successfully",
      data: variety,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateVariety = async (req, res) => {
  try {
    let { name, description, images } = req.body;

    const imagesArray = Array.isArray(images)
      ? images
      : images.split(",").map((i) => i.trim());

    const updatedVariety = await Variety.findByIdAndUpdate(
      req.params.id,
      { name, description, images: imagesArray },
      { new: true }
    );

    if (!updatedVariety)
      return res.status(404).json({ error: "Variety not found" });

    res.status(200).json({
      success: true,
      message: "Variety updated successfully",
      data: updatedVariety,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getVarieties = async (req, res) => {
  try {
    const varieties = await Variety.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: varieties,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVariety = async (req, res) => {
  try {
    const variety = await Variety.findById(req.params.id);

    if (!variety) return res.status(404).json({ error: "Variety not found" });

    res.status(200).json({
      success: true,
      data: variety,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVariety = async (req, res) => {
  try {
    const deleted = await Variety.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Variety not found" });

    res.status(200).json({
      success: true,
      message: "Variety deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
