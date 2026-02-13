// Imports
import express from "express";
import dotenv from "dotenv";
import { logReq, globalErr } from "./middleware/middlewares.js";
import connectDB from "./db/conn.js";

// Setups
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

// Middlewares
app.use(express.json());
app.use(logReq);
connectDB();

// Routes

// Global Err
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});
