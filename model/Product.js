import mongoose from "mongoose";
 const schema = mongoose.schema;
 const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }
  );
  
  // Create the Product model
  const Product = mongoose.model('Product', productSchema);
  
  export default Product;

      