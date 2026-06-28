const express = require("express");

const {
  createVariety,
  getVarieties,
  getVariety,
  updateVariety,
  deleteVariety
} = require("../controllers/varietyController");

const router = express.Router();


router.post("/create", createVariety);
router.get("/", getVarieties);
router.get("/:id", getVariety);
router.put("/:id", updateVariety);
router.delete("/:id", deleteVariety);

module.exports = router;
