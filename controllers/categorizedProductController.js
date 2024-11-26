const Product = require('../models/Product');


exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  let cart = getCart(req);

  // Check if the product is already in the cart
  const productIndex = cart.findIndex(item => item.productId === productId);

  if (productIndex === -1) {
    try {
      const product = await Product.findById(productId);

      if (product) {
        cart.push({
          productId,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        });
      } else {
        return res.status(404).send('Product not found');
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
  } else {
    cart[productIndex].quantity += 1;
  }

  req.session.cart = cart; 
  res.redirect('/cart'); 
};
