import express from "express";
import dotenv from "dotenv";
import connect from "./config/database.js";

import productRoutes from "./Routes/productRoutes.js";

// Initialize app
const app = express();

// Load environment variables
dotenv.config();

// Connect to database
connect();

// Middleware
app.use(express.json());

// app.use("/api/products", productRoutes);
app.use("/api/product", productRoutes);


// Error handling middleware
// app.use(errorHandler);

export default app;