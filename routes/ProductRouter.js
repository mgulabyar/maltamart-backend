// const express = require("express");
// const ensureAuthenticated = require("../middlewares/Auth");

// const router = express.Router();

// router.get("/", ensureAuthenticated, (req, res) => {
//   res.status(200).json([
//     {
//       name: "Minneola Tangelo",
//       price: 599,
//     },
//     {
//       name: "Mandarin Orange",
//       price: 350,
//     },
//     {
//       name: "Trovita Orang",
//       price: 809,
//     },
//     {
//       name: "Hamlin Orange",
//       price: 790,
//     },
//   ]);
// });
// module.exports = router;

const express = require("express");
const ensureAuthenticated = require("../middlewares/Auth");

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    { id: 1, name: "Minneola Tangelo Orange (1kg)", price: 599, category: "Fruits", stock: 45, image: "tangelo.jpg" },
    { id: 2, name: "Mandarin Orange (1kg)", price: 350, category: "Fruits", stock: 60, image: "mandarin.jpg" },
    { id: 3, name: "Trovita Orange (1kg)", price: 809, category: "Fruits", stock: 25, image: "trovita.jpg" },
    { id: 4, name: "Hamlin Orange (1kg)", price: 790, category: "Fruits", stock: 30, image: "hamlin.jpg" },
    { id: 5, name: "Imported Red Apples (1kg)", price: 480, category: "Fruits", stock: 50, image: "red-apple.jpg" },
    { id: 6, name: "Premium Bananas (1 Dozen)", price: 180, category: "Fruits", stock: 100, image: "banana.jpg" },
    { id: 7, name: "Fresh Strawberries (Box)", price: 299, category: "Fruits", stock: 15, image: "strawberry.jpg" },

    { id: 8, name: "Fresh Potatoes (1kg)", price: 90, category: "Vegetables", stock: 200, image: "potato.jpg" },
    { id: 9, name: "Onions Premium (1kg)", price: 140, category: "Vegetables", stock: 150, image: "onion.jpg" },
    { id: 10, name: "Red Tomatoes (1kg)", price: 120, category: "Vegetables", stock: 80, image: "tomato.jpg" },
    { id: 11, name: "Fresh Farm Spinach (Bunch)", price: 40, category: "Vegetables", stock: 40, image: "spinach.jpg" },
    { id: 12, name: "Green Chili Pepper (250g)", price: 60, category: "Vegetables", stock: 35, image: "green-chili.jpg" },

    { id: 13, name: "Premium Milk (1 Litre)", price: 270, category: "Dairy", stock: 90, image: "milk.jpg" },
    { id: 14, name: "Farm Fresh Eggs (1 Dozen)", price: 320, category: "Dairy", stock: 50, image: "eggs.jpg" },
    { id: 15, name: "Unsalted Butter (200g)", price: 450, category: "Dairy", stock: 20, image: "butter.jpg" },
    { id: 16, name: "Cheddar Cheese Block (200g)", price: 680, category: "Dairy", stock: 12, image: "cheese.jpg" },

    { id: 17, name: "Large Plain Bread", price: 190, category: "Bakery", stock: 30, image: "bread.jpg" },
    { id: 18, name: "Chocolate Chip Cookies (Pack)", price: 150, category: "Bakery", stock: 75, image: "cookies.jpg" },
    { id: 19, name: "Basmati Rice Premium (1kg)", price: 340, category: "Grocery", stock: 120, image: "rice.jpg" },
    { id: 20, name: "Cooking Oil Blend (1 Litre)", price: 520, category: "Grocery", stock: 85, image: "oil.jpg" }
  ]);
});

module.exports = router;
