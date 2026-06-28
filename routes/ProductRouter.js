const express = require("express");
const ensureAuthenticated = require("../middlewares/Auth");

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    { id: 1, name: "Minneola Tangelo", price: 599, category: "Fruits", stock: 45, image: "tangelo.jpg" },
    { id: 2, name: "Mandarin Orange", price: 350, category: "Fruits", stock: 60, image: "mandarin.jpg" },
    { id: 3, name: "Trovita Orange", price: 809, category: "Fruits", stock: 25, image: "trovita.jpg" },
    { id: 4, name: "Hamlin Orange", price: 790, category: "Fruits", stock: 30, image: "hamlin.jpg" },
    
    { id: 5, name: "Fresh Potatoes", price: 90, category: "Vegetables", stock: 200, image: "potato.jpg" },
    { id: 6, name: "Premium Onions", price: 140, category: "Vegetables", stock: 150, image: "onion.jpg" },
    { id: 7, name: "Red Tomatoes", price: 120, category: "Vegetables", stock: 80, image: "tomato.jpg" },
    
    { id: 8, name: "Premium Milk", price: 270, category: "Dairy", stock: 90, image: "milk.jpg" },
    { id: 9, name: "Fresh Eggs", price: 320, category: "Dairy", stock: 50, image: "eggs.jpg" },
    
    { id: 10, name: "Plain Bread", price: 190, category: "Bakery", stock: 30, image: "bread.jpg" }
  ]);
});

module.exports = router;
