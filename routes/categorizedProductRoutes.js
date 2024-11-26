const express = require("express");
const router = express.Router();
const Product = require("../models/CategorizedProduct");


router.get("/", (req, res) => {
  res.render("home");
});




router.get("/:category", async (req, res) => {
  const category = req.params.category;
  const products = await Product.find({ category });
 
  
  res.render("category", { products });
});

module.exports = router;
