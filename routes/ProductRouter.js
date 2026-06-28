const express = require("express");
const ensureAuthenticated = require("../middlewares/Auth");

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    {
      name: "Minneola Tangelo",
      price: 599,
    },
    {
      name: "Mandarin Orange",
      price: 350,
    },
    {
      name: "Trovita Orang",
      price: 809,
    },
    {
      name: "Hamlin Orange",
      price: 790,
    },
  ]);
});
module.exports = router;
