import express from "express";
import Cart from "../models/cartSchema.js";

const router = express.Router();

// Add/Inc/Dec items in cart
router.post("/:userId", async (req, res) => {
  // Destructure variables for ease of use
  const { product, qty } = req.body;

  if (!product) return res.status(400).json({ error: "Insufficient Data" });

  // Try to increment if item is already in db
  let updateProduct = await Cart.findOneAndUpdate(
    // Filterable object, finduser, cart first. Then finding matching product
    { user: req.params.userId, "items.product": product },
    { $inc: { "items.$.qty": qty } },
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
  );

  res.json(cart);
});

// Delete from cart
router.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    {
      $pull: { items: { product: productId } },
    },
  );

  // If cart doesnt exist
  if (!cart) return res.status(404).json({ error: "Cart not found" });

  res.json(cart);
});

// Get Cart

export default router;
