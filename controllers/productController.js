
import asyncHandler from "express-async-handler";
import Product from '../model/Product.js';
import mongoose from "mongoose";

// Create a new product
export const createProduct = asyncHandler(async (req, res) => {
  const { name } = req.body;

   // Check if 'name' is provided and is a non-empty string
   if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
        msg: "Invalid 'name' field. It must be a non-empty string."
    });
}

// Check if 'name' contains only numeric characters
if (/^\d+$/.test(name)) {
    return res.status(400).json({
        msg: "Invalid 'name' field. It cannot consist only of numeric characters."
    });
}


  // Create a new product using the provided data
  const product = await Product.create({
    name // Use the provided name
 });

  return res.status(201).json({
    msg: "Product created successfully",
    data: product
  });
});

// Get all products
export const getProducts = asyncHandler(async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a product by ID
export const getProductById = asyncHandler(async (req, res)  =>  {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update a product by ID
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, brand, category, sizes, color, images, totalQuantity, totalSold } = req.body;

  try {
    // Find the product by ID and update its fields
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name, // Update the name field
      price,
      description,
      brand,
      category,
      sizes,
      color,
      images,
      totalQuantity,
      totalSold
    }, { new: true });

    if (updatedProduct) {
      return res.json({
        msg: "Product updated successfully",
        data: updatedProduct
      });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Delete a product by ID
export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (product) {
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});
