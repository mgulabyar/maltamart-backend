const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const ProductRouter = require("./routes/ProductRouter");
const VarietyRouter = require("./routes/varietyRoutes");
const AuthRouter = require("./routes/AuthRouter");
const FavouriteRouter = require("./routes/favouriteRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/varieties", VarietyRouter);
app.use("/favourites", require("./routes/favouriteRoutes"));

app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
