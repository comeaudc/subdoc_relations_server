import express from "express";
import Cart from "../models/cartSchema.js";

const router = express.Router();

// Add to cart
router.post("/:userId", async (req, res) => {
  // Destructure variables for ease of use
  const { product, qty } = req.body;

  if (!product) return res.status(400).json({ error: "Insufficient Data" });

  // Try to increment if item is already in db
  let updateProduct = await Cart.findOneAndUpdate(
    // Filterable object, finduser, cart first. Then finding matching product
    { user: req.params.userId, "items.product": product },
    { $inc: { "items.$.quantity": qty } },
    { new: true },
  );

  //if already existed and update cart. send back to frontend
  if (updateProduct) return res.json(updateProduct);

  // Add to cart because it didnt already exist
  let cart = await Cart.findOneAndUpdate(
    { user: req.params.userId },
    {
      $push: {
        items: { product, qty },
      },
    },
    {new: true, }
  );

  res.json(cart);
});

// Remove from cart

// Get Cart

export default router;
