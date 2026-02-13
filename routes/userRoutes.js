import express from "express";
import User from "../models/userSchema.js";
import Cart from "../models/cartSchema.js";

const router = express.Router();
// POST new user
router.route("/").post(async (req, res) => {
  // Create user in DB
  let newUser = await User.create(req.body);

  // Create cart object with userId
  const cart = {
    user: newUser._id,
    items: [],
  };

  // Create cart in DB
  await Cart.create(cart);

  // Return user information
  res.json({ userId: newUser._id });
});

// GET user
router.get("/:id", async (req, res) => {
  let user = await User.findById(req.params.id).select("-password");

  res.json(user);
});

export default router;
