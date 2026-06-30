// const Variety = require("../models/Variety");

// exports.createVariety = async (req, res) => {
//   try {
//     const { name, description, images } = req.body;

//     const imagesArray = Array.isArray(images)
//       ? images
//       : images
//           .split(",")
//           .map((i) => i.trim())
//           .filter((i) => i.length > 0);

//     const variety = await Variety.create({
//       name,
//       description,
//       images: imagesArray,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Variety created successfully",
//       data: variety,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateVariety = async (req, res) => {
//   try {
//     let { name, description, images } = req.body;

//     const imagesArray = Array.isArray(images)
//       ? images
//       : images.split(",").map((i) => i.trim());

//     const updatedVariety = await Variety.findByIdAndUpdate(
//       req.params.id,
//       { name, description, images: imagesArray },
//       { new: true }
//     );

//     if (!updatedVariety)
//       return res.status(404).json({ error: "Variety not found" });

//     res.status(200).json({
//       success: true,
//       message: "Variety updated successfully",
//       data: updatedVariety,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getVarieties = async (req, res) => {
//   try {
//     const varieties = await Variety.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: varieties,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getVariety = async (req, res) => {
//   try {
//     const variety = await Variety.findById(req.params.id);

//     if (!variety) return res.status(404).json({ error: "Variety not found" });

//     res.status(200).json({
//       success: true,
//       data: variety,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteVariety = async (req, res) => {
//   try {
//     const deleted = await Variety.findByIdAndDelete(req.params.id);

//     if (!deleted) return res.status(404).json({ error: "Variety not found" });

//     res.status(200).json({
//       success: true,
//       message: "Variety deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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
    console.error("createVariety: Error creating variety:", error); // Added logging
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
    console.error("updateVariety: Error updating variety:", error); // Added logging
    res.status(500).json({ error: error.message });
  }
};

// ====================================================================================
// UPDATED `getVarieties` FUNCTION
// - Added detailed logging.
// - Added optional pagination to handle large datasets more efficiently.
// - Added countDocuments for total variety count.
// ====================================================================================
exports.getVarieties = async (req, res) => {
  try {
    console.log("getVarieties: Starting fetch operation...");
    const startTime = Date.now();

    // Optional: Implement pagination. If no page/limit provided, it will fetch all.
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 0; // Default 0 means no limit (fetch all)
    const skip = limit > 0 ? (page - 1) * limit : 0; // Only skip if limit is active

    let query = Variety.find();

    if (limit > 0) {
      query = query.skip(skip).limit(limit);
    }

    const varieties = await query.sort({ createdAt: -1 });

    const totalVarieties = await Variety.countDocuments(); // Get total count for pagination info

    console.log(
      `getVarieties: DB query completed in ${
        Date.now() - startTime
      }ms. Fetched ${varieties.length} varieties out of ${totalVarieties}.`
    );

    res.status(200).json({
      success: true,
      data: varieties,
      page: limit > 0 ? page : undefined, // Only send page info if pagination is active
      limit: limit > 0 ? limit : undefined,
      totalVarieties,
      totalPages: limit > 0 ? Math.ceil(totalVarieties / limit) : 1, // Calculate total pages if pagination is active
    });
  } catch (error) {
    console.error("getVarieties: Error during fetch:", error); // CRITICAL: Log the actual error
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
    console.error("getVariety: Error fetching single variety:", error); // Added logging
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
    console.error("deleteVariety: Error deleting variety:", error); // Added logging
    res.status(500).json({ error: error.message });
  }
};
