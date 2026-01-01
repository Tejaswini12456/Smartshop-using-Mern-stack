import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  register, login, getMe, updateProfile, uploadAvatar
} from '../controllers/authController.js';
import {
  getProducts, getProduct, getTrendingProducts, getRecommendedProducts,
  createProduct, updateProduct, deleteProduct, createProductReview
} from '../controllers/productController.js';
import {
  createOrder, getOrder, getMyOrders, getAllOrders,
  updateOrder, cancelOrder, deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

// AUTH ROUTES
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', protect, getMe);
router.put('/auth/profile', protect, updateProfile);
router.put('/auth/avatar', protect, uploadAvatar);

// PRODUCT ROUTES
router.get('/products', getProducts);
router.get('/products/trending', getTrendingProducts);
router.get('/products/recommended', getRecommendedProducts);
router.get('/products/:id', getProduct);
router.post('/products', protect, admin, createProduct);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);
router.post('/products/:id/review', protect, createProductReview);

// ORDER ROUTES
router.post('/orders', protect, createOrder);
router.get('/orders/myorders', protect, getMyOrders);
router.get('/orders/:id', protect, getOrder);
router.get('/orders', protect, admin, getAllOrders);
router.put('/orders/:id', protect, admin, updateOrder);
router.put('/orders/:id/cancel', protect, cancelOrder);
router.delete('/orders/:id', protect, admin, deleteOrder);

// CART ROUTES
router.post('/cart/add', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const User = (await import('../models/User.js')).default;
    const user = await User.findById(req.user.id);
    const existingItem = user.cart.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }
    await user.save();
    await user.populate('cart.product');
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/cart', protect, async (req, res) => {
  try {
    const User = (await import('../models/User.js')).default;
    const user = await User.findById(req.user.id).populate('cart.product');
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/cart/:productId', protect, async (req, res) => {
  try {
    const { quantity } = req.body;
    const User = (await import('../models/User.js')).default;
    const user = await User.findById(req.user.id);
    const cartItem = user.cart.find(item => item.product.toString() === req.params.productId);
    if (cartItem) {
      if (quantity > 0) {
        cartItem.quantity = quantity;
      } else {
        user.cart = user.cart.filter(item => item.product.toString() !== req.params.productId);
      }
      await user.save();
      await user.populate('cart.product');
    }
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/cart/:productId', protect, async (req, res) => {
  try {
    const User = (await import('../models/User.js')).default;
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(item => item.product.toString() !== req.params.productId);
    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// WISHLIST ROUTES
router.post('/wishlist/:productId', protect, async (req, res) => {
  try {
    const User = (await import('../models/User.js')).default;
    const user = await User.findById(req.user.id);
    if (!user.wishlist.includes(req.params.productId)) {
      user.wishlist.push(req.params.productId);
      await user.save();
    }
    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/wishlist/:productId', protect, async (req, res) => {
  try {
    const User = (await import('../models/User.js')).default;
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
    await user.save();
    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/wishlist', protect, async (req, res) => {
  try {
    const User = (await import('../models/User.js')).default;
    const user = await User.findById(req.user.id).populate('wishlist');
    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;