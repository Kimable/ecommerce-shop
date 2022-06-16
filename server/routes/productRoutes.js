import express from "express";
import product from "../controllers/product.controller.js";

const router = express.Router();

// Get All products
router.get("/", product.getProducts);

//Get Single Products
router.get("/:slug", product.getSingleProduct);

// Add a Product
router.post("/add-product", product.addProduct);

// Edit a Product
router.put("/edit/:slug", product.editProduct);

// Delete a Product
router.delete("/delete/:slug", product.deleteProduct);

export default router;
