const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.viewCart);

router.post('/add', cartController.addToCart);

router.post('/remove', cartController.removeFromCart);


router.post('/clear', cartController.clearCart); 


router.post('/increase', cartController.increaseQuantity);


router.post('/decrease', cartController.decreaseQuantity);


router.get('/checkout', cartController.checkout);


router.get('/count', cartController.getCartCount);

module.exports = router;
