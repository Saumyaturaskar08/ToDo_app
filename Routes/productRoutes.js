import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'; // Adjust the path accordingly

const router = express.Router();

// Create a new product
router.post('/create', createProduct);

// Get all products
router.get('/read', getProducts);

// Get a product by ID
router.get('/read/:id', getProductById);

// Update a product by ID
router.put('/update/:id', updateProduct);

// Delete a product by ID
router.delete('/delete/:id', deleteProduct);

export default router;
