const Product = require('../models/CategorizedProduct'); 

// Helper function to get the cart from session
const getCart = (req) => {
  return req.session.cart || [];
};


// Add an item to the cart
exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  let cart = getCart(req);

  // Check if product is already in the cart
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

// Remove an item from the cart
exports.removeFromCart = (req, res) => {
  const { productId } = req.body;
  let cart = getCart(req);

  cart = cart.filter(item => item.productId !== productId);

  req.session.cart = cart;
  res.redirect('/cart');
};

// Clear all cart items
exports.clearCart = (req, res) => {
  try {
    req.session.cart = [];
    res.redirect('/cart');
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).render('error', { message: 'Failed to clear cart' });
  }
};

// Increase product quantity
exports.increaseQuantity = (req, res) => {
  const { productId } = req.body;
  let cart = getCart(req);

  const productIndex = cart.findIndex(item => item.productId === productId);

  if (productIndex !== -1) {
    cart[productIndex].quantity += 1;
  }

  req.session.cart = cart;
  res.redirect('/cart');
};

// Decrease product quantity
exports.decreaseQuantity = (req, res) => {
  const { productId } = req.body;
  let cart = getCart(req);

  const productIndex = cart.findIndex(item => item.productId === productId);

  if (productIndex !== -1) {
    if (cart[productIndex].quantity > 1) {
      cart[productIndex].quantity -= 1;
    } else {
      cart = cart.filter(item => item.productId !== productId);
    }
  }

  req.session.cart = cart;
  res.redirect('/cart');
};

// Checkout process
exports.checkout = (req, res) => {
  const cart = getCart(req);

  if (cart.length === 0) {
    return res.redirect('/cart');
  }
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  req.session.cart = []; 
  res.render('checkout', { message: `Thank you for your purchase! Total: $${totalPrice}` });
};

// Get Cart Count for display
exports.getCartCount = (req, res) => {
  try {
    const cart = getCart(req);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    res.status(200).json({ success: true, cartCount });
  } catch (error) {
    console.error('Error fetching cart count:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch cart count' });
  }
};

//view cart
exports.viewCart = (req, res) => {
  const cart = getCart(req);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const query = req.query.query || ''; 
  res.render('cart', { cart, totalPrice, query });
};
