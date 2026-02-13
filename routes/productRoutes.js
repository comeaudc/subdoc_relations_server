import express from "express";
import Product from "../models/productSchema.js";
import { products } from "../utilities/data.js";

const router = express.Router();

router.post("/seed", async (req, res) => {
  try {
    await Product.deleteMany({});
    await Product.create(products);

    res.send("Seed Successful");
  } catch (error) {
    console.error(error.message);
    res.json({ error: `❌ Error: ${error.message}` });
  }
});

router.get("/", async (req, res) => {
  let allProducts = await Product.find({});

  res.json(allProducts);
});

export default router;
