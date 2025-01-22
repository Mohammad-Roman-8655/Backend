const express = require('express');
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductsByPrice,
  getProductsByRating
} = require('../controllers/productC');
const authMiddleware = require('../middleware/authMiddle');

const router = express.Router();

router.post('/', authMiddleware, addProduct);

router.get('/', getProducts);

router.put('/:id', authMiddleware, updateProduct);

router.delete('/:id', authMiddleware, deleteProduct);
router.get('/featured', getFeaturedProducts);

router.get('/price', getProductsByPrice);
router.get('/rating', getProductsByRating);

module.exports = router;


