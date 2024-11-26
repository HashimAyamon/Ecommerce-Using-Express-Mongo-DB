const axios = require("axios");

exports.getShopPage = async (req, res) => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const products = response.data;
        res.render("shop", { products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error loading products");
    }
};
