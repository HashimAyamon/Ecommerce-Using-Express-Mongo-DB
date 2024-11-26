const express = require('express');
const router = express.Router();
const Product = require('../models/CategorizedProduct');  


router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); 
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('product-detail', { product }); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
