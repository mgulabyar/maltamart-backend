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
    console.error("createVariety: Error creating variety:", error); 
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
    console.error("updateVariety: Error updating variety:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getVarieties = async (req, res) => {
  try {
    console.log("getVarieties: Starting fetch operation...");
    const startTime = Date.now();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0;
    const skip = limit > 0 ? (page - 1) * limit : 0;

    let query = Variety.find();

    if (limit > 0) {
      query = query.skip(skip).limit(limit);
    }

    const varieties = await query.sort({ createdAt: -1 });

    const totalVarieties = await Variety.countDocuments();

    console.log(
      `getVarieties: DB query completed in ${
        Date.now() - startTime
      }ms. Fetched ${varieties.length} varieties out of ${totalVarieties}.`
    );

    res.status(200).json({
      success: true,
      data: varieties,
      page: limit > 0 ? page : undefined,
      limit: limit > 0 ? limit : undefined,
      totalVarieties,
      totalPages: limit > 0 ? Math.ceil(totalVarieties / limit) : 1,
    });
  } catch (error) {
    console.error("getVarieties: Error during fetch:", error); 
    res.status(500).json({ error: error.message });
  }
};

exports.getVariety = async (req, res) => {
  try {
    console.log(`getVariety: Fetching variety with ID: ${req.params.id}`); 
    const startTime = Date.now();
    const variety = await Variety.findById(req.params.id);

    if (!variety) {
      console.warn(`getVariety: Variety not found for ID: ${req.params.id}`); 
      return res.status(404).json({ error: "Variety not found" });
    }

    console.log(`getVariety: Variety fetched in ${Date.now() - startTime}ms.`); 
    res.status(200).json({
      success: true,
      data: variety,
    });
  } catch (error) {
    console.error("getVariety: Error fetching single variety:", error); 
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVariety = async (req, res) => {
  try {
    const deleted = await Variety.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ error: "Variety not found" });

    res.status(200).json({
      success: true,
      message: "Variety deleted successfully",
    });
  } catch (error) {
    console.error("deleteVariety: Error deleting variety:", error); 
    res.status(500).json({ error: error.message });
  }
};
