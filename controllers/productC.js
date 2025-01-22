const Product = require('../models/productM');


const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

         await product.save();

    res.status(201).json({ success: true, data: product });

  } catch (error) {

    res.status(400).json({ success: false, error: error.message });
  }
};


const getProducts = async (req, res) => {
  try {

    const products = await Product.find();
    res.status(200).json({ success: true, data: products });

  } catch (error) {

    res.status(400).json({ success: false, error: error.message });
  }
};


const updateProduct = async (req, res) => {

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


const getProductsByPrice = async (req, res) => {
  try {
    const { price } = req.query;
    const products = await Product.find({ price: { $lt: price } });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getProductsByRating = async (req, res) => {
  try {
    const { rating } = req.query;
    const products = await Product.find({ rating: { $gt: rating } });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductsByPrice,
  getProductsByRating
};
