import express from "express";
import Product from "../models/productSchema.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('testing')
})

export default router;